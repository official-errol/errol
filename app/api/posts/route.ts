import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function POST(request: Request) {
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

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "Title and content required" },
      { status: 400 },
    );
  }

  const finalSlug = (slug?.trim() || slugify(title)).toLowerCase();
  if (!finalSlug) {
    return NextResponse.json(
      { error: "Could not generate slug" },
      { status: 400 },
    );
  }

  const isPublished = Boolean(published);

  const { data, error } = await supabase
    .from("posts")
    .insert({
      author_id: user.id,
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt?.trim() || null,
      content: content.trim(),
      cover_image_url: cover_image_url?.trim() || null,
      published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ post: data });
}
