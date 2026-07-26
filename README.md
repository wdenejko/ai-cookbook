# AI Cookbook

A serverless Next.js app that does two jobs from one static codebase:

1. **A reusable library of ChatGPT assets** — skills, subagents, slash commands, prompts, MCP servers, hooks, memories, and plugins — that you browse, search, and copy into any project.
2. **An adaptive, bilingual (PL/EN) AI workshop** — short lessons and a plain-language glossary built for a mixed audience (engineers, teenagers, non-technical staff, seniors).

Everything is **files in git**: no database, no auth, no backend to run. Content is authored as Markdown/MDX and native ChatGPT asset files; you edit by pushing to the repo. It’s set in the **Broadsheet** design system — a newsprint aesthetic in Source Serif 4.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, `proxy.ts`) |
| UI runtime | React 19.2 |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Content | Fumadocs (`fumadocs-core`, `fumadocs-mdx`, `@fumadocs/base-ui`) |
| Highlighting | Shiki (server-side, dual light/dark themes) |
| Bundles | JSZip (client-side skill-bundle `.zip` download) |

Design tokens, screens, and the founding architecture rationale live in [`docs/`](docs/) — see [`docs/PROJECT-PLAN.md`](docs/PROJECT-PLAN.md) and [`docs/DESIGN-BRIEF.md`](docs/DESIGN-BRIEF.md).

---

## Getting started

Requires Node 20+ and npm.

```bash
npm install          # postinstall runs fumadocs-mdx to generate .source
npm run dev          # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run types:check` | `fumadocs-mdx` + `next typegen` + `tsc --noEmit` |

