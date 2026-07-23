import { lessons } from 'collections/server';
import { loader } from 'fumadocs-core/source';

export const lessonSource = loader({
  baseUrl: '/learn',
  source: lessons.toFumadocsSource(),
});

// Explicit order for guided navigation (small, curated set; extras sort after).
export const LESSON_ORDER = ['what-is-a-prompt', 'what-is-a-skill', 'what-is-a-subagent'];

export interface LessonNav {
  slug: string;
  title: string;
  description: string;
}

function orderIndex(slug: string): number {
  const i = LESSON_ORDER.indexOf(slug);
  return i === -1 ? LESSON_ORDER.length : i;
}

export function getOrderedLessons(): LessonNav[] {
  return lessonSource
    .getPages()
    .map((p) => ({
      slug: p.slugs[0] ?? p.slugs.join('/'),
      title: p.data.title,
      description: p.data.description ?? '',
    }))
    .sort((a, b) => orderIndex(a.slug) - orderIndex(b.slug) || a.slug.localeCompare(b.slug));
}

export function getLesson(slug: string) {
  return lessonSource.getPage([slug]);
}
