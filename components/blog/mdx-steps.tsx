import type { ReactNode } from 'react'

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div data-mdx-steps className="my-8 divide-y divide-border border-y border-border">
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
    <div className="py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
        {title && (
          <h3 className="text-base font-semibold text-text-primary m-0">
            {title}
          </h3>
        )}
        {subtitle && (
          <span className="text-xs text-text-tertiary font-mono">
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