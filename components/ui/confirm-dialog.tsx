"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !loading) onCancel();
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] bg-black/40 flex items-center justify-center p-4"
      onClick={() => !loading && onCancel()}
    >
      <div
        className="bg-surface border border-border rounded-lg w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-text-secondary">{description}</p>
          )}
        </div>

        <div className="px-6 py-4 border-t border-border flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-sm transition-colors disabled:opacity-50 ${
              destructive
                ? "bg-error text-text-inverse hover:bg-error/90"
                : "bg-primary text-text-inverse hover:bg-accent"
            }`}
          >
            {loading ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
