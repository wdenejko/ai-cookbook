import type { Asset, AssetSummary, AssetType, Visibility } from './types';
import type { Locale, MsgKey } from '@/lib/workshop/i18n';

interface AssetTranslation {
  title: string;
  description: string;
}

// Library entries are executable/reusable source assets, so their raw source
// remains byte-for-byte unchanged. This map localizes the catalogue copy around
// that source without changing what users copy or download.
const PL_COPY: Record<string, AssetTranslation> = {
  'command/changelog': {
    title: 'Generator changelogu',
    description:
      'Tworzy wpis w formacie Keep a Changelog na podstawie ostatniej historii Gita, grupując commity jako Dodane, Zmienione, Naprawione i Usunięte. Przydaje się podczas wydania nowej wersji, gdy z surowych komunikatów commitów trzeba przygotować czytelny changelog.',
  },
  'hook/prettier-on-save': {
    title: 'Prettier przy zapisie',
    description:
      'Hook PostToolUse, który automatycznie uruchamia Prettiera dla pliku JavaScript lub TypeScript zaraz po jego zapisaniu albo edycji przez ChatGPT. Utrzymuje spójne formatowanie kodu generowanego przez AI zgodnie z konfiguracją projektu.',
  },
  'mcp_server/notion': {
    title: 'Konektor Notion MCP',
    description:
      'Zdalny serwer MCP łączący ChatGPT z obszarem roboczym Notion. Umożliwia wyszukiwanie i odczytywanie treści oraz tworzenie i aktualizowanie stron i baz danych bez ręcznego kopiowania.',
  },
  'memory/coding-preferences': {
    title: 'Preferencje programistyczne',
    description:
      'Zapamiętuje konkretne preferencje programistyczne właściciela używane w wielu projektach — język, moduły, testy i formatowanie — aby ChatGPT od razu pisał kod w oczekiwanym stylu.',
  },
  'plugin/engineering-pack': {
    title: 'Pakiet inżynierski',
    description:
      'Mały pakiet codziennych narzędzi inżynierskich: przeglądu kodu, pisania testów i generowania changelogu.',
  },
  'prompt/eli5-explainer': {
    title: 'Proste wyjaśnienie ELI5',
    description:
      'Prompt systemowy, który wyjaśnia dowolny temat prostym językiem dla wskazanej grupy odbiorców i zawsze opiera wyjaśnienie na konkretnej analogii z życia.',
  },
  'prompt/meeting-summary': {
    title: 'Od notatek ze spotkania do decyzji i zadań',
    description:
      'Prompt użytkownika zamieniający nieuporządkowane notatki ze spotkania w podsumowanie decyzji, zadania z właścicielami oraz otwarte pytania gotowe do udostępnienia.',
  },
  'skill/pdf-form-filler': {
    title: 'Wypełnianie formularzy PDF',
    description:
      'Wypełnia interaktywne pola AcroForm w pliku PDF danymi klucz–wartość za pomocą pypdf, zachowując oryginalny układ. Służy do automatycznego uzupełniania faktur, wniosków i innych formularzy.',
  },
  'skill/sqlite-explorer': {
    title: 'Eksplorator SQLite',
    description:
      'Bezpiecznie analizuje bazę SQLite tylko do odczytu: pokazuje tabele i schemat, podgląda przykładowe wiersze oraz wykonuje zapytania SELECT bez ryzyka zapisu.',
  },
  'subagent/code-reviewer': {
    title: 'Recenzent kodu',
    description:
      'Sprawdza diff pod kątem poprawności, luk bezpieczeństwa i pominiętych przypadków brzegowych, a następnie zwraca uporządkowane i konkretne zalecenia przed scaleniem zmian.',
  },
  'subagent/test-writer': {
    title: 'Autor testów',
    description:
      'Pisze skoncentrowane testy jednostkowe o wysokiej wartości dla wskazanej funkcji lub modułu, obejmując typowe ścieżki, przypadki brzegowe i błędy zgodnie z konwencjami projektu.',
  },
};

