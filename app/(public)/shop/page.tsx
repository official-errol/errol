import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageHeader } from "@/components/ui/public-page-header";

export const metadata: Metadata = {
  title: "Shop",
  description: "Small offerings — Canva Pro access and other goods.",
  alternates: {
    canonical: "https://errolsolomon.vercel.app/shop",
  },
};

type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
};

const PRODUCTS: Product[] = [
  {
    slug: "canva-pro",
    name: "Canva Pro Access",
    description:
      "Full Canva Pro features — premium templates, brand kits, background remover, and more.",
    price: 69,
  },
];

export default function ShopPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[{ label: "Portfolio", href: "/" }, { label: "Shop" }]}
        title="Shop"
        description="Small offerings. Manual fulfillment, GCash only."
      />

      <div className="space-y-3">
        {PRODUCTS.map((product) => (
          <Link
            key={product.slug}
            href={`/shop/${product.slug}`}
            className="block bg-surface border border-border rounded-lg p-5 hover:border-border-strong transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-semibold text-text-primary mb-1">
                  {product.name}
                </h2>
                <p className="text-sm text-text-secondary">
                  {product.description}
                </p>
              </div>
              <span className="text-lg font-semibold text-text-primary shrink-0 font-mono">
                ₱{product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
