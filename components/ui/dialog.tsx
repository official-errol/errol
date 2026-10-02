"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg";
};

const WIDTH = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export function Dialog({
  open,
  onClose,
  title,
  children,
  maxWidth = "md",
}: Props) {
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`bg-surface border border-border rounded-lg w-full ${WIDTH[maxWidth]} max-h-[90vh] overflow-auto shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-border flex items-center justify-between sticky top-0 bg-surface z-10">
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
