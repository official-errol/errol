"use client";

import { useState, type KeyboardEvent } from "react";
import { XIcon } from "@/components/ui/icons";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
};

export function TagInput({
  value,
  onChange,
  placeholder = "Add a tag…",
  maxTags = 10,
}: Props) {
  const [input, setInput] = useState("");

  function normalize(raw: string) {
    return raw
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-+/g, "-")
      .slice(0, 30);
  }

  function addTag(raw: string) {
    const tag = normalize(raw);
    if (!tag) return;
    if (value.includes(tag)) {
      setInput("");
      return;
    }
    if (value.length >= maxTags) return;

    onChange([...value, tag]);
    setInput("");
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
      return;
    }

    if (e.key === "Backspace" && input === "" && value.length > 0) {
      // Remove the last tag when the input is empty and user hits backspace
      removeTag(value[value.length - 1]);
    }
  }

  return (
    <div className="w-full bg-surface border border-border rounded-sm px-3 py-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent-subtle transition-colors">
      <div className="flex flex-wrap gap-1.5 items-center">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-surface-subtle text-text-primary rounded-sm font-mono"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-text-tertiary hover:text-error transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <XIcon className="w-3 h-3" />
            </button>
          </span>
        ))}

        {value.length < maxTags && (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (input.trim()) addTag(input);
            }}
            placeholder={value.length === 0 ? placeholder : ""}
            maxLength={30}
            className="flex-1 min-w-[100px] bg-transparent border-0 outline-none text-sm text-text-primary placeholder:text-text-tertiary py-0.5"
          />
        )}
      </div>

      <p className="text-xs text-text-tertiary mt-1.5">
        Press <kbd className="font-mono">Enter</kbd> or{" "}
        <kbd className="font-mono">,</kbd> to add · {value.length}/{maxTags}
      </p>
    </div>
  );
}
