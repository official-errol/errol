import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import { SettingsIcon } from "@/components/ui/icons-tech";
import { SkillsList } from "@/components/admin/portfolio/skills-list";

export default async function SkillsAdminPage() {
  const supabase = await createClient();

  const [skillsRes, categoriesRes] = await Promise.all([
    supabase
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: false }),
    supabase
      .from("skill_categories")
      .select("*")
      .order("sort_order", { ascending: false }),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Skills"
        description="Categorized skill tags shown on your portfolio."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Skills" },
        ]}
        action={
          <div className="flex gap-2">
            <ButtonLink
              href="/admin/portfolio/skills/categories"
              variant="secondary"
            >
              <SettingsIcon />
              Categories
            </ButtonLink>
            <ButtonLink href="/admin/portfolio/skills/new">
              <PlusIcon />
              New skill
            </ButtonLink>
          </div>
        }
      />

      <SkillsList
        skills={skillsRes.data ?? []}
        categories={categoriesRes.data ?? []}
      />
    </div>
  );
}
