import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-sm text-text-secondary font-mono mb-4">404</p>
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          This page wandered off.
        </h1>
        <p className="text-text-secondary mb-8">
          The sidequest you were looking for doesn&apos;t exist — or it moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 bg-primary text-text-inverse rounded-md text-sm hover:bg-accent transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/projects"
            className="px-5 py-2.5 border border-border text-text-primary rounded-md text-sm hover:bg-surface-subtle transition-colors"
          >
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}
