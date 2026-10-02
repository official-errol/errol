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
  if (!body.company?.trim() || !body.role?.trim() || !body.start_date) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data, error: err } = await supabase
    .from("experiences")
    .insert({
      company: body.company.trim(),
      role: body.role.trim(),
      location: body.location?.trim() || null,
      start_date: body.start_date,
      end_date: body.current ? null : body.end_date || null,
      current: Boolean(body.current),
      description: body.description?.trim() || null,
      url: body.url?.trim() || null,
      sort_order: Number(body.sort_order) || 0,
    })
    .select()
    .single();

  if (err) return NextResponse.json({ error: err.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
