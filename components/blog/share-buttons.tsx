"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from "@/components/ui/icons-social";
import { LinkIcon, CheckIcon } from "@/components/ui/icons";

type Props = {
  url: string;
  title: string;
  excerpt?: string;
};

export function ShareButtons({ url, title, excerpt }: Props) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast("Link copied", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Could not copy link", "error");
    }
  }

  async function handleNativeShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, text: excerpt, url });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  }

  const socials = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: TwitterIcon,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookIcon,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedinIcon,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-text-tertiary mr-1">
        Share
      </span>

      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          className="p-2 rounded-md border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopy}
        title={copied ? "Copied" : "Copy link"}
        className={`p-2 rounded-md border transition-colors ${
          copied
            ? "border-accent bg-accent-subtle text-accent"
            : "border-border text-text-secondary hover:text-text-primary hover:border-border-strong"
        }`}
      >
        {copied ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}
      </button>

      <button
        type="button"
        onClick={handleNativeShare}
        className="hidden sm:inline-flex px-3 py-2 rounded-md border border-border text-xs text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
      >
        More…
      </button>
    </div>
  );
}
