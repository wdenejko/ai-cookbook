import type { Metadata } from 'next';
import './global.css';
import { Source_Serif_4 } from 'next/font/google';
import { ComfortControl } from '@/components/workshop/comfort-control';
import { LocaleProvider } from '@/components/workshop/locale';
import { FumadocsProvider } from '@/components/workshop/fumadocs-provider';

// metadataBase resolves the relative OG image URLs (e.g. the docs /og route)
// into absolute ones; set NEXT_PUBLIC_SITE_URL in production, localhost in dev.
// The title template appends " — AI Cookbook" to each page's own title, so
// child pages set only their bare title (the docs pages already do).
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'AI Cookbook',
    template: '%s — AI Cookbook',
  },
  description:
    'A reusable library of ChatGPT assets and an adaptive, bilingual AI workshop.',
};

// Broadsheet is set entirely in Source Serif 4 (headings + body), with the
// true italic at body weight. Exposed as a CSS variable that global.css wires
// into --font-body / --font-heading / --font-sans.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={sourceSerif.variable}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        {/* Apply saved comfort / text-size before paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement,s=localStorage.getItem('cook-text-size');if(s==='lg'||s==='xl')d.setAttribute('data-text-size',s);if(localStorage.getItem('cook-comfort')==='true')d.setAttribute('data-comfort','true');var l=localStorage.getItem('cook-locale');if(l!=='en'&&l!=='pl'){var n=(navigator.languages&&navigator.languages[0])||navigator.language||'';l=String(n).toLowerCase().split('-')[0]==='pl'?'pl':'en'}d.setAttribute('data-locale',l);d.lang=l}catch(e){}",
          }}
        />
        <LocaleProvider>
          <FumadocsProvider>{children}</FumadocsProvider>
          <ComfortControl />
        </LocaleProvider>
      </body>
    </html>
  );
}
