// The unified Asset model for the AI Cookbook library.
// See docs/PROJECT-PLAN.md §4 for the full model; this is the Phase 1 subset.

export const ASSET_TYPES = [
  'skill',
  'plugin',
  'subagent',
  'command',
  'prompt',
  'mcp_server',
  'hook',
  'memory',
] as const;
export type AssetType = (typeof ASSET_TYPES)[number];

export const VISIBILITY_LEVELS = [
  'private',
  'local',
  'project',
  'org_shared',
  'public',
] as const;
export type Visibility = (typeof VISIBILITY_LEVELS)[number];

export type StorageKind = 'single_file' | 'folder_bundle' | 'json_entry' | 'container';

export const TARGETS = ['chatgpt', 'chatgpt-work', 'codex', 'openai-api'] as const;
export type Target = (typeof TARGETS)[number];

export interface AssetFile {
  path: string; // relative to the asset root
  executable: boolean;
  content?: string; // text content, for preview + client-side bundling
}

export interface Asset {
  id: string; // `${type}/${slug}`
  type: AssetType;
  storageKind: StorageKind;
  title: string;
  slug: string;
  description: string;
  body: string | null; // markdown / system prompt / prompt text (trimmed)
  raw: string; // exact primary-file source to copy (SKILL.md, .md, or the JSON)
  rawLanguage: 'markdown' | 'json';
  manifest: unknown | null; // parsed JSON for config types
  frontmatter: Record<string, unknown>;
  tags: string[];
  category: string | null;
  sourceProject: string | null;
  version: string | null;
  visibility: Visibility;
  targets: Target[];
  trustRequired: boolean;
  containsSecrets: boolean;
  usageNotes: string | null;
  filePath: string; // repo-relative primary file path
  files: AssetFile[]; // bundle files (skills / plugins); [] otherwise
  componentRefs: string[]; // child asset ids for containers (plugins); [] otherwise
  install: { destination: string; note: string };
  contentHash: string;
}

/** Trimmed shape sent to the client index (keeps `raw`/`manifest` off the wire). */
export interface AssetSummary {
  id: string;
  type: AssetType;
  storageKind: StorageKind;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  category: string | null;
  visibility: Visibility;
  targets: Target[];
  trustRequired: boolean;
  containsSecrets: boolean;
}

export function toSummary(a: Asset): AssetSummary {
  return {
    id: a.id,
    type: a.type,
    storageKind: a.storageKind,
    title: a.title,
    slug: a.slug,
    description: a.description,
    tags: a.tags,
    category: a.category,
    visibility: a.visibility,
    targets: a.targets,
    trustRequired: a.trustRequired,
    containsSecrets: a.containsSecrets,
  };
}

export const TYPE_META: Record<
  AssetType,
  { label: string; plural: string; kind: StorageKind; dir: string }
> = {
  skill: { label: 'Skill', plural: 'Skills', kind: 'folder_bundle', dir: 'skills' },
  plugin: { label: 'Plugin', plural: 'Plugins', kind: 'container', dir: 'plugins' },
  subagent: { label: 'Subagent', plural: 'Subagents', kind: 'single_file', dir: 'subagents' },
  command: { label: 'Command', plural: 'Commands', kind: 'single_file', dir: 'commands' },
  prompt: { label: 'Prompt', plural: 'Prompts', kind: 'single_file', dir: 'prompts' },
  mcp_server: { label: 'MCP server', plural: 'MCP servers', kind: 'json_entry', dir: 'mcp' },
  hook: { label: 'Hook', plural: 'Hooks', kind: 'json_entry', dir: 'hooks' },
  memory: { label: 'Memory', plural: 'Memories', kind: 'single_file', dir: 'memories' },
};

export const VISIBILITY_META: Record<Visibility, { label: string; rank: number }> = {
  private: { label: 'Private', rank: 0 },
  local: { label: 'Local', rank: 1 },
  project: { label: 'Project', rank: 2 },
  org_shared: { label: 'Org-shared', rank: 3 },
  public: { label: 'Public', rank: 4 },
};

const ACRONYMS: Record<string, string> = {
  pdf: 'PDF',
  sqlite: 'SQLite',
  sql: 'SQL',
  mcp: 'MCP',
  api: 'API',
  ai: 'AI',
  json: 'JSON',
  url: 'URL',
  id: 'ID',
  cli: 'CLI',
  eli5: 'ELI5',
  ui: 'UI',
  ux: 'UX',
};

export function humanize(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => ACRONYMS[w.toLowerCase()] ?? w.replace(/^\w/, (c) => c.toUpperCase()))
    .join(' ');
}

/** Where an asset of this type belongs in a consuming project, for "How to use this". */
export function installFor(
  type: AssetType,
  slug: string,
  targets: readonly Target[] = [],
): { destination: string; note: string } {
  switch (type) {
    case 'skill':
      if (targets.includes('chatgpt')) {
        return {
          destination: 'ChatGPT → Plugins → Skills',
          note: 'Create a Skill with chat or upload this folder in the Skills area. Availability can depend on your plan and workspace settings.',
        };
      }
      return {
        destination: `.agents/skills/${slug}/`,
        note: "Copy the whole folder into a project's .agents/skills/ (or ~/.agents/skills/ for personal use with Codex).",
      };
    case 'plugin':
      return {
        destination: 'ChatGPT / Codex → Plugins',
        note: 'Install it from the shared plugin directory. For local development, add its marketplace source with Codex and install the plugin there.',
      };
    case 'subagent':
      return {
        destination: `.codex/agents/${slug}.toml`,
        note: 'Use these instructions in a project-scoped .codex/agents/ custom-agent file or ask ChatGPT Work to delegate the task to a subagent.',
      };
    case 'command':
      return {
        destination: 'ChatGPT prompt / Codex skill',
        note: `Paste it into ChatGPT as a reusable prompt. In Codex, package it as a skill instead of relying on a custom /${slug} command.`,
      };
    case 'prompt':
      return {
        destination: '—',
        note: 'Use as a system or user prompt; prompts have no fixed on-disk location.',
      };
    case 'mcp_server':
      return {
        destination: 'ChatGPT connector / ~/.codex/config.toml',
        note: 'Connect the MCP server from ChatGPT Plugins or add it to the Codex MCP configuration.',
      };
    case 'hook':
      return {
        destination: '.codex/hooks.json',
        note: 'Merge the hook into the project or user Codex hooks file. Review it first — hooks run code.',
      };
    case 'memory':
      return {
        destination: 'AGENTS.md / ChatGPT Personalization',
        note: 'Add project guidance to AGENTS.md or cross-chat preferences to ChatGPT custom instructions.',
      };
  }
}
