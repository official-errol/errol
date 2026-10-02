"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button, ButtonLink } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import { resolveIcon } from "@/components/ui/icon-resolver";

type Skill = {
  id: string;
  category_id: string | null;
  name: string;
  proficiency: number;
  icon_slug: string | null;
  sort_order: number;
};

type Category = {
  id: string;
  name: string;
  sort_order: number;
};

export function SkillsList({
  skills,
  categories,
}: {
  skills: Skill[];
  categories: Category[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<Skill | null>(null);
  const [deleting, setDeleting] = useState(false);

  const catMap = new Map(categories.map((c) => [c.id, c.name]));

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/portfolio/skills/${target.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      toast("Skill deleted", "success");
      setTarget(null);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  }

  if (skills.length === 0) {
    return (
      <EmptyState
        title="No skills yet"
        description="Add your first skill."
        action={
          <ButtonLink href="/admin/portfolio/skills/new" size="sm">
            New skill
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
              <th className="px-4 py-3 font-medium">Skill</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Proficiency</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => {
              const Icon = skill.icon_slug
                ? resolveIcon(skill.icon_slug)
                : null;
              return (
                <tr key={skill.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2 text-sm font-mono text-text-primary">
                      {Icon && <Icon className="w-4 h-4 text-text-secondary" />}
                      {skill.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {skill.category_id
                      ? (catMap.get(skill.category_id) ?? "—")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i <= skill.proficiency
                              ? "bg-accent"
                              : "bg-surface-subtle"
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <ButtonLink
                        href={`/admin/portfolio/skills/${skill.id}`}
                        variant="ghost"
                        size="xs"
                        className="!px-2"
                        title="Edit"
                      >
                        <PencilIcon />
                      </ButtonLink>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => setTarget(skill)}
                        className="!px-2 text-error hover:text-error hover:bg-error/10"
                        title="Delete"
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={Boolean(target)}
        title="Delete skill?"
        description={target ? `"${target.name}" will be removed.` : undefined}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setTarget(null)}
      />
    </>
  );
}