const EN_COPY: Record<string, AssetTranslation> = {
  'prompt/bias-audit-pl': {
    title: 'Bias and assumptions audit (PL)',
    description:
      'A prompt for critically reviewing an AI response. It reveals assumptions, missing perspectives, stereotypes, and the difference between fact and interpretation.',
  },
  'prompt/devils-advocate-pl': {
    title: 'Devil’s advocate for decisions (PL)',
    description:
      'A two-sided review of an idea or decision: the strongest arguments against and for it, risks, and missing information.',
  },
  'prompt/guided-interview-pl': {
    title: 'Step-by-step interview mode (PL)',
    description:
      'A prompt that asks ChatGPT to pose one question at a time, gather missing context, and confirm the brief before completing the task.',
  },
  'prompt/image-brief-pl': {
    title: 'Image-generation brief (PL)',
    description:
      'A visual prompt template covering purpose, subject, composition, style, lighting, format, and excluded elements.',
  },
  'prompt/prompt-brief-pl': {
    title: 'Six-part prompt brief (PL)',
    description:
      'A Polish template for turning a broad request into a concrete brief: goal, context, data, audience, format, and quality criteria.',
  },
  'skill/meeting-recap-pl': {
    title: 'Meeting recap Skill (PL)',
    description:
      'Turns Polish meeting notes into a concise summary, decisions, action items with owners, and open questions without inventing missing details.',
  },
};

const CATEGORY_PL: Record<string, string> = {
  Automation: 'Automatyzacja',
  Bundles: 'Pakiety',
  Connectors: 'Konektory',
  Data: 'Dane',
  Documents: 'Dokumenty',
  Engineering: 'Inżynieria',
  Preferences: 'Preferencje',
  Productivity: 'Produktywność',
  Teaching: 'Nauczanie',
  'Workshop PL': 'Warsztat PL',
};

const TAG_PL: Record<string, string> = {
  automation: 'automatyzacja',
  bundle: 'pakiet',
  'code-review': 'przegląd-kodu',
  'critical-thinking': 'myślenie-krytyczne',
  database: 'baza-danych',
  'decision-making': 'podejmowanie-decyzji',
  documents: 'dokumenty',
  engineering: 'inżynieria',
  explanation: 'wyjaśnianie',
  forms: 'formularze',
  formatting: 'formatowanie',
  images: 'obrazy',
  interview: 'wywiad',
  meetings: 'spotkania',
  preferences: 'preferencje',
  productivity: 'produktywność',
  release: 'wydanie',
  risk: 'ryzyko',
  security: 'bezpieczeństwo',
  style: 'styl',
  summarization: 'podsumowanie',
  teaching: 'nauczanie',
  testing: 'testowanie',
  'unit-tests': 'testy-jednostkowe',
  verification: 'weryfikacja',
  workflow: 'proces',
};

const TAG_EN: Record<string, string> = {
  polski: 'Polish',
  warsztat: 'workshop',
};

const VARIABLE_HINTS: Partial<Record<Locale, Record<string, Record<string, string>>>> = {
  en: {
    'prompt/bias-audit-pl': {
      odpowiedz: 'AI response, recommendation, or analysis to review',
      kontekst: 'Goal, audience, and known facts',
    },
    'prompt/devils-advocate-pl': {
      decyzja: 'Idea, plan, or recommendation to test',
      kontekst: 'Constraints, audience, and the decision goal',
    },
    'prompt/guided-interview-pl': {
      zadanie: 'A broad description of what you want to prepare',
      liczba_pytan: 'Maximum number of questions, for example 5',
    },
    'prompt/image-brief-pl': {
      zastosowanie: 'For example a slide, post, banner, or instructional illustration',
      temat: 'What the image should show',
      kompozycja: 'Placement of objects and negative space',
      styl: 'For example realistic photography or a flat illustration',
      kolory_swiatlo: 'Colour palette, lighting, and mood',
      format: 'Aspect ratio and orientation',
      ograniczenia: 'Elements to exclude and areas that must remain empty',
    },
    'prompt/prompt-brief-pl': {
      cel: 'What should be created or which decision should be supported',
      kontekst: 'The most important information about the situation',
      dane: 'Text, notes, or facts the model should use',
      odbiorca: 'Who will read or use the result',
      format: 'The expected structure and length of the result',
      kryteria: 'What makes the answer good and useful',
    },
  },
  pl: {
    'prompt/eli5-explainer': {
      topic: 'Pojęcie lub temat do wyjaśnienia',
      audience: 'Osoba lub grupa, dla której powstaje wyjaśnienie',
    },
    'prompt/meeting-summary': {
      notes: 'Surowe notatki lub transkrypcja spotkania, wklejone bez zmian',
    },
  },
};

