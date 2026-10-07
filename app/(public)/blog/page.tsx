import { createClient } from "@/lib/supabase/server";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { PostCard } from "@/components/blog/post-card";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata = {
  title: "Blog",
  description: "Writing from Errol.",
};

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, cover_image_url, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

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
        title="Blog"
        description="Notes, thoughts, and things I've learned."
      />

      {posts.length === 0 ? (
        <EmptyState title="No posts yet" description="Check back soon." />
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
                comment_count: commentCounts[post.id] ?? 0,
                reactions: reactionCounts[post.id],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
