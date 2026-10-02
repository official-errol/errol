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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error, status, supabase } = await checkAdmin();
  if (error) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const { error: err } = await supabase
    .from("experiences")
    .update({
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
    .eq("id", id);

  if (err) return NextResponse.json({ error: err.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error, status, supabase } = await checkAdmin();
  if (error) return NextResponse.json({ error }, { status });

  const { error: err } = await supabase
    .from("experiences")
    .delete()
    .eq("id", id);
  if (err) return NextResponse.json({ error: err.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
