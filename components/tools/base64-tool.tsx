"use client";

import { useMemo, useState } from "react";
import { CopyIcon, CheckIcon, XIcon } from "@/components/ui/icons";

type Mode = "encode" | "decode";

function encodeBase64(text: string, urlSafe: boolean): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  let result = btoa(binary);
  if (urlSafe) {
    result = result.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return result;
}

function decodeBase64(input: string, urlSafe: boolean): string {
  let normalized = input.trim();
  if (urlSafe || /[-_]/.test(normalized)) {
    normalized = normalized.replace(/-/g, "+").replace(/_/g, "/");
  }
  // Re-add padding
  while (normalized.length % 4 !== 0) normalized += "=";
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export function Base64Tool() {
  const [mode, setMode] = useState<Mode>("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input.trim()) return { output: "", error: null };
    try {
      const output =
        mode === "encode"
          ? encodeBase64(input, urlSafe)
          : decodeBase64(input, urlSafe);
      return { output, error: null };
    } catch (err) {
      return {
        output: "",
        error: err instanceof Error ? err.message : "Invalid input",
      };
    }
  }, [input, mode, urlSafe]);

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

        <label className="flex items-center gap-2 text-sm text-text-primary">
          <input
            type="checkbox"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
          />
          URL-safe
        </label>

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
            {mode === "encode" ? "Text" : "Base64"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            placeholder={
              mode === "encode" ? "Hello, world!" : "SGVsbG8sIHdvcmxkIQ=="
            }
            className="w-full h-64 bg-surface border border-border rounded-md px-3 py-2 text-sm font-mono text-text-primary resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs uppercase tracking-wide text-text-tertiary font-mono">
              {mode === "encode" ? "Base64" : "Text"}
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
