'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  type Locale,
  DEFAULT_LOCALE,
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
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (stored && LOCALES.includes(stored)) setLocaleState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-locale', locale);
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    document.documentElement.setAttribute('data-locale', l);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

/** Convenience: current-locale translator for client components. */
export function useT() {
  const { locale } = useLocale();
  return (key: MsgKey) => translate(locale, key);
}

const LABEL: Record<Locale, string> = { en: 'EN', pl: 'PL' };

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="group"
      aria-label={translate(locale, 'lang.aria')}
      className="inline-flex overflow-hidden rounded-md border border-divider"
    >
      {LOCALES.map((l, i) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`min-h-9 px-3 text-sm transition-colors ${i > 0 ? 'border-l border-divider' : ''} ${
            locale === l ? 'bg-accent text-bg' : 'hover:bg-neutral-200'
          }`}
        >
          {LABEL[l]}
        </button>
      ))}
    </div>
  );
}
