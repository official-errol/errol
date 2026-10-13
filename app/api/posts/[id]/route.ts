import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  MAX_CATEGORIES_PER_POST,
  cleanCategoryName,
  slugifyCategory,
} from "@/lib/categories";

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

async function syncCategories(
  supabase: Awaited<ReturnType<typeof createClient>>,
  postId: string,
  rawCategories: string[],
) {
  const seen = new Set<string>();
  const pairs: { name: string; slug: string }[] = [];

  for (const raw of rawCategories) {
    const name = cleanCategoryName(raw);
    const slug = slugifyCategory(name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    pairs.push({ name, slug });
    if (pairs.length >= MAX_CATEGORIES_PER_POST) break;
  }

  await supabase.from("post_categories").delete().eq("post_id", postId);
  if (pairs.length === 0) return;

  const { data: existing } = await supabase
    .from("categories")
    .select("id, slug, name")
    .in(
      "slug",
      pairs.map((p) => p.slug),
    );

  const bySlug = new Map(
    (existing ?? []).map((c) => [c.slug, { id: c.id, name: c.name }]),
  );

  const missing = pairs.filter((p) => !bySlug.has(p.slug));
  if (missing.length > 0) {
    const { data: created } = await supabase
      .from("categories")
      .insert(missing.map((p) => ({ name: p.name, slug: p.slug })))
      .select("id, slug, name");

    for (const c of created ?? []) {
      bySlug.set(c.slug, { id: c.id, name: c.name });
    }
  }

  const links = pairs
    .map((p) => bySlug.get(p.slug)?.id)
    .filter((id): id is string => Boolean(id))
    .map((category_id) => ({ post_id: postId, category_id }));

  if (links.length > 0) {
    await supabase.from("post_categories").insert(links);
  }
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

  const cleanTags = Array.isArray(tags)
    ? tags
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 10)
    : [];

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
      tags: cleanTags,
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

  await syncCategories(supabase, id, categories ?? []);

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