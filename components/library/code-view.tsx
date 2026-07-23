import { highlightCode, langFor } from '@/lib/assets/highlight';

/** Async server component: renders a code string as dual-theme highlighted HTML. */
export async function CodeView({ code, lang }: { code: string; lang: string }) {
  const html = await highlightCode(code, langFor(lang));
  return (
    <div
      className="cook-code overflow-x-auto rounded-md border border-divider text-xs leading-relaxed"
      // Shiki output is trusted (built at render from local files), not user input.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
