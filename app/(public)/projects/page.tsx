import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Apps, tools, and experiments built by Errol. Web development, systems, and things worth shipping.",
  alternates: {
    canonical: "https://errolsolomon.vercel.app/projects",
  },
};

type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  cover_image_url: string | null;
  tech_stack: string[];
  featured: boolean;
  live_url: string | null;
};

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("projects")
    .select(
      "id, slug, title, summary, cover_image_url, tech_stack, featured, live_url",
    )
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: false })
    .order("created_at", { ascending: false });

  const projects: Project[] = (data ?? []).map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    cover_image_url: p.cover_image_url,
    tech_stack: p.tech_stack ?? [],
    featured: p.featured,
    live_url: p.live_url,
  }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[{ label: "Portfolio", href: "/" }, { label: "Projects" }]}
        title="Projects"
        description="A running list of things worth building."
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Projects will appear here once they're published."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={{
                id: project.id,
                slug: project.slug,
                title: project.title,
                summary: project.summary,
                cover_image_url: project.cover_image_url,
                tech_stack: project.tech_stack ?? [],
                featured: project.featured,
                live_url: project.live_url,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
