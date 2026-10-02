"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, MonitorIcon } from "./icons";

type Mode = "light" | "dark" | "system";

const ORDER: Mode[] = ["light", "dark", "system"];

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-md text-text-secondary"
        aria-label="Toggle theme"
      >
        <div className="w-4 h-4" />
      </button>
    );
  }

  const current = (theme ?? "system") as Mode;

  function cycle() {
    const idx = ORDER.indexOf(current);
    const next = ORDER[(idx + 1) % ORDER.length];
    setTheme(next);
  }

  const Icon =
    current === "system"
      ? MonitorIcon
      : resolvedTheme === "dark"
        ? MoonIcon
        : SunIcon;

  return (
    <button
      onClick={cycle}
      className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-subtle transition-colors"
      aria-label={`Theme: ${current}. Click to change.`}
      title={`Theme: ${current}`}
    >
      <Icon />
    </button>
  );
}
