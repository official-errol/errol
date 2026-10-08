"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type Banner = {
  id: string;
  enabled: boolean;
  message: string;
  link_text: string | null;
  link_url: string | null;
  variant: string;
  dismissible: boolean;
  updated_at: string;
} | null;

const VARIANTS = [
  { value: "default", label: "Default (dark)" },
  { value: "gradient", label: "Gradient (colorful)" },
  { value: "success", label: "Success (green)" },
  { value: "warning", label: "Warning (yellow)" },
];

export function BannerForm({ initial }: { initial: Banner }) {
  const router = useRouter();
  const { toast } = useToast();

  const [enabled, setEnabled] = useState(initial?.enabled ?? false);
  const [message, setMessage] = useState(initial?.message ?? "");
  const [linkText, setLinkText] = useState(initial?.link_text ?? "");
  const [linkUrl, setLinkUrl] = useState(initial?.link_url ?? "");
  const [variant, setVariant] = useState(initial?.variant ?? "default");
  const [dismissible, setDismissible] = useState(initial?.dismissible ?? true);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      id: initial?.id,
      enabled,
      message,
      link_text: linkText,
      link_url: linkUrl,
      variant,
      dismissible,
    };

    try {
      const res = await fetch("/api/site-banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      toast("Banner saved", "success");
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 lg:grid-cols-[1fr_320px] max-w-4xl"
    >
      <div className="space-y-4">
        <Field label="Message" hint="Max 200 characters">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={200}
            placeholder="e.g. Canva Pro now available — ₱69"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Link text" hint="Optional">
            <input
              type="text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              maxLength={40}
              placeholder="Learn more"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
          </Field>

          <Field label="Link URL" hint="Optional">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              maxLength={200}
              placeholder="/shop/canva-pro"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
          </Field>
        </div>

        <Field label="Style">
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary"
          >
            {VARIANTS.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <aside className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            Show banner
          </label>

          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={dismissible}
              onChange={(e) => setDismissible(e.target.checked)}
            />
            Allow visitors to dismiss
          </label>

          <Button type="submit" loading={saving} className="w-full">
            Save banner
          </Button>
        </div>

        <p className="text-xs text-text-tertiary">
          Editing the message resets the dismissal for all visitors — the banner
          will reappear for everyone.
        </p>
      </aside>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-sm font-medium text-text-primary">{label}</label>
        {hint && <span className="text-xs text-text-tertiary">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
