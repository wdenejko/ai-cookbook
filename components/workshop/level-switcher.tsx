'use client';

import { useEffect, useState } from 'react';
import { useT } from './locale';

const LEVELS = [
  { id: 'simple', msg: 'detail.simple' },
  { id: 'normal', msg: 'detail.normal' },
  { id: 'technical', msg: 'detail.technical' },
] as const;
type LevelId = (typeof LEVELS)[number]['id'];
const KEY = 'cook-level';

export function LevelSwitcher() {
  const [level, setLevel] = useState<LevelId>('normal');
  const t = useT();

  // Load the stored preference and reflect it on <html> after mount.
  useEffect(() => {
    let initial: LevelId = 'normal';
    try {
      const stored = localStorage.getItem(KEY) as LevelId | null;
      if (stored && LEVELS.some((l) => l.id === stored)) initial = stored;
    } catch {
      /* localStorage unavailable */
    }
    setLevel(initial);
    document.documentElement.setAttribute('data-level', initial);
  }, []);

  const choose = (id: LevelId) => {
    setLevel(id);
    document.documentElement.setAttribute('data-level', id);
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* ignore */
    }
  };

  return (
    <div role="group" aria-label={t('detail.aria')} className="inline-flex items-center gap-2">
      <span className="text-sm text-fd-muted-foreground">{t('detail.label')}</span>
      <div className="inline-flex overflow-hidden rounded-md border border-divider">
        {LEVELS.map((l, i) => (
          <button
            key={l.id}
            type="button"
            onClick={() => choose(l.id)}
            aria-pressed={level === l.id}
            className={`min-h-9 px-3 text-sm transition-colors ${i > 0 ? 'border-l border-divider' : ''} ${
              level === l.id ? 'bg-accent text-bg' : 'hover:bg-neutral-200'
            }`}
          >
            {t(l.msg)}
          </button>
        ))}
      </div>
    </div>
  );
}
