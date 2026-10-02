export default function BlogLoading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="h-10 w-32 bg-surface-subtle rounded mb-8 animate-pulse" />
      <div className="space-y-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-lg p-6 animate-pulse"
          >
            <div className="h-6 w-2/3 bg-surface-subtle rounded mb-3" />
            <div className="h-4 w-full bg-surface-subtle rounded mb-2" />
            <div className="h-4 w-4/5 bg-surface-subtle rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
