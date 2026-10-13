import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { PostList } from "@/components/admin/post-list";
import { CategoryFilter } from "@/components/admin/category-filter";
import { PlusIcon } from "@/components/ui/icons";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.category?.trim().toLowerCase() || null;

  const supabase = await createClient();

  // Resolve active category slug → post IDs, so the posts query can filter
  let categoryPostIds: string[] | null = null;
  if (activeCategory) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", activeCategory)
      .maybeSingle();

    if (cat) {
      const { data: links } = await supabase
        .from("post_categories")
        .select("post_id")
        .eq("category_id", cat.id);
      categoryPostIds = (links ?? []).map((l) => l.post_id);
    } else {
      categoryPostIds = [];
    }
  }

  let query = supabase
    .from("posts")
    .select(
      "id, slug, title, cover_image_url, published, published_at, created_at, updated_at",
    )
    .order("created_at", { ascending: false });

  if (categoryPostIds) {
    if (categoryPostIds.length === 0) {
      query = query.in("id", ["00000000-0000-0000-0000-000000000000"]);
    } else {
      query = query.in("id", categoryPostIds);
    }
  }

  const [{ data: posts }, { data: allCategories }] = await Promise.all([
    query,
    supabase
      .from("categories")
      .select("id, name, slug")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true }),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Posts"
        description="Write, edit, and publish blog posts."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Posts" }]}
        action={
          <ButtonLink href="/admin/posts/new">
            <PlusIcon />
            New post
          </ButtonLink>
        }
      />

      <div className="flex items-center justify-between gap-4">
        <CategoryFilter
          categories={allCategories ?? []}
          value={activeCategory}
        />
        {activeCategory && (
          <p className="text-xs text-text-tertiary">
            Showing posts in <span className="font-mono">{activeCategory}</span>
          </p>
        )}
      </div>

      <PostList posts={posts ?? []} />
    </div>
  );
}