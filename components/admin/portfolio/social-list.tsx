"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button, ButtonLink } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { PencilIcon, TrashIcon } from "@/components/ui/icons";
import { resolveIcon } from "@/components/ui/icon-resolver";

type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon_slug: string;
  sort_order: number;
};

export function SocialList({ items }: { items: SocialLink[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<SocialLink | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/portfolio/social/${target.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      toast("Link deleted", "success");
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
        title="No links yet"
        description="Add links to your GitHub, LinkedIn, or personal sites."
        action={
          <ButtonLink href="/admin/portfolio/social/new" size="sm">
            New link
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
              <th className="px-4 py-3 font-medium">Label</th>
              <th className="px-4 py-3 font-medium">URL</th>
              <th className="px-4 py-3 font-medium">Icon</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((link) => {
              const Icon = resolveIcon(link.icon_slug);
              return (
                <tr key={link.id} className="border-t border-border">
                  <td className="px-4 py-3 text-sm text-text-primary">
                    {link.label}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary truncate max-w-xs">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent"
                    >
                      {link.url}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="inline-flex items-center gap-2 text-text-secondary">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-mono">
                        {link.icon_slug}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <ButtonLink
                        href={`/admin/portfolio/social/${link.id}`}
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
                        onClick={() => setTarget(link)}
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
        title="Delete link?"
        description={target ? `"${target.label}" will be removed.` : undefined}
        confirmLabel="Delete"
        destructive
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setTarget(null)}
      />
    </>
  );
}
