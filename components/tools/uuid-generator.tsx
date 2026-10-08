"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon, PlusIcon, XIcon } from "@/components/ui/icons";

function generateUuid(): string {
  const c = crypto as Crypto;

  if (typeof c.randomUUID === "function") {
    return c.randomUUID();
  }

  const bytes = new Uint8Array(16);
  c.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(
    "",
  );
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  function format(uuid: string) {
    let result = uuid;
    if (noDashes) result = result.replace(/-/g, "");
    if (uppercase) result = result.toUpperCase();
    return result;
  }

  function generate() {
    const next: string[] = [];
    for (let i = 0; i < count; i++) {
      next.push(format(generateUuid()));
    }
    setUuids(next);
  }

  async function copyOne(uuid: string, index: number) {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }

  async function copyAll() {
    if (uuids.length === 0) return;
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  }

  function clear() {
    setUuids([]);
  }

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-text-primary">Count:</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) =>
                setCount(
                  Math.max(1, Math.min(100, parseInt(e.target.value) || 1)),
                )
              }
              className="w-20 bg-surface border border-border rounded-sm px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
            Uppercase
          </label>

          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={noDashes}
              onChange={(e) => setNoDashes(e.target.checked)}
            />
            No dashes
          </label>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={generate}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-text-inverse rounded-md text-sm hover:bg-text-primary/85 transition-colors"
          >
            <PlusIcon className="w-3.5 h-3.5" />
            Generate {count} {count === 1 ? "UUID" : "UUIDs"}
          </button>

          {uuids.length > 0 && (
            <>
              <button
                type="button"
                onClick={copyAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle transition-colors"
              >
                {copiedAll ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5" />
                    Copied all
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5" />
                    Copy all
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-text-secondary hover:text-text-primary rounded-md text-sm transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* Results */}
      {uuids.length > 0 && (
        <div className="bg-surface border border-border rounded-lg divide-y divide-border overflow-hidden">
          {uuids.map((uuid, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 px-4 py-3 group hover:bg-surface-subtle transition-colors"
            >
              <code className="text-sm font-mono text-text-primary truncate">
                {uuid}
              </code>
              <button
                type="button"
                onClick={() => copyOne(uuid, i)}
                className="shrink-0 p-1.5 rounded-sm text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors"
                aria-label="Copy UUID"
              >
                {copiedIndex === i ? (
                  <CheckIcon className="w-3.5 h-3.5 text-success" />
                ) : (
                  <CopyIcon className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
