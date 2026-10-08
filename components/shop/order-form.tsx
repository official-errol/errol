"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

type Props = {
  productSlug: string;
  productName: string;
  price: number;
};

export function OrderForm({ productSlug, productName, price }: Props) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const next: Record<string, string> = {};

    if (!name.trim()) next.name = "Name is required";
    else if (name.trim().length > 100) next.name = "Name is too long";

    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter a valid email address";

    if (!reference.trim()) next.reference = "GCash reference is required";
    else if (reference.trim().length > 50)
      next.reference = "Reference is too long";

    if (notes.trim().length > 1000) next.notes = "Notes are too long";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    try {
      const res = await fetch("/api/shop/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug,
          customerName: name,
          customerEmail: email,
          paymentReference: reference,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit");

      setSubmitted(true);
      toast("Order submitted. Check your email for confirmation.", "success");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to submit", "error");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-surface border border-border rounded-lg p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8l3.5 3.5L13 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">
          Order received
        </h2>
        <p className="text-sm text-text-secondary mb-6">
          I&apos;ll review your payment and add you to Canva Pro within 24
          hours. You&apos;ll receive an invitation at <strong>{email}</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/shop"
            className="px-4 py-2 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle transition-colors"
          >
            Back to shop
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 bg-primary text-text-inverse rounded-md text-sm hover:bg-text-primary/85 transition-colors"
          >
            Contact me
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-lg p-6 space-y-5"
      noValidate
    >
      <div className="bg-surface-subtle border border-border rounded-md p-4 mb-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">{productName}</span>
          <span className="font-mono font-semibold text-text-primary">
            ₱{price}
          </span>
        </div>
      </div>

      <Field label="Your name" required error={errors.name}>
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

      <Field
        label="Email to add to Canva Pro"
        required
        error={errors.email}
        hint="Use the email you want Canva access on"
      >
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

      <Field
        label="GCash reference number"
        required
        error={errors.reference}
        hint="From your GCash receipt"
      >
        <input
          type="text"
          value={reference}
          onChange={(e) => {
            setReference(e.target.value);
            if (errors.reference) setErrors((p) => ({ ...p, reference: "" }));
          }}
          maxLength={50}
          placeholder="e.g. 0123456789012"
          className={`w-full bg-surface border rounded-sm px-3 py-2 text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-accent-subtle ${
            errors.reference
              ? "border-error focus:border-error"
              : "border-border focus:border-accent"
          }`}
        />
      </Field>

      <Field label="Notes" optional error={errors.notes}>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            if (errors.notes) setErrors((p) => ({ ...p, notes: "" }));
          }}
          rows={3}
          maxLength={1000}
          placeholder="Anything I should know?"
          className={`w-full bg-surface border rounded-sm px-3 py-2 text-sm text-text-primary resize-y focus:outline-none focus:ring-2 focus:ring-accent-subtle ${
            errors.notes
              ? "border-error focus:border-error"
              : "border-border focus:border-accent"
          }`}
        />
      </Field>

      <div className="flex justify-end pt-2">
        <Button type="submit" loading={sending}>
          Submit order
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
  hint,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
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
      {hint && <p className="text-xs text-text-tertiary mb-1.5">{hint}</p>}
      {children}
      {error && <p className="text-xs text-error mt-1.5">{error}</p>}
    </div>
  );
}
