import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { Base64Tool } from "@/components/tools/base64-tool";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "Base64 Encoder / Decoder — Free Online Tool",
  description:
    "Encode text to Base64 or decode Base64 back to text. Supports Unicode. Runs entirely in your browser, no data sent to a server.",
  alternates: { canonical: `${BASE_URL}/tools/base64` },
  openGraph: {
    title: "Base64 Encoder / Decoder — Errol",
    description: "Encode and decode Base64 in your browser.",
    url: `${BASE_URL}/tools/base64`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder / Decoder — Errol",
    description: "Encode and decode Base64 in your browser.",
  },
};

const FAQ = [
  {
    question: "What is Base64?",
    answer:
      "Base64 is a way to represent binary data as text using 64 printable characters (A–Z, a–z, 0–9, +, /). It is used to safely send binary data over systems that only handle text, like email, JSON, or URLs.",
  },
  {
    question: "Is Base64 encryption?",
    answer:
      "No. Base64 is not encryption — it is an encoding. Anyone can decode a Base64 string without a key. If you need to protect data, use encryption, not Base64.",
  },
  {
    question: "Why does Base64 look bigger than the original?",
    answer:
      "Base64 expands data by about 33%. Every 3 bytes become 4 characters. This size increase is the trade-off for being able to send data through text-only channels.",
  },
  {
    question: "Does this tool support Unicode and emoji?",
    answer:
      "Yes. It encodes and decodes UTF-8, so characters like é, 中, or 😀 work correctly.",
  },
  {
    question: "Is my data sent anywhere?",
    answer:
      "No. Everything runs in your browser using JavaScript. Nothing is uploaded or logged.",
  },
];

export default function Base64Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Base64 Encoder / Decoder",
    description: "Encode and decode Base64 in your browser.",
    url: `${BASE_URL}/tools/base64`,
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
        title="Base64 Encoder / Decoder"
        slug="base64"
        description="Encode text to Base64, or decode Base64 back to text."
        hint={
          <>
            <p className="mb-2">
              Paste text or Base64 into the input. Switch between Encode and
              Decode modes to convert.
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-text-primary">Encode</strong> — text →
                Base64
              </li>
              <li>
                <strong className="text-text-primary">Decode</strong> — Base64 →
                text
              </li>
              <li>
                <strong className="text-text-primary">URL-safe</strong> — swap
                +/ for -_ for URL use
              </li>
              <li>
                <strong className="text-text-primary">Copy</strong> — one-click
                copy of the result
              </li>
            </ul>
          </>
        }
        content={
          <>
            <h2>What is Base64 encoding?</h2>
            <p>
              Base64 takes binary data and represents it as text using a
              specific alphabet of 64 characters. This makes it safe to send
              binary content through systems designed for text — like email,
              JSON payloads, HTTP headers, and URLs.
            </p>
            <p>
              Every three bytes of input become four characters of Base64
              output. That is why Base64 strings are about 33% larger than the
              original data.
            </p>

            <h2>When would I use this?</h2>
            <ul>
              <li>
                <strong>Embedding images</strong> in CSS or HTML as data URIs
              </li>
              <li>
                <strong>Sending binary data</strong> in JSON APIs
              </li>
              <li>
                <strong>Encoding credentials</strong> for HTTP Basic Auth
              </li>
              <li>
                <strong>Debugging JWTs</strong> — the header and payload are
                Base64URL-encoded
              </li>
              <li>
                <strong>Reading API responses</strong> that return Base64
              </li>
            </ul>

            <h2>Base64 vs Base64URL</h2>
            <p>
              Standard Base64 uses <code>+</code> and <code>/</code> in its
              alphabet, which are not URL-safe. Base64URL replaces them with{" "}
              <code>-</code> and <code>_</code>, and drops padding. Use
              Base64URL when the encoded value will appear in a URL or filename.
            </p>
          </>
        }
        faq={FAQ}
      >
        <Base64Tool />
      </ToolPage>
    </>
  );
}
