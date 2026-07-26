import type { CSSProperties } from 'react';
import { getLocalizedPageTree } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { T } from '@/components/workshop/t';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <HomeLayout {...baseOptions()}>
      <DocsLayout
        tree={getLocalizedPageTree()}
        nav={{ title: <T k="nav.docs" /> }}
        links={[]}
        i18n={false}
        searchToggle={{ enabled: false }}
        themeSwitch={{ enabled: false }}
        containerProps={{
          // Keep Docs' sticky sidebar below the shared 3.5rem global navbar.
          style: { '--fd-docs-row-1': '3.5rem' } as CSSProperties,
        }}
      >
        {children}
      </DocsLayout>
    </HomeLayout>
  );
}
