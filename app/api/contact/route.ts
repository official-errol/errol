import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendContactEmail } from "@/lib/mail";
import { checkRateLimit, getClientIp, identifierForIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = await checkRateLimit(identifierForIp(ip), {
    action: "contact",
    limit: 5,
    windowSeconds: 60 * 60,
  });

  if (!rate.ok) {
    return NextResponse.json(
      { error: "Too many messages. Try again later." },
      { status: 429 },
    );
  }

  const body = await request.json();
  const { name, email, subject, message } = body as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (message.trim().length < 10 || message.trim().length > 5000) {
    return NextResponse.json(
      { error: "Message length invalid" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = await createClient();
  await supabase.from("contact_messages").insert({
    name: name.trim(),
    email: email.trim(),
    subject: subject?.trim() || "No subject",
    message: message.trim(),
  });

  try {
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || "No subject",
      message: message.trim(),
    });
  } catch (err) {
    console.error("[contact] email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
