import type { Metadata } from 'next';
import Link from 'next/link';
import { T } from '@/components/workshop/t';

export const metadata: Metadata = {
  title: 'Page not found',
};

// Global 404 — covers every route below the root layout, so the nav/chrome
// stays in place.
export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-24">
      <p className="mb-2 font-heading text-sm uppercase tracking-widest text-accent">
        <T k="error.kicker" /> 404
      </p>
      <h1 className="font-heading text-6xl leading-none">
        <T k="notFound.title" />
      </h1>
      <div className="my-6 h-px w-full bg-divider" />
      <p className="max-w-prose text-lg text-fd-muted-foreground">
        <T k="notFound.description" />
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 font-heading text-bg transition-colors hover:bg-accent-600"
        >
          <T k="error.home" />
        </Link>
        <Link
          href="/library"
          className="inline-flex min-h-11 items-center rounded-md border border-divider px-5 font-heading transition-colors hover:bg-neutral-200"
        >
          <T k="library.title" />
        </Link>
        <Link
          href="/learn"
          className="inline-flex min-h-11 items-center rounded-md border border-divider px-5 font-heading transition-colors hover:bg-neutral-200"
        >
          <T k="learn.title" />
        </Link>
      </div>
    </main>
  );
}
