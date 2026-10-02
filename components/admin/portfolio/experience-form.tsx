"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  LinkIcon,
  UserIcon,
} from "@/components/ui/icons";

export type ExperienceFormValues = {
  id?: string;
  company: string;
  role: string;
  location: string;
  start_date: string;
  end_date: string;
  current: boolean;
  description: string;
  url: string;
  sort_order: number;
};

export function ExperienceForm({
  initial,
}: {
  initial?: ExperienceFormValues;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = Boolean(initial?.id);

  const [company, setCompany] = useState(initial?.company ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [startYear, setStartYear] = useState(
    initial?.start_date
      ? new Date(initial.start_date).getFullYear().toString()
      : "",
  );
  const [endYear, setEndYear] = useState(
    initial?.end_date
      ? new Date(initial.end_date).getFullYear().toString()
      : "",
  );
  const [current, setCurrent] = useState(initial?.current ?? false);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      company,
      role,
      location,
      start_date: startYear ? `${startYear}-01-01` : null,
      end_date: current || !endYear ? null : `${endYear}-12-31`,
      current,
      description,
      url,
      sort_order: sortOrder,
    };

    try {
      const endpoint = isEdit
        ? `/api/portfolio/experience/${initial!.id}`
        : "/api/portfolio/experience";
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
      if (!isEdit) router.push("/admin/portfolio/experience");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Field label="Role" icon={BriefcaseIcon}>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            placeholder="e.g. Junior Web Developer"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <Field label="Company" icon={UserIcon}>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            placeholder="e.g. Acme Corp"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <Field label="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="What you did, what you shipped, what you learned"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>
      </div>

      <aside className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <Field label="Start year" icon={CalendarIcon}>
            <input
              type="number"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              min={1950}
              max={2100}
              required
              placeholder="2020"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
            />
          </Field>

          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={current}
              onChange={(e) => setCurrent(e.target.checked)}
            />
            Current role
          </label>

          {!current && (
            <Field label="End year" icon={CalendarIcon}>
              <input
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                min={1950}
                max={2100}
                placeholder="2023"
                className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
              />
            </Field>
          )}

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
              placeholder="e.g. Manila, Philippines"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
            />
          </Field>

          <Field label="Company URL" icon={LinkIcon}>
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
