"use client";

import { useMemo, useState } from "react";
import { CopyIcon, CheckIcon, XIcon } from "@/components/ui/icons";

type Mode = "encode" | "decode";
type Scope = "component" | "full";

export function UrlEncoderTool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [scope, setScope] = useState<Scope>("component");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };
    try {
      let output: string;
      if (mode === "encode") {
        output =
          scope === "component" ? encodeURIComponent(input) : encodeURI(input);
      } else {
        output =
          scope === "component" ? decodeURIComponent(input) : decodeURI(input);
      }
      return { output, error: null };
    } catch (err) {
      return {
        output: "",
        error: err instanceof Error ? err.message : "Invalid input",
      };
    }
  }, [input, mode, scope]);

  async function handleCopy() {
    if (!result.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex bg-surface-subtle border border-border rounded-md p-0.5">
          <button
            type="button"
            onClick={() => setMode("encode")}
            className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
              mode === "encode"
                ? "bg-surface text-text-primary font-medium shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Encode
          </button>
          <button
            type="button"
            onClick={() => setMode("decode")}
            className={`px-3 py-1.5 text-sm rounded-sm transition-colors ${
              mode === "decode"
                ? "bg-surface text-text-primary font-medium shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Decode
          </button>
        </div>

        <div className="inline-flex bg-surface-subtle border border-border rounded-md p-0.5">
          <button
            type="button"
            onClick={() => setScope("component")}
            className={`px-3 py-1.5 text-xs rounded-sm transition-colors ${
              scope === "component"
                ? "bg-surface text-text-primary font-medium shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Component
          </button>
          <button
            type="button"
            onClick={() => setScope("full")}
            className={`px-3 py-1.5 text-xs rounded-sm transition-colors ${
              scope === "full"
                ? "bg-surface text-text-primary font-medium shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Full URI
          </button>
        </div>

        <div className="flex-1" />

        {input && (
          <button
            type="button"
            onClick={() => setInput("")}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="block text-xs uppercase tracking-wide text-text-tertiary font-mono mb-2">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder={
              mode === "encode"
                ? "hello world & more"
                : "hello%20world%20%26%20more"
            }
            className="w-full h-64 bg-surface border border-border rounded-md px-3 py-2 text-sm font-mono text-text-primary resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
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
            <div className="h-64 bg-error/5 border border-error/30 rounded-md p-3 text-sm text-error font-mono overflow-auto">
              <div className="flex items-start gap-2">
                <XIcon className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{result.error}</span>
              </div>
            </div>
          ) : (
            <textarea
              value={result.output}
              readOnly
              spellCheck={false}
              placeholder="Output appears here"
              className="w-full h-64 bg-surface-subtle border border-border rounded-md px-3 py-2 text-sm font-mono text-text-primary resize-y focus:outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
}
