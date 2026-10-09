import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PublicNav } from "@/components/layout/public-nav";
import { AutoOpenLogin } from "@/components/auth/auto-open-login";
import { BackToTop } from "@/components/blog/back-to-top";
import { SiteBanner } from "@/components/layout/site-banner";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, avatar_url, role")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  const { data: banner } = await supabase
    .from("site_banner")
    .select(
      "id, enabled, message, link_text, link_url, variant, dismissible, updated_at",
    )
    .limit(1)
    .maybeSingle();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Errol",
    url: "https://errolsolomon.vercel.app",
    logo: "https://errolsolomon.vercel.app/logo.png",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteBanner banner={banner} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      <Suspense fallback={null}>
        <AutoOpenLogin />
      </Suspense>

      <PublicNav
        user={user ? { id: user.id, email: user.email! } : null}
        profile={profile}
      />

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-text-secondary">
          <p>© {new Date().getFullYear()} Errol</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/shop" className="hover:text-text-primary">
              Shop
            </Link>
            <Link href="/tools" className="hover:text-text-primary">
              Tools
            </Link>
            <Link href="/privacy" className="hover:text-text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-text-primary">
              Terms
            </Link>
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
