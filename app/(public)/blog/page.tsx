import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { PostCard } from "@/components/blog/post-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getReadingTime } from "@/lib/reading-time";
import { RssIcon, XIcon } from "@/components/ui/icons";
import { flattenCategories } from "@/lib/categories";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; category?: string }>;
}): Promise<Metadata> {
  const { tag, category } = await searchParams;
  const cleanTag = tag?.trim().toLowerCase();
  const cleanCategory = category?.trim().toLowerCase();

  const title = cleanTag
    ? `Posts tagged #${cleanTag}`
    : cleanCategory
      ? `Posts in ${cleanCategory}`
      : "Blog";

  const description = cleanTag
    ? `Posts tagged with #${cleanTag} by Errol.`
    : cleanCategory
      ? `Posts in the ${cleanCategory} category by Errol.`
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

  // Resolve category slug → id if a category filter is active
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
      // No posts in this category — force empty result
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

  // Fetch category list for the filter row
  const { data: allCategories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  const hasFilter = Boolean(activeTag || activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[{ label: "Portfolio", href: "/" }, { label: "Blog" }]}
        title={
          activeTag
            ? `#${activeTag}`
            : activeCategory
              ? activeCategory
              : "Blog"
        }
        description={
          activeTag
            ? `Posts tagged #${activeTag}.`
            : activeCategory
              ? `Posts in the ${activeCategory} category.`
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

      {/* Category filter row */}
      {allCategories && allCategories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href={activeTag ? `/blog?tag=${encodeURIComponent(activeTag)}` : "/blog"}
            className={`text-xs px-2.5 py-1 rounded-sm font-mono transition-colors ${
              !activeCategory
                ? "bg-accent text-text-inverse"
                : "bg-surface-subtle text-text-secondary hover:bg-accent-subtle hover:text-accent"
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
                className={`text-xs px-2.5 py-1 rounded-sm font-mono transition-colors ${
                  isActive
                    ? "bg-accent text-text-inverse"
                    : "bg-surface-subtle text-text-secondary hover:bg-accent-subtle hover:text-accent"
                }`}
              >
                {cat.slug}
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
              : activeCategory
                ? `No posts in ${activeCategory}`
                : "No posts yet"
          }
          description={hasFilter ? "Try a different filter." : "Check back soon."}
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
          {posts.map((post) => {
            const categories = flattenCategories(post.post_categories)

            return (
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
                  tags: post.tags ?? [],
                  categories,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}