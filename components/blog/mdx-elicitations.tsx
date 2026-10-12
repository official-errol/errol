'use client'

import { useState, type ReactNode } from 'react'
import { useToast } from '@/components/ui/toast'

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
      <div className="space-y-1">{children}</div>
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
      className="group flex items-center gap-3 w-full text-left py-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
    >
      <span className="shrink-0 text-text-tertiary group-hover:text-accent transition-colors">
        {copied ? '✓' : '→'}
      </span>
      <span className="flex-1 min-w-0 truncate">{label}</span>
    </button>
  )
}