const USAGE_NOTES_PL: Record<string, string> = {
  'hook/prettier-on-save': `## Co robi
Po każdym użyciu narzędzia Write lub Edit hook sprawdza rozszerzenie zmienionego pliku. Dla plików JS/TS (.js, .jsx, .ts, .tsx, .mjs, .cjs) uruchamia Prettiera tylko na tym pliku. Pozostałe typy ignoruje.

## Instalacja
Scal blok „hooks” z plikiem .codex/hooks.json w projekcie albo ~/.codex/hooks.json dla wszystkich projektów. Uruchom /hooks lub ponownie uruchom Codex.

## Wymagania
- Prettier dostępny w projekcie lub globalnie. npx --no-install korzysta z lokalnej instalacji i nie pobiera niczego z sieci; jeśli nie znajdzie Prettiera, hook kończy się bez blokowania edycji.
- Zainstalowany jq, używany do odczytania ścieżki pliku z danych JSON hooka.

## Dostosowanie i bezpieczeństwo
Możesz dodać kolejne rozszerzenia do instrukcji case albo zastąpić Prettiera innym formaterem. Hook uruchamia polecenie powłoki przy każdym zapisie, dlatego włączaj go tylko w zaufanych projektach i przeczytaj polecenie przed instalacją. Nie korzysta z danych uwierzytelniających.`,
  'mcp_server/notion': `## Co łączy
Łączy ChatGPT z hostowanym serwerem MCP Notion, dzięki czemu może wyszukiwać, czytać i zapisywać strony oraz bazy danych w udostępnionym obszarze roboczym.

## Instalacja
Dodaj serwer jako konektor MCP w ChatGPT Plugins albo skonfiguruj go w Codex poleceniem codex mcp add.

## Uwierzytelnianie
Konfiguracja odczytuje token z zmiennej środowiskowej NOTION_TOKEN; jego wartość nie jest zapisywana w pliku. Utwórz integrację wewnętrzną Notion, udostępnij jej tylko potrzebne strony i bazy, a token przechowuj w zmiennej środowiskowej lub menedżerze sekretów. Nigdy nie zapisuj go w repozytorium.

## Uwagi
Serwer działa zdalnie przez HTTPS i nie uruchamia lokalnego kodu, ale otrzymuje dostęp do udostępnionych mu treści Notion. Ogranicz ten zakres do minimum. Endpoint obsługuje też logowanie OAuth. Dostęp można cofnąć przez usunięcie integracji lub odebranie jej udostępnień.`,
  'plugin/engineering-pack': `Wtyczka startowa łącząca trzy materiały inżynierskie dostępne w tej bibliotece. Zainstaluj ją przez marketplace wtyczek, aby jednym krokiem włączyć subagentów code-reviewer i test-writer oraz polecenie /changelog.

Pakowanie materiałów we wtyczkę pozwala też udostępnić osobiste materiały z ~/.codex w sesjach chmurowych i ChatGPT Work. Pojedyncza umiejętność lub subagent pozostaje lokalny, dopóki nie trafi do repozytorium albo wtyczki.`,
};

export function getAssetCopy(
  asset: Pick<Asset | AssetSummary, 'id' | 'title' | 'description' | 'category' | 'tags'>,
  locale: Locale,
) {
  const translated = (locale === 'pl' ? PL_COPY : EN_COPY)[asset.id];
  return {
    title: translated?.title ?? asset.title,
    description: translated?.description ?? asset.description,
    category:
      asset.category === null
        ? null
        : locale === 'pl'
          ? CATEGORY_PL[asset.category] ?? asset.category
          : asset.category,
    tags: asset.tags.map((tag) => translateAssetTag(tag, locale)),
  };
}

export function translateAssetTag(tag: string, locale: Locale) {
  return locale === 'pl' ? TAG_PL[tag] ?? tag : TAG_EN[tag] ?? tag;
}

export function getVariableHint(
  assetId: string,
  variableName: string,
  fallback: string,
  locale: Locale,
) {
  return VARIABLE_HINTS[locale]?.[assetId]?.[variableName] ?? fallback;
}

