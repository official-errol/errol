import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { SkillForm } from "@/components/admin/portfolio/skill-form";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [skillRes, categoriesRes] = await Promise.all([
    supabase.from("skills").select("*").eq("id", id).single(),
    supabase
      .from("skill_categories")
      .select("*")
      .order("sort_order", { ascending: false }),
  ]);

  if (!skillRes.data) notFound();
  const skill = skillRes.data;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit skill"
        description="Update name, category, proficiency, or icon."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Skills", href: "/admin/portfolio/skills" },
          { label: skill.name },
        ]}
      />
      <SkillForm
        categories={categoriesRes.data ?? []}
        initial={{
          id: skill.id,
          name: skill.name,
          category_id: skill.category_id ?? "",
          proficiency: skill.proficiency,
          icon_slug: skill.icon_slug ?? null,
          sort_order: skill.sort_order,
        }}
      />
    </div>
  );
}
