import { Feed } from "feed";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://errolsolomon.vercel.app";

export async function GET() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, content, cover_image_url, published_at, updated_at",
    )
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(30);

  const feed = new Feed({
    title: "Errol — Blog",
    description:
      "Notes, thoughts, and things I have learned while building software and side projects.",
    id: BASE_URL,
    link: BASE_URL,
    language: "en",
    image: `${BASE_URL}/opengraph-image`,
    favicon: `${BASE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Errol`,
    updated: posts?.[0]?.updated_at
      ? new Date(posts[0].updated_at)
      : new Date(),
    feedLinks: {
      rss: `${BASE_URL}/rss.xml`,
    },
    author: {
      name: "Errol",
      link: BASE_URL,
    },
  });

  for (const post of posts ?? []) {
    feed.addItem({
      title: post.title,
      id: `${BASE_URL}/blog/${post.slug}`,
      link: `${BASE_URL}/blog/${post.slug}`,
      description: post.excerpt ?? "",
      content: post.content,
      date: new Date(post.published_at ?? post.updated_at),
      image: post.cover_image_url ?? undefined,
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
