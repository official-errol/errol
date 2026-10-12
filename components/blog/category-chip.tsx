import Link from "next/link";

type Props = {
  categories: { id: string; name: string; slug: string }[];
  size?: "sm" | "md";
  clickable?: boolean;
};

export function CategoryChips({
  categories,
  size = "sm",
  clickable = true,
}: Props) {
  if (!categories || categories.length === 0) return null;

  const sizeClass =
    size === "md" ? "text-xs px-2.5 py-1" : "text-xs px-2 py-0.5";

  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((cat) => {
        const classes = `inline-flex items-center ${sizeClass} bg-accent-subtle text-accent rounded-sm font-mono transition-colors hover:bg-accent hover:text-text-inverse`;

        if (clickable) {
          return (
            <Link
              key={cat.id}
              href={`/blog/category/${cat.slug}`}
              className={classes}
            >
              {cat.slug}
            </Link>
          );
        }

        return (
          <span key={cat.id} className={classes}>
            {cat.slug}
          </span>
        );
      })}
    </div>
  );
}