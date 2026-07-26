import { type ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { T } from './t';

// Native <details> — accessible and keyboard-operable with zero JS.
export function GoDeeper({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <details className="cook-godeeper group my-4 rounded-md border border-divider">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2 font-heading text-sm marker:content-none">
        <ChevronRight className="size-4 text-accent transition-transform group-open:rotate-90" aria-hidden />
        {title ?? <T k="lesson.goDeeper" />}
      </summary>
      <div className="border-t border-divider px-4 py-3 text-sm">{children}</div>
    </details>
  );
}
