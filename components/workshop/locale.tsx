'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  type Locale,
  DEFAULT_LOCALE,
  detectBrowserLocale,
  LOCALES,
  LOCALE_STORAGE_KEY,
  t as translate,
  type MsgKey,
} from '@/lib/workshop/i18n';

const LocaleContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    let initial = detectBrowserLocale();
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (stored && LOCALES.includes(stored)) initial = stored;
    } catch {
      /* ignore */
    }
    setLocaleState(initial);
    applyDocumentLocale(initial);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    applyDocumentLocale(l);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

function applyDocumentLocale(locale: Locale) {
  document.documentElement.setAttribute('data-locale', locale);
  document.documentElement.lang = locale;
}

export function useLocale() {
  return useContext(LocaleContext);
}

/** Convenience: current-locale translator for client components. */
export function useT() {
  const { locale } = useLocale();
  return (key: MsgKey) => translate(locale, key);
}

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label={translate(locale, 'lang.aria')}
      className="inline-flex shrink-0 overflow-hidden rounded-md border border-divider"
    >
      {LOCALES.map((l, i) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          aria-label={translate(locale, l === 'en' ? 'lang.en' : 'lang.pl')}
          title={translate(locale, l === 'en' ? 'lang.en' : 'lang.pl')}
          className={`min-h-9 px-3 text-sm transition-colors ${i > 0 ? 'border-l border-divider' : ''} ${
            locale === l ? 'bg-accent text-bg' : 'hover:bg-neutral-200'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
