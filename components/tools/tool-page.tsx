import Link from "next/link";
import { PublicPageHeader } from "@/components/ui/public-page-header";
import { TOOLS } from "@/lib/tools";

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  title: string;
  slug: string;
  description: string;
  hint?: React.ReactNode;
  content?: React.ReactNode;
  faq?: FaqItem[];
  children: React.ReactNode;
};

export function ToolPage({
  title,
  slug,
  description,
  hint,
  content,
  faq,
  children,
}: Props) {
  const otherTools = TOOLS.filter((t) => t.slug !== slug);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
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

          {/* Mobile-only full tools list */}
          <section className="lg:hidden">
            <h2 className="text-sm uppercase tracking-wide text-text-tertiary font-mono mb-4">
              All tools
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {otherTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center gap-3 px-3 py-2.5 bg-surface border border-border rounded-md hover:border-border-strong transition-colors"
                >
                  <span className="text-text-secondary shrink-0">
                    {tool.icon}
                  </span>
                  <span className="text-sm text-text-primary truncate">
                    {tool.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs uppercase tracking-wide text-text-tertiary font-mono mb-3">
              All tools
            </p>
            <div className="space-y-0.5">
              {TOOLS.map((tool) => {
                const isCurrent = tool.slug === slug;

                if (isCurrent) {
                  return (
                    <div
                      key={tool.slug}
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-accent-subtle text-accent text-sm font-medium"
                    >
                      <span className="shrink-0">{tool.icon}</span>
                      <span className="truncate">{tool.name}</span>
                    </div>
                  );
                }

                return (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-surface-subtle transition-colors group"
                  >
                    <span className="shrink-0 text-text-tertiary group-hover:text-text-primary transition-colors">
                      {tool.icon}
                    </span>
                    <span className="truncate">{tool.name}</span>
                  </Link>
                );
              })}
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
      </div>
    </div>
  );
}
