import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createClient } from "@/lib/supabase/server";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { ButtonLink } from "@/components/ui/button";
import { ExternalIcon, GithubIcon, CalendarIcon } from "@/components/ui/icons";
import { resolveTechIcon } from "@/components/ui/tech-icon-matcher";

type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content: string;
  cover_image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  tech_stack: string[];
  featured: boolean;
  created_at: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, summary")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary ?? undefined,
    alternates: {
      canonical: `https://sidequeststudio.vercel.app/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("projects")
    .select(
      "id, slug, title, summary, content, cover_image_url, live_url, repo_url, tech_stack, featured, created_at",
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!data) notFound();

  const project: Project = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    content: data.content,
    cover_image_url: data.cover_image_url,
    live_url: data.live_url,
    repo_url: data.repo_url,
    tech_stack: data.tech_stack ?? [],
    featured: data.featured,
    created_at: data.created_at,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    dateCreated: project.created_at,
    image: project.cover_image_url ?? undefined,
    url: `https://sidequeststudio.vercel.app/projects/${project.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-6 py-16">
        <PublicPageHeader
          breadcrumbs={[
            { label: "Portfolio", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
          title={project.title}
          description={project.summary ?? undefined}
        />

        {project.cover_image_url && (
          <img
            src={project.cover_image_url}
            alt=""
            className="w-full rounded-lg border border-border mb-10"
          />
        )}

        {(project.live_url ||
          project.repo_url ||
          project.tech_stack.length > 0) && (
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {project.live_url && (
              <ButtonLink
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalIcon />
                View live
              </ButtonLink>
            )}
            {project.repo_url && (
              <ButtonLink
                href={project.repo_url}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                Source
              </ButtonLink>
            )}
          </div>
        )}

        {project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech_stack.map((tech) => {
              const Icon = resolveTechIcon(tech);
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-surface-subtle text-text-secondary rounded-md font-mono"
                >
                  {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
                  {tech}
                </span>
              );
            })}
          </div>
        )}

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {project.content}
          </ReactMarkdown>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex items-center gap-1.5 text-xs text-text-tertiary">
          <CalendarIcon className="w-3.5 h-3.5" />
          Built{" "}
          {new Date(project.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </div>
      </article>
    </>
  );
}
