"use client";

import { useEffect } from "react";
import { CopyIcon, CheckIcon } from "@/components/ui/icons";

export function CodeBlockEnhancer() {
  useEffect(() => {
    // Track which blocks we've already enhanced
    const enhanced = new WeakSet<HTMLElement>();

    function enhance(container: HTMLElement) {
      const blocks = container.querySelectorAll("pre > code");
      blocks.forEach((block) => {
        const pre = block.parentElement as HTMLPreElement;
        if (!pre || enhanced.has(pre)) return;
        enhanced.add(pre);

        // Make the pre relatively positioned so we can absolutely place the button
        pre.style.position = "relative";
        pre.classList.add("group");

        const button = document.createElement("button");
        button.type = "button";
        button.className =
          "absolute top-2 right-2 z-10 p-1.5 rounded-md border border-border bg-surface text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity hover:text-text-primary hover:border-border-strong";
        button.setAttribute("aria-label", "Copy code");
        button.innerHTML = copySvg;

        button.addEventListener("click", async () => {
          const text = block.textContent ?? "";
          try {
            await navigator.clipboard.writeText(text);
            button.innerHTML = checkSvg;
            button.classList.add("text-success");
            setTimeout(() => {
              button.innerHTML = copySvg;
              button.classList.remove("text-success");
            }, 1500);
          } catch {
            // silent
          }
        });

        pre.appendChild(button);
      });
    }

    // Initial pass
    enhance(document.body);

    // Watch for content changes (e.g. tab switch, dynamic load)
    const observer = new MutationObserver(() => {
      enhance(document.body);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}

const copySvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="6" y="6" width="8" height="8" rx="1" stroke="currentColor" stroke-width="1.25"/><path d="M10 6V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h3" stroke="currentColor" stroke-width="1.25"/></svg>`;

const checkSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
