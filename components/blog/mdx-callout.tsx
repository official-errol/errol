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
      <path
        d="M5 8l2.5 2.5L11 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
  info: { border: 'border-l-accent', icon: 'text-accent', label: 'Note' },
  warning: { border: 'border-l-warning', icon: 'text-warning', label: 'Warning' },
  success: { border: 'border-l-success', icon: 'text-success', label: 'Success' },
  danger: { border: 'border-l-error', icon: 'text-error', label: 'Danger' },
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
      className={`not-prose my-6 border-l-2 pl-4 ${style.border}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`shrink-0 ${style.icon}`}>{ICONS[variant]}</span>
        <p className="text-base font-semibold text-text-primary">
          {title ?? style.label}
        </p>
      </div>
      <div className="text-base text-text-secondary leading-relaxed space-y-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}