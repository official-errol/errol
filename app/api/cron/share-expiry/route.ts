import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const now = new Date();
  const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

  const { data: expiring } = await supabase
    .from("shares")
    .select(
      "id, token, title, expires_at, created_by, notified_at, notify_on_expiry",
    )
    .gte("expires_at", now.toISOString())
    .lte("expires_at", in24Hours)
    .eq("revoked", false)
    .eq("notify_on_expiry", true)
    .is("notified_at", null);

  if (!expiring || expiring.length === 0) {
    return NextResponse.json({ ok: true, notified: 0 });
  }

  let notified = 0;
  for (const share of expiring) {
    console.log("[share-expiry] would notify:", share.created_by, share.token);
    // hook: send email here — integrate Resend, Postmark, etc.
    await supabase
      .from("shares")
      .update({ notified_at: new Date().toISOString() })
      .eq("id", share.id);
    notified++;
  }

  return NextResponse.json({ ok: true, notified });
}
