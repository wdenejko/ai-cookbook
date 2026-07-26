// Global UI strings, EN + PL. Keep the English map as the source of MsgKey so
// TypeScript reports every missing Polish translation.

export const LOCALES = ['en', 'pl'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_STORAGE_KEY = 'cook-locale';

const en = {
  'lang.aria': 'Language',
  'lang.en': 'English',
  'lang.pl': 'Polish',

  'nav.library': 'Library',
  'nav.learn': 'Learn',
  'nav.docs': 'Tutorials',
  'nav.glossary': 'Glossary',

  'home.kicker': 'Reusable AI assets · Workshop platform',
  'home.description':
    'A personal, reusable library of ChatGPT skills, subagents, prompts, and configs — that also doubles as an adaptive workshop platform for mixed audiences.',
  'home.design': 'Set in the Broadsheet design system.',
  'home.openDocs': 'Open tutorials',

  'lesson.all': 'All lessons',
  'lesson.prev': 'Previous',
  'lesson.next': 'Next',
  'lesson.navAria': 'Lesson navigation',
  'lesson.goDeeper': 'Go deeper',

  'workshop.kicker': 'Workshop',
  'learn.title': 'Learn',
  'learn.empty': 'No lessons yet.',

  'glossary.title': 'Glossary',
  'glossary.intro': 'Plain-language definitions, all in one place.',

  'library.kicker': 'Ready-to-use materials',
  'library.title': 'Library',
  'library.intro':
    'Ready-to-use prompts and small helpers for everyday AI tasks. Choose one and copy it into your conversation.',
  'library.search': 'Search assets…',
  'library.searchAria': 'Search assets',
  'library.all': 'All',
  'library.of': 'of',
  'library.asset': 'asset',
  'library.assets': 'assets',
  'library.noMatch': 'No assets match your filters.',
  'library.emptyTitle': 'No assets yet',
  'library.emptyDescription.before': 'Add files under',
  'library.emptyDescription.after': 'and they’ll appear here.',

  'asset.type.skill': 'Guided workflow',
  'asset.type.skills': 'Guided workflows',
  'asset.type.plugin': 'Bundle',
  'asset.type.plugins': 'Bundles',
  'asset.type.subagent': 'Specialist',
  'asset.type.subagents': 'Specialists',
  'asset.type.command': 'Shortcut',
  'asset.type.commands': 'Shortcuts',
  'asset.type.prompt': 'Prompt',
  'asset.type.prompts': 'Prompts',
  'asset.type.mcp_server': 'Connection',
  'asset.type.mcp_servers': 'Connections',
  'asset.type.hook': 'Automatic step',
  'asset.type.hooks': 'Automatic steps',
  'asset.type.memory': 'Preference',
  'asset.type.memories': 'Preferences',
  'asset.visibility.private': 'Private',
  'asset.visibility.local': 'Local',
  'asset.visibility.project': 'Project',
  'asset.visibility.org_shared': 'Org-shared',
  'asset.visibility.public': 'Public',
  'asset.runsCode': 'Runs code',
  'asset.secrets': 'Secrets',
  'asset.atGlance': 'At a glance',
  'asset.matcher': 'matcher',
  'asset.variables': 'Variables',
  'asset.howToUse': 'How to use it',
  'asset.destination': 'Destination',
  'asset.worksIn': 'Works in',
  'asset.category': 'Category',
  'asset.bundledAssets': 'Bundled assets',
  'asset.notInLibrary': 'not in this library',
  'asset.notes': 'Notes',
  'asset.source': 'Source',
  'asset.downloadBundle': 'Download bundle',
  'asset.zipping': 'Zipping…',
  'asset.copy': 'Copy',
  'asset.copied': 'Copied',
  'asset.viewGithub': 'View on GitHub',
  'asset.bundleFiles': 'Bundle files',
  'asset.executable': 'executable',
  'asset.files': 'Files',
  'asset.fromLibrary': 'From the library',

  'comfort.title': 'Comfort',
  'comfort.close': 'Close comfort settings',
  'comfort.textSize': 'Text size',
  'comfort.mode': 'Comfort mode',
  'comfort.modeDesc': 'Bigger text, roomier layout, calmer motion',
  'comfort.aria': 'Comfort and text-size settings',
  'comfort.dialogAria': 'Comfort settings',
  'comfort.sizeDefault': 'Default text size',
  'comfort.sizeLg': 'Large text size',
  'comfort.sizeXl': 'Extra large text size',

  'error.kicker': 'Error',
  'error.title': 'Something broke',
  'error.description':
    'An unexpected error interrupted this page. You can try again, or head back to a known page.',
  'error.globalDescription': 'The application hit an unexpected error. Reloading usually clears it.',
  'error.reference': 'Reference',
  'error.tryAgain': 'Try again',
  'error.reload': 'Reload',
  'error.home': 'Home',
  'notFound.title': 'Page not found',
  'notFound.description':
    'This page has gone to press elsewhere. The link may be out of date, or the page may have moved.',
} as const;

export type MsgKey = keyof typeof en;

const pl: Record<MsgKey, string> = {
  'lang.aria': 'Język',
  'lang.en': 'Angielski',
  'lang.pl': 'Polski',

  'nav.library': 'Biblioteka',
  'nav.learn': 'Nauka',
  'nav.docs': 'Tutoriale',
  'nav.glossary': 'Słownik',

  'home.kicker': 'Materiały AI wielokrotnego użytku · Platforma warsztatowa',
  'home.description':
    'Osobista biblioteka umiejętności, subagentów, promptów i konfiguracji ChatGPT, która jest również adaptacyjną platformą warsztatową dla zróżnicowanych grup.',
  'home.design': 'Zaprojektowana w systemie Broadsheet.',
  'home.openDocs': 'Otwórz tutoriale',

  'lesson.all': 'Wszystkie lekcje',
  'lesson.prev': 'Poprzednia',
  'lesson.next': 'Następna',
  'lesson.navAria': 'Nawigacja lekcji',
  'lesson.goDeeper': 'Dowiedz się więcej',

  'workshop.kicker': 'Warsztat',
  'learn.title': 'Nauka',
  'learn.empty': 'Brak lekcji.',

  'glossary.title': 'Słownik',
  'glossary.intro': 'Proste definicje, wszystkie w jednym miejscu.',

  'library.kicker': 'Materiały do użycia',
  'library.title': 'Biblioteka',
  'library.intro':
    'Gotowe prompty i małe pomocniki do codziennych zadań z AI. Wybierz materiał i skopiuj go do rozmowy.',
  'library.search': 'Szukaj materiałów…',
  'library.searchAria': 'Szukaj materiałów',
  'library.all': 'Wszystkie',
  'library.of': 'z',
  'library.asset': 'materiał',
  'library.assets': 'materiałów',
  'library.noMatch': 'Żadne materiały nie pasują do wybranych filtrów.',
  'library.emptyTitle': 'Brak materiałów',
  'library.emptyDescription.before': 'Dodaj pliki w',
  'library.emptyDescription.after': 'a pojawią się tutaj.',

  'asset.type.skill': 'Prowadzony proces',
  'asset.type.skills': 'Prowadzone procesy',
  'asset.type.plugin': 'Pakiet',
  'asset.type.plugins': 'Pakiety',
  'asset.type.subagent': 'Specjalista',
  'asset.type.subagents': 'Specjaliści',
  'asset.type.command': 'Skrót',
  'asset.type.commands': 'Skróty',
  'asset.type.prompt': 'Prompt',
  'asset.type.prompts': 'Prompty',
  'asset.type.mcp_server': 'Połączenie',
  'asset.type.mcp_servers': 'Połączenia',
  'asset.type.hook': 'Automatyczny krok',
  'asset.type.hooks': 'Automatyczne kroki',
  'asset.type.memory': 'Preferencja',
  'asset.type.memories': 'Preferencje',
  'asset.visibility.private': 'Prywatny',
  'asset.visibility.local': 'Lokalny',
  'asset.visibility.project': 'Projektowy',
  'asset.visibility.org_shared': 'Współdzielony w organizacji',
  'asset.visibility.public': 'Publiczny',
  'asset.runsCode': 'Uruchamia kod',
  'asset.secrets': 'Sekrety',
  'asset.atGlance': 'W skrócie',
  'asset.matcher': 'warunek',
  'asset.variables': 'Zmienne',
  'asset.howToUse': 'Jak tego użyć',
  'asset.destination': 'Miejsce docelowe',
  'asset.worksIn': 'Działa w',
  'asset.category': 'Kategoria',
  'asset.bundledAssets': 'Materiały w pakiecie',
  'asset.notInLibrary': 'brak w tej bibliotece',
  'asset.notes': 'Uwagi',
  'asset.source': 'Źródło',
  'asset.downloadBundle': 'Pobierz pakiet',
  'asset.zipping': 'Tworzenie ZIP…',
  'asset.copy': 'Kopiuj',
  'asset.copied': 'Skopiowano',
  'asset.viewGithub': 'Zobacz na GitHubie',
  'asset.bundleFiles': 'Pliki pakietu',
  'asset.executable': 'wykonywalny',
  'asset.files': 'Pliki',
  'asset.fromLibrary': 'Z biblioteki',

  'comfort.title': 'Wygoda',
  'comfort.close': 'Zamknij ustawienia wygody',
  'comfort.textSize': 'Rozmiar tekstu',
  'comfort.mode': 'Tryb wygodny',
  'comfort.modeDesc': 'Większy tekst, więcej miejsca, spokojniejsze animacje',
  'comfort.aria': 'Ustawienia wygody i rozmiaru tekstu',
  'comfort.dialogAria': 'Ustawienia wygody',
  'comfort.sizeDefault': 'Domyślny rozmiar tekstu',
  'comfort.sizeLg': 'Duży rozmiar tekstu',
  'comfort.sizeXl': 'Bardzo duży rozmiar tekstu',

  'error.kicker': 'Błąd',
  'error.title': 'Coś poszło nie tak',
  'error.description':
    'Nieoczekiwany błąd przerwał wyświetlanie tej strony. Spróbuj ponownie albo wróć do znanej strony.',
  'error.globalDescription':
    'W aplikacji wystąpił nieoczekiwany błąd. Ponowne wczytanie zwykle go usuwa.',
  'error.reference': 'Identyfikator',
  'error.tryAgain': 'Spróbuj ponownie',
  'error.reload': 'Wczytaj ponownie',
  'error.home': 'Strona główna',
  'notFound.title': 'Nie znaleziono strony',
  'notFound.description':
    'Ta strona trafiła do innego wydania. Link może być nieaktualny albo strona została przeniesiona.',
};

export const DICT: Record<Locale, Record<MsgKey, string>> = { en, pl };

export function t(locale: Locale, key: MsgKey): string {
  return DICT[locale][key] ?? DICT.en[key] ?? key;
}

export function detectBrowserLocale(languages?: readonly string[]): Locale {
  const preferred = languages ?? (typeof navigator === 'undefined' ? [] : navigator.languages);
  return preferred[0]?.toLowerCase().split('-')[0] === 'pl' ? 'pl' : 'en';
}
