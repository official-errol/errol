import Link from "next/link";
import { CalendarIcon, MessageIcon } from "@/components/ui/icons";
import { TagChips } from "./tag-chips";

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
  reading_minutes?: number;
  comment_count?: number;
  reactions?: ReactionCounts;
  tags?: string[];
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
    <article className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-border-strong transition-colors flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block">
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
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="text-sm text-text-secondary line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mb-4">
            <TagChips tags={post.tags.slice(0, 3)} />
          </div>
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
            {post.reading_minutes && <span>{post.reading_minutes} min</span>}

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
    </article>
  );
}
