export default function ProjectLoading() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16 animate-pulse">
      <div className="h-4 w-24 bg-surface-subtle rounded mb-8" />
      <div className="h-10 w-2/3 bg-surface-subtle rounded mb-3" />
      <div className="h-5 w-full bg-surface-subtle rounded mb-10" />
      <div className="w-full aspect-video bg-surface-subtle rounded-lg mb-10" />
      <div className="flex gap-3 mb-10">
        <div className="h-9 w-24 bg-surface-subtle rounded-md" />
        <div className="h-9 w-24 bg-surface-subtle rounded-md" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-full bg-surface-subtle rounded" />
        <div className="h-4 w-full bg-surface-subtle rounded" />
        <div className="h-4 w-5/6 bg-surface-subtle rounded" />
      </div>
    </article>
  );
}
