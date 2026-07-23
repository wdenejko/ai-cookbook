// Workshop UI strings, EN + PL. Library/docs stay English.

export const LOCALES = ['en', 'pl'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_STORAGE_KEY = 'cook-locale';

const en = {
  'nav.playground': 'Playground',
  'nav.glossary': 'Glossary',
  'lang.aria': 'Language',

  'lesson.all': 'All lessons',
  'lesson.prev': 'Previous',
  'lesson.next': 'Next',
  'lesson.navAria': 'Lesson navigation',

  'workshop.kicker': 'Workshop',
  'learn.title': 'Learn',
  'learn.empty': 'No lessons yet.',

  'glossary.title': 'Glossary',
  'glossary.intro': 'Plain-language definitions, all in one place.',

  'playground.title': 'Prompt playground',
  'pg.tryThese': 'Try one of these:',
  'pg.orOwn': 'Or type your own prompt',
  'pg.placeholder': 'Ask anything…',
  'pg.run': 'Run',
  'pg.response': 'Response',
  'pg.appearsHere': 'The reply appears here.',
  'pg.badge.replay': 'Replay',
  'pg.badge.fallback': 'Replay (fallback)',
  'pg.badge.live': 'Live',

  'comfort.title': 'Comfort',
  'comfort.close': 'Close comfort settings',
  'comfort.textSize': 'Text size',
  'comfort.mode': 'Comfort mode',
  'comfort.modeDesc': 'Bigger text, roomier layout, calmer motion',
  'comfort.aria': 'Comfort and text-size settings',
  'comfort.sizeDefault': 'Default text size',
  'comfort.sizeLg': 'Large text size',
  'comfort.sizeXl': 'Extra large text size',
} as const;

export type MsgKey = keyof typeof en;

const pl: Record<MsgKey, string> = {
  'nav.playground': 'Piaskownica',
  'nav.glossary': 'Słownik',
  'lang.aria': 'Język',

  'lesson.all': 'Wszystkie lekcje',
  'lesson.prev': 'Poprzednia',
  'lesson.next': 'Następna',
  'lesson.navAria': 'Nawigacja lekcji',

  'workshop.kicker': 'Warsztat',
  'learn.title': 'Nauka',
  'learn.empty': 'Brak lekcji.',

  'glossary.title': 'Słownik',
  'glossary.intro': 'Proste definicje, wszystkie w jednym miejscu.',

  'playground.title': 'Piaskownica promptów',
  'pg.tryThese': 'Wypróbuj jedną z tych:',
  'pg.orOwn': 'Albo wpisz własny prompt',
  'pg.placeholder': 'Zapytaj o cokolwiek…',
  'pg.run': 'Uruchom',
  'pg.response': 'Odpowiedź',
  'pg.appearsHere': 'Odpowiedź pojawi się tutaj.',
  'pg.badge.replay': 'Powtórka',
  'pg.badge.fallback': 'Powtórka (awaryjnie)',
  'pg.badge.live': 'Na żywo',

  'comfort.title': 'Wygoda',
  'comfort.close': 'Zamknij ustawienia wygody',
  'comfort.textSize': 'Rozmiar tekstu',
  'comfort.mode': 'Tryb wygodny',
  'comfort.modeDesc': 'Większy tekst, więcej miejsca, spokojniejsze animacje',
  'comfort.aria': 'Ustawienia wygody i rozmiaru tekstu',
  'comfort.sizeDefault': 'Domyślny rozmiar tekstu',
  'comfort.sizeLg': 'Duży rozmiar tekstu',
  'comfort.sizeXl': 'Bardzo duży rozmiar tekstu',
};

export const DICT: Record<Locale, Record<MsgKey, string>> = { en, pl };

export function t(locale: Locale, key: MsgKey): string {
  return DICT[locale][key] ?? DICT.en[key] ?? key;
}
