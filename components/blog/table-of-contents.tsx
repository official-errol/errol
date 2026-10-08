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
    <details
      className="bg-surface border border-border rounded-lg mb-6"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-text-primary select-none">
        On this page ({items.length})
      </summary>
      <ul className="px-4 pb-3 space-y-1.5 border-t border-border pt-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => setTimeout(() => setOpen(false), 150)}
              className={`block text-sm text-text-secondary hover:text-text-primary transition-colors ${
                item.level === 3 ? "pl-4" : ""
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
