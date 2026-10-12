import type { ReactNode } from 'react'

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div data-mdx-steps className="my-8 space-y-4">
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
    <div className="flex gap-4">
      <div className="shrink-0 pt-0.5">
        <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 text-xs font-mono text-text-tertiary">
          ✓
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2 flex-wrap mb-1">
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
    </div>
  )
}