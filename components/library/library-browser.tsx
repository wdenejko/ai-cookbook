'use client';

import { type ReactNode, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { type AssetSummary, type AssetType } from '@/lib/assets/types';
import { getAssetCopy, translateAssetTag, TYPE_LABEL_KEYS } from '@/lib/assets/i18n';
import { useLocale, useT } from '@/components/workshop/locale';
import { AssetCard } from './asset-card';

export function LibraryBrowser({ assets }: { assets: AssetSummary[] }) {
  const t = useT();
  const { locale } = useLocale();
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState<AssetType | 'all'>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const typesPresent = useMemo(() => {
    const counts = new Map<AssetType, number>();
    for (const a of assets) counts.set(a.type, (counts.get(a.type) ?? 0) + 1);
    return [...counts.entries()];
  }, [assets]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    for (const a of assets) a.tags.forEach((t) => set.add(t));
    return [...set].sort();
  }, [assets]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets.filter((a) => {
      if (activeType !== 'all' && a.type !== activeType) return false;
      if (activeTags.length && !activeTags.every((t) => a.tags.includes(t))) return false;
      if (q) {
        const copy = getAssetCopy(a, locale);
        const hay =
          `${copy.title} ${copy.description} ${copy.tags.join(' ')} ${copy.category ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [assets, query, activeType, activeTags, locale]);

  const toggleTag = (t: string) =>
    setActiveTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  return (
    <div className="flex flex-col gap-6">
      <div className="relative max-w-md">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fd-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('library.search')}
          aria-label={t('library.searchAria')}
          className="min-h-11 w-full rounded-md border border-divider bg-surface pl-9 pr-3 text-sm outline-none focus-visible:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <FacetChip active={activeType === 'all'} onClick={() => setActiveType('all')}>
          {t('library.all')} ({assets.length})
        </FacetChip>
        {typesPresent.map(([type, n]) => (
          <FacetChip key={type} active={activeType === type} onClick={() => setActiveType(type)}>
            {t(TYPE_LABEL_KEYS[type].plural)} ({n})
          </FacetChip>
        ))}
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleTag(t)}
              aria-pressed={activeTags.includes(t)}
              className={`rounded-sm px-2 py-0.5 text-xs transition-colors ${
                activeTags.includes(t)
                  ? 'bg-accent text-bg'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {translateAssetTag(t, locale)}
            </button>
          ))}
        </div>
      )}

      <p className="text-sm text-fd-muted-foreground">
        {filtered.length} {t('library.of')} {assets.length}{' '}
        {assets.length === 1 ? t('library.asset') : t('library.assets')}
      </p>

      {assets.length === 0 ? (
        <EmptyState />
      ) : filtered.length === 0 ? (
        <p className="text-fd-muted-foreground">{t('library.noMatch')}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <AssetCard key={a.id} asset={a} />
          ))}
        </div>
      )}
    </div>
  );
}

function FacetChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-9 rounded-md px-3 text-sm transition-colors ${
        active ? 'bg-accent text-bg' : 'border border-divider hover:bg-neutral-200'
      }`}
    >
      {children}
    </button>
  );
}

function EmptyState() {
  const t = useT();
  return (
    <div className="rounded-md border border-dashed border-divider p-8 text-center text-fd-muted-foreground">
      <p className="mb-1 font-heading text-lg text-fd-foreground">{t('library.emptyTitle')}</p>
      <p className="text-sm">
        {t('library.emptyDescription.before')}{' '}
        <code className="font-mono">content/assets/</code> {t('library.emptyDescription.after')}
      </p>
    </div>
  );
}
