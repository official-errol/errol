"use client";

import { useMemo, useState } from "react";
import { CopyIcon, CheckIcon, XIcon } from "@/components/ui/icons";

type Mode = "format" | "minify";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("format");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };
    try {
      const parsed = JSON.parse(input);
      const output =
        mode === "format"
          ? JSON.stringify(parsed, null, indent)
          : JSON.stringify(parsed);
      return { output, error: null };
    } catch (err) {
      return {
        output: "",
        error: err instanceof Error ? err.message : "Invalid JSON",
      };
    }
  }, [input, mode, indent]);

  async function handleCopy() {
    if (!result.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent
    }
  }

  function handleClear() {
    setInput("");
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex bg-surface-subtle border border-border rounded-md p-0.5">
          <button
            type="button"
            onClick={() => setMode("format")}
            className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
              mode === "format"
                ? "bg-surface text-text-primary font-medium shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Format
          </button>
          <button
            type="button"
            onClick={() => setMode("minify")}
            className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
              mode === "minify"
                ? "bg-surface text-text-primary font-medium shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Minify
          </button>
        </div>

        {mode === "format" && (
          <select
            value={indent}
            onChange={(e) => setIndent(parseInt(e.target.value))}
            className="bg-surface border border-border rounded-md px-3 py-1.5 text-sm text-text-primary"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        )}

        <div className="flex-1" />

        {input && (
          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="block text-xs uppercase tracking-wide text-text-tertiary font-mono mb-2">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello": "world"}'
            spellCheck={false}
            className="w-full h-72 bg-surface border border-border rounded-md px-3 py-2 text-sm font-mono text-text-primary resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs uppercase tracking-wide text-text-tertiary font-mono">
              Output
            </label>
            {result.output && (
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            )}
          </div>

          {result.error ? (
            <div className="h-72 bg-error/5 border border-error/30 rounded-md p-3 text-sm text-error font-mono overflow-auto">
              <div className="flex items-start gap-2 mb-2">
                <XIcon className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-sans font-medium">Invalid JSON</span>
              </div>
              <p className="text-xs">{result.error}</p>
            </div>
          ) : (
            <textarea
              value={result.output}
              readOnly
              placeholder="Output will appear here"
              spellCheck={false}
              className="w-full h-72 bg-surface-subtle border border-border rounded-md px-3 py-2 text-sm font-mono text-text-primary resize-y focus:outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
}
