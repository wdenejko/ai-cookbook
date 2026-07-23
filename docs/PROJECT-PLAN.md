# ai-cookbook — Project Plan & Architecture

> A serverless Next.js app that (1) is your **personal, reusable store of AI assets** — Claude skills, subagents, commands, prompts, hooks, MCP configs, memories — and (2) doubles as an **adaptive workshop platform** for teaching AI to a mixed audience (IT folks, teenagers, non‑technical staff, seniors).
>
> Status: **greenfield** (empty repo). Target stack: **Next.js 16 (App Router) · React 19 · Tailwind v4**, deployed serverless. Plan authored 2026‑07‑23. Version numbers are "correct at time of writing — verify at `npm install`."

---

## 0. Executive summary

**The core insight:** your AI assets *are already files in a git repo*. Don't put them in a database. Keep them as files, render a great UI over them, and treat the workshop as a second "view" of the same content pipeline. This one decision gives you ~$0 idle cost, near‑zero ops, and near‑zero lock‑in — exactly the priorities that matter for a personal tool you'll live in.

**One product, two modes, one pipeline:**

- **Library mode** — browse / search / filter / copy‑and‑reuse your assets. Content‑heavy, single‑writer, static‑first.
- **Workshop mode** — guided, adaptive, interactive lessons for a mixed audience; can *showcase real assets from the library* as live teaching examples.

Both are just **content collections** (MDX + frontmatter) rendered by different UIs, sharing one design system, one deploy, one search index.

**Recommended stack at a glance:**

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack, Server Actions) | Best-in-class serverless React; static-first with dynamic where earned |
| Styling | **Tailwind v4** (CSS-first `@theme`) | `motion-safe:`/`focus-visible:` map directly to the a11y requirements |
| Content layer | **Fumadocs** — *confirmed* | Turnkey nav + MDX components + built-in Orama search; Contentlayer is dead |
| Content storage | **MDX/native asset files in-repo (git)** | Zero cost, zero lock-in, diffable, portable, reusable in real projects |
| Search | **Pagefind** (static) or **Orama** (free w/ Fumadocs) | No backend, no ops |
| Images/blobs | small in-repo → larger to **Cloudflare R2** | Zero egress, S3-compatible |
| i18n | **next-intl v4** (`app/[locale]/`) | App-Router-native; ~2KB; zero client bytes for server strings |
| LLM demos | **Route Handler + `@anthropic-ai/sdk` + AI SDK 5**, Upstash rate-limit, **spend-capped Anthropic Workspace**, **Replay mode** default | Key never leaves server; a workshop room can't run up a bill; demo never dies on stage |
| Hosting | **Vercel** (+ OpenNext/Cloudflare kept working as escape hatch) | Best DX; provably not locked in |
| Auth / DB | **git-push editing, no auth/DB** — *confirmed for v1* | Single-writer reality; add Better Auth + Turso later only if an in-app editor is wanted |

**Cost:** **$0** while strictly personal; **~$20/mo** (Vercel Pro) only if the workshops become commercial (see §8). **Rough timeline:** a usable Library MVP in ~1–2 focused weeks; a workshop-ready v1 in ~4–6 weeks part-time. See the phased roadmap in §7.

---

## 1. Problem framing — the complete picture

### 1.1 Two jobs with different shapes

| | **Job A — Asset Library** | **Job B — Workshop Platform** |
|---|---|---|
| Primary user | You (single writer) | Mixed audience (readers), you (facilitator) |
| Content | Your real Claude assets | Teaching lessons about AI |
| Read/write ratio | Write via git, read often | Read-only for audience |
| Success = | Find & reuse an asset in <30s | A senior *and* an IT pro both "get it" |
| Shape | CRUD-ish catalog | Guided, adaptive, interactive |

Left alone, these pull in opposite directions (a catalog wants density; a lesson wants progressive simplicity). The plan resolves that tension instead of letting it sprawl.

### 1.2 The unifying model

Both jobs are **content collections rendered by different views**:

