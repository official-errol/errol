"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { UploadIcon } from "@/components/ui/icons";

type Visibility = "public" | "authenticated" | "private";

export function UploadDialog({ trigger }: { trigger: React.ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [visibility, setVisibility] = useState<Visibility>("private");
  const [description, setDescription] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function reset() {
    setFile(null);
    setVisibility("private");
    setDescription("");
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setFile(files[0]);
    setProgress(0);
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    try {
      // Step 1 — ask server for a signed upload URL
      const signRes = await fetch("/api/storage/sign-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          size: file.size,
          mimeType: file.type || "application/octet-stream",
          visibility,
        }),
      });

      const signData = await signRes.json();
      if (!signRes.ok) {
        throw new Error(signData.error ?? "Could not prepare upload");
      }

      const { signedUrl, path, bucket, key } = signData as {
        signedUrl: string;
        path: string;
        bucket: string;
        key: string;
      };

      // Step 2 — upload directly to Supabase via XHR (for progress events)
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", signedUrl);
        xhr.setRequestHeader(
          "Content-Type",
          file.type || "application/octet-stream",
        );

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) resolve();
          else reject(new Error(`Upload failed with status ${xhr.status}`));
        };
        xhr.onerror = () => reject(new Error("Upload failed"));

        xhr.send(file);
      });

      // Step 3 — confirm to our server so it inserts the DB row
      const confirmRes = await fetch("/api/storage/confirm-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: path || key,
          filename: file.name,
          mimeType: file.type || "application/octet-stream",
          size: file.size,
          visibility,
          description,
        }),
      });

      const confirmData = await confirmRes.json();
      if (!confirmRes.ok) {
        throw new Error(confirmData.error ?? "Could not save file record");
      }

      toast(`Uploaded "${file.name}"`, "success");
      reset();
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Upload failed", "error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <span onClick={() => setOpen(true)} className="inline-flex">
        {trigger}
      </span>

      <Dialog
        open={open}
        onClose={() => {
          if (!uploading) {
            reset();
            setOpen(false);
          }
        }}
        title="Upload file"
      >
        <div className="space-y-4">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => !uploading && inputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragging
                ? "border-accent bg-accent-subtle"
                : "border-border hover:border-border-strong"
            } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              disabled={uploading}
              onChange={(e) => handleFiles(e.target.files)}
            />
            {file ? (
              <div className="space-y-1">
                <p className="text-sm font-mono text-text-primary">
                  {file.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <UploadIcon className="w-6 h-6 mx-auto text-text-tertiary" />
                <p className="text-sm text-text-primary">
                  Drop a file here, or click to browse
                </p>
                <p className="text-xs text-text-tertiary">Max 50 MB</p>
              </div>
            )}
          </div>

          {uploading && progress > 0 && (
            <div className="space-y-1.5">
              <div className="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-text-tertiary text-right">
                {progress}%
              </p>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Visibility
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as Visibility)}
              disabled={uploading}
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary"
            >
              <option value="public">Public — anyone can download</option>
              <option value="authenticated">
                Authenticated — logged-in users
              </option>
              <option value="private">Private — only you</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Description (optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              disabled={uploading}
              placeholder="Short description"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                reset();
                setOpen(false);
              }}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpload} loading={uploading} disabled={!file}>
              <UploadIcon />
              Upload
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
