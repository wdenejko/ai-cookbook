import { type ReactNode } from 'react';

// A titled section within a lesson. Server component.

export function Concept({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="cook-concept my-8">
      {title && <h2 className="mb-3 font-heading text-2xl">{title}</h2>}
      {children}
    </section>
  );
}
