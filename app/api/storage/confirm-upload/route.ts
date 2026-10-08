import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
  const { key, filename, mimeType, size, visibility, description } = body as {
    key?: string;
    filename?: string;
    mimeType?: string;
    size?: number;
    visibility?: string;
    description?: string;
  };

  if (!key || !filename || !mimeType || !size) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const validVisibility = ["public", "authenticated", "private"].includes(
    visibility ?? "",
  )
    ? (visibility as "public" | "authenticated" | "private")
    : "private";

  const { data: fileRecord, error: dbError } = await supabase
    .from("files")
    .insert({
      owner_id: user.id,
      storage_key: key,
      filename,
      mime_type: mimeType,
      size_bytes: size,
      visibility: validVisibility,
      description: description?.trim() || null,
    })
    .select()
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ file: fileRecord });
}
