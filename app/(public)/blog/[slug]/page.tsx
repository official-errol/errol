import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createClient } from "@/lib/supabase/server";
import { CommentList, type Comment } from "@/components/blog/comment-list";
import { CommentForm } from "@/components/blog/comment-form";
import { ReactionButtons } from "@/components/blog/reaction-buttons";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { SignInPrompt } from "@/components/auth/sign-in-prompt";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt, published_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `https://sidequeststudio.vercel.app/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      url: `https://sidequeststudio.vercel.app/blog/${slug}`,
      publishedTime: post.published_at ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
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
      "id, slug, title, content, cover_image_url, published_at, author_id",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.published_at,
    dateModified: post.published_at,
    image: post.cover_image_url ?? undefined,
    author: {
      "@type": "Organization",
      name: "Sidequest Studio",
      url: "https://sidequeststudio.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Sidequest Studio",
      url: "https://sidequeststudio.vercel.app",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sidequeststudio.vercel.app/blog/${post.slug}`,
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

        <div className="prose prose-neutral max-w-none mb-12">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <ReactionButtons
          postId={post.id}
          reactions={reactions ?? []}
          userId={user?.id ?? null}
        />

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
