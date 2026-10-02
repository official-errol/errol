"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { ImageUpload } from "../image-upload";

type Profile = {
  id?: string;
  name: string;
  headline: string | null;
  bio: string | null;
  avatar_url: string | null;
  location: string | null;
  email: string | null;
  resume_url: string | null;
  availability: "available" | "open" | "unavailable";
  availability_note: string | null;
} | null;

export function ProfileForm({ initial }: { initial: Profile }) {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState(initial?.name ?? "");
  const [headline, setHeadline] = useState(initial?.headline ?? "");
  const [bio, setBio] = useState(initial?.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initial?.avatar_url ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [resumeUrl, setResumeUrl] = useState(initial?.resume_url ?? "");
  const [availability, setAvailability] = useState<
    "available" | "open" | "unavailable"
  >(initial?.availability ?? "open");
  const [availabilityNote, setAvailabilityNote] = useState(
    initial?.availability_note ?? "",
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      id: initial?.id,
      name,
      headline,
      bio,
      avatar_url: avatarUrl,
      location,
      email,
      resume_url: resumeUrl,
      availability,
      availability_note: availabilityNote,
    };

    try {
      const res = await fetch("/api/portfolio/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");

      toast("Profile saved", "success");
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4">
        <Field label="Name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <Field label="Headline" hint="Short one-liner under your name">
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            maxLength={200}
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <Field label="Bio" hint="Markdown supported">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={6}
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Location">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
          </Field>
          <Field label="Public email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
          </Field>
        </div>

        <Field label="Availability status">
          <select
            value={availability}
            onChange={(e) =>
              setAvailability(
                e.target.value as "available" | "open" | "unavailable",
              )
            }
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm"
          >
            <option value="available">Available for work</option>
            <option value="open">Open to opportunities</option>
            <option value="unavailable">Not looking</option>
          </select>
        </Field>

        <Field label="Availability note" hint="Overrides default text if set">
          <input
            type="text"
            value={availabilityNote}
            onChange={(e) => setAvailabilityNote(e.target.value)}
            maxLength={100}
            placeholder="e.g. Available from June 2025"
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>
      </div>

      <aside className="space-y-4">
        <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
          <Button type="submit" loading={saving} className="w-full">
            Save profile
          </Button>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <ImageUpload
            value={avatarUrl}
            onChange={setAvatarUrl}
            prefix="portfolio"
            label="Avatar"
          />
        </div>

        <div className="bg-surface border border-border rounded-lg p-4">
          <Field
            label="Resume URL"
            hint="Upload a PDF to Files, then paste its URL"
          >
            <input
              type="url"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="https://…"
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
