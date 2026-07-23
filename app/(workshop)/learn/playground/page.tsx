import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Playground } from '@/components/workshop/playground';
import { T } from '@/components/workshop/t';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Try prompts in a safe, capped demo — Replay mode by default.',
};

export default function PlaygroundPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/learn"
        className="mb-6 inline-flex min-h-9 items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden /> <T k="lesson.all" />
      </Link>

      <p className="mb-2 text-sm uppercase tracking-widest text-accent">
        <T k="workshop.kicker" />
      </p>
      <h1 className="font-heading text-4xl">
        <T k="playground.title" />
      </h1>
      <p data-lang="en" lang="en" className="mt-2 max-w-prose text-fd-muted-foreground">
        See how the wording of a <strong>prompt</strong> shapes the answer. This runs in{' '}
        <strong>Replay mode</strong>
        {' '}by default — replies are pre-recorded, so it costs nothing and keeps working even if the
        room&rsquo;s connection drops.
      </p>
      <p data-lang="pl" lang="pl" className="mt-2 max-w-prose text-fd-muted-foreground">
        Zobacz, jak sformułowanie <strong>promptu</strong> wpływa na odpowiedź. Działa w{' '}
        <strong>trybie powtórki</strong> — odpowiedzi są nagrane wcześniej, więc nic nie kosztują i
        działają nawet, gdy w sali zniknie internet.
      </p>

      <Playground />
    </main>
  );
}
