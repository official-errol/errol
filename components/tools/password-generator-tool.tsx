"use client";

import { useEffect, useState } from "react";
import { CopyIcon, CheckIcon, PlusIcon } from "@/components/ui/icons";

const AMBIGUOUS = "0O1lI|`";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";

function buildAlphabet(opts: {
  lowercase: boolean;
  uppercase: boolean;
  digits: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}): string {
  let chars = "";
  if (opts.lowercase) chars += LOWERCASE;
  if (opts.uppercase) chars += UPPERCASE;
  if (opts.digits) chars += DIGITS;
  if (opts.symbols) chars += SYMBOLS;
  if (opts.excludeAmbiguous) {
    chars = chars
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }
  return chars;
}

function randomInt(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  // Rejection sampling to avoid modulo bias
  const limit = Math.floor(0xffffffff / max) * max;
  let value = array[0];
  while (value >= limit) {
    crypto.getRandomValues(array);
    value = array[0];
  }
  return value % max;
}

function generateOne(alphabet: string, length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += alphabet[randomInt(alphabet.length)];
  }
  return result;
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(20);
  const [count, setCount] = useState(5);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const alphabet = buildAlphabet({
    lowercase,
    uppercase,
    digits,
    symbols,
    excludeAmbiguous,
  });

  function generate() {
    if (!alphabet) {
      setPasswords([]);
      return;
    }
    const next: string[] = [];
    for (let i = 0; i < count; i++) {
      next.push(generateOne(alphabet, length));
    }
    setPasswords(next);
  }

  // Generate once on mount
  useEffect(() => {
    if (alphabet) {
      const next: string[] = [];
      for (let i = 0; i < count; i++) {
        next.push(generateOne(alphabet, length));
      }
      setPasswords(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function copyOne(pw: string, index: number) {
    await navigator.clipboard.writeText(pw);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }

  async function copyAll() {
    if (passwords.length === 0) return;
    await navigator.clipboard.writeText(passwords.join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  }

  const strength = (() => {
    if (!alphabet) return { label: "None", color: "text-error", pct: 0 };
    const bits = Math.log2(alphabet.length) * length;
    if (bits < 50) return { label: "Weak", color: "text-error", pct: 25 };
    if (bits < 80) return { label: "Fair", color: "text-warning", pct: 50 };
    if (bits < 110) return { label: "Strong", color: "text-success", pct: 75 };
    return { label: "Very strong", color: "text-success", pct: 100 };
  })();

  return (
    <div className="space-y-5">
      <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-text-primary mb-1.5">
              Length: <span className="font-mono">{length}</span>
            </label>
            <input
              type="range"
              min={8}
              max={128}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-text-primary mb-1.5">
              Count: <span className="font-mono">{count}</span>
            </label>
            <input
              type="range"
              min={1}
              max={20}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
            />
            Lowercase (a-z)
          </label>
          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
            Uppercase (A-Z)
          </label>
          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={digits}
              onChange={(e) => setDigits(e.target.checked)}
            />
            Digits (0-9)
          </label>
          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={symbols}
              onChange={(e) => setSymbols(e.target.checked)}
            />
            Symbols (!@#...)
          </label>
          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={(e) => setExcludeAmbiguous(e.target.checked)}
            />
            Exclude ambiguous (0/O, 1/l/I)
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={generate}
            disabled={!alphabet}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-text-inverse rounded-md text-sm hover:bg-text-primary/85 transition-colors disabled:opacity-50"
          >
            <PlusIcon className="w-3.5 h-3.5" />
            Generate {count}
          </button>

          {passwords.length > 0 && (
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
          )}

          {alphabet && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-text-tertiary">Strength:</span>
              <span className={`text-xs font-medium ${strength.color}`}>
                {strength.label}
              </span>
              <div className="w-20 h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    strength.pct >= 75
                      ? "bg-success"
                      : strength.pct >= 50
                        ? "bg-warning"
                        : "bg-error"
                  }`}
                  style={{ width: `${strength.pct}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {!alphabet && (
          <p className="text-xs text-error">
            Enable at least one character set.
          </p>
        )}
      </div>

      {passwords.length > 0 && (
        <div className="bg-surface border border-border rounded-lg divide-y divide-border">
          {passwords.map((pw, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-subtle transition-colors"
            >
              <code className="text-sm font-mono text-text-primary truncate">
                {pw}
              </code>
              <button
                type="button"
                onClick={() => copyOne(pw, i)}
                className="shrink-0 p-1.5 rounded-sm text-text-tertiary hover:text-text-primary hover:bg-surface transition-colors"
                aria-label="Copy password"
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
