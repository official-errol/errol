"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ExternalIcon } from "@/components/ui/icons";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/projects", label: "Projects" },
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
    <header className="border-b border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-8 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-text-primary"
          >
            <img src="/8ball.png" alt="" className="w-6 h-6" />
            Sidequest Studio
          </Link>
          <nav className="hidden md:flex gap-6 overflow-x-auto">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm whitespace-nowrap transition-colors ${
                    active
                      ? "text-text-primary font-medium"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <ThemeToggle />

          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 focus:outline-none p-1 rounded-md hover:bg-surface-subtle transition-colors"
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt=""
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
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-error hover:bg-surface-subtle"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="md:hidden border-t border-border overflow-x-auto">
        <div className="px-6 py-2 flex gap-4">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm whitespace-nowrap transition-colors ${
                  active
                    ? "text-text-primary font-medium"
                    : "text-text-secondary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
