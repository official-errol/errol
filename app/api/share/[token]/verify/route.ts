import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getShareByToken, verifySharePassword } from "@/lib/share";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const share = await getShareByToken(token);

  if (!share) {
    return NextResponse.json({ error: "Share not found" }, { status: 404 });
  }

  if (!share.password_hash) {
    return NextResponse.json({ ok: true });
  }

  const body = await request.json();
  const { password } = body as { password?: string };

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  const valid = await verifySharePassword(share, password);
  if (!valid) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(`share_pass_${share.id}`, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return NextResponse.json({ ok: true });
}
