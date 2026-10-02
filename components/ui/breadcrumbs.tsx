import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "./icons";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-text-secondary"
    >
      <Link
        href="/"
        className="flex items-center hover:text-text-primary transition-colors"
        title="Home"
      >
        <HomeIcon className="w-3.5 h-3.5" />
      </Link>

      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRightIcon className="w-3.5 h-3.5 text-text-tertiary" />
            {isLast || !item.href ? (
              <span className="text-text-primary">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
