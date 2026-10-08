"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return activeId;
}

export function TableOfContentsDesktop({ items }: { items: TocItem[] }) {
  const activeId = useActiveHeading(items);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <p className="text-xs uppercase tracking-wide text-text-tertiary font-mono mb-3">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-border">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm border-l-2 -ml-px py-1.5 transition-colors ${
                  item.level === 3 ? "pl-6" : "pl-3"
                } ${
                  isActive
                    ? "border-accent text-text-primary font-medium"
                    : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function TableOfContentsMobile({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);

  if (items.length < 2) return null;

  return (
    <div className="mb-6 bg-surface border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-surface-subtle transition-colors"
      >
        <span className="flex items-center gap-2 min-w-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="text-text-secondary shrink-0"
          >
            <path
              d="M3 4h10M3 8h10M3 12h6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm font-medium text-text-primary truncate">
            On this page
          </span>
          <span className="text-xs text-text-tertiary font-mono shrink-0">
            {items.length}
          </span>
        </span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={`text-text-secondary shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`grid transition-all duration-200 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="border-t border-border py-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={`block text-sm text-text-secondary hover:text-text-primary hover:bg-surface-subtle transition-colors py-2 ${
                    item.level === 3 ? "pl-8 pr-4" : "pl-4 pr-4"
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
