import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { JsonFormatter } from "@/components/tools/json-formatter";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "JSON Formatter — Format, Validate & Minify JSON",
  description:
    "Free online JSON formatter. Format, validate, and minify JSON in your browser. Handles large payloads, shows errors clearly, no signup required.",
  alternates: {
    canonical: `${BASE_URL}/tools/json-formatter`,
  },
  openGraph: {
    title: "JSON Formatter — Errol",
    description:
      "Format, validate, and minify JSON. Runs entirely in your browser.",
    url: `${BASE_URL}/tools/json-formatter`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON Formatter — Errol",
    description:
      "Format, validate, and minify JSON. Runs entirely in your browser.",
  },
};

const FAQ = [
  {
    question: "What does a JSON formatter do?",
    answer:
      "A JSON formatter takes compact or messy JSON and rewrites it with proper indentation and line breaks. The output is easier to read, debug, and review. Some formatters (like this one) also validate syntax and can minify JSON back to a single line.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All parsing and formatting happens in your browser using JavaScript. Nothing is uploaded, logged, or stored. You can safely format API keys, tokens, or sensitive payloads.",
  },
  {
    question: "Why is my JSON invalid?",
    answer:
      "The most common causes are trailing commas after the last item, unquoted object keys (JavaScript allows this, JSON does not), single quotes instead of double quotes, and comments. The error message shows where the problem is.",
  },
  {
    question: "What is the difference between formatting and minifying?",
    answer:
      "Formatting adds indentation and line breaks to make JSON readable. Minifying removes all unnecessary whitespace to make the JSON as small as possible — useful when sending data over a network or storing it.",
  },
  {
    question: "Can I format very large JSON files?",
    answer:
      "Yes, up to the memory limits of your browser. Files up to several megabytes work fine. Extremely large files (100 MB+) might be slow, but for typical API responses and config files you will not notice any delay.",
  },
  {
    question: "Is this free to use?",
    answer:
      "Yes. No signup, no limits, no ads. It is a tool I built for myself and put online in case it is useful to others.",
  },
];

export default function JsonFormatterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "JSON Formatter",
    description:
      "Free online JSON formatter. Format, validate, and minify JSON in your browser.",
    url: `${BASE_URL}/tools/json-formatter`,
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
        title="JSON Formatter"
        slug="json-formatter"
        description="Format, validate, and minify JSON."
        hint={
          <>
            <p className="mb-2">
              Paste your JSON into the input field. The output updates live as
              you type.
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-text-primary">Format</strong> —
                pretty-print with indentation
              </li>
              <li>
                <strong className="text-text-primary">Minify</strong> — strip
                all whitespace
              </li>
              <li>
                <strong className="text-text-primary">Validate</strong> — checks
                syntax and shows errors
              </li>
              <li>
                <strong className="text-text-primary">Copy</strong> — click to
                copy the output
              </li>
            </ul>
            <p className="mt-2">
              Nothing leaves your browser. Useful for API responses, config
              files, or debugging.
            </p>
          </>
        }
        content={
          <>
            <h2>What is a JSON formatter?</h2>
            <p>
              A JSON formatter is a tool that takes raw or malformed JSON and
              rewrites it with proper indentation and line breaks. It also
              validates that the JSON is syntactically correct — catching
              mistakes like missing commas, unquoted keys, or stray characters.
            </p>
            <p>
              JSON (JavaScript Object Notation) is the standard format for
              exchanging data between servers and applications. API responses,
              config files, and log entries are almost always JSON. But when
              compacted, JSON becomes hard to read — one long line with no
              structure. A formatter fixes that.
            </p>

            <h2>When would I use this?</h2>
            <ul>
              <li>
                <strong>Debugging API responses.</strong> Paste a response and
                see the structure clearly.
              </li>
              <li>
                <strong>Reviewing config files.</strong> Format{" "}
                <code>package.json</code>, <code>tsconfig.json</code>, or any
                other JSON config.
              </li>
              <li>
                <strong>Preparing data for documentation.</strong> Formatted
                JSON is easier to paste into docs or tutorials.
              </li>
              <li>
                <strong>Validating before committing.</strong> Catch syntax
                errors before they hit your pipeline.
              </li>
              <li>
                <strong>Minifying for production.</strong> Strip whitespace to
                shrink payloads.
              </li>
            </ul>

            <h2>Why use this tool over others?</h2>
            <p>
              This one runs entirely in your browser. Nothing is uploaded to a
              server, nothing is logged, and nothing is tracked. If you are
              formatting sensitive data — API keys, auth tokens, private configs
              — that matters.
            </p>
            <p>
              It is also fast and clean. No ads, no popups, no signup walls, no
              &quot;upgrade to Pro&quot; nag screens. Just the tool.
            </p>

            <h2>Common JSON errors it catches</h2>
            <ul>
              <li>
                <strong>Trailing commas</strong> — a comma after the last item
                in an object or array
              </li>
              <li>
                <strong>Unquoted keys</strong> — valid in JavaScript, invalid in
                JSON
              </li>
              <li>
                <strong>Single quotes</strong> — JSON requires double quotes
              </li>
              <li>
                <strong>Comments</strong> — JSON does not support them
              </li>
              <li>
                <strong>Mismatched brackets</strong> — unclosed arrays or
                objects
              </li>
            </ul>
            <p>
              When any of these appear, the error message shows you exactly
              where the parser failed so you can fix it quickly.
            </p>
          </>
        }
        faq={FAQ}
      >
        <JsonFormatter />
      </ToolPage>
    </>
  );
}
