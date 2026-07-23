import { createHighlighter, type Highlighter } from 'shiki';

const THEMES = { light: 'github-light', dark: 'github-dark' } as const;
const LANGS = [
  'markdown',
  'json',
  'bash',
  'typescript',
  'tsx',
  'python',
  'yaml',
] as const;

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEMES.light, THEMES.dark],
      langs: LANGS as unknown as string[],
    });
  }
  return highlighterPromise;
}

/** Map a rawLanguage tag or filename/extension to a loaded Shiki language. */
export function langFor(hint: string, fallback = 'markdown'): string {
  const token = hint.includes('.') ? (hint.split('.').pop() ?? hint) : hint;
  const map: Record<string, string> = {
    md: 'markdown',
    mdx: 'markdown',
    markdown: 'markdown',
    json: 'json',
    sh: 'bash',
    bash: 'bash',
    shell: 'bash',
    shellscript: 'bash',
    ts: 'typescript',
    js: 'typescript',
    typescript: 'typescript',
    tsx: 'tsx',
    jsx: 'tsx',
    py: 'python',
    python: 'python',
    yml: 'yaml',
    yaml: 'yaml',
  };
  return map[token.toLowerCase()] ?? fallback;
}

/** Server-side dual-theme highlight → HTML string (CSS vars switch on .dark). */
export async function highlightCode(code: string, lang: string): Promise<string> {
  const hl = await getHighlighter();
  const resolved = hl.getLoadedLanguages().includes(lang) ? lang : 'markdown';
  return hl.codeToHtml(code, {
    lang: resolved,
    themes: THEMES,
    defaultColor: false,
  });
}
