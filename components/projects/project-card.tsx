import Link from "next/link";
import { resolveTechIcon } from "@/components/ui/tech-icon-matcher";

type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  cover_image_url: string | null;
  tech_stack: string[];
  featured: boolean;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-border-strong transition-colors flex flex-col"
    >
      {project.cover_image_url ? (
        <img
          src={project.cover_image_url}
          alt=""
          className="w-full aspect-video object-cover border-b border-border"
        />
      ) : (
        <div className="w-full aspect-video bg-surface-subtle border-b border-border flex items-center justify-center">
          <span className="text-xs text-text-tertiary font-mono">
            no preview
          </span>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-xs px-1.5 py-0.5 bg-accent-subtle text-accent rounded-sm shrink-0">
              Featured
            </span>
          )}
        </div>

        {project.summary && (
          <p className="text-sm text-text-secondary line-clamp-2 mb-4">
            {project.summary}
          </p>
        )}

        {project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tech_stack.slice(0, 5).map((tech) => {
              const Icon = resolveTechIcon(tech);
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-surface-subtle text-text-secondary rounded-sm font-mono"
                >
                  {Icon && <Icon className="w-3 h-3 shrink-0" />}
                  {tech}
                </span>
              );
            })}
            {project.tech_stack.length > 5 && (
              <span className="text-xs px-2 py-0.5 text-text-tertiary font-mono">
                +{project.tech_stack.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
