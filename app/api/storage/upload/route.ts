import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { uploadFile, buildStorageKey, pickBucket } from "@/lib/storage";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

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

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const visibility = (formData.get("visibility") as string) ?? "private";
  const description = (formData.get("description") as string) ?? "";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large (max 50 MB)" },
      { status: 413 },
    );
  }

  const validVisibility = ["public", "authenticated", "private"].includes(
    visibility,
  )
    ? (visibility as "public" | "authenticated" | "private")
    : "private";

  const bucket = pickBucket(validVisibility);
  const key = buildStorageKey(file.name);

  let uploadResult;
  try {
    uploadResult = await uploadFile(bucket, key, file);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 },
    );
  }

  const { data: fileRecord, error: dbError } = await supabase
    .from("files")
    .insert({
      owner_id: user.id,
      storage_key: key,
      filename: file.name,
      mime_type: file.type || "application/octet-stream",
      size_bytes: file.size,
      visibility: validVisibility,
      description: description.trim() || null,
    })
    .select()
    .single();

  if (dbError) {
    await supabase.storage.from(bucket).remove([key]);
    return NextResponse.json(
      { error: `Upload succeeded but DB insert failed: ${dbError.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({
    file: fileRecord,
    path: uploadResult.path,
    bucket: uploadResult.bucket,
  });
}
