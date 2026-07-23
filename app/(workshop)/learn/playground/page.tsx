import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Playground } from '@/components/workshop/playground';

export const metadata: Metadata = {
  title: 'Playground — AI Cookbook',
  description: 'Try prompts in a safe, capped demo — Replay mode by default.',
};

export default function PlaygroundPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/learn"
        className="mb-6 inline-flex min-h-9 items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden /> All lessons
      </Link>

      <p className="mb-2 text-sm uppercase tracking-widest text-accent">Workshop</p>
      <h1 className="font-heading text-4xl">Prompt playground</h1>
      <p className="mt-2 max-w-prose text-fd-muted-foreground">
        See how the wording of a <strong>prompt</strong> shapes the answer. This runs in{' '}
        <strong>Replay mode</strong>
        {' '}by default — replies are pre-recorded, so it costs nothing and keeps working even if the
        room&rsquo;s connection drops.
      </p>

      <Playground />
    </main>
  );
}
