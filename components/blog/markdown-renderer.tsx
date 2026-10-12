import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import { rehypeCustomTags } from '@/lib/rehype-custom-tags'
import { Steps, Step } from './mdx-steps'
import { Callout } from './mdx-callout'
import { Elicitations, Elicitation } from './mdx-elicitations'
import { YouTube } from './mdx-youtube'

const customComponents = {
  steps: Steps,
  step: Step,
  callout: Callout,
  elicitations: Elicitations,
  elicitation: Elicitation,
  youtube: YouTube,
} as unknown as Components

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeCustomTags, rehypeSlug]}
      components={customComponents}
    >
      {content}
    </ReactMarkdown>
  )
}