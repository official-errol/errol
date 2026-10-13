export const MAX_CATEGORIES_PER_POST = 3

/** Human-facing: trims, collapses spaces, keeps case and dots. */
export function cleanCategoryName(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, 40)
}

/** For lookup/dedup/URLs: lowercase, kebab, strip punctuation. */
export function slugifyCategory(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
}

/** Fallback display if a category row is missing its name. */
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
    | { categories: Partial<CategoryRef> | Partial<CategoryRef>[] | null }
    | { categories: Partial<CategoryRef> | Partial<CategoryRef>[] | null }[]
    | null
    | undefined,
): CategoryRef[] {
  if (!input) return []
  const rows = Array.isArray(input) ? input : [input]
  const out: CategoryRef[] = []
  for (const row of rows) {
    const cat = row?.categories
    if (!cat) continue
    const list = Array.isArray(cat) ? cat : [cat]
    for (const c of list) {
      if (c?.slug) {
        out.push({
          id: c.id ?? c.slug,
          name: c.name ?? categoryDisplayName(c.slug),
          slug: c.slug,
        })
      }
    }
  }
  return out
}