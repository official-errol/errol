import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { PostCard } from "@/components/blog/post-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getReadingTime } from "@/lib/reading-time";
import { flattenCategories } from "@/lib/categories";

const BASE_URL = "https://errolsolomon.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: cat } = await supabase
    .from("categories")
    .select("name, slug, description")
    .eq("slug", slug)
    .maybeSingle();

  if (!cat) return { title: "Category not found" };

  const label = cat.name || cat.slug;

  return {
    title: `Posts in ${label}`,
    description: cat.description ?? `Posts filed under ${label}.`,
    alternates: { canonical: `${BASE_URL}/blog/category/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: cat } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .eq("slug", slug)
    .maybeSingle();

  if (!cat) notFound();

  const label = cat.name || cat.slug;

  const { data: links } = await supabase
    .from("post_categories")
    .select("post_id")
    .eq("category_id", cat.id);

  const postIds = (links ?? []).map((l) => l.post_id);

  const { data: posts } = postIds.length
    ? await supabase
        .from("posts")
        .select(
          `id, slug, title, excerpt, content, cover_image_url, published_at,
           post_categories ( categories ( id, name, slug ) )`,
        )
        .eq("published", true)
        .in("id", postIds)
        .order("published_at", { ascending: false })
    : { data: [] as never[] };

  const list = posts ?? [];
  const ids = list.map((p) => p.id);

  const commentCounts: Record<string, number> = {};
  const reactionCounts: Record<
    string,
    { like: number; heart: number; fire: number }
  > = {};

  if (ids.length > 0) {
    const [commentsRes, reactionsRes] = await Promise.all([
      supabase.from("comments").select("post_id").in("post_id", ids),
      supabase.from("reactions").select("post_id, kind").in("post_id", ids),
    ]);

    for (const c of commentsRes.data ?? []) {
      commentCounts[c.post_id] = (commentCounts[c.post_id] ?? 0) + 1;
    }
    for (const r of reactionsRes.data ?? []) {
      if (!reactionCounts[r.post_id]) {
        reactionCounts[r.post_id] = { like: 0, heart: 0, fire: 0 };
      }
      const kind = r.kind as "like" | "heart" | "fire";
      if (kind in reactionCounts[r.post_id]) reactionCounts[r.post_id][kind]++;
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[
          { label: "Portfolio", href: "/" },
          { label: "Blog", href: "/blog" },
          { label },
        ]}
        title={label}
        description={cat.description ?? `Posts filed under ${label}.`}
        action={
          <Link
            href="/blog"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            All posts
          </Link>
        }
      />

      {list.length === 0 ? (
        <EmptyState
          title={`No posts in ${label} yet`}
          description="Check back soon."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {list.map((post) => (
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