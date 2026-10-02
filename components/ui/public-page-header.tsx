import { Breadcrumbs } from "./breadcrumbs";

type Crumb = { label: string; href?: string };

type Props = {
  breadcrumbs?: Crumb[];
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function PublicPageHeader({
  breadcrumbs,
  title,
  description,
  action,
}: Props) {
  return (
    <div className="space-y-4 mb-10">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} />
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-4xl font-bold text-text-primary leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-text-secondary mt-2">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
