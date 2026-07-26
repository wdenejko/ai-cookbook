'use client';

import { type ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { useLocale } from './locale';

const FUMADOCS_TRANSLATIONS = {
  en: {},
  pl: {
    'Ask AI(AI chat button)': 'Zapytaj AI',
    'Back to Home(404 not found page)': 'Wróć na stronę główną',
    'Choose a language(language switcher)': 'Wybierz język',
    'Choose a language(language switcher)(aria-label)': 'Wybierz język',
    'Close Banner(banner)(aria-label)': 'Zamknij baner',
    'Close Search(search dialog)(aria-label)': 'Zamknij wyszukiwanie',
    'Close Sidebar(aria-label)': 'Zamknij panel boczny',
    'Close Sidebar(sidebar)(aria-label)': 'Zamknij panel boczny',
    'Collapse Sidebar(sidebar)(aria-label)': 'Zwiń panel boczny',
    'Copied Text(code block)(aria-label)': 'Skopiowano tekst',
    'Copy Anchor Link(heading anchor)(aria-label)': 'Kopiuj odnośnik do nagłówka',
    'Copy Link(accordion)(aria-label)': 'Kopiuj odnośnik',
    'Copy Markdown(page actions)': 'Kopiuj Markdown',
    'Copy Text(code block)(aria-label)': 'Kopiuj tekst',
    'Dark(theme switcher)(aria-label)': 'Ciemny',
    'Default(type table)': 'Domyślna',
    'Edit on GitHub(edit page)': 'Edytuj na GitHubie',
    'Hide Sidebar(sidebar)': 'Ukryj panel boczny',
    'Last updated on(page footer)': 'Ostatnia aktualizacja',
    'Layout Tab(layout tab trigger)': 'Zakładka układu',
    'Light(theme switcher)(aria-label)': 'Jasny',
    'Next Page(pagination)': 'Następna strona',
    'No Headings(table of contents)': 'Brak nagłówków',
    'No results found(search dialog)': 'Nie znaleziono wyników',
    'On this page(table of contents)': 'Na tej stronie',
    'Open Search(search trigger)(aria-label)': 'Otwórz wyszukiwanie',
    'Open Sidebar(aria-label)': 'Otwórz panel boczny',
    'Open Sidebar(sidebar)(aria-label)': 'Otwórz panel boczny',
    'Open in ChatGPT(page actions)': 'Otwórz w ChatGPT',
    'Open in Cursor(page actions)': 'Otwórz w Cursorze',
    'Open in GitHub(page actions)': 'Otwórz na GitHubie',
    'Open in Scira AI(page actions)': 'Otwórz w Scira AI',
    'Open(page actions)': 'Otwórz',
    'Page Not Found(404 not found page)': 'Nie znaleziono strony',
    'Parameters(type table)': 'Parametry',
    'Previous Page(pagination)': 'Poprzednia strona',
    'Prop(type table)': 'Właściwość',
    'Read {url}, I want to ask questions about it.(page actions)':
      'Przeczytaj {url}. Chcę zadać pytania na tej podstawie.',
    'Returns(type table)': 'Zwraca',
    'Search(search dialog)': 'Szukaj',
    'Search(search trigger)': 'Szukaj',
    'Show Sidebar(sidebar)': 'Pokaż panel boczny',
    'System(theme switcher)(aria-label)': 'Systemowy',
    'Table of Contents(inline table of contents)': 'Spis treści',
    'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.(404 not found page)':
      'Szukana strona mogła zostać usunięta, zmienić nazwę albo być chwilowo niedostępna.',
    'Toggle Menu(home layout header)(aria-label)': 'Przełącz menu',
    'Toggle Theme(theme switcher)(aria-label)': 'Przełącz motyw',
    'Type(type table)': 'Typ',
    'View as Markdown(page actions)': 'Pokaż jako Markdown',
  },
} satisfies Record<'en' | 'pl', Record<string, string>>;

export function FumadocsProvider({ children }: { children: ReactNode }) {
  const { locale, setLocale } = useLocale();

  return (
    <RootProvider
      i18n={{
        locale,
        locales: [
          { locale: 'en', name: 'English' },
          { locale: 'pl', name: 'Polski' },
        ],
        onLocaleChange: (value) => {
          if (value === 'en' || value === 'pl') setLocale(value);
        },
        translations: FUMADOCS_TRANSLATIONS[locale],
      }}
    >
      {children}
    </RootProvider>
  );
}
