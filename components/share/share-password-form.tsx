"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SharePasswordForm({
  token,
  title,
}: {
  token: string;
  title: string | null;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/share/${token}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Incorrect password");

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-lg p-6 space-y-4"
    >
      <div>
        <h1 className="text-xl font-semibold text-text-primary mb-1">
          Password required
        </h1>
        <p className="text-sm text-text-secondary">
          {title ?? "This share"} is protected. Enter the password to continue.
        </p>
      </div>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        required
        className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
      />

      {error && (
        <p className="text-sm text-error bg-error/10 px-3 py-2 rounded-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || !password}
        className="w-full px-4 py-2 bg-primary text-text-inverse rounded-md text-sm hover:bg-accent disabled:opacity-50"
      >
        {submitting ? "Verifying…" : "Continue"}
      </button>
    </form>
  );
}
