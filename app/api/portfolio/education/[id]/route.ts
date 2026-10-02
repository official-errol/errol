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
    .from("education")
    .update({
      school: body.school.trim(),
      degree: body.degree?.trim() || null,
      field: body.field?.trim() || null,
      location: body.location?.trim() || null,
      year_graduated: body.year_graduated ?? null,
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

  const { error: err } = await supabase.from("education").delete().eq("id", id);
  if (err) return NextResponse.json({ error: err.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
