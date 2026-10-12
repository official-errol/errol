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
    <div data-mdx-elicitations className="my-10 pt-8 border-t border-border">
      {message && (
        <p className="text-xs uppercase tracking-wide text-text-tertiary font-mono mb-4">
          {message}
        </p>
      )}
      <div className="space-y-1">
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
      className="group flex items-center gap-3 w-full py-2.5 text-left text-sm text-text-secondary hover:text-text-primary transition-colors"
    >
      <span className="shrink-0 text-text-tertiary group-hover:text-accent transition-colors">
        {copied ? (
          <CheckIcon className="w-3.5 h-3.5" />
        ) : (
          <CopyIcon className="w-3.5 h-3.5" />
        )}
      </span>
      <span className="flex-1 min-w-0 truncate">{label}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0 text-text-tertiary opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all"
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