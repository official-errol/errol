type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="bg-surface border border-border rounded-lg p-10 text-center">
      <p className="text-sm font-medium text-text-primary mb-1">{title}</p>
      {description && (
        <p className="text-sm text-text-secondary mb-6">{description}</p>
      )}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
}
