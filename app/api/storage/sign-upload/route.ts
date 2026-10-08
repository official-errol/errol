import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { STORAGE_BUCKETS, buildStorageKey } from "@/lib/storage";

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

  const body = await request.json();
  const { filename, size, mimeType, visibility } = body as {
    filename?: string;
    size?: number;
    mimeType?: string;
    visibility?: string;
  };

  if (!filename || !size || !mimeType) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large (max 50 MB)" },
      { status: 413 },
    );
  }

  const validVisibility = ["public", "authenticated", "private"].includes(
    visibility ?? "",
  )
    ? (visibility as "public" | "authenticated" | "private")
    : "private";

  const bucket =
    validVisibility === "public"
      ? STORAGE_BUCKETS.public
      : STORAGE_BUCKETS.private;

  const key = buildStorageKey(filename);

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(key);

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Could not create upload URL" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    signedUrl: data.signedUrl,
    token: data.token,
    path: data.path,
    bucket,
    key,
    visibility: validVisibility,
  });
}
