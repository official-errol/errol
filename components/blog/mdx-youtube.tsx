export function YouTube({ id, title }: { id: string; title?: string }) {
  if (!id) return null

  return (
    <div
      data-mdx-youtube
      className="my-8 aspect-video w-full overflow-hidden rounded-lg border border-border bg-surface-subtle"
    >
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title ?? 'YouTube video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="w-full h-full"
      />
    </div>
  )
}