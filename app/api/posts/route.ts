import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { MAX_CATEGORIES_PER_POST, normalizeCategory } from "@/lib/categories";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

async function syncCategories(
  supabase: Awaited<ReturnType<typeof createClient>>,
  postId: string,
  rawCategories: string[],
) {
  const slugs = Array.from(
    new Set(
      rawCategories
        .map((c) => normalizeCategory(c))
        .filter(Boolean)
        .slice(0, MAX_CATEGORIES_PER_POST),
    ),
  );

  // Wipe existing links, then re-insert. Simple and correct for <=3 rows.
  await supabase.from("post_categories").delete().eq("post_id", postId);

  if (slugs.length === 0) return;

  // Upsert by slug, preserving existing names.
  const { data: existing } = await supabase
    .from("categories")
    .select("id, slug")
    .in("slug", slugs);

  const existingMap = new Map((existing ?? []).map((c) => [c.slug, c.id]));
  const missing = slugs.filter((s) => !existingMap.has(s));

  if (missing.length > 0) {
    const { data: created } = await supabase
      .from("categories")
      .insert(missing.map((slug) => ({ name: slug, slug })))
      .select("id, slug");

    for (const c of created ?? []) existingMap.set(c.slug, c.id);
  }

  const links = slugs
    .map((slug) => existingMap.get(slug))
    .filter((id): id is string => Boolean(id))
    .map((category_id) => ({ post_id: postId, category_id }));

  if (links.length > 0) {
    await supabase.from("post_categories").insert(links);
  }
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
  const {
    title,
    slug,
    excerpt,
    content,
    cover_image_url,
    published,
    tags,
    categories,
  } = body as {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    cover_image_url?: string;
    published?: boolean;
    tags?: string[];
    categories?: string[];
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
  const cleanTags = Array.isArray(tags)
    ? tags
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 10)
    : [];

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
      tags: cleanTags,
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

  if (Array.isArray(categories) && categories.length > 0) {
    await syncCategories(supabase, data.id, categories);
  }

  return NextResponse.json({ post: data });
}