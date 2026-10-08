import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { ColorConverterTool } from "@/components/tools/color-converter-tool";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "Color Converter — HEX, RGB, HSL",
  description:
    "Convert colors between HEX, RGB, and HSL formats. Live preview. Runs in your browser.",
  alternates: { canonical: `${BASE_URL}/tools/color-converter` },
  openGraph: {
    title: "Color Converter — Errol",
    description: "Convert HEX, RGB, and HSL colors.",
    url: `${BASE_URL}/tools/color-converter`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Converter — Errol",
    description: "Convert HEX, RGB, and HSL colors.",
  },
};

const FAQ = [
  {
    question: "What is the difference between HEX, RGB, and HSL?",
    answer:
      "HEX and RGB both describe a color as a mix of red, green, and blue. HEX is compact (6 characters), RGB is verbose but readable. HSL describes a color by hue (which color), saturation (how vivid), and lightness (how bright).",
  },
  {
    question: "When should I use HSL?",
    answer:
      "When you need to adjust a color programmatically — for example, making a button slightly darker on hover. In HSL you just decrease the L value. In RGB or HEX you have to recompute all three channels.",
  },
  {
    question: "What is alpha?",
    answer:
      "Alpha is the opacity of a color, from 0 (fully transparent) to 1 (fully opaque). In CSS you can add alpha to any format: #RRGGBBAA, rgba(), or hsla().",
  },
  {
    question: "Is my data sent anywhere?",
    answer:
      "No. Everything runs in your browser. Nothing is uploaded or logged.",
  },
];

export default function ColorConverterPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Color Converter",
    description: "Convert HEX, RGB, and HSL colors.",
    url: `${BASE_URL}/tools/color-converter`,
    applicationCategory: "DesignApplication",
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
        title="Color Converter"
        slug="color-converter"
        description="Convert colors between HEX, RGB, and HSL."
        hint={
          <>
            <p className="mb-2">
              Pick a color or paste a value. All formats update live.
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-text-primary">Color picker</strong> —
                visual picker
              </li>
              <li>
                <strong className="text-text-primary">HEX, RGB, HSL</strong> —
                all formats in one place
              </li>
              <li>
                <strong className="text-text-primary">Alpha</strong> — support
                for transparency
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
            <h2>Color formats explained</h2>
            <p>
              Modern design tools use three main color formats. Each has
              strengths depending on the task.
            </p>
            <ul>
              <li>
                <strong>HEX</strong> — <code>#3B82F6</code>. Compact, used in
                CSS, design files, and anywhere space matters.
              </li>
              <li>
                <strong>RGB</strong> — <code>rgb(59, 130, 246)</code>. Explicit
                about the three channels. Common in JavaScript APIs and older
                CSS.
              </li>
              <li>
                <strong>HSL</strong> — <code>hsl(217, 91%, 60%)</code>. Best for
                programmatic manipulation. Adjust hue, saturation, or lightness
                independently.
              </li>
            </ul>

            <h2>Why use HSL?</h2>
            <p>
              Imagine you have a button and want to compute a darker shade for
              hover state. In HSL, just subtract a few points from the
              lightness. In HEX or RGB, you have to recompute each channel
              separately.
            </p>
            <p>
              Most modern CSS frameworks do this — Tailwind, for example,
              generates all shades of a color by varying lightness in a
              perceptual color space.
            </p>

            <h2>Alpha and opacity</h2>
            <p>
              All three formats support alpha — the fourth channel that controls
              transparency. In CSS:
            </p>
            <ul>
              <li>
                <code>#3B82F680</code> — HEX with alpha (50%)
              </li>
              <li>
                <code>rgba(59, 130, 246, 0.5)</code> — RGB with alpha
              </li>
              <li>
                <code>hsla(217, 91%, 60%, 0.5)</code> — HSL with alpha
              </li>
            </ul>
          </>
        }
        faq={FAQ}
      >
        <ColorConverterTool />
      </ToolPage>
    </>
  );
}
