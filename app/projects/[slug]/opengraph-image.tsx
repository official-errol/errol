import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, summary, tech_stack")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  const title = project?.title ?? "Sidequest Studio";
  const summary = project?.summary ?? "";

  const rawTech = project?.tech_stack;
  const tech: string[] = Array.isArray(rawTech)
    ? rawTech.slice(0, 4).map((t: string) => t)
    : [];

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
        sidequeststudio.me / projects
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#1A1C1E",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        {summary && (
          <div
            style={{
              fontSize: "28px",
              color: "#6C7278",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {summary}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        {tech.map((t) => (
          <div
            key={t}
            style={{
              fontSize: "20px",
              color: "#6C7278",
              background: "#F0F0EC",
              padding: "8px 16px",
              borderRadius: "8px",
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
