"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button, ButtonLink } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  CopyIcon,
  ExternalIcon,
  XIcon,
  CalendarIcon,
} from "@/components/ui/icons";

type Share = {
  id: string;
  token: string;
  title: string | null;
  visibility: string;
  view_count: number;
  download_count: number;
  revoked: boolean;
  created_at: string;
  fileCount: number;
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function SharesList({ shares }: { shares: Share[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<Share | null>(null);
  const [revoking, setRevoking] = useState(false);

  async function handleRevoke() {
    if (!target) return;
    setRevoking(true);

    try {
      const res = await fetch(`/api/shares/${target.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Revoke failed");
      }

      toast("Share revoked", "success");
      setTarget(null);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Revoke failed", "error");
    } finally {
      setRevoking(false);
    }
  }

  async function copy(token: string) {
    const url = `${window.location.origin}/s/${token}`;
    await navigator.clipboard.writeText(url);
    toast("Link copied", "success");
  }

  if (shares.length === 0) {
    return (
      <EmptyState
        title="No shares yet"
        description="Create one from the Files page."
      />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-subtle">
            <tr className="text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-4 py-3 font-medium">Share</th>
              <th className="px-4 py-3 font-medium">Access</th>
              <th className="px-4 py-3 font-medium">Stats</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shares.map((share) => (
              <tr key={share.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/shares/${share.id}`}
                    className="text-sm text-text-primary hover:text-accent"
                  >
                    {share.title ?? "Untitled share"}
                  </Link>
                  <div className="text-xs text-text-tertiary mt-0.5">
                    {share.fileCount} file{share.fileCount === 1 ? "" : "s"}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-sm ${
                      share.visibility === "public"
                        ? "bg-success/10 text-success"
                        : "bg-accent-subtle text-accent"
                    }`}
                  >
                    {share.visibility}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-text-secondary">
                  {share.view_count} views · {share.download_count} downloads
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {formatDate(share.created_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => copy(share.token)}
                      className="!px-2"
                      title="Copy link"
                    >
                      <CopyIcon />
                    </Button>
                    <ButtonLink
                      href={`/s/${share.token}`}
                      variant="ghost"
                      size="xs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!px-2"
                      title="Open"
                    >
                      <ExternalIcon />
                    </ButtonLink>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setTarget(share)}
                      className="!px-2 text-error hover:text-error hover:bg-error/10"
                      title="Revoke"
                    >
                      <XIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {shares.map((share) => (
          <div
            key={share.id}
            className="bg-surface border border-border rounded-lg p-4"
          >
            <div className="mb-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <Link
                  href={`/admin/shares/${share.id}`}
                  className="text-sm font-semibold text-text-primary hover:text-accent"
                >
                  {share.title ?? "Untitled share"}
                </Link>
                <span
                  className={`text-xs px-2 py-0.5 rounded-sm shrink-0 ${
                    share.visibility === "public"
                      ? "bg-success/10 text-success"
                      : "bg-accent-subtle text-accent"
                  }`}
                >
                  {share.visibility}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-tertiary mt-1.5">
                <span>
                  {share.fileCount} file{share.fileCount === 1 ? "" : "s"}
                </span>
                <span>·</span>
                <span>{share.view_count} views</span>
                <span>·</span>
                <span>{share.download_count} downloads</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-text-tertiary mt-2">
                <CalendarIcon className="w-3.5 h-3.5" />
                {formatDate(share.created_at)}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-border">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => copy(share.token)}
              >
                <CopyIcon />
                Copy
              </Button>
              <ButtonLink
                href={`/s/${share.token}`}
                variant="ghost"
                size="xs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalIcon />
                Open
              </ButtonLink>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setTarget(share)}
                className="ml-auto text-error hover:text-error hover:bg-error/10"
              >
                <XIcon />
                Revoke
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(target)}
        title="Revoke share?"
        description={
          target
            ? `"${target.title ?? "This share"}" will stop working immediately. Anyone using the link will see an error.`
            : undefined
        }
        confirmLabel="Revoke"
        destructive
        loading={revoking}
        onConfirm={handleRevoke}
        onCancel={() => !revoking && setTarget(null)}
      />
    </>
  );
}
