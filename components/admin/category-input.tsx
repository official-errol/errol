"use client"

import { useEffect, useState, type KeyboardEvent } from "react"
import { XIcon } from "@/components/ui/icons"
import {
  MAX_CATEGORIES_PER_POST,
  cleanCategoryName,
  slugifyCategory,
} from "@/lib/categories"

type Props = {
  /** Currently selected category names (case-preserved). */
  value: string[]
  onChange: (categories: string[]) => void
}

type Suggestion = { id: string; name: string; slug: string }

export function CategoryInput({ value, onChange }: Props) {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  useEffect(() => {
    let cancelled = false
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: { categories?: Suggestion[] }) => {
        if (cancelled) return
        setSuggestions(data.categories ?? [])
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const valueSlugs = new Set(value.map((v) => slugifyCategory(v)))

  function toggle(suggestion: Suggestion) {
    const isSelected = valueSlugs.has(suggestion.slug)
    if (isSelected) {
      onChange(value.filter((v) => slugifyCategory(v) !== suggestion.slug))
    } else {
      if (value.length >= MAX_CATEGORIES_PER_POST) return
      onChange([...value, suggestion.name])
    }
  }

  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index))
  }

  function addFromInput() {
    const name = cleanCategoryName(input)
    if (!name) return
    const slug = slugifyCategory(name)
    if (!slug) {
      setInput("")
      return
    }
    if (valueSlugs.has(slug)) {
      setInput("")
      return
    }
    if (value.length >= MAX_CATEGORIES_PER_POST) return
    onChange([...value, name])
    setInput("")
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      addFromInput()
    }
    if (e.key === "Backspace" && input === "" && value.length > 0) {
      remove(value.length - 1)
    }
  }

  const remainingSuggestions = suggestions.filter(
    (s) => !valueSlugs.has(s.slug),
  )

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-surface border border-border-strong text-text-primary rounded-sm font-medium"
            >
              {name}
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-text-tertiary hover:text-error transition-colors"
                aria-label={`Remove ${name}`}
              >
                <XIcon className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {remainingSuggestions.length > 0 &&
        value.length < MAX_CATEGORIES_PER_POST && (
          <div>
            <p className="text-xs text-text-tertiary mb-1.5">Existing</p>
            <div className="flex flex-wrap gap-1.5">
              {remainingSuggestions.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggle(s)}
                  className="text-xs px-2 py-1 bg-surface-subtle text-text-secondary rounded-sm hover:bg-surface hover:border hover:border-border-strong hover:text-text-primary transition-colors"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}

      {value.length < MAX_CATEGORIES_PER_POST && (
        <div className="w-full bg-surface border border-border rounded-sm px-3 py-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent-subtle transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (input.trim()) addFromInput()
            }}
            placeholder="Type a new category and press Enter…"
            maxLength={40}
            className="w-full bg-transparent border-0 outline-none text-sm text-text-primary placeholder:text-text-tertiary"
          />
          <p className="text-xs text-text-tertiary mt-1.5">
            {value.length}/{MAX_CATEGORIES_PER_POST}
          </p>
        </div>
      )}
    </div>
  )
}