import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "./icons";

type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;

  const first = items[0];
  const last = items[items.length - 1];
  const middle = items.slice(1, -1);
  const hasMiddle = middle.length > 0;
  const isLastLong = (last.label?.length ?? 0) > 40;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-sm text-text-secondary min-w-0"
    >
      <Link
        href="/"
        className="flex items-center hover:text-text-primary transition-colors shrink-0"
        title="Home"
      >
        <HomeIcon className="w-3.5 h-3.5" />
      </Link>

      {/* First crumb — always visible */}
      <span className="flex items-center gap-1.5 shrink-0">
        <ChevronRightIcon className="w-3.5 h-3.5 text-text-tertiary" />
        {first.href ? (
          <Link
            href={first.href}
            className="hover:text-text-primary transition-colors whitespace-nowrap"
          >
            {first.label}
          </Link>
        ) : (
          <span className="text-text-primary whitespace-nowrap">
            {first.label}
          </span>
        )}
      </span>

      {/* Middle crumbs — collapsed to "…" on small screens, full on desktop */}
      {hasMiddle && (
        <>
          {/* Mobile: ellipsis only */}
          <span className="flex items-center gap-1.5 md:hidden shrink-0">
            <ChevronRightIcon className="w-3.5 h-3.5 text-text-tertiary" />
            <span className="text-text-tertiary">…</span>
          </span>

          {/* Desktop: full trail */}
          <span className="hidden md:contents">
            {middle.map((item, i) => (
              <span
                key={`m-${i}`}
                className="flex items-center gap-1.5 shrink-0"
              >
                <ChevronRightIcon className="w-3.5 h-3.5 text-text-tertiary" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-text-primary transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-text-primary whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </span>
        </>
      )}

      {/* Last crumb — always visible, truncates if long */}
      {last !== first && (
        <span className="flex items-center gap-1.5 min-w-0">
          <ChevronRightIcon className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
          {last.href && last !== last ? (
            <Link
              href={last.href}
              className="text-text-primary hover:text-accent transition-colors truncate"
              title={last.label}
            >
              {last.label}
            </Link>
          ) : (
            <span
              className={`text-text-primary truncate ${
                isLastLong ? "max-w-[180px] sm:max-w-none" : ""
              }`}
              title={last.label}
            >
              {last.label}
            </span>
          )}
        </span>
      )}
    </nav>
  );
}
