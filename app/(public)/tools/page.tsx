import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { TOOLS } from "@/lib/tools";

const BASE_URL = "https://errolsolomon.vercel.app";

export const metadata: Metadata = {
  title: "Free Developer Tools",
  description:
    "Free online developer tools — JSON formatter, UUID generator, QR code generator, Base64, URL encoder, password generator, JWT decoder, timestamp converter, and color converter. All run in your browser. No signup, no tracking, no ads.",
  alternates: {
    canonical: `${BASE_URL}/tools`,
  },
  openGraph: {
    title: "Free Developer Tools — Errol",
    description: "Nine free browser-based tools for developers and designers.",
    url: `${BASE_URL}/tools`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Developer Tools — Errol",
    description: "Nine free browser-based tools for developers and designers.",
  },
};

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Developer Tools",
    description:
      "Free online developer tools — JSON formatter, UUID generator, QR code generator, Base64, URL encoder, password generator, JWT decoder, timestamp converter, and color converter.",
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
