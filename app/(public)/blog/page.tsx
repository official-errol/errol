import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { PostCard } from "@/components/blog/post-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getReadingTime } from "@/lib/reading-time";
import { RssIcon, XIcon } from "@/components/ui/icons";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}): Promise<Metadata> {
  const { tag } = await searchParams;
  const cleanTag = tag?.trim().toLowerCase();

  return {
    title: cleanTag ? `Posts tagged #${cleanTag}` : "Blog",
    description: cleanTag
      ? `Posts tagged with #${cleanTag} by Errol.`
      : "Notes, thoughts, and things I have learned while building software and side projects.",
    alternates: {
      canonical: cleanTag
        ? `https://errolsolomon.vercel.app/blog?tag=${encodeURIComponent(cleanTag)}`
        : "https://errolsolomon.vercel.app/blog",
    },
  };
}

type SearchParams = Promise<{ tag?: string }>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const activeTag = params.tag?.trim().toLowerCase() || null;

  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, content, cover_image_url, published_at, tags",
    )
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (activeTag) {
    query = query.contains("tags", [activeTag]);
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

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[{ label: "Portfolio", href: "/" }, { label: "Blog" }]}
        title={activeTag ? `#${activeTag}` : "Blog"}
        description={
          activeTag
            ? `Posts tagged #${activeTag}.`
            : "Notes, thoughts, and things I've learned."
        }
        action={
          activeTag ? (
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

      {posts.length === 0 ? (
        <EmptyState
          title={activeTag ? `No posts tagged #${activeTag}` : "No posts yet"}
          description={activeTag ? "Try a different tag." : "Check back soon."}
          action={
            activeTag ? (
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
                tags: post.tags ?? [],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
