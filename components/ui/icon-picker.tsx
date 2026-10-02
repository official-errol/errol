"use client";

import { useMemo, useState } from "react";
import { ICONS } from "./icon-resolver";
import { XIcon } from "./icons";

type Props = {
  value: string | null;
  onChange: (slug: string | null) => void;
  defaultCategory?: string;
};

export function IconPicker({ value, onChange, defaultCategory }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(
    defaultCategory ?? null,
  );

  const categories = useMemo(
    () => Array.from(new Set(ICONS.map((i) => i.category))),
    [],
  );

  const filtered = useMemo(() => {
    let list = ICONS;
    if (category) list = list.filter((i) => i.category === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (i) =>
          i.slug.toLowerCase().includes(q) || i.label.toLowerCase().includes(q),
      );
    }
    return list;
  }, [query, category]);

  const selected = value ? ICONS.find((i) => i.slug === value) : null;

  return (
    <div className="border border-border rounded-sm bg-surface">
      {/* Top row: selected + clear */}
      {selected && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
          <div className="w-7 h-7 rounded-sm border border-border bg-surface-subtle flex items-center justify-center text-text-primary shrink-0">
            <selected.Component className="w-4 h-4" />
          </div>
          <span className="text-sm text-text-primary flex-1 truncate">
            {selected.label}
          </span>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="p-1 rounded-sm text-text-tertiary hover:text-error hover:bg-error/10 transition-colors"
            title="Clear"
          >
            <XIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Search input — matches your input style */}
      <div className="p-2 border-b border-border">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons…"
          className="w-full bg-surface border border-border rounded-sm px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        />
      </div>

      {/* Category filters — same style as tab pills elsewhere */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-border">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={`text-xs px-2.5 py-1 rounded-sm border transition-colors ${
            category === null
              ? "border-primary bg-primary text-text-inverse"
              : "border-border text-text-secondary hover:bg-surface-subtle"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`text-xs px-2.5 py-1 rounded-sm border transition-colors ${
              category === c
                ? "border-primary bg-primary text-text-inverse"
                : "border-border text-text-secondary hover:bg-surface-subtle"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="p-2 max-h-64 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-xs text-text-tertiary text-center py-8">
            No icons found.
          </p>
        ) : (
          <div className="grid grid-cols-8 sm:grid-cols-10 gap-1">
            {filtered.map((icon) => {
              const isSelected = value === icon.slug;
              return (
                <button
                  key={icon.slug}
                  type="button"
                  onClick={() => onChange(icon.slug)}
                  title={icon.label}
                  className={`aspect-square flex items-center justify-center rounded-sm border transition-colors ${
                    isSelected
                      ? "border-primary bg-primary text-text-inverse"
                      : "border-transparent text-text-secondary hover:bg-surface-subtle hover:border-border hover:text-text-primary"
                  }`}
                >
                  <icon.Component className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-1.5 border-t border-border text-xs text-text-tertiary">
        {filtered.length} icon{filtered.length === 1 ? "" : "s"}
      </div>
    </div>
  );
}
