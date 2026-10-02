export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div>
        <div className="h-9 w-40 bg-surface-subtle rounded mb-2" />
        <div className="h-4 w-64 bg-surface-subtle rounded" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-lg p-6"
          >
            <div className="h-3 w-16 bg-surface-subtle rounded mb-3" />
            <div className="h-7 w-20 bg-surface-subtle rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
