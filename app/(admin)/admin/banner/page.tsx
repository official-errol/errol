import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { BannerForm } from "@/components/admin/banner-form";

export default async function AdminBannerPage() {
  const supabase = await createClient();

  const { data: banner } = await supabase
    .from("site_banner")
    .select("*")
    .limit(1)
    .maybeSingle();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Site banner"
        description="Show a dismissible notice on every public page."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Banner" }]}
      />

      <BannerForm initial={banner} />
    </div>
  );
}
