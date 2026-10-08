import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { QrCodeGenerator } from "@/components/tools/qr-code-generator";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "QR Code Generator — Free Online QR Code Creator",
  description:
    "Generate QR codes from any URL or text. Custom colors and sizes. Download as PNG or SVG. Free, no signup, runs entirely in your browser.",
  alternates: {
    canonical: `${BASE_URL}/tools/qr-code-generator`,
  },
  openGraph: {
    title: "QR Code Generator — Errol",
    description: "Turn any URL or text into a QR code. Download as PNG or SVG.",
    url: `${BASE_URL}/tools/qr-code-generator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator — Errol",
    description: "Turn any URL or text into a QR code. Download as PNG or SVG.",
  },
};

const FAQ = [
  {
    question: "What is a QR code?",
    answer:
      "A QR (Quick Response) code is a two-dimensional barcode that stores data in a square grid. Scanning it with a phone camera or QR reader instantly reveals the encoded content — usually a URL, but it can also be text, contact info, WiFi credentials, or payment details.",
  },
  {
    question: "Do QR codes expire?",
    answer:
      "Static QR codes (like the ones this tool generates) do not expire. They encode the data directly, so they will work forever as long as the destination still exists. Dynamic QR codes from paid services use a redirect and can expire if the service is discontinued.",
  },
  {
    question: "What is the difference between PNG and SVG?",
    answer:
      "PNG is a raster image — great for most uses, but it pixelates if you scale it up. SVG is a vector format — it stays sharp at any size and is best for print, logos, or anywhere you need to scale. For most people, PNG is enough.",
  },
  {
    question: "How much data can a QR code hold?",
    answer:
      "A QR code can store up to about 3 KB of data, or roughly 4,000 characters. In practice, shorter URLs produce simpler QR codes that scan faster and look cleaner. If your URL is very long, consider using a URL shortener first.",
  },
  {
    question: "Why do my QR codes fail to scan?",
    answer:
      "Common causes: too small (try at least 256×256 pixels), low contrast between foreground and background, too much data for the chosen error correction level, or a damaged/dirty code. Increasing the size and using a dark color on a light background usually fixes it.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. The QR code is generated entirely in your browser using JavaScript. Your URL or text is never uploaded. Safe for QR codes that contain tokens, private URLs, or sensitive data.",
  },
  {
    question: "Can I use these QR codes commercially?",
    answer:
      "Yes. The QR codes you generate are yours to use however you like — personal, commercial, printed, or digital. There is no watermark, no attribution requirement, and no restrictions.",
  },
];

export default function QrCodeGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "QR Code Generator",
    description:
      "Free online QR code generator. Turn any URL or text into a downloadable QR code.",
    url: `${BASE_URL}/tools/qr-code-generator`,
    applicationCategory: "UtilityApplication",
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
        title="QR Code Generator"
        description="Turn any text or URL into a QR code."
        hint={
          <>
            <p className="mb-2">
              Enter a URL, a short message, or any text. The QR code updates as
              you type.
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-text-primary">Custom size</strong> —
                pick from 128px to 1024px
              </li>
              <li>
                <strong className="text-text-primary">Colors</strong> — dark and
                light custom colors
              </li>
              <li>
                <strong className="text-text-primary">Error correction</strong>{" "}
                — keep the code scannable even if slightly damaged
              </li>
              <li>
                <strong className="text-text-primary">Download</strong> — export
                as PNG or SVG
              </li>
            </ul>
            <p className="mt-2">
              Nothing is uploaded. Perfect for business cards, slides, or shop
              links.
            </p>
          </>
        }
        content={
          <>
            <h2>What is a QR code generator?</h2>
            <p>
              A QR code generator converts text, URLs, or other data into a
              scannable square image. Point a phone camera at the resulting
              code, and the content appears — usually a website, but it could
              also be a phone number, WiFi credentials, or a payment link.
            </p>
            <p>
              QR codes are used everywhere now: restaurant menus, business
              cards, product packaging, event tickets, payment apps, and
              anywhere a fast, low-friction handoff from physical to digital
              makes sense.
            </p>

            <h2>When would I use this?</h2>
            <ul>
              <li>
                <strong>Business cards.</strong> Link to your portfolio,
                LinkedIn, or contact page.
              </li>
              <li>
                <strong>Presentations.</strong> Let the audience scan instead of
                typing a long URL.
              </li>
              <li>
                <strong>Product packaging.</strong> Link to instructions,
                warranty registration, or a manual.
              </li>
              <li>
                <strong>WiFi sharing.</strong> Encode WiFi credentials so guests
                can connect without typing a password.
              </li>
              <li>
                <strong>Payments.</strong> Some payment apps accept QR codes
                that encode account info or payment amounts.
              </li>
              <li>
                <strong>Posters and signage.</strong> Anywhere a URL would be
                awkward to type.
              </li>
            </ul>

            <h2>Why use this tool over others?</h2>
            <p>
              No signup, no ads, no &quot;dynamic QR code&quot; upsells. Every
              QR code you generate is static — the data is encoded directly, so
              it works forever without depending on a service being online.
            </p>
            <p>
              You get full control over size, colors, and format. Everything
              runs in your browser, so nothing you encode ever leaves your
              device. That matters for QR codes that might contain private URLs,
              tokens, or credentials.
            </p>

            <h2>Tips for better QR codes</h2>
            <ul>
              <li>
                <strong>Use sufficient contrast.</strong> Dark foreground on
                light background scans most reliably. Inverted colors work but
                some scanners struggle.
              </li>
              <li>
                <strong>Leave quiet space.</strong> When placing a QR code in a
                design, leave a small margin of empty space around it.
              </li>
              <li>
                <strong>Size matters.</strong> For print, at least 2 cm × 2 cm
                at normal viewing distance; larger for posters.
              </li>
              <li>
                <strong>Test before printing.</strong> Always scan your QR code
                on a couple of devices before mass production.
              </li>
              <li>
                <strong>Shorten long URLs.</strong> Shorter URLs produce simpler
                QR codes that scan faster and look cleaner.
              </li>
            </ul>
          </>
        }
        faq={FAQ}
        related={[
          { slug: "json-formatter", name: "JSON Formatter" },
          { slug: "uuid-generator", name: "UUID Generator" },
        ]}
      >
        <QrCodeGenerator />
      </ToolPage>
    </>
  );
}
