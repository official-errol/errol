import type { ReactNode } from 'react'

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div
      data-mdx-steps
      className="my-8 space-y-3 border-l-2 border-border pl-5"
    >
      {children}
    </div>
  )
}

export function Step({
  title,
  subtitle,
  children,
}: {
  title?: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="relative">
      <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full border-2 border-accent bg-background" />

      <div className="flex items-baseline gap-2 flex-wrap mb-1">
        {title && (
          <h3 className="text-base font-semibold text-text-primary m-0">
            {title}
          </h3>
        )}
        {subtitle && (
          <span className="text-xs px-2 py-0.5 bg-surface-subtle text-text-tertiary rounded-sm font-mono">
            {subtitle}
          </span>
        )}
      </div>

      <div className="text-sm text-text-secondary leading-relaxed">
        {children}
      </div>
    </div>
  )
}