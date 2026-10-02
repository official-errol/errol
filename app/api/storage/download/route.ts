import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getSignedDownloadUrl } from "@/lib/storage";
import {
  checkRateLimit,
  getClientIp,
  identifierForIp,
  identifierForUser,
  RULES,
} from "@/lib/rate-limit";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("id");

  if (!fileId) {
    return NextResponse.json({ error: "Missing file id" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const identifier = user
    ? identifierForUser(user.id)
    : identifierForIp(getClientIp(request));

  const rate = await checkRateLimit(identifier, RULES.download);
  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many downloads. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      },
    );
  }

  const { data: file, error } = await supabase
    .from("files")
    .select("storage_key, filename, visibility, owner_id")
    .eq("id", fileId)
    .single();

  if (error || !file) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  if (file.visibility === "authenticated" && !user) {
    return NextResponse.json(
      { error: "Login required", reason: "auth_required" },
      { status: 401 },
    );
  }

  if (file.visibility === "private" && file.owner_id !== user?.id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user?.id ?? "")
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const bucket =
    file.visibility === "public" ? "public-assets" : "private-files";

  const url = await getSignedDownloadUrl(
    bucket,
    file.storage_key,
    file.filename,
  );

  await supabase.from("downloads").insert({
    file_id: fileId,
    user_id: user?.id ?? null,
  });

  return NextResponse.redirect(url);
}
