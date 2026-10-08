import { createClient } from "@/lib/supabase/server";

export type RelatedPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  tags: string[];
};

/**
 * Finds posts related to the given post.
 *
 * Strategy:
 * 1. Prefer posts sharing at least one tag (up to `limit`).
 * 2. If fewer than `limit` results, fill the rest with recent posts.
 * 3. Never return the current post.
 */
export async function getRelatedPosts(
  currentPostId: string,
  tags: string[],
  limit = 3,
): Promise<RelatedPost[]> {
  const supabase = await createClient();
  const seen = new Set<string>([currentPostId]);
  const results: RelatedPost[] = [];

  // 1. Tag-matched posts
  if (tags.length > 0) {
    const { data } = await supabase
      .from("posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at, tags")
      .eq("published", true)
      .overlaps("tags", tags)
      .neq("id", currentPostId)
      .order("published_at", { ascending: false })
      .limit(limit);

    for (const post of data ?? []) {
      if (seen.has(post.id)) continue;
      seen.add(post.id);
      results.push(post as RelatedPost);
    }
  }

  // 2. Fill with recent posts if needed
  if (results.length < limit) {
    const { data } = await supabase
      .from("posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at, tags")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(limit + 1); // +1 to cover the case where the current post is in the list

    for (const post of data ?? []) {
      if (results.length >= limit) break;
      if (seen.has(post.id)) continue;
      seen.add(post.id);
      results.push(post as RelatedPost);
    }
  }

  return results;
}
