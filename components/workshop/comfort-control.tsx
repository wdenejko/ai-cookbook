'use client';

import { useEffect, useRef, useState } from 'react';
import { Accessibility, X } from 'lucide-react';
import { useT } from './locale';
import type { MsgKey } from '@/lib/workshop/i18n';

type Size = 'default' | 'lg' | 'xl';

const SIZES: { id: Size; msg: MsgKey; scale: string }[] = [
  { id: 'default', msg: 'comfort.sizeDefault', scale: '1em' },
  { id: 'lg', msg: 'comfort.sizeLg', scale: '1.15em' },
  { id: 'xl', msg: 'comfort.sizeXl', scale: '1.3em' },
];

export function ComfortControl() {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<Size>('default');
  const [comfort, setComfort] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = useT();

  // Reflect whatever the pre-paint script already applied to <html>.
  useEffect(() => {
    const d = document.documentElement;
    const ts = d.getAttribute('data-text-size');
    setSize(ts === 'lg' || ts === 'xl' ? ts : 'default');
    setComfort(d.getAttribute('data-comfort') === 'true');
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const applySize = (s: Size) => {
    setSize(s);
    const d = document.documentElement;
    try {
      if (s === 'default') {
        d.removeAttribute('data-text-size');
        localStorage.removeItem('cook-text-size');
      } else {
        d.setAttribute('data-text-size', s);
        localStorage.setItem('cook-text-size', s);
      }
    } catch {
      /* ignore */
    }
  };

  const applyComfort = (on: boolean) => {
    setComfort(on);
    const d = document.documentElement;
    try {
      if (on) {
        d.setAttribute('data-comfort', 'true');
        localStorage.setItem('cook-comfort', 'true');
      } else {
        d.removeAttribute('data-comfort');
        localStorage.removeItem('cook-comfort');
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <div ref={ref} className="fixed bottom-4 right-4 z-40 print:hidden">
      {open && (
        <div
          role="dialog"
          aria-label="Comfort settings"
          className="mb-2 w-64 rounded-md border border-divider bg-surface p-4 shadow-lg"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="font-heading">{t('comfort.title')}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('comfort.close')}
              className="flex min-h-9 min-w-9 items-center justify-center rounded-md hover:bg-neutral-200"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>

          <fieldset className="mb-4 border-0 p-0">
            <legend className="mb-1.5 text-sm text-fd-muted-foreground">
              {t('comfort.textSize')}
            </legend>
            <div className="inline-flex overflow-hidden rounded-md border border-divider">
              {SIZES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => applySize(s.id)}
                  aria-pressed={size === s.id}
                  aria-label={t(s.msg)}
                  className={`flex min-h-11 min-w-11 items-center justify-center px-3 transition-colors ${
                    i > 0 ? 'border-l border-divider' : ''
                  } ${size === s.id ? 'bg-accent text-bg' : 'hover:bg-neutral-200'}`}
                >
                  <span style={{ fontSize: s.scale }}>A</span>
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-center justify-between gap-3">
            <span className="text-sm">
              {t('comfort.mode')}
              <span className="block text-xs text-fd-muted-foreground">{t('comfort.modeDesc')}</span>
            </span>
            <input
              type="checkbox"
              checked={comfort}
              onChange={(e) => applyComfort(e.target.checked)}
              className="size-5 shrink-0 accent-[var(--color-accent)]"
            />
          </label>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t('comfort.aria')}
        className="flex min-h-11 items-center gap-2 rounded-full border border-divider bg-surface px-4 shadow-md transition-colors hover:bg-neutral-200"
      >
        <Accessibility className="size-5" aria-hidden />
        <span className="font-heading text-sm">{t('comfort.title')}</span>
      </button>
    </div>
  );
}
