import { PageHeader } from "@/components/ui/page-header";
import { CertificationForm } from "@/components/admin/portfolio/certification-form";

export default function NewCertificationPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="New certification"
        description="Add a course, exam, or license."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Certifications", href: "/admin/portfolio/certifications" },
          { label: "New" },
        ]}
      />
      <CertificationForm />
    </div>
  );
}
