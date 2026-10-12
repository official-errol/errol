import type { ReactNode } from 'react'

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div data-mdx-steps className="not-prose my-8">
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
    <div className="relative pl-9 pb-7 last:pb-0">
      {/* Circle — sized to match the title row height */}
      <div className="absolute left-0 top-0 w-6 h-6 rounded-full border border-border bg-surface flex items-center justify-center text-sm font-medium text-text-secondary leading-none">
        <span className="mdx-step-number" />
      </div>

      {/* Dashed connector */}
      <div className="absolute left-[11px] top-6 bottom-0 w-px border-l border-dashed border-border" />

      {/* Title row — same 24px height as the circle */}
      <div className="h-6 flex items-baseline gap-2 mb-1">
        {title && (
          <span className="text-base font-semibold text-text-primary leading-6">
            {title}
          </span>
        )}
        {subtitle && (
          <span className="text-sm text-text-tertiary font-mono leading-6">
            {subtitle}
          </span>
        )}
      </div>

      <div className="text-base text-text-secondary leading-relaxed space-y-3 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}