```
content/assets/*    → Library view   (dense, searchable, filterable, copyable)
content/lessons/*   → Workshop view  (guided, adaptive, interactive, accessible)
```

They share: the MDX pipeline, the frontmatter→metadata parsing, the design system, dark mode, the deploy, the search index. A workshop lesson can **embed a real asset** from the library ("here's an actual skill — let's read it together"), so the two jobs reinforce each other rather than compete.

### 1.3 Workshop audience personas (drives the adaptive UX)

| Persona | Knows | Needs | Design implication |
|---|---|---|---|
| **IT / some AI** | Code, concepts | Depth, precision, real examples | "Technical" detail level; free-explore; Sandpack code cells |
| **Teenager, no AI** | Phones, games | Engagement, analogies, novelty | "Simple" level; guided mode; playful interactive demos |
| **Non-technical staff** | Office tools | Relevance to *their* work, plain language | "Normal" level; office-framed examples; no jargon |
| **Seniors** | Life experience | Large type, calm pace, no surprises, clear nav | Comfort mode; linear guided flow; big targets; reduced motion |

**Design consequence:** one artifact must serve all four. The mechanism is an explicit **detail-level switcher** (Simple / Normal / Technical) + **guided vs. explore** modes + a one-tap **Comfort mode** — not four separate sites.

### 1.4 Success criteria

- **Library:** any asset is findable in <30s; a found asset can be copied/exported into a real project in one action; adding a new asset is `git push` (no ceremony).
- **Workshop:** the same lesson lands for a 14-year-old and a senior; a live demo can run on flaky venue Wi‑Fi without failing (and without a surprise bill); the whole thing is WCAG 2.2 AA.

---

## 2. Core architectural decisions

