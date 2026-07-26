import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const { GET } = createFromSource(source, {
  localeMap: {
    en: 'english',
    // Orama does not provide a Polish stemmer. The English tokenizer still
    // indexes and matches Polish text without trying to load an invalid locale.
    pl: 'english',
  },
});
