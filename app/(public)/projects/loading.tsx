export default function ProjectsLoading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="h-10 w-40 bg-surface-subtle rounded mb-2 animate-pulse" />
      <div className="h-4 w-64 bg-surface-subtle rounded mb-12 animate-pulse" />
      <div className="grid gap-6 md:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-lg overflow-hidden animate-pulse"
          >
            <div className="w-full aspect-video bg-surface-subtle" />
            <div className="p-6">
              <div className="h-5 w-2/3 bg-surface-subtle rounded mb-3" />
              <div className="h-4 w-full bg-surface-subtle rounded mb-2" />
              <div className="h-4 w-3/4 bg-surface-subtle rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
