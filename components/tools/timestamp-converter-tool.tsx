"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon, ClockIcon } from "@/components/ui/icons";

function detectUnit(value: number): "seconds" | "milliseconds" {
  // 10 digits → seconds, 13 digits → milliseconds
  const abs = Math.abs(value);
  if (abs < 1e11) return "seconds";
  return "milliseconds";
}

function formatAll(ms: number) {
  const date = new Date(ms);
  if (isNaN(date.getTime())) return null;

  const seconds = Math.floor(ms / 1000);

  return {
    seconds: String(seconds),
    milliseconds: String(ms),
    local: date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }),
    utc: date.toUTCString(),
    iso: date.toISOString(),
    relative: getRelative(date),
  };
}

function getRelative(date: Date): string {
  const diff = date.getTime() - Date.now();
  const abs = Math.abs(diff);
  const future = diff > 0;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  let label: string;
  if (abs < minute) label = "less than a minute";
  else if (abs < hour)
    label = `${Math.round(abs / minute)} minute${Math.round(abs / minute) === 1 ? "" : "s"}`;
  else if (abs < day)
    label = `${Math.round(abs / hour)} hour${Math.round(abs / hour) === 1 ? "" : "s"}`;
  else if (abs < month)
    label = `${Math.round(abs / day)} day${Math.round(abs / day) === 1 ? "" : "s"}`;
  else if (abs < year)
    label = `${Math.round(abs / month)} month${Math.round(abs / month) === 1 ? "" : "s"}`;
  else
    label = `${Math.round(abs / year)} year${Math.round(abs / year) === 1 ? "" : "s"}`;

  return future ? `in ${label}` : `${label} ago`;
}

export function TimestampConverterTool() {
  const [timestamp, setTimestamp] = useState(
    String(Math.floor(Date.now() / 1000)),
  );
  const [datetimeLocal, setDatetimeLocal] = useState(() => {
    const d = new Date();
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().slice(0, 19);
  });
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  function setNow() {
    const d = new Date();
    setTimestamp(String(Math.floor(d.getTime() / 1000)));
    const offset = d.getTimezoneOffset() * 60000;
    setDatetimeLocal(new Date(d.getTime() - offset).toISOString().slice(0, 19));
  }

  const parsedTs = Number(timestamp.trim());
  const tsResult =
    !isNaN(parsedTs) && timestamp.trim() !== ""
      ? (() => {
          const unit = detectUnit(parsedTs);
          const ms = unit === "seconds" ? parsedTs * 1000 : parsedTs;
          return formatAll(ms);
        })()
      : null;

  const dateResult = (() => {
    const parsed = new Date(datetimeLocal);
    if (isNaN(parsed.getTime())) return null;
    return formatAll(parsed.getTime());
  })();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={setNow}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle transition-colors"
        >
          <ClockIcon className="w-3.5 h-3.5" />
          Now
        </button>
      </div>

      {/* Timestamp → Date */}
      <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
        <label className="block text-xs uppercase tracking-wide text-text-tertiary font-mono">
          Timestamp
        </label>
        <input
          type="text"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="1696800000"
          spellCheck={false}
          className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        />

        {tsResult && (
          <div className="grid gap-2 pt-2">
            <Row
              label="Local"
              value={tsResult.local}
              onCopy={copy}
              copied={copied}
              rowKey="ts-local"
            />
            <Row
              label="UTC"
              value={tsResult.utc}
              onCopy={copy}
              copied={copied}
              rowKey="ts-utc"
            />
            <Row
              label="ISO 8601"
              value={tsResult.iso}
              onCopy={copy}
              copied={copied}
              rowKey="ts-iso"
            />
            <Row
              label="Seconds"
              value={tsResult.seconds}
              onCopy={copy}
              copied={copied}
              rowKey="ts-s"
              mono
            />
            <Row
              label="Milliseconds"
              value={tsResult.milliseconds}
              onCopy={copy}
              copied={copied}
              rowKey="ts-ms"
              mono
            />
            <Row
              label="Relative"
              value={tsResult.relative}
              onCopy={copy}
              copied={copied}
              rowKey="ts-rel"
            />
          </div>
        )}
      </div>

      {/* Date → Timestamp */}
      <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
        <label className="block text-xs uppercase tracking-wide text-text-tertiary font-mono">
          Date & time (local)
        </label>
        <input
          type="datetime-local"
          step="1"
          value={datetimeLocal}
          onChange={(e) => setDatetimeLocal(e.target.value)}
          className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        />

        {dateResult && (
          <div className="grid gap-2 pt-2">
            <Row
              label="Seconds"
              value={dateResult.seconds}
              onCopy={copy}
              copied={copied}
              rowKey="d-s"
              mono
            />
            <Row
              label="Milliseconds"
              value={dateResult.milliseconds}
              onCopy={copy}
              copied={copied}
              rowKey="d-ms"
              mono
            />
            <Row
              label="ISO 8601"
              value={dateResult.iso}
              onCopy={copy}
              copied={copied}
              rowKey="d-iso"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  onCopy,
  copied,
  rowKey,
  mono,
}: {
  label: string;
  value: string;
  onCopy: (v: string, k: string) => void;
  copied: string | null;
  rowKey: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-border last:border-0">
      <span className="text-xs text-text-tertiary shrink-0 w-24">{label}</span>
      <span
        className={`flex-1 text-sm text-text-primary truncate ${
          mono ? "font-mono" : ""
        }`}
        title={value}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onCopy(value, rowKey)}
        className="shrink-0 p-1 rounded-sm text-text-tertiary hover:text-text-primary transition-colors"
        aria-label="Copy"
      >
        {copied === rowKey ? (
          <CheckIcon className="w-3 h-3 text-success" />
        ) : (
          <CopyIcon className="w-3 h-3" />
        )}
      </button>
    </div>
  );
}
