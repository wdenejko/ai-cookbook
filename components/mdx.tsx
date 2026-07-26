import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  BeforeYouStart,
  SafetyNote,
  TutorialVisual,
} from '@/components/docs/tutorial-visual';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    BeforeYouStart,
    SafetyNote,
    TutorialVisual,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
