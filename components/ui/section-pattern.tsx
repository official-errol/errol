type Pattern = "none" | "dots" | "grid" | "stripes" | "cross" | "waves";

export function SectionPattern({
  pattern = "none",
  children,
}: {
  pattern?: Pattern;
  children: React.ReactNode;
}) {
  if (pattern === "none") {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={styleFor(pattern)}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

function styleFor(pattern: Pattern): React.CSSProperties {
  const line = "color-mix(in srgb, var(--color-border) 35%, transparent)";

  switch (pattern) {
    case "dots":
      return {
        backgroundImage: `radial-gradient(circle, ${line} 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      };
    case "grid":
      return {
        backgroundImage: `
          linear-gradient(${line} 1px, transparent 1px),
          linear-gradient(90deg, ${line} 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      };
    case "stripes":
      return {
        backgroundImage: `repeating-linear-gradient(
          45deg,
          ${line} 0px,
          ${line} 1px,
          transparent 1px,
          transparent 14px
        )`,
      };
    case "cross":
      return {
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            ${line} 0px,
            ${line} 1px,
            transparent 1px,
            transparent 14px
          ),
          repeating-linear-gradient(
            -45deg,
            ${line} 0px,
            ${line} 1px,
            transparent 1px,
            transparent 14px
          )
        `,
      };
    case "waves":
      return {
        backgroundImage: `repeating-linear-gradient(
          0deg,
          ${line} 0px,
          ${line} 1px,
          transparent 1px,
          transparent 24px
        )`,
      };
    default:
      return {};
  }
}
