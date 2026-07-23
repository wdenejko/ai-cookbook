import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
};

// Global 404 — covers every route below the root layout, so the nav/chrome
// stays in place. Kept in English (the site's default language).
export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-24">
      <p className="mb-2 font-heading text-sm uppercase tracking-widest text-accent">Error 404</p>
      <h1 className="font-heading text-6xl leading-none">Page not found</h1>
      <div className="my-6 h-px w-full bg-divider" />
      <p className="max-w-prose text-lg text-fd-muted-foreground">
        This page has gone to press elsewhere. The link may be out of date, or the page may have
        moved.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 font-heading text-bg transition-colors hover:bg-accent-600"
        >
          Home
        </Link>
        <Link
          href="/library"
          className="inline-flex min-h-11 items-center rounded-md border border-divider px-5 font-heading transition-colors hover:bg-neutral-200"
        >
          Library
        </Link>
        <Link
          href="/learn"
          className="inline-flex min-h-11 items-center rounded-md border border-divider px-5 font-heading transition-colors hover:bg-neutral-200"
        >
          Learn
        </Link>
      </div>
    </main>
  );
}
