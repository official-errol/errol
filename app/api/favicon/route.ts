import { NextResponse } from "next/server";

export const revalidate = 86400;

const TIMEOUT_MS = 5000;

function isPrivateHost(hostname: string): boolean {
  if (hostname === "localhost") return true;
  if (hostname.endsWith(".local")) return true;
  if (hostname.startsWith("127.")) return true;
  if (hostname.startsWith("10.")) return true;
  if (hostname.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(hostname)) return true;
  if (hostname === "0.0.0.0") return true;
  return false;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse(null, { status: 400 });
  }

  let hostname: string;
  try {
    const parsed = new URL(url);
    hostname = parsed.hostname;
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(hostname)) {
    return new NextResponse(null, { status: 400 });
  }

  if (isPrivateHost(hostname)) {
    return new NextResponse(null, { status: 400 });
  }

  const candidates = [
    `https://${hostname}/favicon.ico`,
    `https://${hostname}/favicon.png`,
    `https://${hostname}/apple-touch-icon.png`,
  ];

  for (const candidate of candidates) {
    try {
      const res = await fetch(candidate, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; FaviconBot/1.0)",
          Accept: "image/*,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
        redirect: "follow",
      });

      if (!res.ok) continue;

      const contentType = (res.headers.get("content-type") ?? "").toLowerCase();

      // Reject HTML — some servers return a custom 404 page as 200
      if (contentType.includes("text/html")) continue;

      const buffer = await res.arrayBuffer();

      if (buffer.byteLength < 100) continue;

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": contentType || "image/x-icon",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    } catch {
      continue;
    }
  }

  return new NextResponse(null, { status: 404 });
}
