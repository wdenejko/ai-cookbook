import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import { T } from '@/components/workshop/t';
import {
  EmptyLanguageSelectText,
  LocaleSwitcherSlot,
} from '@/components/workshop/locale-switcher-slot';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    slots: {
      // Replace Fumadocs' language dropdown (globe button) in its native
      // desktop/mobile position with the direct EN | PL control.
      languageSelect: {
        root: LocaleSwitcherSlot,
        text: EmptyLanguageSelectText,
      },
    },
    links: [
      { text: <T k="nav.library" />, url: '/library' },
      { text: <T k="nav.learn" />, url: '/learn' },
      { text: <T k="nav.docs" />, url: '/docs' },
      { text: <T k="nav.glossary" />, url: '/learn/glossary' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
