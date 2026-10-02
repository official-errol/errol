import { PageHeader } from "@/components/ui/page-header";
import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="New project"
        description="Describe what you built and how."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Projects", href: "/admin/projects" },
          { label: "New" },
        ]}
      />

      <ProjectForm />
    </div>
  );
}
