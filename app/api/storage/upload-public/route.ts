import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { STORAGE_BUCKETS } from "@/lib/storage";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

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
  const prefix = ((formData.get("prefix") as string) || "uploads").replace(
    /[^a-z0-9-]/gi,
    "",
  );

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Image too large (max 5 MB)" },
      { status: 413 },
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported type. Allowed: ${ALLOWED_TYPES.join(", ")}` },
      { status: 415 },
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeExt = /^[a-z0-9]{1,5}$/.test(ext) ? ext : "bin";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${safeExt}`;
  const path = `${prefix}/${filename}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKETS.public)
    .upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKETS.public}/${path}`;

  return NextResponse.json({ url: publicUrl, path });
}
