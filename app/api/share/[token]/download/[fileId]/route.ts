import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getSignedDownloadUrl } from "@/lib/storage";
import {
  getShareByToken,
  incrementShareDownload,
  logShareEvent,
} from "@/lib/share";
import {
  checkRateLimit,
  getClientIp,
  hashIp,
  identifierForIp,
  identifierForUser,
  RULES,
} from "@/lib/rate-limit";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string; fileId: string }> },
) {
  const { token, fileId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ip = getClientIp(request);
  const ipHash = hashIp(ip);

  const identifier = user ? identifierForUser(user.id) : identifierForIp(ip);

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

  const share = await getShareByToken(token);
  if (!share) {
    return NextResponse.json(
      { error: "Share not found or expired" },
      { status: 404 },
    );
  }

  if (share.password_hash) {
    const cookieStore = await cookies();
    const passed = cookieStore.get(`share_pass_${share.id}`)?.value === "ok";
    if (!passed) {
      return NextResponse.json({ error: "Password required" }, { status: 401 });
    }
  }

  if (share.visibility === "authenticated" && !user) {
    return NextResponse.json(
      { error: "Login required", reason: "auth_required" },
      { status: 401 },
    );
  }

  const file = share.files.find((f) => f.id === fileId);
  if (!file) {
    return NextResponse.json(
      { error: "File not in this share" },
      { status: 404 },
    );
  }

  const bucket =
    file.visibility === "public" ? "public-assets" : "private-files";
  const url = await getSignedDownloadUrl(
    bucket,
    file.storage_key,
    file.filename,
  );

  void incrementShareDownload(share.id);
  void logShareEvent(share.id, "download", {
    fileId: file.id,
    userId: user?.id,
    ipHash,
  });

  await supabase.from("downloads").insert({
    file_id: file.id,
    user_id: user?.id ?? null,
    ip_hash: ipHash,
  });

  return NextResponse.redirect(url);
}
