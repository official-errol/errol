"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button, ButtonLink } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { PencilIcon, TrashIcon, CertificateIcon } from "@/components/ui/icons";

type Certification = {
  id: string;
  name: string;
  issuer: string | null;
  year: number | null;
  credential_id: string | null;
  credential_url: string | null;
  image_url: string | null;
  description: string | null;
  sort_order: number;
};

export function CertificationList({ items }: { items: Certification[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<Certification | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/portfolio/certifications/${target.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }
      toast("Certification deleted", "success");
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
        title="No certifications yet"
        description="Add your first certification."
        action={
          <ButtonLink href="/admin/portfolio/certifications/new" size="sm">
            New certification
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
              <th className="px-4 py-3 font-medium">Certification</th>
              <th className="px-4 py-3 font-medium">Issuer</th>
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((cert) => (
              <tr key={cert.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {cert.image_url ? (
                      <img
                        src={cert.image_url}
                        alt=""
                        className="w-8 h-8 rounded-sm border border-border object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-sm bg-surface-subtle flex items-center justify-center text-text-tertiary shrink-0">
                        <CertificateIcon className="w-4 h-4" />
                      </div>
                    )}
                    <div className="text-sm text-text-primary min-w-0 truncate">
                      {cert.name}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {cert.issuer ?? "—"}
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary font-mono">
                  {cert.year ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <ButtonLink
                      href={`/admin/portfolio/certifications/${cert.id}`}
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
                      onClick={() => setTarget(cert)}
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
        title="Delete certification?"
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
