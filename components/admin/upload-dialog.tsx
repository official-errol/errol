"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

  function reset() {
    setFile(null);
    setVisibility("private");
    setDescription("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setFile(files[0]);
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("visibility", visibility);
    formData.append("description", description);

    try {
      const res = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");

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
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragging
                ? "border-accent bg-accent-subtle"
                : "border-border hover:border-border-strong"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
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

          <div>
            <label className="block text-xs font-medium text-text-primary mb-1.5">
              Visibility
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as Visibility)}
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
