'use client';

import { type ReactNode, useEffect, useId, useRef, useState } from 'react';
import { getGlossaryTerm } from '@/lib/workshop/glossary';

// Accessible inline glossary term: a real <button> (keyboard operable),
// aria-expanded + aria-controls a labelled panel, Escape / outside-click to
// close. Uses inline elements only so it is valid inside a <p>.
export function Term({ name, children }: { name: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const panelId = useId();
  const entry = getGlossaryTerm(name);

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

  if (!entry) return <>{children}</>;

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="cursor-help border-b border-dotted border-accent font-medium text-accent hover:bg-accent-100"
      >
        {children}
      </button>
      {open && (
        <span
          id={panelId}
          className="absolute left-0 top-full z-30 mt-1 block w-64 rounded-md border border-divider bg-surface p-3 text-left text-sm font-normal normal-case shadow-md"
        >
          <span className="block font-heading">{entry.title}</span>
          <span className="mt-1 block text-fd-muted-foreground">{entry.definition}</span>
        </span>
      )}
    </span>
  );
}
