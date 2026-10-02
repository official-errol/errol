import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { MessagesList } from "@/components/admin/messages-list";

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  const unread = (data ?? []).filter((m) => !m.read).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Messages"
        description={
          unread > 0
            ? `${unread} unread message${unread === 1 ? "" : "s"}.`
            : "Messages from your contact form."
        }
      />
      <MessagesList messages={data ?? []} />
    </div>
  );
}
