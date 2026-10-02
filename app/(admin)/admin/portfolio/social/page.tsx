import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { ButtonLink } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import { SocialList } from "@/components/admin/portfolio/social-list";

export default async function SocialAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: false });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Social links"
        description="Links to your profiles — shown in the hero and footer."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Social" },
        ]}
        action={
          <ButtonLink href="/admin/portfolio/social/new">
            <PlusIcon />
            New link
          </ButtonLink>
        }
      />
      <SocialList items={data ?? []} />
    </div>
  );
}
