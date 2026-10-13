import Link from "next/link";
import { categoryDisplayName } from "@/lib/categories";

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

  const variantClass =
    "bg-surface border border-border text-text-secondary font-medium hover:border-border-strong hover:text-text-primary transition-colors";

  return (
    <div className="flex flex-wrap gap-1.5">
      {categories.map((cat) => {
        const classes = `inline-flex items-center ${sizeClass} rounded-sm ${variantClass}`;
        const label = cat.name || categoryDisplayName(cat.slug);

        if (clickable) {
          return (
            <Link
              key={cat.id}
              href={`/blog/category/${cat.slug}`}
              className={classes}
            >
              {label}
            </Link>
          );
        }

        return (
          <span key={cat.id} className={classes}>
            {label}
          </span>
        );
      })}
    </div>
  );
}