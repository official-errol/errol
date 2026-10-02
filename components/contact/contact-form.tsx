"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export function ContactForm() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");

      toast("Message sent. Thanks!", "success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to send", "error");
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-lg p-6 space-y-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={100}
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </Field>
      </div>

      <Field label="Subject">
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={150}
          className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        />
      </Field>

      <Field label="Message">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          minLength={10}
          maxLength={5000}
          className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        />
      </Field>

      <div className="flex justify-end">
        <Button type="submit" loading={sending}>
          Send message
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
