import type { Metadata } from "next";
import Link from "next/link";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { OrderForm } from "@/components/shop/order-form";

export const metadata: Metadata = {
  title: "Submit your order",
  description: "Confirm your Canva Pro order.",
  robots: { index: false, follow: false },
};

export default function CanvaProOrderPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <PublicPageHeader
        breadcrumbs={[
          { label: "Portfolio", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: "Canva Pro", href: "/shop/canva-pro" },
          { label: "Order" },
        ]}
        title="Submit your order"
        description="Fill this in after sending ₱69 via GCash."
      />

      <OrderForm
        productSlug="canva-pro"
        productName="Canva Pro Access"
        price={69}
      />

      <p className="text-xs text-text-tertiary mt-6">
        Haven&apos;t paid yet?{" "}
        <Link href="/shop/canva-pro" className="text-accent hover:underline">
          Go back to the product page
        </Link>
      </p>
    </div>
  );
}
