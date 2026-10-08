import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageHeader } from "@/components/ui/public-page-header";

export const metadata: Metadata = {
  title: "Canva Pro Access",
  description:
    "Full Canva Pro features for ₱69. GCash only, manual activation.",
  alternates: {
    canonical: "https://errolsolomon.vercel.app/shop/canva-pro",
  },
};

const GCASH_NUMBER = "0994 399 6202";
const GCASH_NAME = "Errol Solomon";

const FEATURES = [
  {
    title: "Premium templates",
    body: "Millions of Pro-only designs across every category.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path d="M3 9h18M9 3v18" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    title: "Background remover",
    body: "One click and the background is gone.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v18M3 12h18M5 5l14 14M19 5L5 19"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Magic Studio AI",
    body: "Generate images, text, and copy in seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Brand kit",
    body: "Your fonts, colors, and logos saved in one place.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l9 6-9 6-9-6 9-6z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M3 15l9 6 9-6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "1TB storage",
    body: "Upload everything. No limits.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <ellipse
          cx="12"
          cy="5"
          rx="8"
          ry="2.5"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M4 5v14c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5"
          stroke="currentColor"
          strokeWidth="1.75"
        />
      </svg>
    ),
  },
  {
    title: "Custom fonts",
    body: "Hundreds of premium fonts unlocked.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 20L12 4l8 16M7 14h10"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const STEPS = [
  {
    title: "Send ₱69 via GCash",
    body: `Send to ${GCASH_NUMBER} (${GCASH_NAME}). Save the reference number from your GCash receipt.`,
  },
  {
    title: "Submit the order form",
    body: "Enter your name, email, and the GCash reference number.",
  },
  {
    title: "Wait for activation",
    body: "I'll add your email to Canva Pro within 24 hours. You'll receive an invitation.",
  },
  {
    title: "Accept the invite",
    body: "Click the link in your email to join. You're in.",
  },
];

export default function CanvaProPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[
          { label: "Portfolio", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: "Canva Pro" },
        ]}
        title="Canva Pro Access"
        description="Everything Canva Pro offers. ₱69, GCash only."
      />

      <div className="flex flex-wrap items-center gap-3 mb-12">
        <span className="inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-accent-subtle text-accent font-medium">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1.5l1.5 4.5L14 7.5l-4.5 1.5L8 13.5 6.5 9 2 7.5 6.5 6 8 1.5Z"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </svg>
          ₱69 · one-time
        </span>
        <span className="text-sm text-text-secondary">
          Activated within 24 hours
        </span>
      </div>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wide text-text-tertiary font-mono mb-5">
          What you get
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-surface border border-border rounded-lg p-4 hover:border-border-strong transition-colors"
            >
              <div className="w-9 h-9 rounded-md bg-surface-subtle text-text-primary flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wide text-text-tertiary font-mono mb-5">
          How it works
        </h2>
        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="flex gap-4 bg-surface border border-border rounded-lg p-4"
            >
              <div className="w-8 h-8 rounded-full bg-surface-subtle text-text-primary text-sm font-medium flex items-center justify-center shrink-0">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-text-primary">
                  {step.title}
                </p>
                <p className="text-sm text-text-secondary mt-0.5">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-surface border border-border rounded-lg p-5">
          <p className="text-sm font-semibold text-text-primary mb-3">
            Good to know
          </p>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex gap-2">
              <span className="text-text-tertiary">·</span>
              <span>
                One-time payment, access for as long as the plan is active
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-tertiary">·</span>
              <span>Manual activation — no instant delivery</span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-tertiary">·</span>
              <span>
                Access may be subject to Canva&apos;s terms of service
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-tertiary">·</span>
              <span>No refunds once access is granted</span>
            </li>
            <li className="flex gap-2">
              <span className="text-text-tertiary">·</span>
              <span>
                Questions?{" "}
                <Link href="/contact" className="text-accent hover:underline">
                  Contact me
                </Link>
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <Link
          href="/shop/canva-pro/order"
          className="block w-full px-6 py-4 rounded-lg text-center font-semibold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 transition-colors shadow-sm hover:shadow-md"
        >
          I&apos;ve paid — submit my order
        </Link>
        <p className="text-xs text-text-tertiary text-center mt-3">
          Payment must be sent first. The form is for confirming your order.
        </p>
      </section>
    </div>
  );
}
