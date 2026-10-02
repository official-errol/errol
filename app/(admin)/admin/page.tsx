import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import {
  FileTextIcon,
  FolderIcon,
  HardDriveIcon,
  ShareIcon,
  MessageIcon,
} from "@/components/ui/icons";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    postsCount,
    commentsCount,
    filesCount,
    sharesCount,
    projectsCount,
    storageRes,
  ] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("comments").select("*", { count: "exact", head: true }),
    supabase.from("files").select("*", { count: "exact", head: true }),
    supabase.from("shares").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("files").select("size_bytes"),
  ]);

  const totalBytes = (storageRes.data ?? []).reduce(
    (sum, f) => sum + (f.size_bytes ?? 0),
    0,
  );
  const limitBytes = 1024 * 1024 * 1024;
  const usedPct = Math.min(100, (totalBytes / limitBytes) * 100);

  const stats = [
    {
      label: "Posts",
      value: postsCount.count ?? 0,
      href: "/admin/posts",
      icon: FileTextIcon,
    },
    {
      label: "Projects",
      value: projectsCount.count ?? 0,
      href: "/admin/projects",
      icon: FolderIcon,
    },
    {
      label: "Files",
      value: filesCount.count ?? 0,
      href: "/admin/files",
      icon: HardDriveIcon,
    },
    {
      label: "Shares",
      value: sharesCount.count ?? 0,
      href: "/admin/shares",
      icon: ShareIcon,
    },
    {
      label: "Comments",
      value: commentsCount.count ?? 0,
      href: "#",
      icon: MessageIcon,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description="A quick look at what's happening on Sidequest Studio."
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-surface border border-border rounded-lg p-5 hover:border-border-strong transition-colors group"
            >
              <div className="flex items-center gap-2 text-text-secondary mb-3">
                <Icon className="w-4 h-4" />
                <p className="text-xs uppercase tracking-wide">{stat.label}</p>
              </div>
              <p className="text-2xl font-semibold text-text-primary">
                {stat.value}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HardDriveIcon className="w-4 h-4 text-text-secondary" />
            <h2 className="text-sm font-medium text-text-primary">Storage</h2>
          </div>
          <span className="text-sm font-mono text-text-secondary">
            {formatBytes(totalBytes)} / {formatBytes(limitBytes)}
          </span>
        </div>

        <div className="w-full h-2 bg-surface-subtle rounded-full overflow-hidden mb-3">
          <div
            className={`h-full transition-all ${
              usedPct > 95
                ? "bg-error"
                : usedPct > 80
                  ? "bg-warning"
                  : "bg-accent"
            }`}
            style={{ width: `${usedPct}%` }}
          />
        </div>

        <p className="text-xs text-text-tertiary">
          {usedPct.toFixed(1)}% used · {formatBytes(limitBytes - totalBytes)}{" "}
          remaining
        </p>
      </div>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}
