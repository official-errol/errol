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
    "@type": "Person",
    name: "Errol",
    url: "https://errolsolomon.vercel.app",
    image: "https://errolsolomon.vercel.app/logo.png",
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
  <div className="max-w-5xl mx-auto px-6 py-12">
    <div className="flex flex-wrap items-start justify-between gap-10">
      <div className="max-w-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold text-text-primary mb-2"
        >
          <img src="/8ball.png" alt="" className="w-5 h-5" />
          Errol
        </Link>
        <p className="text-xs text-text-secondary leading-relaxed">
          A personal workshop for things worth building.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-x-6 sm:gap-x-12 gap-y-6 text-sm">
        <div>
          <p className="text-xs font-medium text-text-tertiary mb-3">
            Site
          </p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/projects"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/files"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Files
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium text-text-tertiary mb-3">
            More
          </p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/shop"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/tools"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Tools
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium text-text-tertiary mb-3">
            Legal
          </p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/privacy"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Terms
              </Link>
            </li>
            <li>
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                RSS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="mt-12 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-text-tertiary">
      <p>© {new Date().getFullYear()} Errol</p>
    </div>
  </div>
</footer>

      <BackToTop />
    </div>
  );
}