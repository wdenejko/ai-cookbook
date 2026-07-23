import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Concept, Level } from './concept';
import { GoDeeper } from './go-deeper';
import { Term } from './term';
import { Showcase } from './showcase';
import { Playground } from './playground';

export function getWorkshopMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Concept,
    Level,
    GoDeeper,
    Term,
    Showcase,
    Playground,
    ...components,
  };
}
