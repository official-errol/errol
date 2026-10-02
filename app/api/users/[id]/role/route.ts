import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VALID_ROLES = ["user", "admin"] as const;
type Role = (typeof VALID_ROLES)[number];

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (id === user.id) {
    return NextResponse.json(
      { error: "You cannot change your own role" },
      { status: 400 },
    );
  }

  const body = await request.json();
  const { role } = body as { role?: string };

  if (!role || !VALID_ROLES.includes(role as Role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
