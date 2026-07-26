import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Concept } from './concept';
import { GoDeeper } from './go-deeper';
import { LessonGuide, LessonWorkbook } from './lesson-enrichment';
import { LessonFigure } from './lesson-figure';
import { Practice } from './practice';
import { Term } from './term';
import { Showcase } from './showcase';

export function getWorkshopMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Concept,
    GoDeeper,
    LessonGuide,
    LessonWorkbook,
    LessonFigure,
    Practice,
    Term,
    Showcase,
    ...components,
  };
}
