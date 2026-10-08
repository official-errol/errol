"use client";

import { useState, type ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { CopyIcon, XIcon } from "@/components/ui/icons";

type Props = {
  fileId: string;
  filename: string;
  trigger?: ReactNode;
};

export function QuickShareButton({ fileId, filename, trigger }: Props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [visibility, setVisibility] = useState<"public" | "authenticated">(
    "authenticated",
  );
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleCreate() {
    setCreating(true);

    try {
      const res = await fetch("/api/shares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileIds: [fileId],
          visibility,
          title: filename,
          password: password || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");

      setShareUrl(`${window.location.origin}/s/${data.share.token}`);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed", "error");
    } finally {
      setCreating(false);
    }
  }

  async function copy() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast("Link copied", "success");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {trigger ? (
        <span onClick={() => setOpen(true)} className="inline-flex">
          {trigger}
        </span>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="text-sm text-text-secondary hover:text-text-primary"
        >
          Share
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-lg w-full max-w-md">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text-primary">
                {shareUrl ? "Share ready" : `Share "${filename}"`}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-text-secondary hover:text-text-primary p-1"
              >
                <XIcon />
              </button>
            </div>

            <div className="p-4 space-y-3">
              {shareUrl ? (
                <>
                  <p className="text-xs text-text-secondary">
                    This link never expires.
                  </p>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={shareUrl}
                      className="flex-1 bg-surface border border-border rounded-sm px-3 py-2 text-xs font-mono"
                    />
                    <Button size="sm" onClick={copy}>
                      <CopyIcon />
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <div className="flex justify-center py-3 bg-surface-subtle rounded-md">
                    <QRCodeSVG value={shareUrl} size={140} />
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => setOpen(false)}
                  >
                    Done
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      Access
                    </label>
                    <select
                      value={visibility}
                      onChange={(e) =>
                        setVisibility(
                          e.target.value as "public" | "authenticated",
                        )
                      }
                      className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
                    >
                      <option value="authenticated">Signed-in users</option>
                      <option value="public">Anyone with the link</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
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

                  <Button
                    className="w-full"
                    onClick={handleCreate}
                    loading={creating}
                  >
                    Create link
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
