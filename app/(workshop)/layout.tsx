import { type ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { LevelSwitcher } from '@/components/workshop/level-switcher';
import { LocaleSwitcher } from '@/components/workshop/locale';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions()}>
      {/* Workshop controls: reading level (left) + language (right). The
          Playground / Glossary destinations live in the main nav (baseOptions). */}
      <div className="border-b border-divider bg-surface">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-2">
          <LevelSwitcher />
          <LocaleSwitcher />
        </div>
      </div>
      {children}
    </HomeLayout>
  );
}
