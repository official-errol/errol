"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin error]", error);
  }, [error]);

  return (
    <div className="bg-surface border border-border rounded-lg p-8 text-center">
      <h2 className="text-xl font-semibold text-text-primary mb-2">
        Admin page failed to load
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        {error.message || "Unknown error."}
      </p>
      {error.digest && (
        <p className="text-xs text-text-tertiary font-mono mb-6">
          ref: {error.digest}
        </p>
      )}
      <div className="flex gap-3 justify-center">
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-text-inverse rounded-md text-sm hover:bg-accent transition-colors"
        >
          Try again
        </button>
        <Link
          href="/admin"
          className="px-4 py-2 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle transition-colors"
        >
          Back to overview
        </Link>
      </div>
    </div>
  );
}
