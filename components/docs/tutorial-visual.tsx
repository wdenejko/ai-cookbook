import {
  ArrowRight,
  Bot,
  Check,
  FileText,
  Link2,
  LockKeyhole,
  MessageSquareText,
  Search,
  Settings2,
  Sparkles,
} from 'lucide-react';
import type { ReactNode } from 'react';

const icons = {
  account: LockKeyhole,
  chat: MessageSquareText,
  connect: Link2,
  create: Sparkles,
  file: FileText,
  search: Search,
  settings: Settings2,
} as const;

type IconName = keyof typeof icons;

export function TutorialVisual({
  title,
  caption,
  steps,
}: {
  title: string;
  caption: string;
  steps: Array<{ label: string; detail: string; icon?: IconName }>;
}) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted/55 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[var(--color-accent)]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[var(--color-accent-2)]" aria-hidden />
        <span className="size-2.5 rounded-full bg-fd-muted-foreground/35" aria-hidden />
        <span className="ml-2 text-xs font-semibold uppercase tracking-[0.16em] text-fd-muted-foreground">
          {title}
        </span>
      </div>
      <div className="grid gap-3 p-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
        {steps.slice(0, 3).map((step, index) => {
          const Icon = icons[step.icon ?? 'chat'] ?? Bot;

          return (
            <TutorialStep key={`${step.label}-${index}`}>
              <div className="flex size-9 items-center justify-center rounded-full border border-fd-border bg-fd-background">
                <Icon className="size-4 text-fd-primary" aria-hidden />
              </div>
              <div>
                <p className="m-0 font-semibold text-fd-foreground">{step.label}</p>
                <p className="mt-1 text-sm leading-5 text-fd-muted-foreground">{step.detail}</p>
              </div>
              {index === steps.slice(0, 3).length - 1 && (
                <Check
                  className="absolute right-3 top-3 size-4 text-[var(--color-accent-2)]"
                  aria-hidden
                />
              )}
            </TutorialStep>
          );
        }).reduce<ReactNode[]>((items, step, index) => {
          if (index > 0) {
            items.push(
              <ArrowRight
                key={`arrow-${index}`}
                className="mx-auto size-4 rotate-90 self-center text-fd-muted-foreground md:rotate-0"
                aria-hidden
              />,
            );
          }
          items.push(step);
          return items;
        }, [])}
      </div>
      <figcaption className="border-t border-fd-border px-4 py-3 text-sm text-fd-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

function TutorialStep({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-28 gap-3 rounded-lg border border-fd-border bg-fd-background p-4 md:flex-col">
      {children}
    </div>
  );
}

export function BeforeYouStart({ children }: { children: ReactNode }) {
  return (
    <aside className="my-6 rounded-lg border-l-4 border-[var(--color-accent)] bg-fd-muted/45 px-5 py-4">
      <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-fd-muted-foreground">
        Before you start · Zanim zaczniesz
      </p>
      <div className="mt-2 text-sm [&>:last-child]:mb-0">{children}</div>
    </aside>
  );
}

export function SafetyNote({ children }: { children: ReactNode }) {
  return (
    <aside className="my-6 rounded-lg border border-[var(--color-accent-2)]/50 bg-fd-card px-5 py-4">
      <div className="flex gap-3">
        <LockKeyhole
          className="mt-0.5 size-5 shrink-0 text-[var(--color-accent-2)]"
          aria-hidden
        />
        <div className="text-sm [&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</div>
      </div>
    </aside>
  );
}
