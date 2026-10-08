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
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "80px",
        background: "#FAFAF8",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          color: "#6C7278",
          marginBottom: "24px",
          fontFamily: "monospace",
        }}
      >
        errolsolomon.vercel.app
      </div>
      <div
        style={{
          fontSize: "96px",
          fontWeight: 700,
          color: "#1A1C1E",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        Errol
      </div>
      <div
        style={{
          fontSize: "32px",
          color: "#6C7278",
          marginTop: "16px",
        }}
      >
        Developer · Builder · Problem Solver
      </div>
    </div>,
    { ...size },
  );
}
