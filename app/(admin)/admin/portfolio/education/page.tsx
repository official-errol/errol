import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import { EducationList } from "@/components/admin/portfolio/education-list";

export default async function EducationAdminPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("education")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("year_graduated", { ascending: false });

  if (error) {
    console.error("[education admin] query error:", error.message);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Education"
        description="Your schools, degrees, and certifications."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Education" },
        ]}
        action={
          <ButtonLink href="/admin/portfolio/education/new">
            <PlusIcon />
            New entry
          </ButtonLink>
        }
      />

      <EducationList items={data ?? []} />
    </div>
  );
}
