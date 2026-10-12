import type { ReactNode } from 'react'

export function Steps({ children }: { children: ReactNode }) {
  return (
    <div data-mdx-steps className="my-10 space-y-8">
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
    <div className="relative pl-8">
      <div className="absolute left-0 top-[7px] w-2.5 h-2.5 rounded-full border-2 border-accent bg-background" />

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
        {title && (
          <h3 className="text-lg font-semibold text-text-primary m-0">
            {title}
          </h3>
        )}
        {subtitle && (
          <span className="inline-flex items-center gap-1.5 text-xs text-text-tertiary font-mono">
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