"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ImageUpload } from "../image-upload";
import {
  TrophyIcon,
  UserIcon,
  CalendarIcon,
  LinkIcon,
  FileTextIcon,
} from "@/components/ui/icons";

export type AwardFormValues = {
  id?: string;
  title: string;
  issuer: string;
  year: number | null;
  description: string;
  url: string;
  image_url: string;
  sort_order: number;
};

export function AwardForm({ initial }: { initial?: AwardFormValues }) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [issuer, setIssuer] = useState(initial?.issuer ?? "");
  const [year, setYear] = useState(
    initial?.year ? initial.year.toString() : "",
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      issuer,
      year: year ? parseInt(year, 10) : null,
      description,
      url,
      image_url: imageUrl,
      sort_order: sortOrder,
    };

    try {
      const endpoint = isEdit
        ? `/api/portfolio/awards/${initial!.id}`
        : "/api/portfolio/awards";
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
      if (!isEdit) router.push("/admin/portfolio/awards");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Field label="Award title" icon={TrophyIcon}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Best Programmer Award"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <Field label="Issuer" icon={UserIcon}>
          <input
            type="text"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            placeholder="e.g. University of the Philippines"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <Field label="Description" icon={FileTextIcon}>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="What the award was for"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>
      </div>

      <aside className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <Field label="Year" icon={CalendarIcon}>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min={1900}
              max={2100}
              placeholder="2024"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
            />
          </Field>

          <Button type="submit" loading={saving} className="w-full">
            {isEdit ? "Save changes" : "Create award"}
          </Button>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            prefix="awards"
            label="Award image"
          />
        </div>

        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <Field label="Link" icon={LinkIcon}>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://…"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
            />
          </Field>

          <Field label="Sort order" hint="Higher = first">
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
            />
          </Field>
        </div>
      </aside>
    </form>
  );
}

function Field({
  label,
  hint,
  icon: Icon,
  children,
}: {
  label: string;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="flex items-center gap-1.5 text-sm font-medium text-text-primary">
          {Icon && <Icon className="w-3.5 h-3.5 text-text-secondary" />}
          {label}
        </label>
        {hint && <span className="text-xs text-text-tertiary">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
