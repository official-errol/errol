import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectForm } from "@/components/admin/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select(
      "id, title, slug, summary, content, cover_image_url, live_url, repo_url, tech_stack, featured, status, sort_order",
    )
    .eq("id", id)
    .single();

  if (!project) notFound();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit project"
        description="Changes go live immediately when published."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Projects", href: "/admin/projects" },
          { label: project.title },
        ]}
      />

      <ProjectForm
        initial={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          summary: project.summary ?? "",
          content: project.content,
          cover_image_url: project.cover_image_url ?? "",
          live_url: project.live_url ?? "",
          repo_url: project.repo_url ?? "",
          tech_stack: project.tech_stack ?? [],
          featured: project.featured,
          status: project.status as "draft" | "published" | "archived",
          sort_order: project.sort_order,
        }}
      />
    </div>
  );
}
