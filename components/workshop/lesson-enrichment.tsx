import { AlertTriangle, Check, Sparkles } from 'lucide-react';
import {
  getLessonEnrichment,
  type LessonLocale,
} from '@/lib/workshop/lesson-enrichment';
import { LessonFigure } from './lesson-figure';
import { Practice } from './practice';

const labels = {
  en: {
    outcomes: 'After this lesson, you can',
    example: 'Worked example',
    situation: 'Situation',
    firstAttempt: 'First attempt',
    improvedApproach: 'Improved approach',
    why: 'Why it works',
    steps: 'Steps',
    pitfalls: 'Common traps',
    takeaways: 'Keep these ideas',
    challenge: 'Small challenge',
  },
  pl: {
    outcomes: 'Po tej lekcji potrafisz',
    example: 'Przykład krok po kroku',
    situation: 'Sytuacja',
    firstAttempt: 'Pierwsza próba',
    improvedApproach: 'Lepsze podejście',
    why: 'Dlaczego to działa',
    steps: 'Kroki',
    pitfalls: 'Typowe pułapki',
    takeaways: 'Zapamiętaj',
    challenge: 'Małe wyzwanie',
  },
} satisfies Record<LessonLocale, Record<string, string>>;

interface LessonEnrichmentProps {
  slug: string;
  locale: LessonLocale;
}

export function LessonGuide({ slug, locale }: LessonEnrichmentProps) {
  const lesson = getLessonEnrichment(slug, locale);
  if (!lesson) return null;

  const copy = labels[locale];
  const headingId = `${slug}-${locale}-outcomes`;

  return (
    <>
      <LessonFigure src={lesson.image} alt={lesson.alt} caption={lesson.caption} />
      <section aria-labelledby={headingId} className="my-8 rounded-md bg-surface px-5 py-4">
        <h2 id={headingId} className="mb-3 font-heading text-xl">
          {copy.outcomes}
        </h2>
        <ul className="m-0 grid list-none gap-2 p-0">
          {lesson.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2">
              <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function LessonWorkbook({ slug, locale }: LessonEnrichmentProps) {
  const lesson = getLessonEnrichment(slug, locale);
  if (!lesson) return null;

  const copy = labels[locale];
  const exampleId = `${slug}-${locale}-example`;
  const pitfallsId = `${slug}-${locale}-pitfalls`;
  const takeawaysId = `${slug}-${locale}-takeaways`;

  return (
    <>
      <section aria-labelledby={exampleId} className="my-10">
        <h2 id={exampleId} className="mb-4 font-heading text-2xl">
          {copy.example}
        </h2>
        <p>
          <strong>{copy.situation}:</strong> {lesson.example.situation}
        </p>
        <div className="my-5 grid gap-4 md:grid-cols-2">
          <div className="border border-divider bg-surface p-4">
            <h3 className="mb-2 font-heading text-base text-fd-muted-foreground">
              {copy.firstAttempt}
            </h3>
            <blockquote className="m-0 border-l-2 border-neutral-400 pl-3">
              {lesson.example.firstAttempt}
            </blockquote>
          </div>
          <div className="border border-accent bg-accent-100/60 p-4 dark:bg-accent-900/30">
            <h3 className="mb-2 font-heading text-base text-accent">{copy.improvedApproach}</h3>
            <blockquote className="m-0 border-l-2 border-accent pl-3">
              {lesson.example.improvedApproach}
            </blockquote>
          </div>
        </div>
        <p>
          <strong>{copy.why}:</strong> {lesson.example.explanation}
        </p>
      </section>

      <Practice title={`${lesson.practice.title} · ${lesson.practice.duration}`}>
        <p className="text-sm uppercase tracking-wide text-fd-muted-foreground">{copy.steps}</p>
        <ol>
          {lesson.practice.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Practice>

      <section aria-labelledby={pitfallsId} className="my-10">
        <h2 id={pitfallsId} className="mb-4 font-heading text-2xl">
          {copy.pitfalls}
        </h2>
        <div className="grid gap-3">
          {lesson.pitfalls.map((pitfall) => (
            <article key={pitfall.title} className="flex gap-3 border-b border-divider pb-3">
              <AlertTriangle className="mt-1 size-5 shrink-0 text-accent-2" aria-hidden />
              <div>
                <h3 className="font-heading text-lg">{pitfall.title}</h3>
                <p className="mb-0 text-fd-muted-foreground">{pitfall.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby={takeawaysId}
        className="my-10 border-y border-divider bg-surface px-5 py-5"
      >
        <h2 id={takeawaysId} className="mb-3 font-heading text-2xl">
          {copy.takeaways}
        </h2>
        <ul>
          {lesson.takeaways.map((takeaway) => (
            <li key={takeaway}>{takeaway}</li>
          ))}
        </ul>
        <div className="mt-5 flex gap-3 border-t border-divider pt-4">
          <Sparkles className="mt-1 size-5 shrink-0 text-accent" aria-hidden />
          <p className="mb-0">
            <strong>{copy.challenge}:</strong> {lesson.challenge}
          </p>
        </div>
      </section>
    </>
  );
}
