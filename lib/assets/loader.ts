import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import matter from 'gray-matter';
import { cache } from 'react';
import {
  type Asset,
  type AssetFile,
  type AssetType,
  type Target,
  type Visibility,
  installFor,
  humanize,
  TYPE_META,
  VISIBILITY_LEVELS,
  TARGETS,
} from './types';

const ASSETS_ROOT = path.join(process.cwd(), 'content', 'assets');

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readDirSafe(p: string) {
  try {
    return await fs.readdir(p, { withFileTypes: true });
  } catch {
    return [];
  }
}

function hash(s: string): string {
  return crypto.createHash('sha256').update(s).digest('hex').slice(0, 12);
}

function strArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === 'string') return v.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

/** Reads the optional `library:` frontmatter block, with safe defaults. */
function readLibrary(fm: Record<string, unknown>) {
  const lib = (fm.library && typeof fm.library === 'object' ? fm.library : {}) as Record<
    string,
    unknown
  >;
  const visibility: Visibility =
    typeof lib.visibility === 'string' &&
    (VISIBILITY_LEVELS as readonly string[]).includes(lib.visibility)
      ? (lib.visibility as Visibility)
      : 'private';
  const targets = strArray(lib.targets).filter((t): t is Target =>
    (TARGETS as readonly string[]).includes(t),
  );
  return {
    tags: strArray(lib.tags),
    category: typeof lib.category === 'string' ? lib.category : null,
    visibility,
    targets,
    sourceProject: typeof lib.sourceProject === 'string' ? lib.sourceProject : null,
    trustRequired: lib.trustRequired === true,
    containsSecrets: lib.containsSecrets === true,
    version: typeof lib.version === 'string' ? lib.version : null,
  };
}

function deriveTitle(slug: string, fm: Record<string, unknown>): string {
  if (typeof fm.title === 'string' && fm.title.trim()) return fm.title.trim();
  if (typeof fm.name === 'string' && fm.name.trim()) return humanize(fm.name.trim());
  return humanize(slug);
}

function makeAsset(input: {
  type: AssetType;
  slug: string;
  filePath: string;
  raw: string;
  rawLanguage: 'markdown' | 'json';
  fm: Record<string, unknown>;
  body: string | null;
  manifest: unknown | null;
  files: AssetFile[];
  usageNotes: string | null;
}): Asset {
  const lib = readLibrary(input.fm);
  const body = input.body?.trim() ? input.body.trim() : null;
  return {
    id: `${input.type}/${input.slug}`,
    type: input.type,
    storageKind: TYPE_META[input.type].kind,
    title: deriveTitle(input.slug, input.fm),
    slug: input.slug,
    description: typeof input.fm.description === 'string' ? input.fm.description : '',
    body,
    raw: input.raw,
    rawLanguage: input.rawLanguage,
    manifest: input.manifest ?? null,
    frontmatter: input.fm,
    tags: lib.tags,
    category: lib.category,
    sourceProject: lib.sourceProject,
    version: lib.version,
    visibility: lib.visibility,
    targets: lib.targets,
    // hooks always run code; skills may ship scripts
    trustRequired: lib.trustRequired || input.type === 'hook',
    containsSecrets: lib.containsSecrets,
    usageNotes: input.usageNotes,
    filePath: input.filePath,
    files: input.files,
    install: installFor(input.type, input.slug),
    contentHash: hash(input.raw),
  };
}

async function loadSkills(): Promise<Asset[]> {
  const dir = path.join(ASSETS_ROOT, 'skills');
  const out: Asset[] = [];
  for (const entry of await readDirSafe(dir)) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const skillMd = path.join(dir, slug, 'SKILL.md');
    if (!(await exists(skillMd))) continue;
    const raw = await fs.readFile(skillMd, 'utf8');
    const { data: fm, content: body } = matter(raw);

    const files: AssetFile[] = [];
    const walk = async (d: string, rel: string) => {
      for (const f of await readDirSafe(d)) {
        const relPath = rel ? `${rel}/${f.name}` : f.name;
        if (f.isDirectory()) await walk(path.join(d, f.name), relPath);
        else if (relPath !== 'SKILL.md')
          files.push({ path: relPath, executable: relPath.startsWith('scripts/') });
      }
    };
    await walk(path.join(dir, slug), '');

    out.push(
      makeAsset({
        type: 'skill',
        slug,
        filePath: `content/assets/skills/${slug}/SKILL.md`,
        raw,
        rawLanguage: 'markdown',
        fm,
        body,
        manifest: null,
        files,
        usageNotes: null,
      }),
    );
  }
  return out;
}

const SINGLE_FILE_TYPES: { type: AssetType; dir: string }[] = [
  { type: 'subagent', dir: 'subagents' },
  { type: 'command', dir: 'commands' },
  { type: 'prompt', dir: 'prompts' },
  { type: 'memory', dir: 'memories' },
];

async function loadSingleFile(): Promise<Asset[]> {
  const out: Asset[] = [];
  for (const { type, dir } of SINGLE_FILE_TYPES) {
    const d = path.join(ASSETS_ROOT, dir);
    for (const entry of await readDirSafe(d)) {
      if (!entry.isFile() || !/\.mdx?$/.test(entry.name)) continue;
      const slug = entry.name.replace(/\.mdx?$/, '');
      const raw = await fs.readFile(path.join(d, entry.name), 'utf8');
      const { data: fm, content: body } = matter(raw);
      out.push(
        makeAsset({
          type,
          slug,
          filePath: `content/assets/${dir}/${entry.name}`,
          raw,
          rawLanguage: 'markdown',
          fm,
          body,
          manifest: null,
          files: [],
          usageNotes: null,
        }),
      );
    }
  }
  return out;
}

const JSON_TYPES: { type: AssetType; dir: string }[] = [
  { type: 'mcp_server', dir: 'mcp' },
  { type: 'hook', dir: 'hooks' },
];

async function loadJson(): Promise<Asset[]> {
  const out: Asset[] = [];
  for (const { type, dir } of JSON_TYPES) {
    const d = path.join(ASSETS_ROOT, dir);
    for (const entry of await readDirSafe(d)) {
      if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
      const slug = entry.name.replace(/\.json$/, '');
      const jsonRaw = await fs.readFile(path.join(d, entry.name), 'utf8');
      let manifest: unknown = null;
      try {
        manifest = JSON.parse(jsonRaw);
      } catch {
        // leave manifest null; still show the raw source
      }
      let fm: Record<string, unknown> = {};
      let notes: string | null = null;
      const sidecar = path.join(d, `${slug}.md`);
      if (await exists(sidecar)) {
        const parsed = matter(await fs.readFile(sidecar, 'utf8'));
        fm = parsed.data;
        notes = parsed.content.trim() || null;
      }
      out.push(
        makeAsset({
          type,
          slug,
          filePath: `content/assets/${dir}/${entry.name}`,
          raw: jsonRaw,
          rawLanguage: 'json',
          fm,
          body: null,
          manifest,
          files: [],
          usageNotes: notes,
        }),
      );
    }
  }
  return out;
}

/** All assets, parsed and normalized. Cached per request/render. */
export const getAssets = cache(async (): Promise<Asset[]> => {
  const [skills, singles, jsons] = await Promise.all([
    loadSkills(),
    loadSingleFile(),
    loadJson(),
  ]);
  return [...skills, ...singles, ...jsons].sort(
    (a, b) => a.type.localeCompare(b.type) || a.title.localeCompare(b.title),
  );
});

export async function getAsset(type: string, slug: string): Promise<Asset | undefined> {
  return (await getAssets()).find((a) => a.type === type && a.slug === slug);
}
