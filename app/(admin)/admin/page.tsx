import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import {
  FileTextIcon,
  FolderIcon,
  HardDriveIcon,
  ShareIcon,
  MessageIcon,
  MailIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@/components/ui/icons";

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    postsCount,
    commentsCount,
    filesCount,
    sharesCount,
    projectsCount,
    usersCount,
    messagesCount,
    unreadMessagesCount,
    ordersCount,
    pendingOrdersCount,
    storageRes,
    revenueRes,
  ] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("comments").select("*", { count: "exact", head: true }),
    supabase.from("files").select("*", { count: "exact", head: true }),
    supabase.from("shares").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("read", false),
    supabase.from("shop_orders").select("*", { count: "exact", head: true }),
    supabase
      .from("shop_orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase.from("files").select("size_bytes"),
    supabase.from("shop_orders").select("amount_php").eq("status", "completed"),
  ]);

  const totalBytes = (storageRes.data ?? []).reduce(
    (sum, f) => sum + (f.size_bytes ?? 0),
    0,
  );
  const limitBytes = 1024 * 1024 * 1024;
  const usedPct = Math.min(100, (totalBytes / limitBytes) * 100);

  const totalRevenue = (revenueRes.data ?? []).reduce(
    (sum, o) => sum + (o.amount_php ?? 0),
    0,
  );

  const contentStats = [
    {
      label: "Posts",
      value: postsCount.count ?? 0,
      href: "/admin/posts",
      icon: FileTextIcon,
      color: "text-accent",
    },
    {
      label: "Projects",
      value: projectsCount.count ?? 0,
      href: "/admin/projects",
      icon: FolderIcon,
      color: "text-violet-500",
    },
    {
      label: "Files",
      value: filesCount.count ?? 0,
      href: "/admin/files",
      icon: HardDriveIcon,
      color: "text-success",
    },
    {
      label: "Shares",
      value: sharesCount.count ?? 0,
      href: "/admin/shares",
      icon: ShareIcon,
      color: "text-fuchsia-500",
    },
    {
      label: "Comments",
      value: commentsCount.count ?? 0,
      href: "#",
      icon: MessageIcon,
      color: "text-warning",
    },
  ];

  const businessStats = [
    {
      label: "Orders",
      value: ordersCount.count ?? 0,
      badge:
        (pendingOrdersCount.count ?? 0) > 0
          ? `${pendingOrdersCount.count} pending`
          : null,
      href: "/admin/orders",
      icon: ShoppingBagIcon,
      color: "text-orange-500",
    },
    {
      label: "Revenue",
      value: `₱${totalRevenue}`,
      href: "/admin/orders",
      icon: ShareIcon,
      color: "text-emerald-500",
    },
    {
      label: "Users",
      value: usersCount.count ?? 0,
      href: "/admin/users",
      icon: UserIcon,
      color: "text-cyan-500",
    },
    {
      label: "Messages",
      value: messagesCount.count ?? 0,
      badge:
        (unreadMessagesCount.count ?? 0) > 0
          ? `${unreadMessagesCount.count} unread`
          : null,
      href: "/admin/messages",
      icon: MailIcon,
      color: "text-indigo-500",
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description="A quick look at what's happening on Errol."
      />

      {/* Content */}
      <section>
        <h2 className="text-xs uppercase tracking-wide text-text-tertiary font-mono mb-3">
          Content
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {contentStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-surface border border-border rounded-lg p-5 hover:border-border-strong transition-colors"
              >
                <div className="flex items-center gap-2 text-text-secondary mb-3">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <p className="text-xs uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
                <p className="text-2xl font-semibold text-text-primary">
                  {stat.value}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Business */}
      <section>
        <h2 className="text-xs uppercase tracking-wide text-text-tertiary font-mono mb-3">
          Business
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {businessStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-surface border border-border rounded-lg p-5 hover:border-border-strong transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                    <p className="text-xs uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                  {stat.badge && (
                    <span className="text-xs px-1.5 py-0.5 bg-surface-subtle text-text-secondary rounded-sm shrink-0">
                      {stat.badge}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-semibold text-text-primary">
                  {stat.value}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Storage */}
      <section>
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <HardDriveIcon className="w-4 h-4 text-success" />
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

          <div className="flex items-center justify-between text-xs text-text-tertiary">
            <span>{usedPct.toFixed(1)}% used</span>
            <span>{formatBytes(limitBytes - totalBytes)} remaining</span>
          </div>
        </div>
      </section>
    </div>
  );
}
