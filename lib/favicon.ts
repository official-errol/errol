export function getFaviconUrl(
  siteUrl: string | null | undefined,
): string | null {
  if (!siteUrl) return null;

  try {
    const url = new URL(siteUrl);
    if (!url.hostname) return null;

    return `/api/favicon?url=${encodeURIComponent(siteUrl)}`;
  } catch {
    return null;
  }
}
