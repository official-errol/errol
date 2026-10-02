import { HardDriveIcon } from "@/components/ui/icons";

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

export function StorageUsage({
  totalBytes,
  limitBytes,
}: {
  totalBytes: number;
  limitBytes: number;
}) {
  const pct = Math.min(100, (totalBytes / limitBytes) * 100);
  const warning = pct > 80;
  const critical = pct > 95;
  const remaining = Math.max(0, limitBytes - totalBytes);

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HardDriveIcon className="w-4 h-4 text-text-secondary" />
          <h2 className="text-sm font-medium text-text-primary">
            Storage usage
          </h2>
        </div>
        <span className="text-sm text-text-secondary font-mono">
          {formatBytes(totalBytes)} / {formatBytes(limitBytes)}
        </span>
      </div>

      <div className="w-full h-2 bg-surface-subtle rounded-full overflow-hidden mb-3">
        <div
          className={`h-full transition-all ${
            critical ? "bg-error" : warning ? "bg-warning" : "bg-accent"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-text-tertiary">
        <span>{pct.toFixed(1)}% used</span>
        <span>{formatBytes(remaining)} remaining</span>
      </div>
    </div>
  );
}
