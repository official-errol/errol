import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { UuidGenerator } from "@/components/tools/uuid-generator";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "UUID Generator — Generate v4 UUIDs in Bulk",
  description:
    "Free online UUID v4 generator. Generate cryptographically secure UUIDs in bulk. Copy all, uppercase, or remove dashes. Runs in your browser.",
  alternates: {
    canonical: `${BASE_URL}/tools/uuid-generator`,
  },
  openGraph: {
    title: "UUID Generator — Errol",
    description:
      "Generate cryptographically secure v4 UUIDs in bulk. Runs in your browser.",
    url: `${BASE_URL}/tools/uuid-generator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UUID Generator — Errol",
    description:
      "Generate cryptographically secure v4 UUIDs in bulk. Runs in your browser.",
  },
};

const FAQ = [
  {
    question: "What is a UUID?",
    answer:
      "UUID stands for Universally Unique Identifier. It is a 128-bit value used to identify things in systems where uniqueness matters — database rows, session tokens, file names, API resources. The odds of two UUIDs colliding are effectively zero.",
  },
  {
    question: "What is the difference between UUID versions?",
    answer:
      "v1 uses timestamps and MAC addresses (predictable, less private). v3 and v5 use hashing (deterministic). v4 is fully random — the most common version for general use. This tool generates v4 UUIDs.",
  },
  {
    question: "Are these UUIDs secure?",
    answer:
      "Yes. This tool uses your browser's crypto.randomUUID() or crypto.getRandomValues() — the same APIs used for cryptographic operations. The output is suitable for production use, not just as a placeholder.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. Everything runs in your browser. Nothing is uploaded, logged, or tracked. Safe for generating identifiers for private projects.",
  },
  {
    question: "What is the format of a UUID?",
    answer:
      "A standard UUID looks like this: 550e8400-e29b-41d4-a716-446655440000. It is 36 characters: 32 hex digits grouped into 5 sections with hyphens. You can optionally remove the dashes to get a compact 32-character format.",
  },
  {
    question: "Can I generate UUIDs with specific values?",
    answer:
      "No. v4 UUIDs are random by design — that is what makes them unique. If you need a deterministic value (same input, same output), you would use v3 or v5 instead, which are hash-based.",
  },
];

export default function UuidGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "UUID Generator",
    description:
      "Free online UUID v4 generator. Generate cryptographically secure UUIDs in bulk.",
    url: `${BASE_URL}/tools/uuid-generator`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ToolPage
        title="UUID Generator"
        slug="uuid-generator"
        description="Generate v4 UUIDs in bulk."
        hint={
          <>
            <p className="mb-2">
              Pick how many UUIDs you need and click Generate. Each one is
              generated using your browser&apos;s crypto API.
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-text-primary">Version 4</strong> —
                random UUIDs, the standard for identifiers
              </li>
              <li>
                <strong className="text-text-primary">Uppercase</strong> —
                convert to A-F
              </li>
              <li>
                <strong className="text-text-primary">No dashes</strong> —
                compact 32-character format
              </li>
              <li>
                <strong className="text-text-primary">Copy each</strong> — click
                any UUID to copy it
              </li>
            </ul>
            <p className="mt-2">
              Nothing is sent to a server. Safe for production use.
            </p>
          </>
        }
        content={
          <>
            <h2>What is a UUID generator?</h2>
            <p>
              A UUID generator produces Universally Unique Identifiers — 128-bit
              values that are practically guaranteed to be unique. This tool
              generates <strong>v4</strong> UUIDs, which are fully random and
              the most widely used version for general-purpose identifiers.
            </p>
            <p>
              UUIDs are used everywhere in modern software: database primary
              keys, session tokens, file names, API resources, message IDs.
              Whenever you need something that will not collide with anything
              else, you need a UUID.
            </p>

            <h2>When would I use this?</h2>
            <ul>
              <li>
                <strong>Database IDs.</strong> Use UUIDs instead of
                auto-incrementing integers to avoid collisions across systems.
              </li>
              <li>
                <strong>Session tokens.</strong> Generate random identifiers for
                user sessions.
              </li>
              <li>
                <strong>Test data.</strong> Populate a database with unique IDs
                for staging or development.
              </li>
              <li>
                <strong>File naming.</strong> Use UUIDs to avoid filename
                collisions when uploading files.
              </li>
              <li>
                <strong>Message or event IDs.</strong> Track individual events
                in distributed systems.
              </li>
              <li>
                <strong>API resource paths.</strong> Expose UUIDs instead of
                sequential integers to make URLs harder to guess.
              </li>
            </ul>

            <h2>Why use UUID v4?</h2>
            <p>The four versions of UUID each serve a different purpose:</p>
            <ul>
              <li>
                <strong>v1</strong> — based on timestamp + MAC address.
                Predictable, less private.
              </li>
              <li>
                <strong>v3</strong> — MD5 hash of a namespace + name.
                Deterministic.
              </li>
              <li>
                <strong>v4</strong> — fully random. What this tool uses.
              </li>
              <li>
                <strong>v5</strong> — SHA-1 hash of a namespace + name. Like v3
                but stronger.
              </li>
            </ul>
            <p>
              v4 is the default for most use cases because it requires no
              coordination, no registry, no centralized source. Anyone can
              generate a v4 UUID and safely assume it will not collide with
              anything else in the universe.
            </p>

            <h2>Why use this tool over others?</h2>
            <p>
              This generator uses <code>crypto.randomUUID()</code> when
              available and falls back to <code>crypto.getRandomValues()</code>{" "}
              on older browsers. Both are the browser&apos;s cryptographically
              secure random APIs — the same ones used for encryption, not the
              weaker <code>Math.random()</code> you see in some tools.
            </p>
            <p>
              Everything runs in your browser. No requests sent, no logging, no
              tracking. Safe for any identifier, even ones tied to sensitive
              systems.
            </p>
          </>
        }
        faq={FAQ}
      >
        <UuidGenerator />
      </ToolPage>
    </>
  );
}
