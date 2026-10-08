"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { DownloadIcon } from "@/components/ui/icons";

const SIZES = [128, 256, 384, 512, 1024] as const;
type Size = (typeof SIZES)[number];

export function QrCodeGenerator() {
  const [text, setText] = useState("https://errolsolomon.vercel.app");
  const [size, setSize] = useState<Size>(256);
  const [darkColor, setDarkColor] = useState("#1A1C1E");
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const svgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  function downloadPng() {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-code-${Date.now()}.png`;
    link.click();
  }

  function downloadSvg() {
    const svg = svgRef.current?.querySelector("svg");
    if (!svg) return;
    const data = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([data], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `qr-code-${Date.now()}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-6 md:grid-cols-[1fr_auto]">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Text or URL
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="https://example.com"
              className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary resize-none focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
            />
            <p className="text-xs text-text-tertiary mt-1">
              {text.length} characters
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value) as Size)}
                className="w-full bg-surface border border-border rounded-sm px-3 py-2 text-sm text-text-primary"
              >
                {SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s} × {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Dark color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={darkColor}
                  onChange={(e) => setDarkColor(e.target.value)}
                  className="w-9 h-9 shrink-0 rounded-sm border border-border cursor-pointer bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={darkColor}
                  onChange={(e) => setDarkColor(e.target.value)}
                  className="min-w-0 flex-1 bg-surface border border-border rounded-sm px-2 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
                />
              </div>
            </div>

            <div className="sm:col-span-2 min-w-0">
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Light color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={lightColor}
                  onChange={(e) => setLightColor(e.target.value)}
                  className="w-9 h-9 shrink-0 rounded-sm border border-border cursor-pointer bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={lightColor}
                  onChange={(e) => setLightColor(e.target.value)}
                  className="min-w-0 flex-1 bg-surface border border-border rounded-sm px-2 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-subtle"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={downloadPng}
              disabled={!text.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-text-inverse rounded-md text-sm hover:bg-text-primary/85 transition-colors disabled:opacity-50"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              PNG
            </button>
            <button
              type="button"
              onClick={downloadSvg}
              disabled={!text.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle transition-colors disabled:opacity-50"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              SVG
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="p-4 bg-surface border border-border rounded-lg">
            {text.trim() ? (
              <>
                {/* Hidden SVG for download */}
                <div ref={svgRef} className="hidden">
                  <QRCodeSVG
                    value={text}
                    size={size}
                    fgColor={darkColor}
                    bgColor={lightColor}
                    level="M"
                  />
                </div>

                {/* Visible canvas for display and PNG download */}
                <div ref={canvasRef}>
                  <QRCodeCanvas
                    value={text}
                    size={Math.min(size, 320)}
                    fgColor={darkColor}
                    bgColor={lightColor}
                    level="M"
                  />
                </div>
              </>
            ) : (
              <div className="w-64 h-64 flex items-center justify-center text-text-tertiary text-sm">
                Enter text to generate
              </div>
            )}
          </div>
          <p className="text-xs text-text-tertiary">
            Preview shown at 320px. Downloads use the full size.
          </p>
        </div>
      </div>
    </div>
  );
}
