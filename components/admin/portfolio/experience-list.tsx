"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button, ButtonLink } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  PencilIcon,
  TrashIcon,
  BriefcaseIcon,
  CalendarIcon,
} from "@/components/ui/icons";

type Experience = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string | null;
  url: string | null;
  sort_order: number;
};

function formatPeriod(exp: Experience): string {
  if (!exp.start_date) return "—";

  const startYear = new Date(exp.start_date).getFullYear();

  if (exp.current) return `${startYear} — Present`;
  if (exp.end_date)
    return `${startYear} — ${new Date(exp.end_date).getFullYear()}`;
  return `${startYear}`;
}

export function ExperienceList({ items }: { items: Experience[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<Experience | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/portfolio/experience/${target.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      toast("Entry deleted", "success");
      setTarget(null);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="No experience yet"
        description="Add your first work entry."
        action={
          <ButtonLink href="/admin/portfolio/experience/new" size="sm">
            New entry
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
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Period</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((exp) => (
              <tr key={exp.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm text-text-primary">
                        {exp.role}
                      </div>
                      {exp.location && (
                        <div className="text-xs text-text-tertiary">
                          {exp.location}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {exp.company}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-sm text-text-secondary font-mono">
                    <CalendarIcon className="w-3.5 h-3.5 text-text-tertiary" />
                    {formatPeriod(exp)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <ButtonLink
                      href={`/admin/portfolio/experience/${exp.id}`}
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
                      onClick={() => setTarget(exp)}
                      className="!px-2 text-error hover:text-error hover:bg-error/10"
                      title="Delete"
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
        title="Delete entry?"
        description={
          target
            ? `"${target.role}" at ${target.company} will be removed.`
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
