"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { XIcon } from "@/components/ui/icons";

type Banner = {
  id: string;
  enabled: boolean;
  message: string;
  link_text: string | null;
  link_url: string | null;
  variant: string;
  dismissible: boolean;
  updated_at: string;
};

const VARIANT_STYLES: Record<string, string> = {
  default: "bg-primary text-text-inverse",
  gradient: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white",
  success: "bg-success/10 text-success border-b border-success/20",
  warning: "bg-warning/10 text-warning border-b border-warning/20",
};

export function SiteBanner({ banner }: { banner: Banner | null }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!banner || !banner.enabled) return;

    // Check if user already dismissed this specific banner version
    const key = `banner-dismissed-${banner.id}-${banner.updated_at}`;
    const dismissed = localStorage.getItem(key);
    if (dismissed === "1") return;

    setHidden(false);
  }, [banner]);

  function handleDismiss() {
    if (!banner) return;
    const key = `banner-dismissed-${banner.id}-${banner.updated_at}`;
    localStorage.setItem(key, "1");
    setHidden(true);
  }

  if (!banner || !banner.enabled || hidden) return null;

  const styles = VARIANT_STYLES[banner.variant] ?? VARIANT_STYLES.default;

  return (
    <div className={`${styles} text-sm`}>
      <div className="max-w-5xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="truncate">{banner.message}</span>
          {banner.link_url && banner.link_text && (
            <Link
              href={banner.link_url}
              className="underline underline-offset-2 hover:no-underline shrink-0 font-medium"
            >
              {banner.link_text}
            </Link>
          )}
        </div>

        {banner.dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="p-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity shrink-0"
          >
            <XIcon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
