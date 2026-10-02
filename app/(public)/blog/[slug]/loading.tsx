export default function PostLoading() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16 animate-pulse">
      <div className="h-10 w-3/4 bg-surface-subtle rounded mb-4" />
      <div className="h-4 w-32 bg-surface-subtle rounded mb-12" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-surface-subtle rounded" />
        <div className="h-4 w-full bg-surface-subtle rounded" />
        <div className="h-4 w-5/6 bg-surface-subtle rounded" />
        <div className="h-4 w-full bg-surface-subtle rounded" />
        <div className="h-4 w-4/5 bg-surface-subtle rounded" />
      </div>
    </article>
  );
}
