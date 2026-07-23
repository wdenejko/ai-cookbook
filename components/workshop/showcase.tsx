import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAsset } from '@/lib/assets/loader';
import { TypeBadge } from '@/components/library/badges';

// Embeds a real library asset inside a lesson. Async server component: resolves
// the asset id at render and links into the library.
export async function Showcase({ asset: id }: { asset: string }) {
  const [type, slug] = id.split('/');
  if (!type || !slug) return null;
  const asset = await getAsset(type, slug);
  if (!asset) return null;

  return (
    <Link
      href={`/library/${asset.type}/${asset.slug}`}
      className="my-6 flex flex-col gap-2 rounded-md border border-divider bg-surface p-4 no-underline transition-colors hover:border-accent"
    >
      <span className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-accent">
        From the library <ArrowRight className="size-3.5" aria-hidden />
      </span>
      <span className="flex flex-wrap items-center gap-2">
        <TypeBadge type={asset.type} />
        <span className="font-heading text-lg">{asset.title}</span>
      </span>
      <span className="text-sm text-fd-muted-foreground">{asset.description}</span>
    </Link>
  );
}
