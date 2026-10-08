import { PageHeader } from "@/components/ui/page-header";
import { AwardForm } from "@/components/admin/portfolio/award-form";

export default function NewAwardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="New award"
        description="Add a recognition or honor."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Awards", href: "/admin/portfolio/awards" },
          { label: "New" },
        ]}
      />
      <AwardForm />
    </div>
  );
}
