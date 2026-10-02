import { PageHeader } from "@/components/ui/page-header";
import { EducationForm } from "@/components/admin/portfolio/education-form";

export default function NewEducationPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="New education"
        description="Add a school, degree, or certification."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Education", href: "/admin/portfolio/education" },
          { label: "New" },
        ]}
      />
      <EducationForm />
    </div>
  );
}
