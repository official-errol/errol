import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { createClient } from "@/lib/supabase/server";
import {
  UserIcon,
  BriefcaseIcon,
  GraduationIcon,
  CodeIcon,
  LinkIcon,
} from "@/components/ui/icons";

export default async function PortfolioOverviewPage() {
  const supabase = await createClient();

  const [expCount, eduCount, skillCount, socialCount, profileRes] =
    await Promise.all([
      supabase.from("experiences").select("*", { count: "exact", head: true }),
      supabase.from("education").select("*", { count: "exact", head: true }),
      supabase.from("skills").select("*", { count: "exact", head: true }),
      supabase.from("social_links").select("*", { count: "exact", head: true }),
      supabase
        .from("portfolio_profile")
        .select("name, headline")
        .limit(1)
        .maybeSingle(),
    ]);

  const sections = [
    {
      href: "/admin/portfolio/profile",
      label: "Profile",
      description: "Name, headline, bio, availability",
      icon: UserIcon,
      count: profileRes.data ? "1 item" : "Empty",
    },
    {
      href: "/admin/portfolio/experience",
      label: "Experience",
      description: "Work history and roles",
      icon: BriefcaseIcon,
      count: `${expCount.count ?? 0} entries`,
    },
    {
      href: "/admin/portfolio/education",
      label: "Education",
      description: "Schools, degrees, certs",
      icon: GraduationIcon,
      count: `${eduCount.count ?? 0} entries`,
    },
    {
      href: "/admin/portfolio/skills",
      label: "Skills",
      description: "Categories and skill tags",
      icon: CodeIcon,
      count: `${skillCount.count ?? 0} skills`,
    },
    {
      href: "/admin/portfolio/social",
      label: "Social links",
      description: "External links in hero and footer",
      icon: LinkIcon,
      count: `${socialCount.count ?? 0} links`,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Portfolio"
        description="Edit everything that appears on your public homepage."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="bg-surface border border-border rounded-lg p-5 hover:border-border-strong transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-md bg-surface-subtle">
                  <Icon className="w-4 h-4 text-text-secondary" />
                </div>
                <span className="text-xs text-text-tertiary">{s.count}</span>
              </div>
              <h3 className="font-semibold text-text-primary mb-1">
                {s.label}
              </h3>
              <p className="text-sm text-text-secondary">{s.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
