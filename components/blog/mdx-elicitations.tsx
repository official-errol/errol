'use client'

import { useState, type ReactNode } from 'react'

export function Elicitations({
  message,
  children,
}: {
  message?: string
  children: ReactNode
}) {
  return (
    <div data-mdx-elicitations className="not-prose my-8">
      {message && (
        <p className="text-base text-text-secondary leading-relaxed mb-3">
          {message}
        </p>
      )}
      <div className="divide-y divide-border border-y border-border">
        {children}
      </div>
    </div>
  )
}

export function Elicitation({
  label,
  query,
}: {
  label: string
  query: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group flex items-center gap-3 w-full py-3 text-left text-base text-text-primary hover:text-accent transition-colors"
      >
        <span className="flex-1 min-w-0 font-medium">{label}</span>
        <span
          className={`shrink-0 text-text-tertiary transition-transform duration-150 ${
            open ? 'rotate-90' : ''
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 3l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="pb-3">
          <p className="text-base text-text-secondary leading-relaxed">
            {query}
          </p>
        </div>
      )}
    </div>
  )
}