import { type ReactNode } from 'react';

// Server components. Which <Level> shows is decided purely by CSS from the
// html[data-level] attribute (set by LevelSwitcher), so there is no hydration
// mismatch and no-JS readers still see the default (normal) level.

export function Concept({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="cook-concept my-8">
      {title && <h2 className="mb-3 font-heading text-2xl">{title}</h2>}
      {children}
    </section>
  );
}

export function Level({
  simple,
  normal,
  technical,
  children,
}: {
  simple?: boolean;
  normal?: boolean;
  technical?: boolean;
  children: ReactNode;
}) {
  const level = simple ? 'simple' : technical ? 'technical' : 'normal';
  return <div data-concept-level={level}>{children}</div>;
}
