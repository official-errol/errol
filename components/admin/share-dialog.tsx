"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

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
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [visibility, setVisibility] = useState<"public" | "authenticated">(
    "authenticated",
  );
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState(24);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setError(null);

    try {
      const res = await fetch("/api/shares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileIds: Array.from(selected),
          visibility,
          title,
          expiresInHours: hours,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not create share");

      const url = `${window.location.origin}/s/${data.share.token}`;
      setShareUrl(url);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setCreating(false);
    }
  }

  async function copyLink() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
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
            className="text-text-secondary hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        {shareUrl ? (
          <div className="p-6 space-y-4">
            <p className="text-sm text-text-secondary">
              Anyone with this link can access the files.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono text-text-primary"
              />
              <button
                onClick={copyLink}
                className="px-4 py-2 bg-primary text-text-inverse rounded-md text-sm hover:bg-accent"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="flex justify-center py-4 bg-surface-subtle rounded-md">
              <QRCodeSVG value={shareUrl} size={180} />
            </div>

            <button
              onClick={onClose}
              className="w-full px-4 py-2 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle"
            >
              Done
            </button>
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
                Expires in (hours)
              </label>
              <input
                type="number"
                min={1}
                max={720}
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 24)}
                className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
              />
              <p className="text-xs text-text-tertiary mt-1">
                Between 1 hour and 30 days.
              </p>
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

            {error && (
              <p className="text-sm text-error bg-error/10 px-3 py-2 rounded-sm">
                {error}
              </p>
            )}

            <button
              onClick={handleCreate}
              disabled={creating || selected.size === 0}
              className="w-full px-4 py-2 bg-primary text-text-inverse rounded-md text-sm hover:bg-accent disabled:opacity-50"
            >
              {creating ? "Creating…" : "Create share link"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
