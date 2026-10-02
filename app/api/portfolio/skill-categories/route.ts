import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function checkAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized", status: 401 as const, supabase };
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin")
    return { error: "Forbidden", status: 403 as const, supabase };
  return { error: null, status: 200 as const, supabase };
}

export async function POST(request: Request) {
  const { error, status, supabase } = await checkAdmin();
  if (error) return NextResponse.json({ error }, { status });

  const body = await request.json();
  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  const { data, error: err } = await supabase
    .from("skills")
    .insert({
      name: body.name.trim(),
      category_id: body.category_id || null,
      proficiency: Math.min(5, Math.max(1, Number(body.proficiency) || 3)),
      icon_slug: body.icon_slug || null,
      sort_order: Number(body.sort_order) || 0,
    })
    .select()
    .single();

  if (err) return NextResponse.json({ error: err.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
