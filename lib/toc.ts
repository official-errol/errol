import GithubSlugger from "github-slugger";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function extractToc(markdown: string): TocItem[] {
  if (!markdown) return [];

  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = /^(#{2,3})\s+(.+)$/.exec(line);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2].trim();

    // Strip markdown formatting from the display text
    const displayText = text
      .replace(/\*\*(.+?)\*\*/g, "$1") // bold
      .replace(/\*(.+?)\*/g, "$1") // italic
      .replace(/`(.+?)`/g, "$1") // inline code
      .replace(/\[(.+?)\]\([^)]*\)/g, "$1") // links → keep text
      .trim();

    // Use github-slugger so IDs match rehype-slug exactly
    const id = slugger.slug(displayText);

    items.push({ id, text: displayText, level });
  }

  return items;
}
