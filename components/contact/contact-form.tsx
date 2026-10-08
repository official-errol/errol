"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type Props = {
  defaultName?: string;
  defaultEmail?: string;
};

export function ContactForm({ defaultName = "", defaultEmail = "" }: Props) {
  const { toast } = useToast();
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const next: Record<string, string> = {};

    if (!name.trim()) {
      next.name = "Name is required";
    } else if (name.trim().length > 100) {
      next.name = "Name is too long";
    }

    if (!email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email address";
    }

    if (!message.trim()) {
      next.message = "Message is required";
    } else if (message.trim().length < 10) {
      next.message = "Message must be at least 10 characters";
    } else if (message.trim().length > 5000) {
      next.message = "Message is too long";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

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
      setName(defaultName);
      setEmail(defaultEmail);
      setSubject("");
      setMessage("");
      setErrors({});
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
      noValidate
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" required error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((p) => ({ ...p, name: "" }));
            }}
            maxLength={100}
            className={`w-full bg-surface border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-subtle ${
              errors.name
                ? "border-error focus:border-error"
                : "border-border focus:border-accent"
            }`}
          />
        </Field>

        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: "" }));
            }}
            className={`w-full bg-surface border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-subtle ${
              errors.email
                ? "border-error focus:border-error"
                : "border-border focus:border-accent"
            }`}
          />
        </Field>
      </div>

      <Field label="Subject" optional>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={150}
          className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        />
      </Field>

      <Field label="Message" required error={errors.message}>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((p) => ({ ...p, message: "" }));
          }}
          rows={6}
          minLength={10}
          maxLength={5000}
          className={`w-full bg-surface border rounded-sm px-3 py-2 text-sm text-text-primary resize-y focus:outline-none focus:ring-2 focus:ring-accent-subtle ${
            errors.message
              ? "border-error focus:border-error"
              : "border-border focus:border-accent"
          }`}
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
  required,
  optional,
  error,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1 text-sm font-medium text-text-primary mb-1.5">
        {label}
        {required && (
          <span className="text-error" aria-hidden="true">
            *
          </span>
        )}
        {optional && (
          <span className="text-xs text-text-tertiary font-normal">
            (optional)
          </span>
        )}
      </label>
      {children}
      {error && <p className="text-xs text-error mt-1.5">{error}</p>}
    </div>
  );
}
