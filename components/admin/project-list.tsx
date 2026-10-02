"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button, ButtonLink } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { EyeIcon, PencilIcon, TrashIcon } from "@/components/ui/icons";

type Project = {
  id: string;
  slug: string;
  title: string;
  status: string;
  featured: boolean;
  tech_stack: string[];
  created_at: string;
  updated_at: string;
};

const STATUS_STYLE: Record<string, string> = {
  published: "bg-success/10 text-success",
  draft: "bg-surface-subtle text-text-secondary",
  archived: "bg-warning/10 text-warning",
};

export function ProjectList({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/projects/${target.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      toast(`Deleted "${target.title}"`, "success");
      setTarget(null);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects yet"
        description="Add your first project to showcase your work."
        action={
          <ButtonLink href="/admin/projects/new" size="sm">
            New project
          </ButtonLink>
        }
      />
    );
  }

  return (
    <>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-subtle">
            <tr className="text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-primary">
                      {project.title}
                    </span>
                    {project.featured && (
                      <span className="text-xs px-1.5 py-0.5 bg-accent-subtle text-accent rounded-sm">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-text-tertiary font-mono">
                    /{project.slug}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-sm ${
                      STATUS_STYLE[project.status] ?? STATUS_STYLE.draft
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {new Date(project.updated_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    {project.status === "published" && (
                      <ButtonLink
                        href={`/projects/${project.slug}`}
                        variant="ghost"
                        size="xs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!px-2"
                      >
                        <EyeIcon />
                      </ButtonLink>
                    )}
                    <ButtonLink
                      href={`/admin/projects/${project.id}`}
                      variant="ghost"
                      size="xs"
                      className="!px-2"
                    >
                      <PencilIcon />
                    </ButtonLink>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setTarget(project)}
                      className="!px-2 text-error hover:text-error hover:bg-error/10"
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(target)}
        title="Delete project?"
        description={
          target
            ? `"${target.title}" will be permanently removed. This cannot be undone.`
            : undefined
        }
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setTarget(null)}
      />
    </>
  );
}
