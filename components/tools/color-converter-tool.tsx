"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon, PaletteIcon } from "@/components/ui/icons";

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(clean)) return null;
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;

  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (h < 60) [rp, gp, bp] = [c, x, 0];
  else if (h < 120) [rp, gp, bp] = [x, c, 0];
  else if (h < 180) [rp, gp, bp] = [0, c, x];
  else if (h < 240) [rp, gp, bp] = [0, x, c];
  else if (h < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

export function ColorConverterTool() {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState<RGB>({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState<HSL>({ h: 217, s: 91, l: 60 });
  const [copied, setCopied] = useState<string | null>(null);

  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  function updateFromHex(value: string) {
    setHex(value);
    const parsed = hexToRgb(value);
    if (parsed) {
      setRgb(parsed);
      setHsl(rgbToHsl(parsed));
    }
  }

  function updateFromRgb(next: RGB) {
    setRgb(next);
    setHex(rgbToHex(next));
    setHsl(rgbToHsl(next));
  }

  function updateFromHsl(next: HSL) {
    setHsl(next);
    const nextRgb = hslToRgb(next);
    setRgb(nextRgb);
    setHex(rgbToHex(nextRgb));
  }

  function updateFromPicker(value: string) {
    updateFromHex(value);
  }

  async function copy(value: string, key: string) {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div className="flex items-center gap-4 bg-surface border border-border rounded-lg p-4">
        <div
          className="w-20 h-20 rounded-md border border-border shrink-0"
          style={{ background: rgbString }}
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-text-primary mb-1">
            <PaletteIcon className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
            Color preview
          </p>
          <p className="text-xs font-mono text-text-secondary">{hex}</p>
        </div>
        <input
          type="color"
          value={hex.length === 7 ? hex : "#3B82F6"}
          onChange={(e) => updateFromPicker(e.target.value)}
          className="w-10 h-10 rounded-sm border border-border cursor-pointer shrink-0"
          aria-label="Pick color"
        />
      </div>

      {/* HEX */}
      <div className="bg-surface border border-border rounded-lg p-4 space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wide text-text-tertiary font-mono">
            HEX
          </label>
          <CopyButton
            value={hex}
            onCopy={() => copy(hex, "hex")}
            copied={copied === "hex"}
          />
        </div>
        <input
          type="text"
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          spellCheck={false}
          className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        />
      </div>

      {/* RGB */}
      <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wide text-text-tertiary font-mono">
            RGB
          </label>
          <CopyButton
            value={rgbString}
            onCopy={() => copy(rgbString, "rgb")}
            copied={copied === "rgb"}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ChannelInput
            label="R"
            value={rgb.r}
            onChange={(v) => updateFromRgb({ ...rgb, r: v })}
          />
          <ChannelInput
            label="G"
            value={rgb.g}
            onChange={(v) => updateFromRgb({ ...rgb, g: v })}
          />
          <ChannelInput
            label="B"
            value={rgb.b}
            onChange={(v) => updateFromRgb({ ...rgb, b: v })}
          />
        </div>
      </div>

      {/* HSL */}
      <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs uppercase tracking-wide text-text-tertiary font-mono">
            HSL
          </label>
          <CopyButton
            value={hslString}
            onCopy={() => copy(hslString, "hsl")}
            copied={copied === "hsl"}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <ChannelInput
            label="H"
            value={hsl.h}
            max={360}
            onChange={(v) => updateFromHsl({ ...hsl, h: v })}
          />
          <ChannelInput
            label="S"
            value={hsl.s}
            max={100}
            onChange={(v) => updateFromHsl({ ...hsl, s: v })}
          />
          <ChannelInput
            label="L"
            value={hsl.l}
            max={100}
            onChange={(v) => updateFromHsl({ ...hsl, l: v })}
          />
        </div>
      </div>
    </div>
  );
}

function ChannelInput({
  label,
  value,
  max = 255,
  onChange,
}: {
  label: string;
  value: number;
  max?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-text-tertiary mb-1">{label}</label>
      <input
        type="number"
        min={0}
        max={max}
        value={value}
        onChange={(e) => {
          const v = Math.max(0, Math.min(max, parseInt(e.target.value) || 0));
          onChange(v);
        }}
        className="w-full bg-surface border border-border rounded-sm px-2 py-1.5 text-sm font-mono text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
      />
    </div>
  );
}

function CopyButton({
  value,
  onCopy,
  copied,
}: {
  value: string;
  onCopy: () => void;
  copied: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors"
      aria-label={`Copy ${value}`}
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
  );
}
