"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { FilePreview } from "@/components/files/file-preview";
import { QuickShareButton } from "./quick-share-button";
import { ShareIcon, TrashIcon } from "@/components/ui/icons";

type FileRecord = {
  id: string;
  filename: string;
  storage_key: string;
  size_bytes: number;
  mime_type: string;
  visibility: string;
  description: string | null;
  created_at: string;
  bucket: string;
  previewUrl: string | null;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

const VISIBILITY_STYLE: Record<string, string> = {
  public: "bg-success/10 text-success",
  authenticated: "bg-accent-subtle text-accent",
  private: "bg-surface-subtle text-text-secondary",
};

export function FileList({ files }: { files: FileRecord[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [target, setTarget] = useState<FileRecord | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!target) return;
    setDeleting(true);

    try {
      const res = await fetch("/api/storage/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: target.id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Delete failed");
      }

      toast(`Deleted "${target.filename}"`, "success");
      setTarget(null);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  }

  if (files.length === 0) {
    return (
      <EmptyState
        title="No files yet"
        description="Upload one above to get started."
      />
    );
  }

  return (
    <>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-subtle">
            <tr className="text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="px-4 py-3 font-medium">File</th>
              <th className="px-4 py-3 font-medium">Size</th>
              <th className="px-4 py-3 font-medium">Visibility</th>
              <th className="px-4 py-3 font-medium">Uploaded</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <FilePreview
                      mimeType={file.mime_type}
                      previewUrl={file.previewUrl}
                      filename={file.filename}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <div className="text-sm text-text-primary truncate">
                        {file.filename}
                      </div>
                      {file.description && (
                        <div className="text-xs text-text-tertiary mt-0.5 truncate">
                          {file.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {formatBytes(file.size_bytes)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-sm ${
                      VISIBILITY_STYLE[file.visibility] ??
                      VISIBILITY_STYLE.private
                    }`}
                  >
                    {file.visibility}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-text-secondary">
                  {new Date(file.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <QuickShareButton
                      fileId={file.id}
                      filename={file.filename}
                      trigger={
                        <Button variant="ghost" size="xs" className="!px-2">
                          <ShareIcon />
                        </Button>
                      }
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => setTarget(file)}
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
        title="Delete file?"
        description={
          target
            ? `"${target.filename}" will be permanently removed from storage and the database. This cannot be undone.`
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
