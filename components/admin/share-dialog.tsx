"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { CopyIcon, XIcon, PlusIcon } from "@/components/ui/icons";
import { useToast } from "@/components/ui/toast";

type FileOption = {
  id: string;
  filename: string;
  size_bytes: number;
  visibility: string;
};

type Props = {
  files: FileOption[];
  onClose: () => void;
};

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

export function ShareDialog({ files, onClose }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [visibility, setVisibility] = useState<"public" | "authenticated">(
    "authenticated",
  );
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  async function handleCreate() {
    if (selected.size === 0) return;
    setCreating(true);

    try {
      const res = await fetch("/api/shares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileIds: Array.from(selected),
          visibility,
          title,
          password: password || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not create share");

      setShareUrl(`${window.location.origin}/s/${data.share.token}`);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed", "error");
    } finally {
      setCreating(false);
    }
  }

  async function copyLink() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast("Link copied", "success");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">
            {shareUrl ? "Share created" : "Create a share"}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary p-1"
          >
            <XIcon />
          </button>
        </div>

        {shareUrl ? (
          <div className="p-6 space-y-4">
            <p className="text-sm text-text-secondary">
              Anyone with this link can access the files. This link never
              expires.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono text-text-primary"
              />
              <Button onClick={copyLink}>
                <CopyIcon />
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            <div className="flex justify-center py-4 bg-surface-subtle rounded-md">
              <QRCodeSVG value={shareUrl} size={180} />
            </div>

            <Button variant="secondary" className="w-full" onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Title (optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Design assets"
                maxLength={100}
                className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Who can access
              </label>
              <select
                value={visibility}
                onChange={(e) =>
                  setVisibility(e.target.value as "public" | "authenticated")
                }
                className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
              >
                <option value="authenticated">Signed-in users</option>
                <option value="public">Anyone with the link</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Password (optional)
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank for none"
                className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Files ({selected.size} selected)
              </label>
              <div className="border border-border rounded-md max-h-64 overflow-auto">
                {files.length === 0 ? (
                  <p className="p-4 text-sm text-text-secondary">No files.</p>
                ) : (
                  files.map((file) => {
                    const disabled =
                      visibility === "public" && file.visibility === "private";
                    return (
                      <label
                        key={file.id}
                        className={`flex items-center gap-3 p-3 border-b border-border last:border-0 ${
                          disabled
                            ? "opacity-50"
                            : "cursor-pointer hover:bg-surface-subtle"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selected.has(file.id)}
                          onChange={() => toggle(file.id)}
                          disabled={disabled}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-mono text-text-primary truncate">
                            {file.filename}
                          </div>
                          <div className="text-xs text-text-tertiary">
                            {formatBytes(file.size_bytes)} · {file.visibility}
                          </div>
                        </div>
                      </label>
                    );
                  })
                )}
              </div>
            </div>

            <Button
              onClick={handleCreate}
              loading={creating}
              disabled={selected.size === 0}
              className="w-full"
            >
              <PlusIcon />
              Create share link
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
