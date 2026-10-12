import { visit } from 'unist-util-visit'
import type { Root, Element, Text } from 'hast'

const CUSTOM_TAGS = new Set([
  'steps',
  'step',
  'callout',
  'elicitations',
  'elicitation',
])

/**
 * Walks the HAST tree and:
 * - Converts self-closing custom tags (e.g. <Elicitation />) to normal elements
 * - Lowercases tag names (react-markdown lowercases them anyway, but we ensure it)
 * - Preserves `query`, `label`, `title`, `type`, `subtitle` attributes
 */
export function rehypeCustomTags() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      const tag = node.tagName.toLowerCase()

      if (CUSTOM_TAGS.has(tag)) {
        node.tagName = tag
      }

      // Ensure content tags have children arrays (self-closing elements won't)
      if (CUSTOM_TAGS.has(tag) && !Array.isArray(node.children)) {
        node.children = []
      }
    })
  }
}