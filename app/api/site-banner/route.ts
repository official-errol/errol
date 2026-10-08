import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VARIANTS = ["default", "gradient", "success", "warning"];

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { id, enabled, message, link_text, link_url, variant, dismissible } =
    body;

  if (!VARIANTS.includes(variant)) {
    return NextResponse.json({ error: "Invalid variant" }, { status: 400 });
  }

  if (typeof message !== "string" || message.length > 200) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const payload = {
    enabled: Boolean(enabled),
    message: message.trim(),
    link_text: link_text?.trim() || null,
    link_url: link_url?.trim() || null,
    variant,
    dismissible: Boolean(dismissible),
  };

  if (id) {
    const { error } = await supabase
      .from("site_banner")
      .update(payload)
      .eq("id", id);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabase.from("site_banner").insert(payload);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
