import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-sm text-text-secondary font-mono mb-4">offline</p>
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          You&apos;re offline
        </h1>
        <p className="text-text-secondary mb-8">
          This page isn&apos;t available without a connection. Check your
          network and try again.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-primary text-text-inverse rounded-md text-sm hover:bg-text-primary/85 transition-colors"
        >
          Try again
        </Link>
      </div>
    </main>
  );
}
