'use client'

import { useState, type ReactNode } from 'react'
import { useToast } from '@/components/ui/toast'
import { CopyIcon, CheckIcon } from '@/components/ui/icons'

export function Elicitations({
  message,
  children,
}: {
  message?: string
  children: ReactNode
}) {
  return (
    <div data-mdx-elicitations className="my-8">
      {message && (
        <p className="text-xs uppercase tracking-wide text-text-tertiary font-mono mb-3">
          {message}
        </p>
      )}
      <div className="grid gap-2 sm:grid-cols-2">{children}</div>
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
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(query)
      setCopied(true)
      toast('Query copied to clipboard', 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast('Could not copy', 'error')
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={query}
      className="group flex items-center gap-3 w-full bg-surface border border-border rounded-lg px-4 py-3 text-left text-sm text-text-primary hover:border-accent hover:bg-accent-subtle transition-colors"
    >
      <span className="shrink-0 text-text-tertiary group-hover:text-accent transition-colors">
        {copied ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <CopyIcon className="w-4 h-4" />
        )}
      </span>
      <span className="flex-1 min-w-0 truncate">{label}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0 text-text-tertiary group-hover:text-accent transition-colors"
      >
        <path
          d="M6 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}