"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { SchoolIcon, MapPinIcon, CalendarIcon } from "@/components/ui/icons";

export type EducationFormValues = {
  id?: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  year_graduated: number | null;
  description: string;
  url: string;
  sort_order: number;
};

export function EducationForm({ initial }: { initial?: EducationFormValues }) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = Boolean(initial?.id);

  const [school, setSchool] = useState(initial?.school ?? "");
  const [degree, setDegree] = useState(initial?.degree ?? "");
  const [field, setField] = useState(initial?.field ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [yearGraduated, setYearGraduated] = useState<string>(
    initial?.year_graduated?.toString() ?? "",
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      school,
      degree,
      field,
      location,
      year_graduated: yearGraduated ? parseInt(yearGraduated, 10) : null,
      description,
      url,
      sort_order: sortOrder,
    };

    try {
      const endpoint = isEdit
        ? `/api/portfolio/education/${initial!.id}`
        : "/api/portfolio/education";
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
      if (!isEdit) router.push("/admin/portfolio/education");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Field label="School" icon={SchoolIcon}>
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
            placeholder="e.g. University of the Philippines"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Degree">
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="e.g. Bachelor of Science"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
          </Field>
          <Field label="Field of study">
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="e.g. Computer Science"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Honors, activities, or notable work"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>
      </div>

      <aside className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <Field label="Year graduated" icon={CalendarIcon}>
            <input
              type="number"
              value={yearGraduated}
              onChange={(e) => setYearGraduated(e.target.value)}
              min={1900}
              max={2100}
              placeholder="2024"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
            />
          </Field>

          <Button type="submit" loading={saving} className="w-full">
            {isEdit ? "Save changes" : "Create entry"}
          </Button>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <Field label="Location" icon={MapPinIcon}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
            />
          </Field>

          <Field label="School URL">
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
