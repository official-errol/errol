import type { ReactNode } from 'react'

const ICONS = {
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 7v4M8 5h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
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
      <path
        d="M8 7v3M8 11.5h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 5.5l5 5M10.5 5.5l-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
} as const

const STYLES = {
  info: {
    wrap: 'bg-accent-subtle/50 border-accent/30',
    icon: 'text-accent',
    title: 'text-accent',
  },
  warning: {
    wrap: 'bg-warning/10 border-warning/30',
    icon: 'text-warning',
    title: 'text-warning',
  },
  success: {
    wrap: 'bg-success/10 border-success/30',
    icon: 'text-success',
    title: 'text-success',
  },
  danger: {
    wrap: 'bg-error/10 border-error/30',
    icon: 'text-error',
    title: 'text-error',
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
      className={`my-6 border rounded-lg p-4 flex gap-3 ${style.wrap}`}
    >
      <div className={`shrink-0 mt-0.5 ${style.icon}`}>
        {ICONS[variant]}
      </div>
      <div className="min-w-0 flex-1">
        {title && (
          <p className={`text-sm font-semibold mb-1.5 ${style.title}`}>
            {title}
          </p>
        )}
        <div className="text-sm text-text-secondary leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}