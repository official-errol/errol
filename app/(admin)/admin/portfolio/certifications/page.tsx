import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import { CertificationList } from "@/components/admin/portfolio/certification-list";

export default async function CertificationsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("year", { ascending: false, nullsFirst: false });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Certifications"
        description="Courses, exams, and licenses you've earned."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Certifications" },
        ]}
        action={
          <ButtonLink href="/admin/portfolio/certifications/new">
            <PlusIcon />
            New certification
          </ButtonLink>
        }
      />

      <CertificationList items={data ?? []} />
    </div>
  );
}
