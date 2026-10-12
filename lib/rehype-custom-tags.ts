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

const BLOCK_TAGS = new Set([
  'steps',
  'step',
  'callout',
  'elicitations',
  'youtube',
])

export function rehypeCustomTags() {
  return (tree: Root) => {
    // Pass 1: unwrap custom block tags from <p>
    visit(tree, 'element', (node: Element, index, parent) => {
      if (!parent || typeof index !== 'number') return

      if (
        node.tagName === 'p' &&
        node.children &&
        node.children.length === 1 &&
        node.children[0].type === 'element' &&
        BLOCK_TAGS.has((node.children[0] as Element).tagName.toLowerCase())
      ) {
        parent.children[index] = node.children[0] as Element
        return ['skip', index] as never
      }
    })

    // Pass 2: lowercase tag names AND attributes
    visit(tree, 'element', (node: Element) => {
      const tag = node.tagName
      const lower = tag.toLowerCase()

      // If the lowercase form is a custom tag, force the tag name lowercase
      if (CUSTOM_TAGS.has(lower)) {
        node.tagName = lower
      }

      if (CUSTOM_TAGS.has(lower) && !Array.isArray(node.children)) {
        node.children = []
      }

      if (CUSTOM_TAGS.has(lower) && node.properties) {
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