import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import { rehypeCustomTags } from '@/lib/rehype-custom-tags'
import { Steps, Step } from './mdx-steps'
import { Callout } from './mdx-callout'
import { Elicitations, Elicitation } from './mdx-elicitations'

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeCustomTags, rehypeSlug]}
      components={{
        steps: Steps,
        step: Step,
        callout: Callout,
        elicititations: Elicitations,
        elicitation: Elicitation,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}