"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type Category = { id: string; name: string; slug: string };

export function CategoryFilter({
  categories,
  value,
}: {
  categories: Category[];
  value: string | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next) {
      params.set("category", next);
    } else {
      params.delete("category");
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="admin-category-filter"
        className="text-xs text-text-tertiary"
      >
        Filter
      </label>
      <select
        id="admin-category-filter"
        value={value ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-surface border border-border rounded-sm px-2.5 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>
            {c.name || c.slug}
          </option>
        ))}
      </select>
    </div>
  );
}