"use client";

import { useMemo, useState } from "react";
import { CopyIcon, CheckIcon, XIcon } from "@/components/ui/icons";

type Decoded = {
  header: unknown;
  payload: unknown;
  signature: string;
  expired: boolean;
  expDate: string | null;
  iatDate: string | null;
};

function base64UrlDecode(input: string): string {
  let normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  while (normalized.length % 4 !== 0) normalized += "=";
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

export function JwtDecoderTool() {
  const [input, setInput] = useState("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const result = useMemo(() => {
    const trimmed = input.trim();
    if (!trimmed)
      return { decoded: null as Decoded | null, error: null as string | null };

    const parts = trimmed.split(".");
    if (parts.length !== 3) {
      return {
        decoded: null,
        error: "A JWT must have exactly 3 parts separated by dots.",
      };
    }

    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      const payloadObj = payload as Record<string, unknown>;
      const exp = typeof payloadObj.exp === "number" ? payloadObj.exp : null;
      const iat = typeof payloadObj.iat === "number" ? payloadObj.iat : null;

      return {
        decoded: {
          header,
          payload,
          signature: parts[2],
          expired: exp !== null ? exp * 1000 < Date.now() : false,
          expDate: exp ? formatDate(exp) : null,
          iatDate: iat ? formatDate(iat) : null,
        },
        error: null,
      };
    } catch (err) {
      return {
        decoded: null,
        error:
          err instanceof Error
            ? `Could not decode: ${err.message}`
            : "Could not decode JWT",
      };
    }
  }, [input]);

  async function copy(text: string, section: string) {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 1500);
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs uppercase tracking-wide text-text-tertiary font-mono">
            JWT
          </label>
          {input && (
            <button
              type="button"
              onClick={() => setInput("")}
              className="text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature"
          className="w-full h-32 bg-surface border border-border rounded-md px-3 py-2 text-sm font-mono text-text-primary resize-y focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle break-all"
        />
      </div>

      {result.error && (
        <div className="bg-error/5 border border-error/30 rounded-md p-3 text-sm text-error flex items-start gap-2">
          <XIcon className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{result.error}</span>
        </div>
      )}

      {result.decoded && (
        <div className="space-y-3">
          {/* Status bar */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {result.decoded.expDate && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm ${
                  result.decoded.expired
                    ? "bg-error/10 text-error"
                    : "bg-success/10 text-success"
                }`}
              >
                {result.decoded.expired ? "Expired" : "Valid"}
                <span className="text-xs opacity-80">
                  {result.decoded.expired ? "since" : "until"}{" "}
                  {result.decoded.expDate}
                </span>
              </span>
            )}
            {result.decoded.iatDate && (
              <span className="text-xs text-text-tertiary">
                Issued: {result.decoded.iatDate}
              </span>
            )}
          </div>

          {/* Header */}
          <Section
            title="Header"
            content={JSON.stringify(result.decoded.header, null, 2)}
            onCopy={() =>
              copy(JSON.stringify(result.decoded!.header, null, 2), "header")
            }
            copied={copiedSection === "header"}
          />

          {/* Payload */}
          <Section
            title="Payload"
            content={JSON.stringify(result.decoded.payload, null, 2)}
            onCopy={() =>
              copy(JSON.stringify(result.decoded!.payload, null, 2), "payload")
            }
            copied={copiedSection === "payload"}
          />

          {/* Signature */}
          <Section
            title="Signature"
            content={result.decoded.signature}
            note="Signature is not verified — decoding does not prove authenticity."
            onCopy={() => copy(result.decoded!.signature, "signature")}
            copied={copiedSection === "signature"}
          />
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  content,
  note,
  onCopy,
  copied,
}: {
  title: string;
  content: string;
  note?: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-surface-subtle border-b border-border">
        <h3 className="text-xs uppercase tracking-wide text-text-tertiary font-mono">
          {title}
        </h3>
        <button
          type="button"
          onClick={onCopy}
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
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-text-primary overflow-x-auto whitespace-pre-wrap break-all">
        {content}
      </pre>
      {note && (
        <div className="px-4 py-2 border-t border-border bg-surface-subtle text-xs text-text-tertiary">
          {note}
        </div>
      )}
    </div>
  );
}
