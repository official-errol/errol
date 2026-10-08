import Link from "next/link";
import { CalendarIcon } from "@/components/ui/icons";
import type { RelatedPost } from "@/lib/related-posts";

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-border">
      <h2 className="text-xl font-semibold text-text-primary mb-6">
        Read next
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-border-strong transition-colors flex flex-col"
          >
            {post.cover_image_url ? (
              <img
                src={post.cover_image_url}
                alt=""
                className="w-full aspect-video object-cover border-b border-border"
              />
            ) : (
              <div className="w-full aspect-video bg-surface-subtle border-b border-border flex items-center justify-center">
                <span className="text-xs text-text-tertiary font-mono">
                  no cover
                </span>
              </div>
            )}

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors mb-2 line-clamp-2">
                {post.title}
              </h3>

              {post.excerpt && (
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
              )}

              {post.published_at && (
                <div className="flex items-center gap-1.5 text-xs text-text-tertiary mt-auto">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  {formatDate(post.published_at)}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
