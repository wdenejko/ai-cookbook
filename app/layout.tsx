import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Source_Serif_4 } from 'next/font/google';

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
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
