import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getOrderedLessons } from '@/lib/lessons';
import { T } from '@/components/workshop/t';

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Practical, bilingual lessons for learning how to work well with ChatGPT.',
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
        <p data-lang="en" lang="en" className="mt-2 max-w-prose text-fd-muted-foreground">
          Practical, step-by-step lessons about working well with ChatGPT. Every topic includes
          a visual explanation, a worked example, a short exercise and a checklist you can use
          right away.
        </p>
        <p data-lang="pl" lang="pl" className="mt-2 max-w-prose text-fd-muted-foreground">
          Praktyczne lekcje krok po kroku o dobrej pracy z ChatGPT. Każdy temat zawiera
          wyjaśnienie wizualne, pełny przykład, krótkie ćwiczenie i listę wskazówek do
          natychmiastowego wykorzystania.
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
                <Image
                  src={`/images/learn/${l.slug}.jpg`}
                  alt=""
                  width={1536}
                  height={1024}
                  sizes="(max-width: 768px) 96px, 128px"
                  className="h-20 w-24 shrink-0 rounded-sm border border-divider object-cover md:w-32"
                />
                <span className="flex-1">
                  <span className="block font-heading text-lg">
                    <span data-lang="en" lang="en">
                      {l.title.en}
                    </span>
                    <span data-lang="pl" lang="pl">
                      {l.title.pl}
                    </span>
                  </span>
                  <span className="block text-sm text-fd-muted-foreground">
                    <span data-lang="en" lang="en">
                      {l.description.en}
                    </span>
                    <span data-lang="pl" lang="pl">
                      {l.description.pl}
                    </span>
                  </span>
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
