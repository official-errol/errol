import type { ReactNode } from 'react'

const ICONS = {
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2.5 2.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  danger: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
} as const

const VARIANTS = {
  info: {
    border: 'border-accent/40',
    icon: 'text-accent',
    label: 'Note',
  },
  warning: {
    border: 'border-warning/50',
    icon: 'text-warning',
    label: 'Warning',
  },
  success: {
    border: 'border-success/50',
    icon: 'text-success',
    label: 'Success',
  },
  danger: {
    border: 'border-error/50',
    icon: 'text-error',
    label: 'Danger',
  },
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
      className={`my-8 border-l-2 pl-5 ${style.border}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`shrink-0 ${style.icon}`}>{ICONS[variant]}</span>
        <p className="text-sm font-semibold text-text-primary">
          {title ?? style.label}
        </p>
      </div>
      <div className="text-sm text-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  )
}