import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createClient } from "@/lib/supabase/server";
import { CommentList, type Comment } from "@/components/blog/comment-list";
import { CommentForm } from "@/components/blog/comment-form";
import { ReactionButtons } from "@/components/blog/reaction-buttons";
import { ShareButtons } from "@/components/blog/share-buttons";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { SignInPrompt } from "@/components/auth/sign-in-prompt";
import { Metadata } from "next";

const BASE_URL = "https://errolsolomon.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, cover_image_url, published_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }

  const url = `https://errolsolomon.vercel.app/blog/${slug}`;
  const image = post.cover_image_url || "/opengraph-image";

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      url,
      siteName: "Errol",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.published_at ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
      images: [image],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: post } = await supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, content, cover_image_url, published_at, author_id",
    )
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  const { data: commentsRaw } = await supabase
    .from("comments")
    .select(
      `
      id,
      content,
      parent_id,
      created_at,
      author_id,
      profiles:author_id (full_name, avatar_url)
    `,
    )
    .eq("post_id", post.id)
    .order("created_at", { ascending: true });

  const comments: Comment[] = (commentsRaw ?? []).map((c) => {
    const raw = c.profiles as
      | { full_name: string | null; avatar_url: string | null }
      | { full_name: string | null; avatar_url: string | null }[]
      | null;

    const profile = Array.isArray(raw) ? (raw[0] ?? null) : raw;

    return {
      id: c.id,
      content: c.content,
      parent_id: c.parent_id,
      created_at: c.created_at,
      author_id: c.author_id,
      profiles: profile,
    };
  });

  const { data: reactions } = await supabase
    .from("reactions")
    .select("kind, user_id")
    .eq("post_id", post.id);

  const postUrl = `${BASE_URL}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.published_at,
    dateModified: post.published_at,
    image: post.cover_image_url ?? undefined,
    author: {
      "@type": "Organization",
      name: "Errol",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Errol",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <PublicPageHeader
          breadcrumbs={[
            { label: "Portfolio", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
          title={post.title}
          description={
            post.published_at
              ? `Published ${new Date(post.published_at).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}`
              : undefined
          }
        />

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt=""
            className="w-full rounded-lg border border-border mb-10"
          />
        )}

        <div className="prose prose-neutral dark:prose-invert max-w-none mb-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
          <ReactionButtons
            postId={post.id}
            reactions={reactions ?? []}
            userId={user?.id ?? null}
          />

          <ShareButtons
            url={postUrl}
            title={post.title}
            excerpt={post.excerpt ?? undefined}
          />
        </div>

        <section className="mt-16 pt-10 border-t border-border">
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            Comments {comments.length > 0 && `(${comments.length})`}
          </h2>

          {user ? (
            <CommentForm postId={post.id} parentId={null} />
          ) : (
            <SignInPrompt message="to leave a comment" />
          )}

          <CommentList
            comments={comments}
            postId={post.id}
            userId={user?.id ?? null}
          />
        </section>
      </article>
    </>
  );
}
