const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: string): number {
  if (!content) return 1;

  // Strip markdown syntax so we count real words
  const cleaned = content
    .replace(/```[\s\S]*?```/g, "") // fenced code blocks
    .replace(/`[^`]+`/g, "") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links → keep text
    .replace(/[#>*_~\-]/g, " ") // markdown symbols
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
