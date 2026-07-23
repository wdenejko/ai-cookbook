import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getLesson, getOrderedLessons, lessonSource } from '@/lib/lessons';
import { getWorkshopMDXComponents } from '@/components/workshop/mdx';

export function generateStaticParams() {
  return lessonSource.getPages().map((p) => ({ slug: p.slugs[0] ?? p.slugs.join('/') }));
}

export async function generateMetadata(
  props: PageProps<'/learn/[slug]'>,
): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getLesson(slug);
  if (!page) return {};
  return { title: `${page.data.title} — AI Cookbook`, description: page.data.description };
}

export default async function LessonPage(props: PageProps<'/learn/[slug]'>) {
  const { slug } = await props.params;
  const page = getLesson(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const ordered = getOrderedLessons();
  const idx = ordered.findIndex((l) => l.slug === slug);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/learn"
        className="mb-6 inline-flex min-h-9 items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden /> All lessons
      </Link>

      <h1 className="font-heading text-4xl">{page.data.title}</h1>
      {page.data.description && (
        <p className="mt-2 text-lg text-fd-muted-foreground">{page.data.description}</p>
      )}

      <div className="cook-lesson mt-8">
        <MDX components={getWorkshopMDXComponents()} />
      </div>

      <nav
        className="mt-12 flex items-stretch justify-between gap-4 border-t border-divider pt-6"
        aria-label="Lesson navigation"
      >
        {prev ? (
          <Link
            href={`/learn/${prev.slug}`}
            className="flex flex-1 flex-col rounded-md bg-surface p-3 transition-colors hover:bg-neutral-200"
          >
            <span className="text-xs text-fd-muted-foreground">← Previous</span>
            <span className="font-heading">{prev.title}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/learn/${next.slug}`}
            className="flex flex-1 flex-col items-end rounded-md bg-surface p-3 text-right transition-colors hover:bg-neutral-200"
          >
            <span className="text-xs text-fd-muted-foreground">Next →</span>
            <span className="font-heading">{next.title}</span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </main>
  );
}
