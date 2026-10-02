import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { SkillForm } from "@/components/admin/portfolio/skill-form";

export default async function NewSkillPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("skill_categories")
    .select("*")
    .order("sort_order", { ascending: false });

  return (
    <div className="space-y-8">
      <PageHeader
        title="New skill"
        description="Add a skill, optionally give it an icon."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Skills", href: "/admin/portfolio/skills" },
          { label: "New" },
        ]}
      />
      <SkillForm categories={categories ?? []} />
    </div>
  );
}
