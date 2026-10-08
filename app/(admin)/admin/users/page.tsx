import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { UserList } from "@/components/admin/user-list";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { data: users } = await supabase
    .from("profiles")
    .select("id, email, full_name, avatar_url, role, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Users"
        description={`${users?.length ?? 0} registered user${users?.length === 1 ? "" : "s"}.`}
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Users" }]}
      />

      <UserList users={users ?? []} currentUserId={currentUser?.id ?? null} />
    </div>
  );
}