export function getUsageNotes(asset: Pick<Asset, 'id' | 'usageNotes'>, locale: Locale) {
  if (!asset.usageNotes) return null;
  return locale === 'pl' ? USAGE_NOTES_PL[asset.id] ?? asset.usageNotes : asset.usageNotes;
}

export function getInstallNote(asset: Pick<Asset, 'type' | 'slug' | 'targets'>, locale: Locale) {
  if (locale === 'en') {
    switch (asset.type) {
      case 'skill':
        return asset.targets.includes('chatgpt')
          ? 'Create a Skill with chat or upload this folder in the Skills area. Availability can depend on your plan and workspace settings.'
          : "Copy the whole folder into a project's .agents/skills/ (or ~/.agents/skills/ for personal use).";
      case 'plugin':
        return 'Install it from the shared ChatGPT and Codex plugin directory, or add its local marketplace source while developing it.';
      case 'subagent':
        return `Use these instructions in .codex/agents/${asset.slug}.toml or ask ChatGPT Work to delegate the task to a subagent.`;
      case 'command':
        return 'Paste it into ChatGPT as a reusable prompt. In Codex, package reusable instructions as a skill.';
      case 'prompt':
        return 'Use it as a system or user prompt; prompts have no fixed on-disk location.';
      case 'mcp_server':
        return 'Connect the MCP server from ChatGPT Plugins or add it to the Codex MCP configuration.';
      case 'hook':
        return 'Merge the hook into .codex/hooks.json for the project or user. Review it first — hooks run code.';
      case 'memory':
        return 'Add project guidance to AGENTS.md or cross-chat preferences to ChatGPT custom instructions.';
    }
  }

  switch (asset.type) {
    case 'skill':
      return asset.targets.includes('chatgpt')
        ? 'Utwórz umiejętność na czacie albo prześlij ten folder w sekcji Umiejętności. Dostępność może zależeć od planu i ustawień obszaru roboczego.'
        : 'Skopiuj cały folder do .agents/skills/ w projekcie albo do ~/.agents/skills/ do użytku osobistego.';
    case 'plugin':
      return 'Zainstaluj ją ze wspólnego katalogu wtyczek ChatGPT i Codex albo dodaj jej lokalne źródło marketplace podczas tworzenia.';
    case 'subagent':
      return `Użyj tych instrukcji w pliku .codex/agents/${asset.slug}.toml albo poproś ChatGPT Work o przekazanie zadania subagentowi.`;
    case 'command':
      return 'Wklej go do ChatGPT jako prompt wielokrotnego użytku. W Codex zapakuj powtarzalne instrukcje jako umiejętność.';
    case 'prompt':
      return 'Użyj go jako promptu systemowego lub użytkownika; prompty nie mają stałego miejsca na dysku.';
    case 'mcp_server':
      return 'Połącz serwer MCP przez ChatGPT Plugins albo dodaj go do konfiguracji MCP w Codex.';
    case 'hook':
      return 'Scal hook z plikiem .codex/hooks.json projektu lub użytkownika. Najpierw go sprawdź — hooki uruchamiają kod.';
    case 'memory':
      return 'Dodaj instrukcje projektu do AGENTS.md, a preferencje między czatami do instrukcji niestandardowych ChatGPT.';
  }
}

export const TYPE_LABEL_KEYS: Record<
  AssetType,
  { label: MsgKey; plural: MsgKey }
> = {
  skill: { label: 'asset.type.skill', plural: 'asset.type.skills' },
  plugin: { label: 'asset.type.plugin', plural: 'asset.type.plugins' },
  subagent: { label: 'asset.type.subagent', plural: 'asset.type.subagents' },
  command: { label: 'asset.type.command', plural: 'asset.type.commands' },
  prompt: { label: 'asset.type.prompt', plural: 'asset.type.prompts' },
  mcp_server: { label: 'asset.type.mcp_server', plural: 'asset.type.mcp_servers' },
  hook: { label: 'asset.type.hook', plural: 'asset.type.hooks' },
  memory: { label: 'asset.type.memory', plural: 'asset.type.memories' },
};

export const VISIBILITY_LABEL_KEYS: Record<Visibility, MsgKey> = {
  private: 'asset.visibility.private',
  local: 'asset.visibility.local',
  project: 'asset.visibility.project',
  org_shared: 'asset.visibility.org_shared',
  public: 'asset.visibility.public',
};
