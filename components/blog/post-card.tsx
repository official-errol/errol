import Link from "next/link";
import { CalendarIcon, MessageIcon } from "@/components/ui/icons";

type ReactionCounts = {
  like: number;
  heart: number;
  fire: number;
};

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string | null;
  comment_count?: number;
  reactions?: ReactionCounts;
};

const REACTION_EMOJI = {
  like: "👍",
  heart: "❤️",
  fire: "🔥",
} as const;

export function PostCard({ post }: { post: Post }) {
  const totalReactions = post.reactions
    ? post.reactions.like + post.reactions.heart + post.reactions.fire
    : 0;

  return (
    <Link
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
          <span className="text-xs text-text-tertiary font-mono">no cover</span>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-sm text-text-secondary line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between gap-3 mt-auto pt-2">
          {post.published_at && (
            <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
              <CalendarIcon className="w-3.5 h-3.5" />
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          )}

          <div className="flex items-center gap-2.5 text-xs text-text-tertiary">
            {post.comment_count !== undefined && (
              <span className="inline-flex items-center gap-1">
                <MessageIcon className="w-3.5 h-3.5" />
                {post.comment_count}
              </span>
            )}

            {post.reactions && totalReactions > 0 && (
              <span className="inline-flex items-center gap-2">
                {(["like", "heart", "fire"] as const).map((kind) => {
                  const count = post.reactions![kind];
                  if (count === 0) return null;
                  return (
                    <span
                      key={kind}
                      className="inline-flex items-center gap-0.5"
                      title={kind}
                    >
                      {REACTION_EMOJI[kind]}
                      {count}
                    </span>
                  );
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
