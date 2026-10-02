import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  const title = post?.title ?? "Sidequest Studio";
  const excerpt = post?.excerpt ?? "";

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
        sidequeststudio.me / blog
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#1A1C1E",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </div>
        {excerpt && (
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
            {excerpt}
          </div>
        )}
      </div>

      <div style={{ display: "flex", fontSize: "24px", color: "#6C7278" }}>
        Read on Sidequest Studio
      </div>
    </div>,
    { ...size },
  );
}
