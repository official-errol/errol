"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { IconPicker } from "@/components/ui/icon-picker";
import { resolveIcon } from "@/components/ui/icon-resolver";
import { matchSkillIconSlug } from "@/components/ui/skill-icon-matcher";
import { ProficiencyPicker } from "@/components/ui/proficiency-picker";

type Category = {
  id: string;
  name: string;
};

export type SkillFormValues = {
  id?: string;
  name: string;
  category_id: string;
  proficiency: number;
  icon_slug: string | null;
  sort_order: number;
};

export function SkillForm({
  initial,
  categories,
}: {
  initial?: SkillFormValues;
  categories: Category[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = Boolean(initial?.id);

  const [name, setName] = useState(initial?.name ?? "");
  const [categoryId, setCategoryId] = useState(initial?.category_id ?? "");
  const [proficiency, setProficiency] = useState(initial?.proficiency ?? 3);
  const [iconSlug, setIconSlug] = useState<string | null>(
    initial?.icon_slug ?? null,
  );
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  // What the chip will actually look like after save
  const autoMatched = !iconSlug ? matchSkillIconSlug(name) : null;
  const effectiveSlug = iconSlug ?? autoMatched;
  const PreviewIcon = effectiveSlug ? resolveIcon(effectiveSlug) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name,
      category_id: categoryId || null,
      proficiency,
      icon_slug: iconSlug, // null = let API auto-match
      sort_order: sortOrder,
    };

    try {
      const endpoint = isEdit
        ? `/api/portfolio/skills/${initial!.id}`
        : "/api/portfolio/skills";
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
      if (!isEdit) router.push("/admin/portfolio/skills");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Field label="Skill name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. TypeScript"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        {name && (
          <div className="flex items-center gap-3 p-4 bg-surface-subtle rounded-md">
            <span className="text-xs text-text-tertiary">Preview:</span>
            <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-surface border border-border rounded-md text-text-primary font-mono">
              {PreviewIcon && (
                <PreviewIcon className="w-3.5 h-3.5 text-text-secondary" />
              )}
              {name}
            </span>
            <span className="text-xs text-text-tertiary ml-auto">
              {iconSlug
                ? "Custom icon"
                : autoMatched
                  ? "Auto-matched"
                  : "No icon"}
            </span>
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={() => setShowPicker((v) => !v)}
            className="text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            {showPicker ? "− Hide icon picker" : "+ Set a custom icon"}
          </button>

          {showPicker && (
            <div className="mt-3">
              <IconPicker value={iconSlug} onChange={setIconSlug} />
            </div>
          )}
        </div>
      </div>

      <aside className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <Field label="Category">
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary"
            >
              <option value="">— No category —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Proficiency">
            <ProficiencyPicker value={proficiency} onChange={setProficiency} />
          </Field>

          <Field label="Sort order" hint="Higher = first">
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
            />
          </Field>

          <Button type="submit" loading={saving} className="w-full">
            {isEdit ? "Save changes" : "Create skill"}
          </Button>
        </div>
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
