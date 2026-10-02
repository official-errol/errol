"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { IconPicker } from "@/components/ui/icon-picker";
import { resolveIcon } from "@/components/ui/icon-resolver";

export type SocialFormValues = {
  id?: string;
  label: string;
  url: string;
  icon_slug: string;
  sort_order: number;
};

export function SocialForm({ initial }: { initial?: SocialFormValues }) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = Boolean(initial?.id);

  const [label, setLabel] = useState(initial?.label ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [iconSlug, setIconSlug] = useState<string | null>(
    initial?.icon_slug ?? "link",
  );
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);

  const PreviewIcon = resolveIcon(iconSlug ?? "link");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      label,
      url,
      icon_slug: iconSlug ?? "link",
      sort_order: sortOrder,
    };

    try {
      const endpoint = isEdit
        ? `/api/portfolio/social/${initial!.id}`
        : "/api/portfolio/social";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      toast(isEdit ? "Saved" : "Created", "success");
      router.refresh();
      if (!isEdit) router.push("/admin/portfolio/social");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <Field label="Label">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
          placeholder="e.g. GitHub"
          className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        />
      </Field>

      <Field label="URL">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="https://…"
          className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        />
      </Field>

      <Field label="Icon">
        <IconPicker value={iconSlug} onChange={setIconSlug} />
      </Field>

      {(label || iconSlug) && (
        <div className="flex items-center gap-3 p-4 bg-surface-subtle rounded-md">
          <span className="text-xs text-text-tertiary">Preview:</span>
          <div className="inline-flex items-center gap-2 text-text-primary">
            <PreviewIcon className="w-4 h-4" />
            <span className="text-sm">{label || "Label"}</span>
          </div>
        </div>
      )}

      <Field label="Sort order" hint="Higher = first">
        <input
          type="number"
          value={sortOrder}
          onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
          className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
        />
      </Field>

      <div className="flex justify-end pt-2">
        <Button type="submit" loading={saving}>
          {isEdit ? "Save changes" : "Create link"}
        </Button>
      </div>
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
