type ElementCache = {
  elements: HTMLElement[];
  timestamp: number;
};

const CACHE_MS = 2000;
let cache: ElementCache = { elements: [], timestamp: 0 };

const PREFERRED = "[data-character-target]";
const FALLBACK = "article, img, a[href], button:not([disabled])";

export function clearCharacterTargetCache() {
  cache = { elements: [], timestamp: 0 };
}

export function getInteractiveElements(options: {
  minWidth: number;
  minHeight: number;
  marginTop: number;
  marginBottom: number;
  marginX: number;
  excludeSelector?: string;
}): HTMLElement[] {
  const now = performance.now();
  if (now - cache.timestamp < CACHE_MS && cache.elements.length > 0) {
    return filterVisible(cache.elements, options);
  }

  const preferred = Array.from(
    document.querySelectorAll<HTMLElement>(PREFERRED),
  );
  const fallback = Array.from(document.querySelectorAll<HTMLElement>(FALLBACK));

  // Dedupe — elements in both lists only appear once
  const combined = Array.from(new Set([...preferred, ...fallback]));

  const filtered = filterVisible(combined, options);

  cache = { elements: filtered, timestamp: now };
  return filtered;
}

function filterVisible(
  elements: HTMLElement[],
  options: {
    minWidth: number;
    minHeight: number;
    marginTop: number;
    marginBottom: number;
    marginX: number;
    excludeSelector?: string;
  },
): HTMLElement[] {
  const {
    minWidth,
    minHeight,
    marginTop,
    marginBottom,
    marginX,
    excludeSelector,
  } = options;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  return elements.filter((el) => {
    if (excludeSelector && el.closest(excludeSelector)) return false;
    if (!el.isConnected) return false;

    const rect = el.getBoundingClientRect();
    if (rect.width < minWidth || rect.height < minHeight) return false;

    // Must have some portion visible in the safe area
    if (rect.bottom < marginTop) return false;
    if (rect.top > vh - marginBottom) return false;
    if (rect.right < marginX) return false;
    if (rect.left > vw - marginX) return false;

    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;

    return true;
  });
}
