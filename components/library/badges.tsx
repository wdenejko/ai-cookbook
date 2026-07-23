import { type ReactNode } from 'react';
import {
  Sparkles,
  Boxes,
  Bot,
  Terminal,
  MessageSquare,
  Plug,
  Webhook,
  Brain,
  Lock,
  Globe,
  Users,
  FolderGit2,
  ShieldAlert,
  KeyRound,
  type LucideIcon,
} from 'lucide-react';
import { type AssetType, type Visibility, TYPE_META, VISIBILITY_META } from '@/lib/assets/types';

const TYPE_ICON: Record<AssetType, LucideIcon> = {
  skill: Sparkles,
  plugin: Boxes,
  subagent: Bot,
  command: Terminal,
  prompt: MessageSquare,
  mcp_server: Plug,
  hook: Webhook,
  memory: Brain,
};

const VISIBILITY_ICON: Record<Visibility, LucideIcon> = {
  private: Lock,
  local: FolderGit2,
  project: Users,
  org_shared: Users,
  public: Globe,
};

// Type is conveyed by icon + label, never colour alone (a11y).
export function TypeBadge({ type }: { type: AssetType }) {
  const Icon = TYPE_ICON[type];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-neutral-200 px-2 py-0.5 text-xs text-neutral-800">
      <Icon className="size-3.5" aria-hidden />
      {TYPE_META[type].label}
    </span>
  );
}

export function VisibilityBadge({ visibility }: { visibility: Visibility }) {
  const Icon = VISIBILITY_ICON[visibility];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-divider px-2 py-0.5 text-xs text-fd-muted-foreground">
      <Icon className="size-3.5" aria-hidden />
      {VISIBILITY_META[visibility].label}
    </span>
  );
}

// Cautionary badges take the magenta spot colour.
export function SecurityBadges({
  trustRequired,
  containsSecrets,
}: {
  trustRequired: boolean;
  containsSecrets: boolean;
}) {
  if (!trustRequired && !containsSecrets) return null;
  return (
    <>
      {trustRequired && (
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-accent-2-100 px-2 py-0.5 text-xs text-accent-2-800">
          <ShieldAlert className="size-3.5" aria-hidden />
          Runs code
        </span>
      )}
      {containsSecrets && (
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-accent-2-100 px-2 py-0.5 text-xs text-accent-2-800">
          <KeyRound className="size-3.5" aria-hidden />
          Secrets
        </span>
      )}
    </>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-700">
      {children}
    </span>
  );
}
