import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
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

  if (profile?.role !== "admin") {
    return { error: "Forbidden", status: 403 as const, supabase };
  }

  return { error: null, status: 200 as const, supabase };
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error, status, supabase } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const {
    title,
    slug,
    summary,
    content,
    cover_image_url,
    live_url,
    repo_url,
    tech_stack,
    featured,
    status: projectStatus,
    sort_order,
  } = body as {
    title?: string;
    slug?: string;
    summary?: string;
    content?: string;
    cover_image_url?: string;
    live_url?: string;
    repo_url?: string;
    tech_stack?: string[];
    featured?: boolean;
    status?: string;
    sort_order?: number;
  };

  if (!title?.trim() || !content?.trim() || !slug?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const validStatus = ["draft", "published", "archived"].includes(
    projectStatus ?? "",
  )
    ? projectStatus!
    : "draft";

  const { data, error: updateError } = await supabase
    .from("projects")
    .update({
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      summary: summary?.trim() || null,
      content: content.trim(),
      cover_image_url: cover_image_url?.trim() || null,
      live_url: live_url?.trim() || null,
      repo_url: repo_url?.trim() || null,
      tech_stack: Array.isArray(tech_stack)
        ? tech_stack.map((t) => t.trim()).filter(Boolean)
        : [],
      featured: Boolean(featured),
      status: validStatus,
      sort_order: typeof sort_order === "number" ? sort_order : 0,
    })
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    if (updateError.code === "23505") {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ project: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error, status, supabase } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status });

  const { error: deleteError } = await supabase
    .from("projects")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
