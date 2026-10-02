"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ImageUpload } from "./image-upload";

export type ProjectFormValues = {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image_url: string;
  live_url: string;
  repo_url: string;
  tech_stack: string[];
  featured: boolean;
  status: "draft" | "published" | "archived";
  sort_order: number;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function ProjectForm({ initial }: { initial?: ProjectFormValues }) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverUrl, setCoverUrl] = useState(initial?.cover_image_url ?? "");
  const [liveUrl, setLiveUrl] = useState(initial?.live_url ?? "");
  const [repoUrl, setRepoUrl] = useState(initial?.repo_url ?? "");
  const [techInput, setTechInput] = useState(
    initial?.tech_stack.join(", ") ?? "",
  );
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    initial?.status ?? "draft",
  );
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [saving, setSaving] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const tech_stack = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug,
      summary,
      content,
      cover_image_url: coverUrl,
      live_url: liveUrl,
      repo_url: repoUrl,
      tech_stack,
      featured,
      status,
      sort_order: sortOrder,
    };

    try {
      const url = isEdit ? `/api/projects/${initial!.id}` : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      toast(isEdit ? "Project saved" : "Project created", "success");
      router.refresh();

      if (!isEdit) {
        router.push(`/admin/projects/${data.project.id}`);
      }
    } catch (err) {
      toast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Field label="Title">
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <Field label="Slug" hint={`/projects/${slug || "your-slug"}`}>
          <input
            type="text"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            required
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <Field label="Summary" hint="Shown on the grid">
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={2}
            maxLength={300}
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary resize-none focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <Field label="Content" hint="Markdown supported">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={18}
            required
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono text-text-primary resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>
      </div>

      <aside className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <Field label="Status">
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "draft" | "published" | "archived")
              }
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </Field>

          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Featured
          </label>

          <Field label="Sort order" hint="Higher = first">
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary"
            />
          </Field>

          <Button type="submit" loading={saving} className="w-full">
            {isEdit ? "Save changes" : "Create project"}
          </Button>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <ImageUpload
            value={coverUrl}
            onChange={setCoverUrl}
            prefix="projects"
            label="Cover image"
          />

          <Field label="Live URL" hint="Optional">
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://…"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
          </Field>

          <Field label="Repo URL" hint="Optional">
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/…"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
          </Field>

          <Field label="Tech stack" hint="Comma-separated">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Next.js, Supabase, Tailwind"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
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
