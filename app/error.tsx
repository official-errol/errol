"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-sm text-text-secondary font-mono mb-4">500</p>
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Something broke.
        </h1>
        <p className="text-text-secondary mb-8">
          An unexpected error occurred. Try again, or head back home.
        </p>
        {error.digest && (
          <p className="text-xs text-text-tertiary font-mono mb-6">
            ref: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-primary text-text-inverse rounded-md text-sm hover:bg-accent transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-5 py-2.5 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
