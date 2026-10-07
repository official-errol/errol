"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useLogin } from "@/components/auth/login-dialog-provider";

type Props = {
  user: { id: string; email: string } | null;
  profile: {
    full_name: string | null;
    avatar_url: string | null;
    role: string;
  } | null;
};

const links = [
  { href: "/", label: "Portfolio" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/files", label: "Files" },
  { href: "/contact", label: "Contact" },
];

export function PublicNav({ user, profile }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { openLogin } = useLogin();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  }

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="border-b border-border bg-surface sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-text-primary"
        >
          <img src="/8ball.png" alt="" className="w-6 h-6" />
          Errol
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                isActive(link.href)
                  ? "text-text-primary font-medium"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <div className="hidden md:flex items-center relative">
            {user && profile ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 p-1 rounded-md hover:bg-surface-subtle transition-colors focus:outline-none"
                >
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name ?? ""}
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
                        {profile.full_name ?? "Signed in"}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {user.email}
                      </p>
                    </div>

                    {profile.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-text-primary hover:bg-surface-subtle"
                      >
                        Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-surface-subtle"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openLogin()}
                className="text-sm px-4 py-1.5 bg-primary text-text-inverse rounded-md hover:bg-text-primary/85 transition-colors"
              >
                Sign in
              </button>
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
          <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm py-2 transition-colors ${
                  isActive(link.href)
                    ? "text-text-primary font-medium"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-border mt-3 pt-3">
              {user && profile ? (
                <>
                  <div className="flex items-center gap-3 py-2">
                    {profile.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt=""
                        className="w-8 h-8 rounded-full border border-border"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-surface-subtle" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm text-text-primary truncate">
                        {profile.full_name ?? "Signed in"}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {profile.role === "admin" && (
                    <Link
                      href="/admin"
                      className="block text-sm py-2 text-text-primary"
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="block text-sm py-2 text-error"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openLogin();
                  }}
                  className="inline-block text-sm px-4 py-2 bg-primary text-text-inverse rounded-md"
                >
                  Sign in
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
