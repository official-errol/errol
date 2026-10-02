import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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
  const {
    id,
    name,
    headline,
    bio,
    avatar_url,
    location,
    email,
    resume_url,
    availability,
    availability_note,
  } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  const payload = {
    name: name.trim(),
    headline: headline?.trim() || null,
    bio: bio?.trim() || null,
    avatar_url: avatar_url?.trim() || null,
    location: location?.trim() || null,
    email: email?.trim() || null,
    resume_url: resume_url?.trim() || null,
    availability: ["available", "open", "unavailable"].includes(availability)
      ? availability
      : "open",
    availability_note: availability_note?.trim() || null,
  };

  if (id) {
    const { error } = await supabase
      .from("portfolio_profile")
      .update(payload)
      .eq("id", id);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    const { error } = await supabase.from("portfolio_profile").insert(payload);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
