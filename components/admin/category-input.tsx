"use client"

import { useEffect, useState, type KeyboardEvent } from "react"
import { XIcon } from "@/components/ui/icons"
import {
  MAX_CATEGORIES_PER_POST,
  normalizeCategory,
  categoryDisplayName,
} from "@/lib/categories"

type Props = {
  value: string[]
  onChange: (categories: string[]) => void
  placeholder?: string
}

export function CategoryInput({
  value,
  onChange,
  placeholder = "Add a category…",
}: Props) {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: { categories?: { slug: string }[] }) => {
        if (cancelled) return
        setSuggestions((data.categories ?? []).map((c) => c.slug))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  function addCategory(raw: string) {
    const slug = normalizeCategory(raw)
    if (!slug) return
    if (value.includes(slug)) {
      setInput("")
      return
    }
    if (value.length >= MAX_CATEGORIES_PER_POST) return

    onChange([...value, slug])
    setInput("")
  }

  function removeCategory(slug: string) {
    onChange(value.filter((c) => c !== slug))
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addCategory(input)
      return
    }
    if (e.key === "Backspace" && input === "" && value.length > 0) {
      removeCategory(value[value.length - 1])
    }
  }

  const remaining = suggestions.filter((s) => !value.includes(s))
  const showSuggestions =
    focused && remaining.length > 0 && value.length < MAX_CATEGORIES_PER_POST

  return (
    <div>
      <div className="w-full bg-surface border border-border rounded-sm px-3 py-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent-subtle transition-colors">
        <div className="flex flex-wrap gap-1.5 items-center">
          {value.map((slug) => (
            <span
              key={slug}
              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-accent-subtle text-accent rounded-sm font-mono"
            >
              {slug}
              <button
                type="button"
                onClick={() => removeCategory(slug)}
                className="text-accent/70 hover:text-error transition-colors"
                aria-label={`Remove ${slug}`}
              >
                <XIcon className="w-3 h-3" />
              </button>
            </span>
          ))}

          {value.length < MAX_CATEGORIES_PER_POST && (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false)
                if (input.trim()) addCategory(input)
              }}
              placeholder={value.length === 0 ? placeholder : ""}
              maxLength={40}
              className="flex-1 min-w-[120px] bg-transparent border-0 outline-none text-sm text-text-primary placeholder:text-text-tertiary py-0.5"
            />
          )}
        </div>

        <p className="text-xs text-text-tertiary mt-1.5">
          Press <kbd className="font-mono">Enter</kbd> to add ·{" "}
          {value.length}/{MAX_CATEGORIES_PER_POST}
        </p>
      </div>

      {showSuggestions && (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {remaining.slice(0, 8).map((slug) => (
            <button
              key={slug}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                addCategory(slug)
              }}
              className="text-xs px-2 py-0.5 bg-surface-subtle text-text-secondary rounded-sm font-mono hover:bg-accent-subtle hover:text-accent transition-colors"
            >
              {categoryDisplayName(slug)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}