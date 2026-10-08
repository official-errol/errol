export default function Loading() {
  return (
    <div className="space-y-4">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-surface border border-border rounded-lg p-4 animate-pulse"
        >
          <div className="h-4 w-1/3 bg-surface-subtle rounded mb-2" />
          <div className="h-3 w-full bg-surface-subtle rounded mb-1" />
          <div className="h-3 w-2/3 bg-surface-subtle rounded" />
        </div>
      ))}
    </div>
  );
}
