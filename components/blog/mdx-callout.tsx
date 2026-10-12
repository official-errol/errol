import type { ReactNode } from 'react'

const VARIANTS = {
  info: {
    border: 'border-l-accent',
    text: 'text-accent',
    label: 'Note',
  },
  warning: {
    border: 'border-l-warning',
    text: 'text-warning',
    label: 'Warning',
  },
  success: {
    border: 'border-l-success',
    text: 'text-success',
    label: 'Success',
  },
  danger: {
    border: 'border-l-error',
    text: 'text-error',
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
      className={`my-6 border-l-2 pl-4 ${style.border}`}
    >
      <p className={`text-xs uppercase tracking-wide font-mono mb-2 ${style.text}`}>
        {title ?? style.label}
      </p>
      <div className="text-sm text-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  )
}