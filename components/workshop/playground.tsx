'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Loader2, RadioTower, Clapperboard } from 'lucide-react';
import { REPLAY, OFFLINE_FALLBACK } from '@/lib/workshop/replay';
import { useLocale, useT } from './locale';

type Mode = 'replay' | 'live' | 'fallback' | 'rate-limited' | null;

function ModeBadge({ mode }: { mode: Mode }) {
  const t = useT();
  if (!mode || mode === 'rate-limited') return null;
  const live = mode === 'live';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs ${
        live ? 'bg-accent-2-100 text-accent-2-800' : 'bg-neutral-200 text-neutral-800'
      }`}
    >
      {live ? <RadioTower className="size-3.5" aria-hidden /> : <Clapperboard className="size-3.5" aria-hidden />}
      {live ? t('pg.badge.live') : mode === 'fallback' ? t('pg.badge.fallback') : t('pg.badge.replay')}
    </span>
  );
}

export function Playground() {
  const { locale } = useLocale();
  const t = useT();
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const reveal = (text: string) => {
    if (timer.current) clearInterval(timer.current);
    setOutput('');
    let i = 0;
    timer.current = setInterval(() => {
      i += 2;
      setOutput(text.slice(0, i));
      if (i >= text.length && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }, 12);
  };

  const run = async (p: string) => {
    const text = p.trim();
    if (!text || busy) return;
    setPrompt(p);
    setNotice(null);
    setBusy(true);
    setOutput('');
    setMode(null);

    // Scripted prompts answer instantly from client-side replay — works offline.
    const scripted = REPLAY.find((r) => r.prompt.en === p || r.prompt.pl === p);
    if (scripted) {
      setMode('replay');
      reveal(scripted.response[locale]);
      setBusy(false);
      return;
    }

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, locale }),
      });
      const data = (await res.json()) as { reply?: string; mode?: Mode };
      if (res.status === 429) {
        setMode('rate-limited');
        setNotice(data.reply ?? 'Rate-limited — try again shortly.');
        return;
      }
      setMode(data.mode ?? 'replay');
      reveal(data.reply ?? '');
    } catch {
      setMode('fallback');
      reveal(OFFLINE_FALLBACK[locale]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="my-6 rounded-md border border-divider bg-surface p-4">
      <p className="mb-2 text-sm text-fd-muted-foreground">{t('pg.tryThese')}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {REPLAY.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => run(r.prompt[locale])}
            disabled={busy}
            className="min-h-9 rounded-md border border-divider bg-bg px-3 text-sm transition-colors hover:bg-neutral-200 disabled:opacity-45"
          >
            {r.label[locale]}
          </button>
        ))}
      </div>

      <label htmlFor="pg-input" className="mb-1.5 block text-sm text-fd-muted-foreground">
        {t('pg.orOwn')}
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <textarea
          id="pg-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          placeholder={t('pg.placeholder')}
          className="min-h-11 flex-1 resize-y rounded-md border border-divider bg-bg px-3 py-2 text-sm outline-none focus-visible:border-accent"
        />
        <button
          type="button"
          onClick={() => run(prompt)}
          disabled={busy || !prompt.trim()}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 font-heading text-sm text-bg transition-colors hover:bg-accent-600 disabled:opacity-45"
        >
          {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Play className="size-4" aria-hidden />}
          {t('pg.run')}
        </button>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="text-sm text-fd-muted-foreground">{t('pg.response')}</span>
          <ModeBadge mode={mode} />
        </div>
        <div
          aria-live="polite"
          className="min-h-24 whitespace-pre-wrap rounded-md border border-divider bg-bg p-3 text-sm"
        >
          {notice ? (
            <span className="text-accent-2-700">{notice}</span>
          ) : output ? (
            output
          ) : (
            <span className="text-fd-muted-foreground">{t('pg.appearsHere')}</span>
          )}
        </div>
      </div>
    </div>
  );
}
