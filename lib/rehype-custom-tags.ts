import { visit } from 'unist-util-visit'
import type { Root, Element } from 'hast'

const CUSTOM_TAGS = new Set([
  'steps',
  'step',
  'callout',
  'elicitations',
  'elicitation',
  'youtube',
])

export function rehypeCustomTags() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      const tag = node.tagName.toLowerCase()

      if (CUSTOM_TAGS.has(tag)) {
        node.tagName = tag
      }

      if (CUSTOM_TAGS.has(tag) && !Array.isArray(node.children)) {
        node.children = []
      }
    })
  }
}