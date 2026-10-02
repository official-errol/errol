import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import { ExperienceList } from "@/components/admin/portfolio/experience-list";

export default async function ExperienceAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("start_date", { ascending: false });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Experience"
        description="Your work history."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Experience" },
        ]}
        action={
          <ButtonLink href="/admin/portfolio/experience/new">
            <PlusIcon />
            New entry
          </ButtonLink>
        }
      />

      <ExperienceList items={data ?? []} />
    </div>
  );
}
