import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://errol.vercel.app",
  "https://www.errol.is-a.dev",
];

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.redirect(`${ALLOWED_ORIGINS[1]}/?error=invalid_origin`);
  }

  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
  }

  return NextResponse.redirect(`${origin}/?error=auth_failed`);
}
