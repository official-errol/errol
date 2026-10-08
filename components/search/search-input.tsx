"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, XIcon } from "@/components/ui/icons";

const DEBOUNCE_MS = 300;
const MIN_LENGTH = 2;

export function SearchInput({ initialValue }: { initialValue: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);
  const lastPushedRef = useRef(initialValue);

  // Autofocus on mount only when empty
  useEffect(() => {
    if (!initialValue) inputRef.current?.focus();
  }, [initialValue]);

  // Debounced URL update
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const trimmed = value.trim();

    // Don't update URL if nothing changed
    if (trimmed === lastPushedRef.current) return;

    const handle = setTimeout(() => {
      const params = new URLSearchParams();
      if (trimmed.length >= MIN_LENGTH) {
        params.set("q", trimmed);
      }
      const url = params.toString() ? `/search?${params}` : "/search";
      lastPushedRef.current = trimmed;
      router.replace(url, { scroll: false });
    }, DEBOUNCE_MS);

    return () => clearTimeout(handle);
  }, [value, router]);

  function handleClear() {
    setValue("");
    lastPushedRef.current = "";
    router.replace("/search", { scroll: false });
    inputRef.current?.focus();
  }

  return (
    <div className="relative mb-10">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search posts, projects, files…"
        maxLength={100}
        autoComplete="off"
        spellCheck={false}
        className="w-full bg-surface border border-border rounded-md pl-9 pr-10 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle transition-shadow"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-sm text-text-tertiary hover:text-text-primary hover:bg-surface-subtle transition-colors"
          aria-label="Clear search"
        >
          <XIcon className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
