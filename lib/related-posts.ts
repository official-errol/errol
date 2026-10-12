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

export async function getRelatedPosts(
  currentPostId: string,
  tags: string[],
  limit = 3,
): Promise<RelatedPost[]> {
  const supabase = await createClient();
  const seen = new Set<string>([currentPostId]);
  const results: RelatedPost[] = [];

  // 1. Same categories first
  const { data: myCats } = await supabase
    .from("post_categories")
    .select("category_id")
    .eq("post_id", currentPostId);

  const categoryIds = (myCats ?? []).map((c) => c.category_id);

  if (categoryIds.length > 0) {
    const { data: catPosts } = await supabase
      .from("post_categories")
      .select(
        "post_id, posts ( id, slug, title, excerpt, cover_image_url, published_at, tags, published )",
      )
      .in("category_id", categoryIds)
      .neq("post_id", currentPostId)
      .limit(limit * 3);

    for (const row of catPosts ?? []) {
      const p = row.posts as unknown as RelatedPost & { published: boolean };
      if (!p || !p.published || seen.has(p.id)) continue;
      seen.add(p.id);
      results.push(p);
      if (results.length >= limit) break;
    }
  }

  // 2. Tag-matched
  if (results.length < limit && tags.length > 0) {
    const { data } = await supabase
      .from("posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at, tags")
      .eq("published", true)
      .overlaps("tags", tags)
      .neq("id", currentPostId)
      .order("published_at", { ascending: false })
      .limit(limit);

    for (const post of data ?? []) {
      if (results.length >= limit) break;
      if (seen.has(post.id)) continue;
      seen.add(post.id);
      results.push(post as RelatedPost);
    }
  }

  // 3. Recent fallback
  if (results.length < limit) {
    const { data } = await supabase
      .from("posts")
      .select("id, slug, title, excerpt, cover_image_url, published_at, tags")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(limit + 1);

    for (const post of data ?? []) {
      if (results.length >= limit) break;
      if (seen.has(post.id)) continue;
      seen.add(post.id);
      results.push(post as RelatedPost);
    }
  }

  return results;
}