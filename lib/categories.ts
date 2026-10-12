export const MAX_CATEGORIES_PER_POST = 3

export function normalizeCategory(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
}

export function categoryDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ")
}

export type CategoryRef = { id: string; name: string; slug: string }

/**
 * Supabase sometimes types a nested relation as either a single object
 * or an array depending on how it infers the FK. This flattens either
 * shape into a clean CategoryRef[].
 */
export function flattenCategories(
  input:
    | { categories: CategoryRef | CategoryRef[] | null }
    | { categories: CategoryRef | CategoryRef[] | null }[]
    | null
    | undefined,
): CategoryRef[] {
  if (!input) return []
  const rows = Array.isArray(input) ? input : [input]
  const out: CategoryRef[] = []
  for (const row of rows) {
    const cat = row?.categories
    if (!cat) continue
    if (Array.isArray(cat)) {
      for (const c of cat) if (c && c.id) out.push(c)
    } else if (cat.id) {
      out.push(cat)
    }
  }
  return out
}