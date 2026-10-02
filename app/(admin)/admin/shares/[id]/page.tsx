import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";

export default async function ShareDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: share } = await supabase
    .from("shares")
    .select(
      "id, token, title, visibility, expires_at, view_count, download_count, revoked, created_at, password_hash",
    )
    .eq("id", id)
    .single();

  if (!share) notFound();

  const { data: events } = await supabase
    .from("share_events")
    .select("id, event_type, file_id, user_id, created_at")
    .eq("share_id", id)
    .order("created_at", { ascending: false })
    .limit(100);

  const { data: fileLinks } = await supabase
    .from("share_files")
    .select("file_id")
    .eq("share_id", id);

  const fileIds = (fileLinks ?? []).map((l) => l.file_id);

  const { data: files } = await supabase
    .from("files")
    .select("id, filename")
    .in(
      "id",
      fileIds.length > 0 ? fileIds : ["00000000-0000-0000-0000-000000000000"],
    );

  const fileMap = new Map((files ?? []).map((f) => [f.id, f.filename]));

  const perFileDownloads = new Map<string, number>();
  for (const e of events ?? []) {
    if (e.event_type === "download" && e.file_id) {
      perFileDownloads.set(
        e.file_id,
        (perFileDownloads.get(e.file_id) ?? 0) + 1,
      );
    }
  }

  const isExpired = new Date(share.expires_at).getTime() < Date.now();
  const url = `https://sidequeststudio.vercel.app/s/${share.token}`;

  return (
    <div className="space-y-8">
      <div>
        <PageHeader
          title={share.title ?? "Untitled share"}
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Shares", href: "/admin/shares" },
            { label: share.title ?? "Untitled" },
          ]}
        />
        <h1 className="text-3xl font-semibold text-text-primary mt-4">
          {share.title ?? "Untitled share"}
        </h1>
        <div className="flex items-center gap-3 mt-2 text-sm text-text-secondary">
          <span className="font-mono text-xs">{url}</span>
          {share.password_hash && (
            <span className="text-xs px-2 py-0.5 bg-warning/10 text-warning rounded-sm">
              Password
            </span>
          )}
          {share.visibility === "public" ? (
            <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-sm">
              Public
            </span>
          ) : (
            <span className="text-xs px-2 py-0.5 bg-accent-subtle text-accent rounded-sm">
              Authenticated
            </span>
          )}
          {isExpired && (
            <span className="text-xs px-2 py-0.5 bg-error/10 text-error rounded-sm">
              Expired
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Views" value={share.view_count} />
        <Stat label="Downloads" value={share.download_count} />
        <Stat label="Files" value={fileIds.length} />
        <Stat
          label="Expires"
          value={new Date(share.expires_at).toLocaleDateString()}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-3">
          Downloads by file
        </h2>
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          {(files ?? []).map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0"
            >
              <span className="font-mono text-sm text-text-primary truncate">
                {file.filename}
              </span>
              <span className="text-sm text-text-secondary">
                {perFileDownloads.get(file.id) ?? 0} downloads
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-3">
          Recent activity
        </h2>
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          {(events ?? []).length === 0 ? (
            <p className="px-4 py-6 text-sm text-text-secondary">
              No activity yet.
            </p>
          ) : (
            (events ?? []).map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0 text-sm"
              >
                <span className="text-text-primary">
                  {e.event_type}
                  {e.file_id && (
                    <span className="text-text-secondary ml-2 font-mono text-xs">
                      {fileMap.get(e.file_id) ?? e.file_id.slice(0, 8)}
                    </span>
                  )}
                </span>
                <span className="text-text-tertiary text-xs">
                  {new Date(e.created_at).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <p className="text-xs uppercase tracking-wide text-text-secondary mb-1">
        {label}
      </p>
      <p className="text-xl font-semibold text-text-primary">{value}</p>
    </div>
  );
}
