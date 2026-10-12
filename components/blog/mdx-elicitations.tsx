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
    <div className="not-prose my-8 border-t border-border pt-6">
      {message && (
        <p className="text-xs uppercase tracking-wide text-text-tertiary font-mono mb-3">
          {message}
        </p>
      )}
      <div className="flex flex-wrap gap-2">{children}</div>
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
      className="group inline-flex items-center gap-2 text-sm px-3 py-2 bg-surface border border-border rounded-md text-text-primary hover:border-accent hover:bg-accent-subtle transition-colors text-left"
    >
      <span className="shrink-0 text-text-tertiary group-hover:text-accent transition-colors">
        {copied ? (
          <CheckIcon className="w-3.5 h-3.5" />
        ) : (
          <CopyIcon className="w-3.5 h-3.5" />
        )}
      </span>
      <span>{label}</span>
    </button>
  )
}