No environment variables are needed to run the app. See [Configuration](#configuration) for optional deployment settings.

---

## Project structure

```
app/
  (home)/                 Landing + Library (browse, search, asset detail)
  (workshop)/learn/       Lessons and glossary
  docs/                   Fumadocs-rendered MDX docs
  layout.tsx              Root: fonts, theme tokens, metadata, pre-paint script
  not-found.tsx           Global 404
  error.tsx               Segment error boundary
  global-error.tsx        Root-layout error boundary
components/
  library/                Cards, facets, code view, copy/download
  workshop/               Concept/Level, glossary Term, comfort control, i18n
lib/
  assets/                 Asset model + server-side loader + Shiki highlight
  workshop/               i18n dictionary and glossary
  lessons.ts, source.ts   Fumadocs collections
content/
  assets/                 The library — native ChatGPT files (skills, subagents, …)
  lessons/                Workshop lessons (EN) + lessons/pl/ (Polish variants)
  docs/                   MDX docs pages
docs/                     Project plan, design brief, design assets
```

---

## The asset library

Assets live under [`content/assets/`](content/assets/) as **native ChatGPT files** — the same `SKILL.md`, subagent, command, and config files you already use — with a little `library:` frontmatter for presentation. The loader parses them at build time; there is no separate registry to keep in sync.

Supported types: **skill, plugin, subagent, command, prompt, mcp_server, hook, memory**. Storage kinds range from a single file to a folder bundle to a JSON entry inside a shared config. Skills download as a `.zip` bundle assembled in the browser.

**Visibility ladder.** Each asset declares one of five visibility tiers. A public build can be scoped to emit only some of them via `LIBRARY_VISIBILITY` (e.g. `public,org_shared`); unset shows everything, which is what you want for personal/local use.

**Security flags.** Assets can mark `trustRequired` or `containsSecrets` so anything sensitive is surfaced, never silently shipped. **No real secret is ever stored in the repo** — sensitive assets are redacted placeholders.

To add an asset: drop the native file(s) into the right `content/assets/<type>/` folder, add the `library:` frontmatter block (title, description, visibility, tags), and push. It appears in the Library on the next build.

---

## The workshop

- **Adaptive lessons.** Each lesson is written once and re-renders at **Simple / Normal / Technical** detail via a CSS toggle (`html[data-level]`), so the same page meets a teenager and an engineer where they are. Preference persists per visitor.
- **Glossary.** Plain-language definitions, also available as an in-lesson popover on highlighted terms.
- **Comfort control.** A floating panel for larger text (3 sizes) and a reduced-motion “comfort mode”, aimed at seniors and anyone who wants it. Applied before paint to avoid a flash; persisted.

To add a lesson: create `content/lessons/<slug>.mdx` (and optionally `content/lessons/pl/<slug>.mdx`), then add the slug to `LESSON_ORDER` in [`lib/lessons.ts`](lib/lessons.ts).

---

## Internationalization (PL / EN)

The app is bilingual using a **pragmatic, static approach** — no locale-prefixed routes, no route restructure. Both languages render into the DOM and a CSS toggle (`html[data-locale]` + `[data-lang]`) shows the active one; the inactive language is `display:none`, so screen readers read only one, and every block carries its correct `lang` attribute. The browser's primary locale selects Polish for `pl-*` visitors and English for everyone else. The global **EN | PL** switch lives in the main navbar and persists an explicit visitor choice.

- **UI strings** live in the dictionary in [`lib/workshop/i18n.ts`](lib/workshop/i18n.ts); the English map defines the key type, so a missing Polish key is a type error.
- **Lessons** get a Polish sibling under `content/lessons/pl/`.
- **Glossary data** holds both languages side by side.
- **Library catalogue copy** is localized separately from raw reusable assets, so changing the interface language never changes code, prompts, or files that users copy and download.

---

## Accessibility

Targets **WCAG 2.2 AA**. In practice:

- Text sizing in `rem` with a Comfort control offering 3 sizes — real browser-level scaling, not a fake zoom.
- Reduced-motion “comfort mode”, plus `prefers-reduced-motion` honored globally.
- Correct `lang` on every bilingual block; inactive language removed from the accessibility tree.
- Sound heading hierarchy, ≥44px touch targets on controls, visible focus, keyboard-operable popovers and panels.
- Themed 404 / error pages in both light and dark.

---

## Configuration

Copy [`.env.example`](.env.example) to `.env.local`. Every variable is optional.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Absolute base URL; resolves Open Graph / metadata image URLs |
| `LIBRARY_VISIBILITY` | unset (all) | Comma-separated tiers to emit in a public build |

---

## Deployment

Production runs at `https://cookbook.denejko.pl` as a standalone Next.js container
behind its own Caddy container on Mikrus. The app listens only on
`127.0.0.1:3200`; its Caddy listens on origin port `8443` and provides TLS and
HTTP Basic Authentication. The separate `starship` stack and its Caddy on ports
80/443 are not modified or restarted.

The proxied Cloudflare hostname has an Origin Rule matching
`http.host eq "cookbook.denejko.pl"` and overriding the destination port to
`8443`. The `denejko.pl` SSL mode is `Full`, which accepts Caddy's internal
origin certificate.

Deployments are manual and immutable:

1. Open **Actions → Deploy to Mikrus** in GitHub.
2. Select **Run workflow** on `main`.
3. The workflow checks types, builds a `linux/amd64` image, publishes it to GHCR
   with the commit SHA, and asks a restricted SSH command on the VPS to deploy it.

The workflow requires repository variables `MIKRUS_HOST` and `MIKRUS_PORT`, plus
secrets `MIKRUS_DEPLOY_SSH_KEY` and `MIKRUS_KNOWN_HOSTS`. The deployment key is
restricted server-side to the fixed deploy script and cannot open an interactive
root shell.

For another host, build with `npm run build` and run the standalone output as a
Node server. Set `NEXT_PUBLIC_SITE_URL` at build time so OG image URLs resolve.
Scope builds with `LIBRARY_VISIBILITY` if they should exclude personal assets.

**Editing model:** there is no in-app editor and no auth — you change content by editing files and pushing to git. This keeps the whole thing static, reviewable, and free to host.

---

## Security

`npm audit` reports **3 high-severity advisories in `postcss` and `sharp`**. Both are **transitive dependencies bundled inside Next.js itself** (`next/node_modules/postcss`, `sharp`), not direct dependencies of this project. The only `npm audit fix --force` remediation is to install **`next@9.3.3`** — a massive downgrade that would break the entire app — so it is deliberately **not** applied; these resolve when Next.js ships a patched release. React 19.2 has no outstanding advisory.

If you fork this for production, re-run `npm audit` after each Next.js bump and pin forward when a fixed release lands.

---

## License

Personal project — no license granted for reuse yet.