Each decision below has a **recommendation** and the **honest fork** (when you'd choose otherwise). The ones you should actively confirm are collected in §10.

### D1 — Content lives in git as files, not in a database ✅

Your assets are text you already version-control. Keeping them as files gives diffs/history/PRs for free, ~$0 storage, total portability, and trivially indexable content for client-side search. "Publish selected assets" becomes a `visibility:` frontmatter flag.
**Add a database only when** you want in-app editing, view counts, comments, or a private/public toggle enforced at runtime — and then reach for **Turso/libSQL** (it's SQLite; the whole DB is a downloadable file) via Server Actions, not Postgres.

### D2 — One app, two modes, one pipeline ✅

A single Next.js app with two route groups — `(library)` and `(workshop)` — over one content pipeline and design system. Not two projects. This maximizes reuse and lets lessons showcase real assets.

### D3 — Store assets in their **native Claude formats**, parse into a **unified model** ✅

Keep each asset in the exact shape Claude Code / the API consumes (a skill is a real `SKILL.md` folder bundle; a subagent is a real `.md`; an MCP config is real JSON). Reason: they stay **genuinely reusable** — you can symlink/copy `content/assets/skills/foo/` straight into any project's `.claude/skills/`, or offer a "download bundle" button. The app's content loader reads each asset's native frontmatter/manifest and normalizes it into the unified `Asset` model (§4) for browsing and search. Prompts are the one type with **no native on-disk format**, so we define our own convention (MDX + frontmatter).

### D4 — Host on Vercel, keep Cloudflare/OpenNext as a working escape hatch ✅

Vercel gives the best Next.js DX. OpenNext's Cloudflare adapter supports Next 15/16 and is your proof-of-portability. **Caveat:** Vercel's **Hobby tier is non-commercial**; if workshops are paid / promote a business, you're required to be on **Pro (~$20/user‑mo)**. Budget for it if commercial. Cloudflare Workers static assets are free+unlimited if you'd rather host there.

### D5 — No auth for viewing; Better Auth (single identity) only for in-app editing ✅

If content is in git, editing is `git push`, so the app needs **no auth at all** to start. If you later add an in-app editor or a gated private area, use **Better Auth** (self-hosted, sessions in your DB, no vendor lock-in) restricted to your single GitHub identity. NextAuth is maintenance-only now; skip Clerk/Supabase-Auth (hosted dependency for a one-person need).

### D6 — Build i18n-ready from day 1, author English first, add Polish for workshop content ✅

Use **next-intl v4** with `app/[locale]/` routing so bilingual PL/EN is structurally free. Author UI strings and workshop lessons EN-first; add PL translations for the *workshop* content (the audience-facing part) as a distinct phase. The private *library* can stay EN-only. Note Next 16 renamed `middleware.ts` → **`proxy.ts`** (locale detection goes there).

### D7 — LLM demos are server-proxied, hard-capped, and Replay-by-default ✅

Never expose the API key; call Anthropic only from a Route Handler. Layer: **Upstash rate-limit** (per session cookie + IP) → small `max_tokens` on a **Haiku-class model** → a **dedicated Anthropic Workspace with a monthly USD spend cap** (the real guarantee) → a **Replay mode** of canned prompt→response pairs used as the *default* for scripted demos and as the *automatic fallback* when Wi‑Fi/API/limit fails. A `DEMO_MODE=replay|live` flag toggles the whole room.

### D8 — Client-side search ✅

**Pagefind** (pure static index built at deploy) or **Orama** (free if you pick Fumadocs; also your on-ramp to semantic search over prompts). No search server, no cost, no ops until the corpus is large.

---

## 3. Technology stack (pinned, with 2026 notes)

| Concern | Choice | Notes / flags |
|---|---|---|
| Runtime framework | **Next.js `^16`** | Turbopack default; **Cache Components** (`use cache`, dynamic-by-default); PPR folded in; `middleware.ts`→`proxy.ts`; Server Actions mature |
| UI library | **React `19.2.x`** | ⚠️ Pin to the **latest patched 19.2.x** (a React 19 security advisory, reported CVE‑2025‑55182, circulated early 2026 — verify the fixed version before deploy) |
| Styling | **Tailwind CSS `^4`** | CSS-first `@theme`; `@custom-variant dark`; `motion-safe:`/`motion-reduce:`/`focus-visible:` built in |
| Content layer | **Fumadocs** *or* **Velite** | Fumadocs = turnkey docs UI + built-in Orama search + MDX components; Velite = Zod-typed frontmatter + your own Tailwind UI. **Not Contentlayer (abandoned).** |
| MDX | **`@next/mdx` + `@mdx-js/react`** | First-class MDX so any lesson/asset can `import` interactive components |
| Search | **Pagefind** or **Orama** | Orama comes free with Fumadocs |
| i18n | **next-intl `^4`** | Next 16 supported from 4.4+; ICU; RSC-native |
| Presentation | **MDX scrollytelling** (+ optional **reveal.js `^5`** scroll-view) | No separate slide framework; add reveal.js only for projector mode. Scroll libs: `react-scrollama` or `motion` |
| Code demos | **Sandpack** (`@codesandbox/sandpack-react`) | Client-side, no server; what react.dev uses. (One 2026 source flags reduced maintenance — verify) |
| LLM SDK | **`@anthropic-ai/sdk`** + **Vercel AI SDK 5** (`@ai-sdk/anthropic`, `@ai-sdk/react`) | AI SDK 5 streams over native SSE; server-only |
| Rate limit | **`@upstash/ratelimit`** + Upstash Redis | Connectionless HTTP; serverless/edge-friendly |
| Blobs | **Cloudflare R2** | S3-compatible, zero egress |
| Optional DB | **Turso/libSQL** | Use **libSQL** for production (the Rust "Turso Database" is still beta) |
| Optional auth | **Better Auth** | Self-hosted, single identity |
| Hosting | **Vercel** (+ **OpenNext/Cloudflare** hedge) | Hobby is non-commercial — Pro (~$20/mo) if paid workshops |
| Model for demos | smallest **Haiku-class** model | Confirm the exact current model ID at build (e.g. `claude-haiku-4-5-*`); pick the smallest capable one to bound $/call |

**Standing flags:** pin exact versions at install; confirm the React 19.2 patched version; confirm the current Haiku model ID; if you adopt `use cache`, check the next-intl interplay needs Next 16.2 root-params.

---

## 4. Content & data model

### 4.1 The unified `Asset` model

Every asset normalizes into one entity with a `type` discriminator and a `storageKind` that drives how bytes are persisted. (Derived from the real 2026 Claude asset schemas.)

```ts
type AssetType =
  | 'skill' | 'plugin' | 'subagent' | 'command'
  | 'hook' | 'mcp_server' | 'memory' | 'rule' | 'prompt';

type StorageKind = 'single_file' | 'folder_bundle' | 'json_entry' | 'container';

interface Asset {
  id: string;
  type: AssetType;
  storageKind: StorageKind;         // how it's stored on disk (see table below)
  title: string;
  slug: string;                     // kebab invocation name
  description: string;              // maps to the asset's `description` frontmatter
  body: string | null;             // markdown body / system prompt / prompt text
  manifest: unknown | null;         // structured config (plugin.json, mcp entry, hook block, frontmatter-as-json)
  files?: { path: string; blobRef: string; executable: boolean }[]; // for bundles/containers
  tags: string[];
  category: string;
  sourceProject: string | null;
  origin: 'authored' | 'imported' | 'marketplace' | 'shared';
  version: string | null;           // semver; else fall back to contentHash
  contentHash: string;
  visibility: 'private' | 'local' | 'project' | 'org_shared' | 'public'; // 5-tier ladder
  targets: string[];                // ['claude-code','claude-api','claude-ai','cowork']
  compatibility?: { minVersion?: string; standard?: 'agent-skills@1' };
  license: string | null;           // SPDX
  trustRequired: boolean;           // runs code / needs workspace trust
  containsSecrets: boolean;         // store references, never plaintext
  usageNotes: string | null;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 4.2 `storageKind` per type (the persistence axis)

| Type | storageKind | On-disk reality |
|---|---|---|
| **Skill** | `folder_bundle` | `SKILL.md` + reference files + `scripts/` |
| **Plugin** | `container` | whole tree + `plugin.json`; **references** child assets |
| **Subagent** | `single_file` | one `.md` (frontmatter + system prompt) |
| **Command** | `single_file` | one `.md` (now a flat skill variant) |
| **Memory / Rule** | `single_file` | one `.md` (CLAUDE.md, `.claude/rules/*.md`, auto-memory) |
| **Prompt** | `single_file` | text/MDX (our own convention) |
| **Hook** | `json_entry` | a JSON block inside `settings.json`/`hooks.json` |
| **MCP server** | `json_entry` | a JSON object inside `.mcp.json` |

Bundles/containers persist a `files[]` manifest (path + blob ref + executable flag) with `body` holding the entrypoint (`SKILL.md`) for preview/search. **Plugins are containers** — store the manifest + *references* to child asset ids (a `plugin ⇄ child` membership relation), so a bundled skill is also independently browsable.

### 4.3 Per-type extension fields (summary)

- **skill:** `allowed-tools`, `disallowed-tools`, `disable-model-invocation`, `user-invocable`, `when_to_use`, `argument-hint`, `arguments[]`, `model`, `effort`, `context`, `paths[]`, `shell`, `metadata{}`, `files[]`, `isFlatCommand`.
- **plugin:** full `plugin.json`, marketplace `{name, sourceType, ref, sha}`, `components{skills[],agents[],commands[],hooks[],mcpServers[],…}`, `dependencies[]`, `defaultEnabled`.
- **subagent:** `tools[]`, `disallowedTools[]`, `model`, `permissionMode`, `maxTurns`, `effort`, `skills[]` (preload), `mcpServers[]`, `hooks[]`, `memory`, `background`, `isolation`, `color`, `initialPrompt`.
- **command:** `argument-hint`, `allowed-tools[]`, `model`, `arguments[]`, `disable-model-invocation`.
- **hook:** `event`, `matcher`, `if?`, `hookType(command|http|mcp_tool|prompt|agent)`, target, `timeout`, control keys.
- **mcp_server:** `transport(stdio|http|sse|ws)`, `command/args/env` or `url/headers`, `scope`, `isConnector`, `oauth`.
- **memory:** `memoryKind(claude_md|rule|auto_memory)`, optional `memoryType(user|feedback|project|reference)` *(community convention — treat as optional; not guaranteed in the core spec)*, `paths[]`, `scope`, `modified`.
- **prompt:** `promptText`, `variables[]{name,hint}` (`{{double_brace}}`), `role(system|user|null)`, `source`, `xmlStructured`.

### 4.4 Design notes carried into implementation

1. **Visibility is a 5-tier ladder**, not a boolean (private → local → project → org‑shared view‑only → public). It gates what export/publish emits.
2. **Security flags are first-class:** hooks/MCP/plugins run code or hold credentials. Surface a trust warning on import; store secret **references**, never plaintext; render a "runs code" badge.
3. **Versioning:** use semver when present, else `contentHash`; keep a small history so a pinned state can be re-exported (mirrors marketplace `sha` pinning).
4. **`targets[]` matters:** a `~/.claude/skills` asset does **not** reach cloud/Cowork unless committed to a repo or shipped in a plugin — surface this so "where can I use this?" is answerable.

### 4.5 Proposed repo structure

```
ai-cookbook/
├── app/
│   ├── [locale]/
│   │   ├── (library)/                # asset browser: index, filters, /asset/[type]/[slug]
│   │   ├── (workshop)/               # teaching mode: /learn, /learn/[lesson]
│   │   └── layout.tsx                # design system, theme + comfort-mode providers
│   ├── api/demo/route.ts             # capped, server-side LLM proxy
│   └── proxy.ts                      # next-intl locale detection (Next 16 name)
├── content/
│   ├── assets/                       # ← THE STORE: native, reusable Claude assets
│   │   ├── skills/<name>/SKILL.md (+ references, scripts/)
│   │   ├── subagents/<name>.md
│   │   ├── commands/<name>.md
│   │   ├── prompts/<name>.mdx        # our convention (frontmatter + {{vars}})
│   │   ├── hooks/<name>.json  (+ .md notes)
│   │   ├── mcp/<name>.json    (+ .md notes)
│   │   └── memories/<name>.md
│   └── lessons/
│       ├── en/*.mdx                  # workshop content, EN
│       └── pl/*.mdx                  # workshop content, PL
├── lib/
│   ├── content/                      # loaders: native asset → unified Asset model
│   ├── search/                       # Pagefind/Orama index build
│   └── ai/                           # Anthropic client, rate limit, replay store
├── components/
│   ├── ui/                           # design system (buttons, cards, badges)
│   ├── mdx/                          # MDX component map
│   ├── learn/                        # LevelSwitcher, Glossary, GuidedNav, ComfortToggle
│   └── playground/                   # PromptPlayground, Sandpack cells
├── messages/                         # next-intl UI strings: en.json, pl.json
├── replay/                           # canned prompt→response pairs for demo mode
├── docs/PROJECT-PLAN.md              # this file
└── next.config.ts / globals.css / package.json
```

> Bonus: because `content/assets/` holds *native* assets, the repo doubles as a dotfiles-style store — symlink or copy subsets straight into any project's `.claude/`, or add a "download as bundle" action later.

---

## 5. Information architecture & UX

### 5.1 Library mode

- **Index:** grid/list of asset cards (type badge, title, description, tags, visibility + "runs code" badges). Facet filters: **type**, **tag**, **category**, **visibility**, **target**, **favorite**.
- **Search:** instant client-side (Pagefind/Orama) across title/description/body/tags.
- **Detail view (`/asset/[type]/[slug]`):** rendered body/frontmatter, syntax-highlighted config, "copy", "download bundle", and a **"How to use this"** block (where it goes: `~/.claude/…` vs `.claude/…`, and which `targets` it reaches).
- **Add asset:** drop a file/folder into `content/assets/…`, `git push` → it appears. (Optional later: in-app editor behind Better Auth.)

### 5.2 Workshop mode

- **Two navigation modes:** **Guided** (linear, one idea per screen, big Next/Back — default for facilitator-led and seniors/teens) and **Explore** (concept map/index — for the IT crowd).
- **Detail-level switcher:** global **Simple / Normal / Technical** control (persisted in `localStorage`), swapping the body of each concept. Authored as level variants per concept; default **Normal**.
- **Accessible glossary:** click/focus popovers (not hover-only) with plain-language definitions + a full glossary page; terms spelled out on first use.
- **"Go deeper" expanders:** layered disclosure inside every concept so a Technical reader can still collapse noise.
- **Live demos:** the prompt playground and "what is a skill" interactive (see §6).
- **Comfort / Senior mode:** one-tap on the landing screen — larger type (100/125/150%), high-contrast theme, reduced motion, guided linear nav, 44px targets.
- **Language toggle:** PL/EN, as visible as the text-size and detail-level controls.

### 5.3 Design system & accessibility baseline (WCAG 2.2 AA)

- **Type:** everything in `rem`; body ≥16px (≥18–20px in comfort mode); a "Text size A / A+ / A++" control setting root `font-size`.
- **Contrast:** ≥4.5:1 body, ≥3:1 large text & UI/focus; never color-only meaning; optional `prefers-contrast: more` theme.
- **Targets:** `min-h-11 min-w-11` (44px) with generous spacing (WCAG 2.5.8 minimum is 24px; go bigger for seniors).
- **Focus:** `focus-visible:ring-2 ring-offset-2` on every interactive element; never bare `outline-none`; keep focus unobscured under sticky headers.
- **Motion:** wrap animations in `motion-safe:`, provide `motion-reduce:` fallbacks; no autoplay attention-grabbers.
- **Structure:** semantic landmarks, one `<h1>`/view, skip link, `aria-live="polite"` on the streaming demo region.
- **Dark mode:** Tailwind v4 `@custom-variant dark`; theme + comfort settings in a context provider, persisted.

---

## 6. The workshop layer in depth

### 6.1 Authoring model

Each lesson is an MDX file with frontmatter (`title`, `order`, `audienceTags`, `estMinutes`). Concepts inside use level variants:

```mdx
<Concept id="what-is-a-skill">
  <Level simple>   An analogy, no jargon, 2–3 sentences. </Level>
  <Level normal>   Plain language + one concrete example. </Level>
  <Level technical>Precise definition, links to the real SKILL.md spec. </Level>
</Concept>
```

Lead every concept with an **analogy**, then a **"Go deeper"** expander. Reuse an **analogy library** and keep **per-audience example sets** (office framing vs. teen framing).

### 6.2 Live-demo safety spine (the part that must not fail on stage)

1. **Key server-side only** — `app/api/demo/route.ts` with `@anthropic-ai/sdk`; stream tokens via AI SDK 5. Never use `anthropic-dangerous-direct-browser-access` (that's for users' own keys).
2. **Per-session rate limit** — `@upstash/ratelimit` sliding window keyed by an httpOnly session cookie + IP fallback (e.g. 15 req / 10 min / session), enforced in `proxy.ts` or the route.
3. **Hard cost cap (belt & braces):** small `max_tokens` (300–500) on the smallest Haiku-class model; a **dedicated Anthropic Workspace with a monthly USD spend limit** + a scoped key (the real guarantee, enforced by Anthropic); a Redis daily-counter circuit breaker that flips the room into Replay mode when tripped.
4. **Replay mode** — a `replay/` library of canned prompt→response pairs. Used as the **default** for scripted walkthroughs ($0, deterministic) and as the **automatic fallback** when rate-limit/spend/network fails. `DEMO_MODE=replay|live` toggles everything.

> Note: Anthropic has **no client-side ephemeral demo token** — the server-proxy pattern above *is* the answer; don't design around a token that doesn't exist.

### 6.3 Code demos

**Sandpack** for runnable React/JS snippets (client-side, no server), shown to the IT audience and collapsed for others. Avoid WebContainers (overkill + commercial-license + cross-origin-isolation headers).

### 6.4 Facilitator controls

Global `DEMO_MODE` (replay/live), a "reset room" that clears session state, a usage/spend indicator, and a prominent Comfort-mode + language + detail-level bar.

---

## 7. Phased delivery roadmap

Effort sizing is relative (S ≈ hours, M ≈ 1–2 days, L ≈ 3–5 days part-time). Each phase ends shippable.

### Phase 0 — Foundation *(M)*
**Goal:** an empty-but-real app deployed, with the design system and content pipeline wired.
- Scaffold Next.js 16 + TS + Tailwind v4; `globals.css` with `@theme` tokens, dark mode, comfort-mode CSS vars.
- Design-system primitives (Button, Card, Badge, Prose) with the a11y baseline (focus-visible, 44px, motion-safe).
- Choose & wire the content layer (**decision: Fumadocs vs Velite** — see §10); load a throwaway MDX file end-to-end.
- Deploy to Vercel; confirm OpenNext/Cloudflare build succeeds (portability smoke test).
- **Acceptance:** live URL renders one MDX page, dark mode + text-size toggle work, Lighthouse a11y ≥95.

### Phase 1 — Library MVP *(M–L)*
**Goal:** browse & search your real assets.
- Author the unified `Asset` loader: parse native frontmatter/manifests from `content/assets/**` into the `Asset` model; compute `contentHash`.
- Seed with 5–10 **real** assets across ≥3 types (a skill, a subagent, a prompt, an MCP config).
- Library index (cards + facet filters) + detail view + client-side search (Pagefind/Orama).
- "Copy" + "How to use this" (paths + `targets`).
- **Acceptance:** every seeded asset is findable in <30s and copyable; adding a file + push makes it appear.

### Phase 2 — Full asset coverage & reuse *(L)*
**Goal:** all 8 types + real reuse ergonomics.
- Handle `folder_bundle` (skills) and `container` (plugins) with `files[]` manifests + bundle preview.
- Type-specific detail renderers (hook JSON, MCP JSON, skill bundle tree, prompt with `{{variables}}`).
- Visibility ladder + security badges (`trustRequired`, `containsSecrets`); public build emits only allowed visibilities.
- "Download bundle" / copy-to-`.claude` guidance per type.
- **Acceptance:** a plugin shows its child assets; a private asset is excluded from the public build; a skill bundle downloads cleanly.

### Phase 3 — Workshop core *(L)*
**Goal:** guided, adaptive lessons (no live LLM yet).
- `(workshop)` route group; lesson loader; Guided nav (Next/Back) + Explore index.
- **Detail-level switcher** + `<Concept>/<Level>` MDX components; **glossary** popovers + page; "Go deeper" expanders.
- 2–3 real lessons authored EN (e.g. "What is a prompt?", "What is a skill?", "What is an agent?") — each showcasing a **real library asset**.
- **Acceptance:** one lesson reads coherently at all three levels; glossary is keyboard+screen-reader reachable.

### Phase 4 — Interactivity, live demos & full a11y *(L)*
**Goal:** safe interactive demos + comfort mode.
- Prompt playground UI + `api/demo` route with the full safety spine (Upstash limit, capped Workspace key, `max_tokens`, streaming) + **Replay mode** + `DEMO_MODE` flag + `replay/` seed data.
- "What is a skill" interactive driven by Replay (zero-cost, deterministic) with an optional "try your own" that flips to live within caps.
- Sandpack code cells (collapsed by default).
- **Comfort/Senior mode** toggle (type scale, high contrast, reduced motion, big targets) + facilitator controls.
- **Acceptance:** pulling the Wi‑Fi mid-demo silently falls back to Replay; rate limit blocks a hammering client; comfort mode passes a manual senior-usability pass + WCAG 2.2 AA audit.

### Phase 5 — i18n (Polish), sharing & optional dynamics *(M–L)*
**Goal:** bilingual workshop + optional runtime features.
- Wire next-intl (`app/[locale]/`, `proxy.ts`); translate UI strings + workshop lessons to PL; prominent PL/EN toggle.
- *(Optional, only if wanted)* Better Auth (single identity) + Turso for in-app editing / view counts / a runtime private area.
- **Acceptance:** every workshop screen works in PL and EN with no layout breakage.

### Phase 6 — Hardening & launch *(M)*
**Goal:** production-ready.
- Version-pin audit (React 19.2 patch, model ID, next-intl/Next interplay); error boundaries; empty/loading states; OG images; sitemap.
- Perf pass (Cache Components / `use cache` where it helps); a11y regression check; README + contribution/authoring guide.
- **Acceptance:** green CI, Lighthouse a11y/perf ≥95, a dry-run workshop rehearsal completed.

**Parallelizable:** content authoring (assets, lessons, translations, replay data) can proceed alongside any phase once Phase 0 lands.

---

## 8. Risks, flags & mitigations

| Risk / flag | Mitigation |
|---|---|
| **React 19 security advisory** (reported CVE‑2025‑55182) | Pin latest patched 19.2.x; verify fixed version before deploy |
| **Vercel Hobby is non-commercial** | If workshops are paid/promotional, move to Pro (~$20/mo) or host static on Cloudflare Workers |
| **Turso "Database" (Rust) is beta** | Use **libSQL** in production if/when you add a DB |
| **Contentlayer abandoned** | Use Fumadocs or Velite (never Contentlayer) |
| **Sandpack maintenance** flagged by one 2026 source | Verify before adopting; it still works and is what react.dev uses; fallback = static code + copy button |
| **Memory `type:` taxonomy** is a community convention, not core spec | Store as an *optional* `memoryType`; don't assume Claude Code reads it |
| **LLM demo bill blowout** | Capped Workspace + Upstash limit + Replay default/fallback + daily circuit breaker |
| **Version drift** (SaaS pricing, npm versions from 2026 snapshots) | Pin at install; re-check vendor pricing pages; treat all numbers here as "verify" |
| **Next 16 caching model shift** (`use cache`) | Static-first; adopt `use cache` deliberately; check next-intl root-params interplay on 16.2 |
| **Secrets in assets** (hooks/MCP hold creds) | Store references only; trust warning on import; never round-trip plaintext |
| **Scope creep** (sync engines, real-time, DB-first) | Deferred by design; add only when a concrete need appears |

## 9. Cost model

| Scenario | Monthly cost |
|---|---|
| Personal, static-first, Vercel Hobby / Cloudflare | **$0** |
| Commercial workshops (Vercel Pro) | **~$20** |
| + R2 blobs, Turso, Better Auth at this scale | **$0** (free tiers) |
| LLM demos | **bounded by the Workspace spend cap you set** (Replay default = $0) |

## 10. Decisions

**Confirmed (2026-07-23):**
- **Content layer → Fumadocs** — turnkey nav, MDX components, built-in Orama search; fastest path to a browsable, searchable library.
- **Editing → git push, no auth/DB (v1)** — edit files locally, push to deploy; zero backend / cost / lock-in. An in-app editor (Better Auth + Turso) can be added later without rework.

**Paused pending frontend design:**
- **Build order / focus** — implementation is on hold while a frontend design is prepared (see [DESIGN-BRIEF.md](DESIGN-BRIEF.md) once created). Recommendation remains **Foundation → Library → Workshop**; revisit sequencing once the design lands.

**Still open (safe defaults in place):**
- **i18n scope** — default: i18n-ready from day 1, EN-first, PL for workshop content in Phase 5. Alternative: PL+EN from the first lesson.
- **Hosting** — default: Vercel + OpenNext hedge. Confirm whether workshop use is **commercial** (→ Vercel Pro ~$20/mo).

---

*This plan is intentionally staged so each phase ships something usable and nothing is built before it's needed. Content (assets, lessons, translations, replay data) is the long pole — start collecting it early and in parallel.*
