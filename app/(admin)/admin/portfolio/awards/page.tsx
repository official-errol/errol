import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import { AwardList } from "@/components/admin/portfolio/award-list";

export default async function AwardsAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("awards")
    .select("*")
    .order("sort_order", { ascending: false })
    .order("year", { ascending: false, nullsFirst: false });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Awards"
        description="Recognition, honors, and achievements."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Awards" },
        ]}
        action={
          <ButtonLink href="/admin/portfolio/awards/new">
            <PlusIcon />
            New award
          </ButtonLink>
        }
      />

      <AwardList items={data ?? []} />
    </div>
  );
}
