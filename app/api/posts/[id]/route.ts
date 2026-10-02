import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return {
      error: "Unauthorized",
      status: 401 as const,
      supabase,
      user: null,
    };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { error: "Forbidden", status: 403 as const, supabase, user: null };
  }

  return { error: null, status: 200 as const, supabase, user };
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error, status, supabase } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status });

  const body = await request.json();
  const { title, slug, excerpt, content, cover_image_url, published } =
    body as {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      cover_image_url?: string;
      published?: boolean;
    };

  if (!title?.trim() || !content?.trim() || !slug?.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const isPublished = Boolean(published);

  const { data: existing } = await supabase
    .from("posts")
    .select("published, published_at")
    .eq("id", id)
    .single();

  const publishedAt =
    isPublished && !existing?.published_at
      ? new Date().toISOString()
      : (existing?.published_at ?? null);

  const { data, error: updateError } = await supabase
    .from("posts")
    .update({
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      excerpt: excerpt?.trim() || null,
      content: content.trim(),
      cover_image_url: cover_image_url?.trim() || null,
      published: isPublished,
      published_at: publishedAt,
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

  return NextResponse.json({ post: data });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { error, status, supabase } = await requireAdmin();
  if (error) return NextResponse.json({ error }, { status });

  const { error: deleteError } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
