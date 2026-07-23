import Link from 'next/link';
import { type AssetSummary } from '@/lib/assets/types';
import { TypeBadge, VisibilityBadge, SecurityBadges, Tag } from './badges';

export function AssetCard({ asset }: { asset: AssetSummary }) {
  return (
    <Link
      href={`/library/${asset.type}/${asset.slug}`}
      className="group flex flex-col gap-2 rounded-md bg-surface p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <TypeBadge type={asset.type} />
        <SecurityBadges
          trustRequired={asset.trustRequired}
          containsSecrets={asset.containsSecrets}
        />
      </div>

      <h3 className="font-heading text-lg leading-tight group-hover:text-accent">{asset.title}</h3>
      <p className="line-clamp-3 flex-1 text-sm text-fd-muted-foreground">{asset.description}</p>

      {asset.tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {asset.tags.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pt-1">
        <VisibilityBadge visibility={asset.visibility} />
        {asset.category && (
          <span className="text-xs text-fd-muted-foreground">{asset.category}</span>
        )}
      </div>
    </Link>
  );
}
