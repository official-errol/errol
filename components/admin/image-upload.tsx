"use client";

import { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
  prefix?: string;
  label?: string;
};

export function ImageUpload({
  value,
  onChange,
  prefix = "uploads",
  label = "Image",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("prefix", prefix);

      const res = await fetch("/api/storage/upload-public", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Upload failed");
      }

      onChange(data.url as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleFile(files: FileList | null) {
    if (!files || files.length === 0) return;
    upload(files[0]);
  }

  function handleRemove() {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        {value && !uploading && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-error hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files)}
      />

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt=""
            className="w-full rounded-md border border-border object-cover"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-2 right-2 px-3 py-1.5 bg-primary text-text-inverse rounded-md text-xs hover:bg-accent transition-colors disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Replace"}
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
            dragging
              ? "border-accent bg-accent-subtle"
              : "border-border hover:border-border-strong"
          }`}
        >
          <p className="text-sm text-text-primary">
            {uploading ? "Uploading…" : "Drop an image or click to browse"}
          </p>
          <p className="text-xs text-text-tertiary mt-1">
            JPEG, PNG, WebP, GIF, AVIF · max 5 MB
          </p>
        </div>
      )}

      {error && <p className="text-xs text-error mt-2">{error}</p>}
    </div>
  );
}
