import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deleteFile } from "@/lib/storage";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { id } = body as { id?: string };

  if (!id) {
    return NextResponse.json({ error: "Missing file id" }, { status: 400 });
  }

  const { data: file, error: fetchError } = await supabase
    .from("files")
    .select("id, storage_key, visibility")
    .eq("id", id)
    .single();

  if (fetchError || !file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const bucket =
    file.visibility === "public" ? "public-assets" : "private-files";

  try {
    await deleteFile(bucket, file.storage_key);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Storage delete failed" },
      { status: 500 },
    );
  }

  const { error: dbError } = await supabase.from("files").delete().eq("id", id);

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
