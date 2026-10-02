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
    status,
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

  const validStatus = ["draft", "published", "archived"].includes(status ?? "")
    ? status!
    : "draft";

  const { data, error } = await supabase
    .from("projects")
    .insert({
      author_id: user.id,
      title: title.trim(),
      slug: finalSlug,
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

  return NextResponse.json({ project: data });
}
