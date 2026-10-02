import { PageHeader } from "@/components/ui/page-header";
import { ExperienceForm } from "@/components/admin/portfolio/experience-form";

export default function NewExperiencePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="New experience"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Experience", href: "/admin/portfolio/experience" },
          { label: "New" },
        ]}
      />
      <ExperienceForm />
    </div>
  );
}
