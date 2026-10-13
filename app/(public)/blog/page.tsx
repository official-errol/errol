import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { PostCard } from "@/components/blog/post-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getReadingTime } from "@/lib/reading-time";
import { flattenCategories } from "@/lib/categories";
import { RssIcon, XIcon } from "@/components/ui/icons";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; category?: string }>;
}): Promise<Metadata> {
  const { tag, category } = await searchParams;
  const cleanTag = tag?.trim().toLowerCase();
  const cleanCategory = category?.trim().toLowerCase();

  let categoryName: string | null = null;
  if (cleanCategory) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("categories")
      .select("name")
      .eq("slug", cleanCategory)
      .maybeSingle();
    categoryName = data?.name ?? cleanCategory;
  }

  const title = cleanTag
    ? `Posts tagged #${cleanTag}`
    : categoryName
      ? `Posts in ${categoryName}`
      : "Blog";

  const description = cleanTag
    ? `Posts tagged with #${cleanTag} by Errol.`
    : categoryName
      ? `Posts in the ${categoryName} category by Errol.`
      : "Notes, thoughts, and things I have learned while building software and side projects.";

  const canonical = cleanTag
    ? `https://errolsolomon.vercel.app/blog?tag=${encodeURIComponent(cleanTag)}`
    : cleanCategory
      ? `https://errolsolomon.vercel.app/blog?category=${encodeURIComponent(cleanCategory)}`
      : "https://errolsolomon.vercel.app/blog";

  return { title, description, alternates: { canonical } };
}

type SearchParams = Promise<{ tag?: string; category?: string }>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const activeTag = params.tag?.trim().toLowerCase() || null;
  const activeCategory = params.category?.trim().toLowerCase() || null;

  const supabase = await createClient();

  // Resolve category slug → list of post IDs
  let categoryPostIds: string[] | null = null;
  if (activeCategory) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", activeCategory)
      .maybeSingle();

    if (cat) {
      const { data: links } = await supabase
        .from("post_categories")
        .select("post_id")
        .eq("category_id", cat.id);
      categoryPostIds = (links ?? []).map((l) => l.post_id);
    } else {
      categoryPostIds = [];
    }
  }

  let query = supabase
    .from("posts")
    .select(
      `id, slug, title, excerpt, content, cover_image_url, published_at, tags,
       post_categories ( categories ( id, name, slug ) )`,
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (activeTag) {
    query = query.contains("tags", [activeTag]);
  }

  if (categoryPostIds) {
    if (categoryPostIds.length === 0) {
      query = query.in("id", ["00000000-0000-0000-0000-000000000000"]);
    } else {
      query = query.in("id", categoryPostIds);
    }
  }

  const { data } = await query;
  const posts = data ?? [];
  const postIds = posts.map((p) => p.id);

  const commentCounts: Record<string, number> = {};
  const reactionCounts: Record<
    string,
    { like: number; heart: number; fire: number }
  > = {};

  if (postIds.length > 0) {
    const [commentsRes, reactionsRes] = await Promise.all([
      supabase.from("comments").select("post_id").in("post_id", postIds),
      supabase.from("reactions").select("post_id, kind").in("post_id", postIds),
    ]);

    for (const c of commentsRes.data ?? []) {
      commentCounts[c.post_id] = (commentCounts[c.post_id] ?? 0) + 1;
    }

    for (const r of reactionsRes.data ?? []) {
      if (!reactionCounts[r.post_id]) {
        reactionCounts[r.post_id] = { like: 0, heart: 0, fire: 0 };
      }
      const kind = r.kind as "like" | "heart" | "fire";
      if (kind in reactionCounts[r.post_id]) {
        reactionCounts[r.post_id][kind]++;
      }
    }
  }

  // All categories for the filter row
  const { data: allCategories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  // Resolve the active category's display name
  const activeCategoryLabel =
    (activeCategory &&
      allCategories?.find((c) => c.slug === activeCategory)?.name) ||
    activeCategory ||
    null;

  const hasFilter = Boolean(activeTag || activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[{ label: "Portfolio", href: "/" }, { label: "Blog" }]}
        title={
          activeTag ? `#${activeTag}` : activeCategoryLabel ?? "Blog"
        }
        description={
          activeTag
            ? `Posts tagged #${activeTag}.`
            : activeCategoryLabel
              ? `Posts in the ${activeCategoryLabel} category.`
              : "Notes, thoughts, and things I've learned."
        }
        action={
          hasFilter ? (
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              <XIcon className="w-3.5 h-3.5" />
              Clear filter
            </Link>
          ) : (
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              title="Subscribe via RSS"
            >
              <RssIcon />
              RSS
            </a>
          )
        }
      />

      {/* Category filter row — neutral styling, no accent */}
      {allCategories && allCategories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href={
              activeTag ? `/blog?tag=${encodeURIComponent(activeTag)}` : "/blog"
            }
            className={`text-xs px-2.5 py-1 rounded-sm transition-colors ${
              !activeCategory
                ? "bg-primary text-text-inverse font-medium"
                : "bg-surface border border-border text-text-secondary hover:border-border-strong hover:text-text-primary"
            }`}
          >
            All
          </Link>
          {allCategories.map((cat) => {
            const href = activeTag
              ? `/blog?tag=${encodeURIComponent(activeTag)}&category=${encodeURIComponent(cat.slug)}`
              : `/blog?category=${encodeURIComponent(cat.slug)}`;
            const isActive = activeCategory === cat.slug;
            return (
              <Link
                key={cat.id}
                href={href}
                className={`text-xs px-2.5 py-1 rounded-sm transition-colors ${
                  isActive
                    ? "bg-primary text-text-inverse font-medium"
                    : "bg-surface border border-border text-text-secondary hover:border-border-strong hover:text-text-primary"
                }`}
              >
                {cat.name || cat.slug}
              </Link>
            );
          })}
        </div>
      )}

      {posts.length === 0 ? (
        <EmptyState
          title={
            activeTag
              ? `No posts tagged #${activeTag}`
              : activeCategoryLabel
                ? `No posts in ${activeCategoryLabel}`
                : "No posts yet"
          }
          description={
            hasFilter ? "Try a different filter." : "Check back soon."
          }
          action={
            hasFilter ? (
              <Link
                href="/blog"
                className="inline-block px-4 py-2 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle transition-colors"
              >
                View all posts
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={{
                id: post.id,
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                cover_image_url: post.cover_image_url,
                published_at: post.published_at,
                reading_minutes: getReadingTime(post.content),
                comment_count: commentCounts[post.id] ?? 0,
                reactions: reactionCounts[post.id],
                categories: flattenCategories(post.post_categories),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}