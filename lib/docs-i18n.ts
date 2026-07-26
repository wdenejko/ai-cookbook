import type { I18nConfig } from 'fumadocs-core/i18n';

export const docsI18n = {
  languages: ['en', 'pl'],
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  hideLocale: 'always',
  parser: 'dot',
} as const satisfies I18nConfig<'en' | 'pl'>;
