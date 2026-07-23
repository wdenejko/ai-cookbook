import type { Metadata } from 'next';
import { allGlossaryTerms } from '@/lib/workshop/glossary';
import { T } from '@/components/workshop/t';

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'Plain-language definitions of the AI terms used in the lessons.',
};

export default function GlossaryPage() {
  const terms = allGlossaryTerms().sort((a, b) => a.title.en.localeCompare(b.title.en));

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-widest text-accent">
          <T k="workshop.kicker" />
        </p>
        <h1 className="font-heading text-4xl">
          <T k="glossary.title" />
        </h1>
        <p className="mt-2 text-fd-muted-foreground">
          <T k="glossary.intro" />
        </p>
      </header>

      <dl className="divide-y divide-divider">
        {terms.map((term) => (
          <div key={term.key} className="py-4">
            <dt className="font-heading text-lg">
              <span data-lang="en" lang="en">
                {term.title.en}
              </span>
              <span data-lang="pl" lang="pl">
                {term.title.pl}
              </span>
            </dt>
            <dd className="mt-1 text-fd-muted-foreground">
              <span data-lang="en" lang="en">
                {term.definition.en}
              </span>
              <span data-lang="pl" lang="pl">
                {term.definition.pl}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
