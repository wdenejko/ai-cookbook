import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { docsI18n } from './docs-i18n';
import { createElement, Fragment, type ReactNode } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  i18n: docsI18n,
  plugins: [lucideIconsPlugin()],
});

function localizedNode(en: PageTree.Node, pl: PageTree.Node | undefined): PageTree.Node {
  const translatedName = localizedText(en.name, pl?.name);

  if (en.type === 'separator') {
    return { ...en, name: translatedName };
  }

  const translatedDescription = localizedText(
    en.description,
    pl?.type === en.type ? pl.description : undefined,
  );

  if (en.type === 'folder') {
    const plFolder = pl?.type === 'folder' ? pl : undefined;
    return {
      ...en,
      name: translatedName,
      description: translatedDescription,
      index:
        en.index && plFolder?.index
          ? ({
              ...en.index,
              name: localizedText(en.index.name, plFolder.index.name),
              description: localizedText(en.index.description, plFolder.index.description),
            } satisfies PageTree.Item)
          : en.index,
      children: en.children.map((child, index) =>
        localizedNode(child, plFolder?.children[index]),
      ),
    };
  }

  return {
    ...en,
    name: translatedName,
    description: translatedDescription,
  };
}

function localizedText(en: ReactNode, pl: ReactNode) {
  if (pl === undefined || pl === en) return en;
  return createElement(
    Fragment,
    null,
    createElement('span', { 'data-lang': 'en', lang: 'en' }, en),
    createElement('span', { 'data-lang': 'pl', lang: 'pl' }, pl),
  );
}

export function getLocalizedPageTree(): PageTree.Root {
  const en = source.getPageTree('en');
  const pl = source.getPageTree('pl');
  return {
    ...en,
    name: localizedText(en.name, pl.name),
    description: localizedText(en.description, pl.description),
    children: en.children.map((node, index) => localizedNode(node, pl.children[index])),
  };
}

export function getPageImage(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `${docsImageRoute}/${segments.join('/')}`,
  };
}

export function getPageMarkdownUrl(page: (typeof source)['$inferPage']) {
  const segments = [...page.slugs, 'content.md'];

  return {
    segments,
    url: `${docsContentRoute}/${segments.join('/')}`,
  };
}

export async function getLLMText(page: (typeof source)['$inferPage']) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} (${page.url})

${processed}`;
}
