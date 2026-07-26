'use client';

import { useEffect, useState } from 'react';
import { Source_Serif_4 } from 'next/font/google';
import './global.css';
import {
  DEFAULT_LOCALE,
  detectBrowserLocale,
  DICT,
  LOCALE_STORAGE_KEY,
  type Locale,
} from '@/lib/workshop/i18n';

// Last-resort boundary: fires when the root layout itself throws, so it must
// render its own <html>/<body> and re-establish the font + theme tokens.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-serif',
  display: 'swap',
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    console.error(error);
    let initial = detectBrowserLocale();
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored === 'en' || stored === 'pl') initial = stored;
    } catch {
      /* ignore */
    }
    setLocale(initial);
  }, [error]);
  const t = DICT[locale];

  return (
    <html lang={locale} className={sourceSerif.variable}>
      <body className="flex min-h-screen flex-col">
        <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-24">
          <p className="mb-2 font-heading text-sm uppercase tracking-widest text-accent-2">
            {t['error.kicker']}
          </p>
          <h1 className="font-heading text-6xl leading-none">{t['error.title']}</h1>
          <div className="my-6 h-px w-full bg-divider" />
          <p className="max-w-prose text-lg text-fd-muted-foreground">
            {t['error.globalDescription']}
          </p>
          {error.digest && (
            <p className="mt-3 font-mono text-xs text-fd-muted-foreground">
              {t['error.reference']}: {error.digest}
            </p>
          )}
          <div className="mt-8">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 font-heading text-bg transition-colors hover:bg-accent-600"
            >
              {t['error.reload']}
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
