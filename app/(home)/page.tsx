import Link from 'next/link';
import { T } from '@/components/workshop/t';

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <p className="mb-3 text-sm uppercase tracking-widest text-accent">
        <T k="home.kicker" />
      </p>
      <h1 className="mb-4 font-heading text-5xl leading-none">AI Cookbook</h1>
      <p className="mb-8 max-w-prose text-lg text-fd-muted-foreground">
        <T k="home.description" /> <T k="home.design" />
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/docs"
          className="inline-flex min-h-11 items-center rounded-md bg-accent px-5 font-heading text-bg transition-colors hover:bg-accent-600"
        >
          <T k="home.openDocs" />
        </Link>
        <a
          href="https://github.com/wdenejko/ai-cookbook"
          className="inline-flex min-h-11 items-center rounded-md border border-divider px-5 font-heading transition-colors hover:bg-neutral-200"
        >
          GitHub
        </a>
      </div>
    </main>
  );
}
