import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Source_Serif_4 } from 'next/font/google';
import { ComfortControl } from '@/components/workshop/comfort-control';
import { LocaleProvider } from '@/components/workshop/locale';

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
    'A reusable library of Claude assets and an adaptive, bilingual AI workshop.',
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
              "try{var d=document.documentElement,s=localStorage.getItem('cook-text-size');if(s==='lg'||s==='xl')d.setAttribute('data-text-size',s);if(localStorage.getItem('cook-comfort')==='true')d.setAttribute('data-comfort','true');var l=localStorage.getItem('cook-locale');if(l==='en'||l==='pl')d.setAttribute('data-locale',l)}catch(e){}",
          }}
        />
        <LocaleProvider>
          <RootProvider>{children}</RootProvider>
          <ComfortControl />
        </LocaleProvider>
      </body>
    </html>
  );
}
