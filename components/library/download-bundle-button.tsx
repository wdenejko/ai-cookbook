'use client';

import { useState } from 'react';
import JSZip from 'jszip';
import { Download } from 'lucide-react';
import { useT } from '@/components/workshop/locale';

// Zips the bundle entirely client-side (no server route) so it works on any
// static host — matches the project's static-first, portable stance.
export function DownloadBundleButton({
  folderName,
  files,
}: {
  folderName: string;
  files: { path: string; content: string }[];
}) {
  const [busy, setBusy] = useState(false);
  const t = useT();

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          const zip = new JSZip();
          const root = zip.folder(folderName) ?? zip;
          for (const f of files) root.file(f.path, f.content);
          const blob = await zip.generateAsync({ type: 'blob' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${folderName}.zip`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        } finally {
          setBusy(false);
        }
      }}
      className="inline-flex min-h-9 items-center gap-2 rounded-md border border-divider px-3 font-heading text-sm transition-colors hover:bg-neutral-200 disabled:opacity-45"
    >
      <Download className="size-4" aria-hidden />
      {busy ? t('asset.zipping') : t('asset.downloadBundle')}
    </button>
  );
}
