"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  postId: string;
  parentId: string | null;
  onSuccess?: () => void;
  compact?: boolean;
};

export function CommentForm({ postId, parentId, onSuccess, compact }: Props) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, parentId, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Failed to post comment");
      }

      setContent("");
      router.refresh();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "" : "mb-8"}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment…"
        rows={compact ? 3 : 4}
        maxLength={2000}
        className="w-full bg-surface border border-border rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle resize-none"
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-text-tertiary">
          {content.length} / 2000
        </span>
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="px-4 py-1.5 bg-primary text-text-inverse rounded-md text-sm hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Posting…" : parentId ? "Reply" : "Post comment"}
        </button>
      </div>
      {error && <p className="text-sm text-error mt-2">{error}</p>}
    </form>
  );
}
