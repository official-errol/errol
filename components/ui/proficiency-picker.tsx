"use client";

type Props = {
  value: number;
  onChange: (v: number) => void;
};

const LEVELS = [
  { value: 1, label: "Beginner" },
  { value: 2, label: "Basic" },
  { value: 3, label: "Intermediate" },
  { value: 4, label: "Advanced" },
  { value: 5, label: "Expert" },
];

export function ProficiencyPicker({ value, onChange }: Props) {
  const current = LEVELS.find((l) => l.value === value) ?? LEVELS[2];

  return (
    <div className="flex gap-1">
      {LEVELS.map((level) => {
        const active = level.value <= value;
        return (
          <button
            key={level.value}
            type="button"
            onClick={() => onChange(level.value)}
            title={level.label}
            className={`flex-1 h-7 rounded-sm border text-xs transition-colors ${
              level.value === value
                ? "border-primary bg-primary text-text-inverse"
                : active
                  ? "border-border bg-surface-subtle text-text-primary"
                  : "border-border bg-surface text-text-tertiary hover:text-text-secondary"
            }`}
          >
            {level.value}
          </button>
        );
      })}
    </div>
  );
}
