import Link from "next/link";
import { PublicPageHeader } from "@/components/ui/public-page-header";

type RelatedTool = {
  slug: string;
  name: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  title: string;
  description: string;
  hint?: React.ReactNode;
  content?: React.ReactNode;
  faq?: FaqItem[];
  children: React.ReactNode;
  related: RelatedTool[];
};

export function ToolPage({
  title,
  description,
  hint,
  content,
  faq,
  children,
  related,
}: Props) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        <div className="min-w-0">
          <PublicPageHeader
            breadcrumbs={[
              { label: "Portfolio", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: title },
            ]}
            title={title}
            description={description}
          />

          <div className="mb-12">{children}</div>

          <section className="mb-12">
            <h2 className="text-sm uppercase tracking-wide text-text-tertiary font-mono mb-4">
              How to use
            </h2>
            <div className="bg-surface border border-border rounded-lg p-5 text-sm text-text-secondary leading-relaxed">
              {hint ?? (
                <p>
                  Paste or type your input above. Everything runs in your
                  browser — nothing is sent to a server. Copy the result and use
                  it anywhere.
                </p>
              )}
            </div>
          </section>

          {content && (
            <section className="mb-12 prose prose-neutral dark:prose-invert max-w-none">
              {content}
            </section>
          )}

          {faq && faq.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {faq.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-base font-semibold text-text-primary mb-2">
                      {item.question}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Mobile-only related tools at the bottom */}
          {related.length > 0 && (
            <section className="lg:hidden">
              <h2 className="text-sm uppercase tracking-wide text-text-tertiary font-mono mb-4">
                Other tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {related.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 bg-surface border border-border rounded-md text-text-primary hover:border-border-strong transition-colors"
                  >
                    {tool.name}
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Desktop-only sidebar with related tools */}
        {related.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs uppercase tracking-wide text-text-tertiary font-mono mb-3">
                Other tools
              </p>
              <div className="space-y-1">
                {related.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="flex items-center justify-between gap-2 px-3 py-2 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-surface-subtle transition-colors group"
                  >
                    <span className="truncate">{tool.name}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="shrink-0 text-text-tertiary group-hover:text-text-primary transition-colors"
                    >
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <Link
                  href="/tools"
                  className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
                >
                  ← All tools
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
