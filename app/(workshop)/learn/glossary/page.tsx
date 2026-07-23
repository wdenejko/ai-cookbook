import type { Metadata } from 'next';
import { allGlossaryTerms } from '@/lib/workshop/glossary';

export const metadata: Metadata = {
  title: 'Glossary — AI Cookbook',
  description: 'Plain-language definitions of the AI terms used in the lessons.',
};

export default function GlossaryPage() {
  const terms = allGlossaryTerms().sort((a, b) => a.title.localeCompare(b.title));

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <header className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-widest text-accent">Workshop</p>
        <h1 className="font-heading text-4xl">Glossary</h1>
        <p className="mt-2 text-fd-muted-foreground">Plain-language definitions, in one place.</p>
      </header>

      <dl className="divide-y divide-divider">
        {terms.map((t) => (
          <div key={t.key} className="py-4">
            <dt className="font-heading text-lg">{t.title}</dt>
            <dd className="mt-1 text-fd-muted-foreground">{t.definition}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
