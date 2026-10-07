import { ImageResponse } from "next/og";

export const alt = "Errol";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "#FAFAF8",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          color: "#6C7278",
          fontSize: "24px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "9999px",
            background: "#3B82F6",
          }}
        />
        errol.is-a.dev
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#1A1C1E",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          A personal workshop for
        </div>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#1A1C1E",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          things worth building.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: "24px",
          color: "#6C7278",
        }}
      >
        Projects · Writing · Files
      </div>
    </div>,
    { ...size },
  );
}
