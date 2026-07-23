import type { Metadata } from 'next';
import { getAssets } from '@/lib/assets/loader';
import { toSummary } from '@/lib/assets/types';
import { LibraryBrowser } from '@/components/library/library-browser';

export const metadata: Metadata = {
  title: 'Library',
  description: 'Browse and reuse Claude skills, subagents, prompts, and configs.',
};

export default async function LibraryPage() {
  const assets = (await getAssets()).map(toSummary);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-12">
      <header className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-widest text-accent">Asset library</p>
        <h1 className="font-heading text-4xl">Library</h1>
        <p className="mt-2 max-w-prose text-fd-muted-foreground">
          Reusable Claude assets — skills, subagents, prompts, and configs. Search, filter, and copy
          them into any project.
        </p>
      </header>

      <LibraryBrowser assets={assets} />
    </main>
  );
}
