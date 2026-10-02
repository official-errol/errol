import { PageHeader } from "@/components/ui/page-header";
import { SocialForm } from "@/components/admin/portfolio/social-form";

export default function NewSocialPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="New link"
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Social", href: "/admin/portfolio/social" },
          { label: "New" },
        ]}
      />
      <SocialForm />
    </div>
  );
}
