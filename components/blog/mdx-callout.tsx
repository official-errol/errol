import type { ReactNode } from 'react'

const ICONS = {
  info: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 2L14.5 13H1.5L8 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 7v3M8 11.5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2.5 2.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  danger: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
} as const

const VARIANTS = {
  info: { icon: 'text-accent', label: 'Note' },
  warning: { icon: 'text-warning', label: 'Warning' },
  success: { icon: 'text-success', label: 'Success' },
  danger: { icon: 'text-error', label: 'Danger' },
} as const

type Variant = keyof typeof VARIANTS

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: string
  title?: string
  children: ReactNode
}) {
  const variant = (type in VARIANTS ? type : 'info') as Variant
  const style = VARIANTS[variant]

  return (
    <div
      data-mdx-callout
      className="my-8 border-y border-border py-5"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`shrink-0 ${style.icon}`}>{ICONS[variant]}</span>
        <p className="text-xs uppercase tracking-wide text-text-tertiary font-mono">
          {title ?? style.label}
        </p>
      </div>
      <div className="text-sm text-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  )
}