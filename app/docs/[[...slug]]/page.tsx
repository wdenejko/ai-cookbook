import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { ExternalLink } from 'lucide-react';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const en = source.getPage(params.slug, 'en');
  const pl = source.getPage(params.slug, 'pl');
  if (!en) notFound();

  return (
    <>
      <div data-lang="en" lang="en" className="docs-locale-contents">
        <LocalizedDocsPage page={en} />
      </div>
      {pl && (
        <div data-lang="pl" lang="pl" className="docs-locale-contents">
          <LocalizedDocsPage page={pl} />
        </div>
      )}
    </>
  );
}

export async function generateStaticParams() {
  return source.getPages('en').map((page) => ({ slug: page.slugs }));
}

export async function generateMetadata(props: PageProps<'/docs/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug, 'en');
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}

function LocalizedDocsPage({ page }: { page: NonNullable<ReturnType<typeof source.getPage>> }) {
  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const pageUrl = new URL(
    page.url,
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  );
  const isPolish = page.locale === 'pl';
  const chatgptUrl = `https://chatgpt.com/?${new URLSearchParams({
    prompt: isPolish
      ? `Przeczytaj ${pageUrl}. Chcę zadać pytania na tej podstawie.`
      : `Read ${pageUrl}. I want to ask questions about it.`,
  })}`;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <a
          href={chatgptUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex min-h-8 items-center gap-2 rounded-lg border bg-fd-secondary px-3 text-sm font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
        >
          {isPolish ? 'Otwórz w ChatGPT' : 'Open in ChatGPT'}
          <ExternalLink className="size-3.5 text-fd-muted-foreground" aria-hidden />
        </a>
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}
