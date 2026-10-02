import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { SharesList } from "@/components/admin/shares-list";

export default async function AdminSharesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: shares } = await supabase
    .from("shares")
    .select(
      "id, token, title, visibility, expires_at, view_count, download_count, revoked, created_at",
    )
    .order("created_at", { ascending: false });

  const { data: counts } = await supabase
    .from("share_files")
    .select("share_id");

  const countMap = new Map<string, number>();
  for (const row of counts ?? []) {
    countMap.set(row.share_id, (countMap.get(row.share_id) ?? 0) + 1);
  }

  const sharesWithCounts = (shares ?? []).map((s) => ({
    ...s,
    fileCount: countMap.get(s.id) ?? 0,
  }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Shares"
        description="Shareable links you've created."
      />

      <SharesList shares={sharesWithCounts} />
    </div>
  );
}
