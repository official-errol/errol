import type { ReactNode } from 'react'

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div data-mdx-steps className="my-8 space-y-3">
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
    <div className="bg-surface border border-border rounded-lg p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent-subtle text-accent text-xs font-semibold font-mono">
            ●
          </span>
          {title && (
            <h3 className="text-base font-semibold text-text-primary m-0">
              {title}
            </h3>
          )}
        </div>
        {subtitle && (
          <span className="shrink-0 text-xs px-2 py-0.5 bg-surface-subtle text-text-tertiary rounded-sm font-mono">
            {subtitle}
          </span>
        )}
      </div>
      <div className="text-sm text-text-secondary leading-relaxed pl-10">
        {children}
      </div>
    </div>
  )
}