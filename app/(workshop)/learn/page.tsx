import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getOrderedLessons } from '@/lib/lessons';
import { T } from '@/components/workshop/t';

export const metadata: Metadata = {
  title: 'Learn — AI Cookbook',
  description: 'Short, adaptive lessons on the building blocks of AI assistants.',
};

export default function LearnPage() {
  const lessons = getOrderedLessons();

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <header className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-widest text-accent">
          <T k="workshop.kicker" />
        </p>
        <h1 className="font-heading text-4xl">
          <T k="learn.title" />
        </h1>
        <p data-lang="en" className="mt-2 max-w-prose text-fd-muted-foreground">
          Short lessons on the building blocks of AI assistants. Use the <strong>Detail</strong>{' '}
          control above to read each idea <em>Simple</em>, <em>Normal</em>, or <em>Technical</em> —
          the same lesson meets you where you are.
        </p>
        <p data-lang="pl" className="mt-2 max-w-prose text-fd-muted-foreground">
          Krótkie lekcje o podstawowych elementach asystentów AI. Użyj przełącznika{' '}
          <strong>Poziom</strong> powyżej, aby czytać każdą myśl <em>Prosto</em>, <em>Normalnie</em>{' '}
          lub <em>Technicznie</em> — ta sama lekcja dopasuje się do Ciebie.
        </p>
      </header>

      {lessons.length === 0 ? (
        <p className="text-fd-muted-foreground">
          <T k="learn.empty" />
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {lessons.map((l, i) => (
            <li key={l.slug}>
              <Link
                href={`/learn/${l.slug}`}
                className="flex items-start gap-4 rounded-md bg-surface p-4 transition-colors hover:bg-neutral-200"
              >
                <span className="font-heading text-2xl text-accent" aria-hidden>
                  {i + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-heading text-lg">{l.title}</span>
                  <span className="block text-sm text-fd-muted-foreground">{l.description}</span>
                </span>
                <ArrowRight className="mt-1 size-5 shrink-0 text-fd-muted-foreground" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
