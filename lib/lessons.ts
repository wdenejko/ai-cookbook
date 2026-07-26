import { lessons } from 'collections/server';
import { loader } from 'fumadocs-core/source';

export const lessonSource = loader({
  baseUrl: '/learn',
  source: lessons.toFumadocsSource(),
});

// Explicit order for guided navigation (small, curated set; extras sort after).
export const LESSON_ORDER = [
  'how-llms-work',
  'what-is-a-prompt',
  'prompting-as-dialogue',
  'critical-thinking-with-ai',
  'generating-images',
  'organizing-work-with-ai',
  'what-is-a-skill',
  'what-is-a-subagent',
];

export interface LessonNav {
  slug: string;
  title: { en: string; pl: string };
  description: { en: string; pl: string };
}

function orderIndex(slug: string): number {
  const i = LESSON_ORDER.indexOf(slug);
  return i === -1 ? LESSON_ORDER.length : i;
}

// English (base) lesson pages only — Polish variants live under the /pl subdir.
function enPages() {
  return lessonSource.getPages().filter((p) => p.slugs[0] !== 'pl');
}

export function getOrderedLessons(): LessonNav[] {
  return enPages()
    .map((p) => ({
      slug: p.slugs[0] ?? '',
      title: {
        en: p.data.title,
        pl: lessonSource.getPage(['pl', p.slugs[0] ?? ''])?.data.title ?? p.data.title,
      },
      description: {
        en: p.data.description ?? '',
        pl:
          lessonSource.getPage(['pl', p.slugs[0] ?? ''])?.data.description ??
          p.data.description ??
          '',
      },
    }))
    .sort((a, b) => orderIndex(a.slug) - orderIndex(b.slug) || a.slug.localeCompare(b.slug));
}

/** Returns the English (base) and Polish variants of a lesson, by base slug. */
export function getLesson(slug: string) {
  return {
    en: lessonSource.getPage([slug]),
    pl: lessonSource.getPage(['pl', slug]),
  };
}
