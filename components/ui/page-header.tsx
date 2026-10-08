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

export function PageHeader({
  title,
  description,
  backHref,
  backLabel = "Back",
  breadcrumbs,
  action,
}: Props) {
  return (
    <div className="space-y-4">
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

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-text-secondary mt-1">{description}</p>
          )}
        </div>
        {action && <div className="w-full md:w-auto md:shrink-0">{action}</div>}
      </div>
    </div>
  );
}
