'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw } from 'lucide-react';

// Segment-level error boundary. Catches render/data errors below the root
// layout while keeping the nav/chrome in place. `reset()` re-renders the
// failed segment without a full reload.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-24">
      <p className="mb-2 font-heading text-sm uppercase tracking-widest text-accent-2">Error</p>
      <h1 className="font-heading text-6xl leading-none">Something broke</h1>
      <div className="my-6 h-px w-full bg-divider" />
      <p className="max-w-prose text-lg text-fd-muted-foreground">
        An unexpected error interrupted this page. You can try again, or head back to a known page.
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-xs text-fd-muted-foreground">Reference: {error.digest}</p>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-5 font-heading text-bg transition-colors hover:bg-accent-600"
        >
          <RotateCcw className="size-4" aria-hidden /> Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md border border-divider px-5 font-heading transition-colors hover:bg-neutral-200"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
