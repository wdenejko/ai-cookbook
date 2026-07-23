import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FileCode } from 'lucide-react';
import { getAsset, getAssets } from '@/lib/assets/loader';
import { type Asset, TYPE_META } from '@/lib/assets/types';
import { summarizeHooks, summarizeMcp } from '@/lib/assets/summarize';
import { TypeBadge, VisibilityBadge, SecurityBadges, Tag } from '@/components/library/badges';
import { CopyButton } from '@/components/library/copy-button';
import { CodeView } from '@/components/library/code-view';
import { DownloadBundleButton } from '@/components/library/download-bundle-button';
import { langFor } from '@/lib/assets/highlight';
import { gitConfig } from '@/lib/shared';

export async function generateStaticParams() {
  return (await getAssets()).map((a) => ({ type: a.type, slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<'/library/[type]/[slug]'>,
): Promise<Metadata> {
  const { type, slug } = await props.params;
  const asset = await getAsset(type, slug);
  if (!asset) return {};
  return { title: `${asset.title} — AI Cookbook`, description: asset.description };
}

interface PromptVar {
  name: string;
  hint?: string;
}

function readPromptVars(asset: Asset): PromptVar[] {
  const raw = asset.frontmatter.variables;
  if (!Array.isArray(raw)) return [];
  return raw.map((v) =>
    typeof v === 'string' ? { name: v } : { name: String((v as PromptVar).name ?? ''), hint: (v as PromptVar).hint },
  );
}

export default async function AssetDetailPage(props: PageProps<'/library/[type]/[slug]'>) {
  const { type, slug } = await props.params;
  const asset = await getAsset(type, slug);
  if (!asset) notFound();

  const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/${asset.filePath}`;

  // Resolve plugin children to library assets (unresolved refs shown as text).
  let components: { ref: string; asset: Asset | null }[] = [];
  if (asset.type === 'plugin' && asset.componentRefs.length) {
    const all = await getAssets();
    components = asset.componentRefs.map((ref) => ({
      ref,
      asset: all.find((a) => a.id === ref) ?? null,
    }));
  }

  const promptVars = asset.type === 'prompt' ? readPromptVars(asset) : [];
  const hookSummary = asset.type === 'hook' ? summarizeHooks(asset.manifest) : [];
  const mcpSummary = asset.type === 'mcp_server' ? summarizeMcp(asset.manifest) : [];

  const previewFiles = asset.files.filter((f) => typeof f.content === 'string');
  const bundleFiles = [
    ...(asset.type === 'skill' ? [{ path: 'SKILL.md', content: asset.raw }] : []),
    ...previewFiles.map((f) => ({ path: f.path, content: f.content as string })),
  ];
  const canDownload = (asset.type === 'skill' || asset.type === 'plugin') && bundleFiles.length > 1;

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <Link
        href="/library"
        className="mb-6 inline-flex min-h-9 items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden /> Library
      </Link>

      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <TypeBadge type={asset.type} />
        <VisibilityBadge visibility={asset.visibility} />
        <SecurityBadges
          trustRequired={asset.trustRequired}
          containsSecrets={asset.containsSecrets}
        />
      </div>

      <h1 className="font-heading text-4xl">{asset.title}</h1>
      {asset.description && (
        <p className="mt-2 max-w-prose text-lg text-fd-muted-foreground">{asset.description}</p>
      )}

      {asset.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {asset.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}

      {/* At a glance — type-specific structured summary */}
      {hookSummary.length > 0 && (
        <section className="mt-8 rounded-md bg-surface p-4">
          <h2 className="mb-2 font-heading text-sm uppercase tracking-wide text-accent">
            At a glance
          </h2>
          <ul className="flex flex-col gap-1 text-sm">
            {hookSummary.map((h, i) => (
              <li key={i} className="font-mono">
                <span className="text-accent">{h.event}</span> · matcher{' '}
                <span className="text-fd-foreground">{h.matcher}</span>
                {h.actions.length > 0 && <> · {h.actions.join(', ')}</>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {mcpSummary.length > 0 && (
        <section className="mt-8 rounded-md bg-surface p-4">
          <h2 className="mb-2 font-heading text-sm uppercase tracking-wide text-accent">
            At a glance
          </h2>
          <ul className="flex flex-col gap-1 text-sm">
            {mcpSummary.map((s) => (
              <li key={s.name} className="font-mono">
                <span className="text-accent">{s.name}</span> · {s.transport}
                {s.endpoint && <> · {s.endpoint}</>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {promptVars.length > 0 && (
        <section className="mt-8 rounded-md bg-surface p-4">
          <h2 className="mb-3 font-heading text-sm uppercase tracking-wide text-accent">
            Variables
          </h2>
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
            {promptVars.map((v) => (
              <div key={v.name} className="contents">
                <dt className="font-mono text-accent">{`{{${v.name}}}`}</dt>
                <dd className="text-fd-muted-foreground">{v.hint ?? ''}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* How to use this */}
      <section className="mt-6 rounded-md bg-surface p-4">
        <h2 className="mb-2 font-heading text-sm uppercase tracking-wide text-accent">
          How to use this
        </h2>
        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-fd-muted-foreground">Destination</dt>
          <dd className="break-all font-mono">{asset.install.destination}</dd>
          <dt className="text-fd-muted-foreground">Works in</dt>
          <dd>{asset.targets.length ? asset.targets.join(', ') : '—'}</dd>
          {asset.category && (
            <>
              <dt className="text-fd-muted-foreground">Category</dt>
              <dd>{asset.category}</dd>
            </>
          )}
        </dl>
        <p className="mt-3 text-sm text-fd-muted-foreground">{asset.install.note}</p>
      </section>

      {/* Plugin components */}
      {asset.type === 'plugin' && components.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 font-heading text-xl">Bundled assets</h2>
          <ul className="flex flex-col gap-2">
            {components.map(({ ref, asset: child }) =>
              child ? (
                <li key={ref}>
                  <Link
                    href={`/library/${child.type}/${child.slug}`}
                    className="flex items-center gap-3 rounded-md bg-surface p-3 transition-colors hover:bg-neutral-200"
                  >
                    <TypeBadge type={child.type} />
                    <span className="font-heading">{child.title}</span>
                    <span className="line-clamp-1 text-sm text-fd-muted-foreground">
                      {child.description}
                    </span>
                  </Link>
                </li>
              ) : (
                <li key={ref} className="rounded-md border border-dashed border-divider p-3 text-sm text-fd-muted-foreground">
                  <span className="font-mono">{ref}</span> — not in this library
                </li>
              ),
            )}
          </ul>
        </section>
      )}

      {asset.usageNotes && (
        <section className="mt-6">
          <h2 className="mb-2 font-heading text-xl">Notes</h2>
          <p className="whitespace-pre-wrap text-sm">{asset.usageNotes}</p>
        </section>
      )}

      {/* Source */}
      <section className="mt-8">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-heading text-xl">
            Source <span className="font-mono text-sm text-fd-muted-foreground">{sourceName(asset)}</span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {canDownload && (
              <DownloadBundleButton folderName={asset.slug} files={bundleFiles} />
            )}
            <CopyButton text={asset.raw} label="Copy" />
            <a
              href={githubUrl}
              className="inline-flex min-h-9 items-center rounded-md border border-divider px-3 font-heading text-sm transition-colors hover:bg-neutral-200"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <CodeView code={asset.raw} lang={asset.rawLanguage} />
      </section>

      {/* Skill bundle file previews */}
      {asset.type === 'skill' && previewFiles.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-heading text-xl">Bundle files</h2>
          <div className="flex flex-col gap-6">
            {previewFiles.map((f) => (
              <div key={f.path}>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-mono text-sm">
                    <FileCode className="size-4 text-accent" aria-hidden />
                    {f.path}
                    {f.executable ? ' · executable' : ''}
                  </span>
                  <CopyButton text={f.content as string} label="Copy" />
                </div>
                <CodeView code={f.content as string} lang={langFor(f.path)} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Plugin file list */}
      {asset.type === 'plugin' && asset.files.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-2 font-heading text-xl">Files</h2>
          <ul className="flex flex-col gap-1 text-sm">
            {asset.files.map((f) => (
              <li
                key={f.path}
                className="flex items-center gap-2 font-mono text-fd-muted-foreground"
              >
                <FileCode className="size-4" aria-hidden /> {f.path}
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-8 text-xs text-fd-muted-foreground">
        {asset.filePath} · {asset.contentHash}
      </p>
    </main>
  );
}

function sourceName(asset: Asset): string {
  if (asset.type === 'skill') return 'SKILL.md';
  if (asset.type === 'plugin') return 'plugin.json';
  return asset.filePath.split('/').pop() ?? '';
}
