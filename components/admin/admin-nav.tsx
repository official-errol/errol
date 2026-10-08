"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/banner", label: "Banner" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/files", label: "Files" },
  { href: "/admin/shares", label: "Shares" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/users", label: "Users" },
];

export function AdminNav({
  fullName,
  avatarUrl,
  email,
}: {
  fullName: string | null;
  avatarUrl: string | null;
  email: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  }

  return (
    <header className="border-b border-border bg-surface sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-text-primary"
        >
          <img src="/8ball.png" alt="" className="w-6 h-6" />
          Errol
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors ${
                isActive(item.href)
                  ? "text-text-primary font-medium"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <div className="hidden md:flex items-center relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 p-1 rounded-md hover:bg-surface-subtle transition-colors focus:outline-none"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={fullName ?? ""}
                  className="w-8 h-8 rounded-full border border-border"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-surface-subtle" />
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-56 bg-surface border border-border rounded-md shadow-lg overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {fullName ?? "Signed in"}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {email}
                  </p>
                </div>

                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-text-primary hover:bg-surface-subtle"
                >
                  View site
                </Link>

                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-error hover:bg-surface-subtle"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-text-primary hover:bg-surface-subtle transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M5 5l10 10M15 5l-10 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm py-2 transition-colors ${
                  isActive(item.href)
                    ? "text-text-primary font-medium"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-border mt-3 pt-3">
              <div className="flex items-center gap-3 py-2">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt=""
                    className="w-8 h-8 rounded-full border border-border"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-surface-subtle" />
                )}
                <div className="min-w-0">
                  <p className="text-sm text-text-primary truncate">
                    {fullName ?? "Signed in"}
                  </p>
                  <p className="text-xs text-text-secondary truncate">
                    {email}
                  </p>
                </div>
              </div>

              <Link href="/" className="block text-sm py-2 text-text-primary">
                View site
              </Link>

              <button
                onClick={handleSignOut}
                className="block text-sm py-2 text-error"
              >
                Sign out
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
