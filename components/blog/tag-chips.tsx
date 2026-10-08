import Link from "next/link";

type Props = {
  tags: string[];
  size?: "sm" | "md";
  clickable?: boolean;
  variant?: "default" | "subtle";
};

export function TagChips({
  tags,
  size = "sm",
  clickable = true,
  variant = "default",
}: Props) {
  if (!tags || tags.length === 0) return null;

  const sizeClass =
    size === "md" ? "text-xs px-2.5 py-1" : "text-xs px-2 py-0.5";

  const variantClass =
    variant === "subtle"
      ? "bg-surface-subtle text-text-secondary hover:bg-accent-subtle hover:text-accent"
      : "bg-surface border border-border text-text-secondary hover:border-accent hover:text-accent";

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const classes = `inline-flex items-center ${sizeClass} rounded-sm font-mono transition-colors ${variantClass}`;

        if (clickable) {
          return (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className={classes}
            >
              #{tag}
            </Link>
          );
        }

        return (
          <span key={tag} className={classes}>
            #{tag}
          </span>
        );
      })}
    </div>
  );
}
