import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageHeader } from "@/components/ui/public-page-header";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "Free Developer Tools",
  description:
    "Free online developer tools — JSON formatter, UUID generator, and QR code generator. All run in your browser. No signup, no tracking, no ads.",
  alternates: {
    canonical: `${BASE_URL}/tools`,
  },
  openGraph: {
    title: "Free Developer Tools — Errol",
    description:
      "JSON formatter, UUID generator, and QR code generator. All client-side.",
    url: `${BASE_URL}/tools`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Developer Tools — Errol",
    description:
      "JSON formatter, UUID generator, and QR code generator. All client-side.",
  },
};

type Tool = {
  slug: string;
  name: string;
  description: string;
  icon: React.ReactNode;
};

const TOOLS: Tool[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description:
      "Format, validate, and minify JSON. Handles large payloads without lag.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3M9 12h6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description:
      "Generate secure v4 UUIDs in bulk. Copy all, uppercase, format options.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M8 12h.01M12 12h.01M16 12h.01"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description: "Turn any text or URL into a QR code. Download as PNG or SVG.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M14 14h3v3h-3zM20 14h1v1h-1zM14 20h1v1h-1zM18 20h3v1h-3z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Developer Tools",
    description:
      "Free online developer tools — JSON formatter, UUID generator, and QR code generator.",
    url: `${BASE_URL}/tools`,
    hasPart: TOOLS.map((tool) => ({
      "@type": "WebApplication",
      name: tool.name,
      description: tool.description,
      url: `${BASE_URL}/tools/${tool.slug}`,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16">
        <PublicPageHeader
          breadcrumbs={[{ label: "Portfolio", href: "/" }, { label: "Tools" }]}
          title="Free Developer Tools"
          description="Small utilities I built for myself. Free to use, no signup, no tracking."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group bg-surface border border-border rounded-lg p-5 hover:border-border-strong transition-colors flex flex-col"
            >
              <div className="w-10 h-10 rounded-md bg-surface-subtle text-text-primary flex items-center justify-center mb-4 group-hover:bg-accent-subtle group-hover:text-accent transition-colors">
                {tool.icon}
              </div>
              <h2 className="font-semibold text-text-primary mb-1">
                {tool.name}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {tool.description}
              </p>
              <span className="text-sm text-text-secondary group-hover:text-accent transition-colors mt-auto inline-flex items-center gap-1">
                Open
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
