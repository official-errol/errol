import { PageHeader } from "@/components/ui/page-header";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/admin/portfolio/profile-form";

export default async function EditProfilePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("portfolio_profile")
    .select("*")
    .limit(1)
    .maybeSingle();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile"
        description="The hero section of your homepage."
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio", href: "/admin/portfolio" },
          { label: "Profile" },
        ]}
      />

      <ProfileForm initial={profile} />
    </div>
  );
}
