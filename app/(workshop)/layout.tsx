import { type ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import Link from 'next/link';
import { baseOptions } from '@/lib/layout.shared';
import { LevelSwitcher } from '@/components/workshop/level-switcher';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="border-b border-divider bg-surface">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-2">
          <LevelSwitcher />
          <Link
            href="/learn/glossary"
            className="min-h-9 text-sm text-fd-muted-foreground hover:text-accent"
          >
            Glossary
          </Link>
        </div>
      </div>
      {children}
    </HomeLayout>
  );
}
