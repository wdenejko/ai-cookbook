import { type ReactNode } from 'react';
import { PencilLine } from 'lucide-react';

export function Practice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="my-8 border-l-4 border-accent bg-accent-100/60 px-5 py-4 dark:bg-accent-900/30">
      <h2 className="mb-3 flex items-center gap-2 font-heading text-xl">
        <PencilLine className="size-5 shrink-0 text-accent" aria-hidden />
        {title}
      </h2>
      {children}
    </section>
  );
}
