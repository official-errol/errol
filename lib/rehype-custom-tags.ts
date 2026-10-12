import { visit } from 'unist-util-visit'
import type { Root, Element, Properties } from 'hast'

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

      // Normalize attribute keys to lowercase
      if (CUSTOM_TAGS.has(tag) && node.properties) {
        const props = node.properties as Properties
        const normalized: Properties = {}
        for (const key of Object.keys(props)) {
          normalized[key.toLowerCase()] = props[key]
        }
        node.properties = normalized
      }
    })
  }
}