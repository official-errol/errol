import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { UrlEncoderTool } from "@/components/tools/url-encoder-tool";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "URL Encoder / Decoder — Free Online Tool",
  description:
    "Encode text for use in URLs, or decode percent-encoded URLs back to readable text. Runs in your browser.",
  alternates: { canonical: `${BASE_URL}/tools/url-encoder` },
  openGraph: {
    title: "URL Encoder / Decoder — Errol",
    description: "Encode and decode URLs in your browser.",
    url: `${BASE_URL}/tools/url-encoder`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Encoder / Decoder — Errol",
    description: "Encode and decode URLs in your browser.",
  },
};

const FAQ = [
  {
    question: "What is URL encoding?",
    answer:
      "URL encoding (also called percent-encoding) replaces characters that are not allowed in URLs with a % followed by two hex digits. For example, a space becomes %20 and & becomes %26.",
  },
  {
    question:
      "What is the difference between encodeURI and encodeURIComponent?",
    answer:
      "encodeURI preserves characters that have meaning in a URL (like / : ? & =), so it is used for encoding a whole URL. encodeURIComponent encodes everything except unreserved characters, so it is used for encoding a single parameter value.",
  },
  {
    question: "When should I use encodeURIComponent?",
    answer:
      "When you are building a URL and inserting user input as a query parameter or path segment. Always encode each value separately, never the whole URL at once.",
  },
  {
    question: "Is my data sent anywhere?",
    answer:
      "No. Everything runs in your browser. Nothing is uploaded or logged.",
  },
];

export default function UrlEncoderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "URL Encoder / Decoder",
    description: "Encode and decode URLs in your browser.",
    url: `${BASE_URL}/tools/url-encoder`,
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
        title="URL Encoder / Decoder"
        slug="url-encoder"
        description="Encode text for URLs, or decode percent-encoded URLs."
        hint={
          <>
            <p className="mb-2">
              Paste a URL or text and choose the encoding method.
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-text-primary">Component</strong> —
                encodes everything (use for query values)
              </li>
              <li>
                <strong className="text-text-primary">Full URI</strong> —
                preserves / : ? & = (use for whole URLs)
              </li>
            </ul>
          </>
        }
        content={
          <>
            <h2>What is URL encoding?</h2>
            <p>
              URLs can only contain a limited set of characters. Anything else —
              spaces, non-ASCII letters, reserved symbols — must be
              percent-encoded before it can be part of a URL.
            </p>
            <p>
              Percent-encoding replaces the character with a percent sign
              followed by two hexadecimal digits representing its UTF-8 bytes. A
              space becomes <code>%20</code>, an ampersand becomes{" "}
              <code>%26</code>, and the emoji 😀 becomes{" "}
              <code>%F0%9F%98%80</code>.
            </p>

            <h2>Component vs Full URI encoding</h2>
            <p>
              JavaScript has two functions for this:{" "}
              <code>encodeURIComponent</code> and <code>encodeURI</code>. They
              differ in what they preserve.
            </p>
            <ul>
              <li>
                <strong>encodeURIComponent</strong> encodes almost everything
                except letters, digits, <code>-_.!~*'()</code>. Use it for a
                single query parameter value.
              </li>
              <li>
                <strong>encodeURI</strong> also preserves characters that have
                meaning in the URL structure: <code>/ : ? & = # ; ,</code>. Use
                it when encoding an entire URL.
              </li>
            </ul>

            <h2>Common mistakes</h2>
            <ul>
              <li>
                <strong>Encoding the whole URL</strong> when you meant to encode
                a parameter. That breaks <code>?key=value</code> into{" "}
                <code>%3Fkey%3Dvalue</code>.
              </li>
              <li>
                <strong>Double encoding.</strong> Encoding an already-encoded
                value turns <code>%20</code> into <code>%2520</code>.
              </li>
              <li>
                <strong>Not encoding at all.</strong> Some servers tolerate it,
                but browsers and CDNs may not.
              </li>
            </ul>
          </>
        }
        faq={FAQ}
      >
        <UrlEncoderTool />
      </ToolPage>
    </>
  );
}
