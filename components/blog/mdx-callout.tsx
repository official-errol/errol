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

const STYLES = {
  info: {
    wrap: 'bg-surface border-border',
    iconWrap: 'bg-accent-subtle text-accent',
    title: 'text-text-primary',
    label: 'Note',
  },
  warning: {
    wrap: 'bg-surface border-border',
    iconWrap: 'bg-warning/10 text-warning',
    title: 'text-text-primary',
    label: 'Warning',
  },
  success: {
    wrap: 'bg-surface border-border',
    iconWrap: 'bg-success/10 text-success',
    title: 'text-text-primary',
    label: 'Success',
  },
  danger: {
    wrap: 'bg-surface border-border',
    iconWrap: 'bg-error/10 text-error',
    title: 'text-text-primary',
    label: 'Danger',
  },
} as const

type CalloutType = keyof typeof STYLES

export function Callout({
  type = 'info',
  title,
  children,
}: {
  type?: string
  title?: string
  children: ReactNode
}) {
  const variant = (type in STYLES ? type : 'info') as CalloutType
  const style = STYLES[variant]

  return (
    <div
      data-mdx-callout
      className={`my-6 border rounded-lg p-5 flex gap-4 ${style.wrap}`}
    >
      <div
        className={`shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${style.iconWrap}`}
      >
        {ICONS[variant]}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-text-primary mb-2">
          {title ?? style.label}
        </p>
        <div className="text-sm text-text-secondary leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}