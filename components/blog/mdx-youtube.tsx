export function YouTube({ id, title }: { id: string; title?: string }) {
  if (!id) return null

  return (
    <div
      data-mdx-youtube
      className="not-prose my-8 aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface-subtle"
    >
      <iframe
        src={`https://www.youtube.com/embed/${id}?origin=${encodeURIComponent(
          typeof window !== 'undefined' ? window.location.origin : ''
        )}&rel=0`}
        title={title ?? 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full h-full"
      />
    </div>
  )
}