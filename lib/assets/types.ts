// The unified Asset model for the AI Cookbook library.
// See docs/PROJECT-PLAN.md §4 for the full model; this is the Phase 1 subset.

export const ASSET_TYPES = [
  'skill',
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

export type StorageKind = 'single_file' | 'folder_bundle' | 'json_entry';

export const TARGETS = ['claude-code', 'claude-api', 'claude-ai', 'cowork'] as const;
export type Target = (typeof TARGETS)[number];

export interface AssetFile {
  path: string; // relative to the asset root
  executable: boolean;
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
  files: AssetFile[]; // bundle files (skills); [] otherwise
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
export function installFor(type: AssetType, slug: string): { destination: string; note: string } {
  switch (type) {
    case 'skill':
      return {
        destination: `.claude/skills/${slug}/`,
        note: "Copy the whole folder into a project's .claude/skills/ (or ~/.claude/skills/ for personal use).",
      };
    case 'subagent':
      return {
        destination: `.claude/agents/${slug}.md`,
        note: 'Place in .claude/agents/ (project) or ~/.claude/agents/ (personal).',
      };
    case 'command':
      return {
        destination: `.claude/commands/${slug}.md`,
        note: `Place in .claude/commands/ to expose it as /${slug}.`,
      };
    case 'prompt':
      return {
        destination: '—',
        note: 'Use as a system or user prompt; prompts have no fixed on-disk location.',
      };
    case 'mcp_server':
      return {
        destination: '.mcp.json',
        note: 'Merge the entry into .mcp.json (project, version-controlled) or ~/.claude.json (personal).',
      };
    case 'hook':
      return {
        destination: '.claude/settings.json',
        note: 'Merge the block into your settings.json under "hooks". Review it — hooks run code.',
      };
    case 'memory':
      return {
        destination: 'CLAUDE.md',
        note: 'Add to ./CLAUDE.md (project) or ~/.claude/CLAUDE.md (personal).',
      };
  }
}
