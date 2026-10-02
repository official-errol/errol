import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { ProjectList } from "@/components/admin/project-list";
import { PlusIcon } from "@/components/ui/icons";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select(
      "id, slug, title, status, featured, tech_stack, created_at, updated_at",
    )
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects"
        description="Showcase what you've built."
        action={
          <ButtonLink href="/admin/projects/new">
            <PlusIcon />
            New project
          </ButtonLink>
        }
      />

      <ProjectList projects={projects ?? []} />
    </div>
  );
}
