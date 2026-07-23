import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
    },
    links: [
      { text: 'Library', url: '/library' },
      { text: 'Learn', url: '/learn' },
      { text: 'Docs', url: '/docs' },
      { text: 'Playground', url: '/learn/playground' },
      { text: 'Glossary', url: '/learn/glossary' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
