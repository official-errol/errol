import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { CategoryManager } from "@/components/admin/portfolio/category-manager";

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skill_categories")
    .select("*")
    .order("sort_order", { ascending: false });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Skill categories"
        description="Group your skills into sections."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Skills", href: "/admin/portfolio/skills" },
          { label: "Categories" },
        ]}
      />

      <CategoryManager categories={data ?? []} />
    </div>
  );
}
