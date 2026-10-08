import { Breadcrumbs } from "./breadcrumbs";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  breadcrumbs?: Crumb[];
  action?: React.ReactNode;
};

export function PublicPageHeader({
  title,
  description,
  backHref,
  backLabel = "Back",
  breadcrumbs,
  action,
}: Props) {
  return (
    <div className="space-y-4 mb-10">
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <Breadcrumbs items={breadcrumbs} />
      ) : backHref ? (
        <a
          href={backHref}
          className="text-sm text-text-secondary hover:text-text-primary inline-block"
        >
          ← {backLabel}
        </a>
      ) : null}

      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary leading-[1.15] tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-text-secondary mt-2">{description}</p>
          )}
        </div>
        {action && (
          <div className="w-full md:w-auto md:shrink-0 md:mt-1">{action}</div>
        )}
      </div>
    </div>
  );
}
