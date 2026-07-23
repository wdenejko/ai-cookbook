// Defensive "at a glance" summaries for config-type assets. All inputs are
// unknown parsed JSON, so every access is guarded.

export interface HookSummary {
  event: string;
  matcher: string;
  actions: string[];
}

export function summarizeHooks(manifest: unknown): HookSummary[] {
  const out: HookSummary[] = [];
  const hooks = (manifest as Record<string, unknown> | null)?.hooks;
  if (hooks && typeof hooks === 'object') {
    for (const [event, arr] of Object.entries(hooks as Record<string, unknown>)) {
      if (!Array.isArray(arr)) continue;
      for (const entry of arr) {
        const e = entry as Record<string, unknown>;
        const matcher = typeof e?.matcher === 'string' ? e.matcher : '*';
        const actions = Array.isArray(e?.hooks)
          ? (e.hooks as Record<string, unknown>[]).map((h) =>
              typeof h?.type === 'string' ? h.type : 'command',
            )
          : [];
        out.push({ event, matcher, actions });
      }
    }
  }
  return out;
}

export interface McpSummary {
  name: string;
  transport: string;
  endpoint: string;
}

export function summarizeMcp(manifest: unknown): McpSummary[] {
  const out: McpSummary[] = [];
  const root = manifest as Record<string, unknown> | null;
  const servers = (root?.mcpServers ?? root) as Record<string, unknown> | null;
  if (servers && typeof servers === 'object') {
    for (const [name, raw] of Object.entries(servers)) {
      if (!raw || typeof raw !== 'object') continue;
      const cfg = raw as Record<string, unknown>;
      const transport =
        typeof cfg.type === 'string' ? cfg.type : cfg.command ? 'stdio' : 'http';
      const endpoint =
        typeof cfg.url === 'string'
          ? cfg.url
          : cfg.command
            ? [cfg.command, ...((cfg.args as string[]) ?? [])].join(' ')
            : '';
      out.push({ name, transport, endpoint });
    }
  }
  return out;
}
