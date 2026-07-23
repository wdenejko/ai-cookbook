import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FileCode } from 'lucide-react';
import { getAsset, getAssets } from '@/lib/assets/loader';
import { TypeBadge, VisibilityBadge, SecurityBadges, Tag } from '@/components/library/badges';
import { CopyButton } from '@/components/library/copy-button';
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

export default async function AssetDetailPage(props: PageProps<'/library/[type]/[slug]'>) {
  const { type, slug } = await props.params;
  const asset = await getAsset(type, slug);
  if (!asset) notFound();

  const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/${asset.filePath}`;

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

      <section className="mt-8 rounded-md bg-surface p-4">
        <h2 className="mb-2 font-heading text-sm uppercase tracking-wide text-accent">
          How to use this
        </h2>
        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-fd-muted-foreground">Destination</dt>
          <dd className="font-mono break-all">{asset.install.destination}</dd>
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

      {asset.usageNotes && (
        <section className="mt-6">
          <h2 className="mb-2 font-heading text-xl">Notes</h2>
          <p className="whitespace-pre-wrap text-sm">{asset.usageNotes}</p>
        </section>
      )}

      {asset.files.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 font-heading text-xl">Bundle</h2>
          <ul className="flex flex-col gap-1 text-sm">
            <li className="flex items-center gap-2 font-mono">
              <FileCode className="size-4 text-accent" aria-hidden /> SKILL.md
            </li>
            {asset.files.map((f) => (
              <li
                key={f.path}
                className="flex items-center gap-2 font-mono text-fd-muted-foreground"
              >
                <FileCode className="size-4" aria-hidden /> {f.path}
                {f.executable ? ' · executable' : ''}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-heading text-xl">Source</h2>
          <div className="flex items-center gap-2">
            <CopyButton text={asset.raw} label="Copy" />
            <a
              href={githubUrl}
              className="inline-flex min-h-9 items-center rounded-md border border-divider px-3 font-heading text-sm transition-colors hover:bg-neutral-200"
            >
              View on GitHub
            </a>
          </div>
        </div>
        <pre className="overflow-x-auto rounded-md bg-neutral-100 p-4 text-xs leading-relaxed">
          <code className="font-mono">{asset.raw}</code>
        </pre>
        <p className="mt-2 text-xs text-fd-muted-foreground">
          {asset.filePath} · {asset.contentHash}
        </p>
      </section>
    </main>
  );
}
