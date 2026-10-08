import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { TimestampConverterTool } from "@/components/tools/timestamp-converter-tool";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter — Epoch to Date",
  description:
    "Convert Unix timestamps to readable dates and back. Supports seconds, milliseconds, and multiple timezones. Runs in your browser.",
  alternates: { canonical: `${BASE_URL}/tools/timestamp-converter` },
  openGraph: {
    title: "Unix Timestamp Converter — Errol",
    description: "Convert Unix timestamps to dates and back.",
    url: `${BASE_URL}/tools/timestamp-converter`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unix Timestamp Converter — Errol",
    description: "Convert Unix timestamps to dates and back.",
  },
};

const FAQ = [
  {
    question: "What is a Unix timestamp?",
    answer:
      "A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 at 00:00:00 UTC — also called the Unix epoch. It is a common way to represent time in software because it is a single number.",
  },
  {
    question: "Seconds or milliseconds?",
    answer:
      "Unix timestamps traditionally use seconds (10 digits for current dates). JavaScript and many APIs use milliseconds (13 digits). This tool detects the unit automatically but you can override it.",
  },
  {
    question: "What is the Year 2038 problem?",
    answer:
      "32-bit systems store Unix timestamps as a signed 32-bit integer, which maxes out at 03:14:07 UTC on January 19, 2038. After that, the value overflows and becomes negative. Modern systems use 64-bit integers and are not affected.",
  },
  {
    question: "Does this tool handle timezones?",
    answer:
      "It shows the timestamp in UTC, in your local timezone, and in the ISO 8601 format. For other timezones, use the ISO string and adjust in your own system.",
  },
];

export default function TimestampConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Unix Timestamp Converter",
    description: "Convert Unix timestamps to dates and back.",
    url: `${BASE_URL}/tools/timestamp-converter`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
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
        title="Unix Timestamp Converter"
        slug="timestamp-converter"
        description="Convert Unix timestamps to dates and back."
        hint={
          <>
            <p className="mb-2">
              Paste a timestamp (seconds or milliseconds) or pick a date. The
              conversion happens live.
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-text-primary">Auto-detect</strong> —
                recognizes seconds vs milliseconds
              </li>
              <li>
                <strong className="text-text-primary">Now button</strong> — snap
                to the current time
              </li>
              <li>
                <strong className="text-text-primary">Copy any value</strong> —
                click to copy
              </li>
            </ul>
          </>
        }
        content={
          <>
            <h2>What is a Unix timestamp?</h2>
            <p>
              A Unix timestamp is the number of seconds since January 1, 1970 at
              00:00:00 UTC. It is one of the simplest ways to represent time in
              software — just a number, no timezone, no formatting.
            </p>
            <p>
              Because the value is UTC-based, the same timestamp means the same
              moment regardless of where the server is running. You only convert
              to a local timezone at display time.
            </p>

            <h2>Seconds vs milliseconds</h2>
            <p>
              The traditional Unix timestamp uses seconds. Modern JavaScript and
              many APIs use milliseconds — because <code>Date.now()</code>{" "}
              returns milliseconds.
            </p>
            <ul>
              <li>
                Seconds — 10 digits (e.g. <code>1696800000</code>)
              </li>
              <li>
                Milliseconds — 13 digits (e.g. <code>1696800000000</code>)
              </li>
            </ul>
            <p>
              This tool detects the unit automatically by length. You can
              override the detection if needed.
            </p>

            <h2>Common use cases</h2>
            <ul>
              <li>
                <strong>Debugging APIs</strong> that return timestamps in their
                responses
              </li>
              <li>
                <strong>Expiration dates</strong> on JWTs and OAuth tokens
              </li>
              <li>
                <strong>Log analysis</strong> — converting epoch values to
                readable dates
              </li>
              <li>
                <strong>Database records</strong> — many systems store{" "}
                <code>created_at</code> as Unix time
              </li>
            </ul>

            <h2>The Year 2038 problem</h2>
            <p>
              A 32-bit signed integer can hold timestamps up to{" "}
              <code>2147483647</code>, which corresponds to 03:14:07 UTC on
              January 19, 2038. After that, the value overflows. Modern 64-bit
              systems are not affected — but any legacy system still using
              32-bit time will break.
            </p>
          </>
        }
        faq={FAQ}
      >
        <TimestampConverterTool />
      </ToolPage>
    </>
  );
}
