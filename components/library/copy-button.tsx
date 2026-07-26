'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useT } from '@/components/workshop/locale';

export function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const t = useT();

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // clipboard unavailable (e.g. insecure context) — no-op
        }
      }}
      aria-live="polite"
      className="inline-flex min-h-9 items-center gap-2 rounded-md border border-divider px-3 font-heading text-sm transition-colors hover:bg-neutral-200"
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      {copied ? t('asset.copied') : label ?? t('asset.copy')}
    </button>
  );
}
