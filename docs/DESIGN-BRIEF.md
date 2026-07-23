# ai-cookbook — Frontend Design Brief

> Companion to [PROJECT-PLAN.md](PROJECT-PLAN.md). Purpose: give a frontend design pass everything it needs to produce screens that fit the architecture and the mixed-audience accessibility requirements — so the design translates straight into the build with no rework.
>
> **How to use:** work top-down. Design the **global frame + controls (§2)** first — they appear on every screen and set the system. Then the **screens (§4)** against the **real content shapes (§5)**. Treat **§6 accessibility** as non-negotiable constraints, not polish.

---

## 1. Product in one paragraph

One app, two modes over one content pipeline. **Library mode** is a dense, searchable, filterable catalog of the owner's real Claude assets (skills, subagents, prompts, MCP/hook configs, memories) that can be copied/reused in real projects. **Workshop mode** is a calm, adaptive, accessible teaching surface for a *mixed audience* — IT pros, teenagers, non-technical staff, and seniors — where the *same lesson* serves all four via a detail-level switcher, and can showcase real library assets as live examples. The design must make both feel like one coherent product while respecting their opposite instincts (catalog wants density; lessons want progressive simplicity).

---

## 2. The global frame (design this first)

A persistent control bar/area present in **both** modes. These are first-class, plainly labeled, and reachable in one tap — **not** buried in a settings menu. Design each in default, hover, focus-visible, active, and disabled states.

| Control | Options | Notes |
|---|---|---|
| **Mode switch** | Library ⇄ Workshop | Clear, high-level; the two modes may have distinct accent treatments but share the system |
| **Detail level** | Simple · Normal · Technical | Label it in plain words ("How much detail?"). Default **Normal**. This is the backbone of the mixed-audience UX — make it prominent and obvious, not clever |
| **Comfort / Senior mode** | on/off (one tap) | Turns on larger type + higher contrast + reduced motion + bigger targets + linear nav. Design a distinctly *calmer, larger* variant of the whole UI |
| **Language** | PL · EN | As visible as the other controls |
| **Theme** | System · Light · Dark | Must be fully designed in **both** light and dark |
| **Text size** | A · A+ · A++ (100/125/150%) | Independent of comfort mode; drives root font-size |

Design implication: the layout must survive **150% text**, **comfort mode**, and **dark mode** simultaneously without breaking. Prototype at least one screen in that "maximum" state.

---

## 3. Two "density personalities"

Design the system to express two densities from the same tokens:

- **Normal** — efficient, information-dense (good for the Library and the IT audience).
- **Comfort** — larger type, more whitespace, bigger targets, calmer color, one-thing-per-screen (good for seniors/novices and facilitator-led rooms).

These are not two designs — they're one design at two settings. Show both for a representative screen.

---

## 4. Screens to design

### Library

1. **Library index / catalog**
   - Asset **cards** in a grid/list: type badge, title, description (may run long — design truncation), tag chips, visibility badge, security badges.
   - **Faceted filters:** type, tag, category, visibility, target, favorite. Design the filter UI for desktop *and* narrow screens.
   - **Search:** instant client-side; design the input, results, and the "typing…" feel.
   - **States:** default, filtered, **no results**, **empty library** (first-run), loading.

2. **Asset detail** (`/asset/[type]/[slug]`)
   - Rendered body/instructions + **syntax-highlighted config**.
   - **Metadata sidebar/panel:** type, tags, category, version, source, license, visibility, targets, security flags.
   - **Actions:** Copy · Download bundle · **"How to use this"** (where the file goes: `~/.claude/…` vs `.claude/…`, and which targets it reaches).
   - **Per-`storageKind` variants** (important — these look different):
     - *single_file* (subagent, command, memory, prompt) — one document.
     - *folder_bundle* (skill) — a **file tree** (`SKILL.md` + references + `scripts/`) with a primary-file preview.
     - *container* (plugin) — a manifest + **list of child assets** that link out to their own detail pages.
     - *json_entry* (hook, MCP server) — pretty-printed JSON + a plain-language explanation.
     - *prompt* — body with highlighted `{{variables}}` and a variables list.

### Workshop

3. **Workshop landing / lesson index** — inviting entry; prominent Comfort-mode entry point; lesson cards (title, est. minutes, audience tags); Guided vs Explore choice.
4. **Guided lesson view** — one concept per screen; big **Next / Back**; **progress indicator**; the active-level `<Concept>` text; **"Go deeper"** expanders; inline **glossary popovers** (click/focus, never hover-only).
5. **Explore / concept map** — non-linear index for advanced users to jump around.
6. **Glossary page** — plain-language, bilingual, searchable.
7. **Prompt playground** — prompt input; **streaming output region** (announced politely to screen readers); a clear **Replay vs Live** indicator; **rate-limited / blocked** state; optional usage/spend indicator; a facilitator "reset" affordance.
8. **"What is a skill?" interactive** — a guided, deterministic (replay-backed) walkthrough that reveals a real skill's structure.

### Shared

9. **Home** — routes to the two modes; sets the brand tone.
10. **Global nav / header / footer** — hosts the §2 controls; skip link; clear landmarks.

---

## 5. Real content shapes to design against

Design components against **real data and its limits**, not lorem ipsum.

- **Asset card:** `type` (one of 9: skill, plugin, subagent, command, hook, mcp_server, memory, rule, prompt) · `title` · `description` (**≤1024 chars** — design for both 1-line and paragraph-length) · `tags[]` · `visibility` · security badges.
- **Badge taxonomy (design a legible, color-safe set):**
  - *Type* badges — 9 values; need to be distinguishable **without relying on color alone** (use icon+label).
  - *Visibility* — a **5-tier ladder**: `private → local → project → org_shared → public` (design as a scale, not a binary).
  - *Security* — `runs code` (trustRequired) and `contains secrets` (containsSecrets) — should read as **cautionary** and be unmissable.
  - *Targets* — where it works: `claude-code`, `claude-api`, `claude-ai`, `cowork`.
- **Detail-level concept block:** the same concept in **three lengths** — Simple (2–3 sentences, analogy), Normal (plain + one example), Technical (precise + links). Design so switching levels feels smooth, not like a page reload, and so headings/anchors stay stable.
- **Streaming demo output:** design the incremental-text state and a "done" state.

---

## 6. Accessibility constraints (WCAG 2.2 AA — hard requirements)

These are the audience requirements (seniors + novices) made concrete. Bake them into tokens and components.

- **Contrast:** body text ≥ **4.5:1**; large text (≥24px, or ≥18.66px bold) and UI components / focus indicators ≥ **3:1**. Verify **in both light and dark**. **Never encode meaning in color alone** (pair with icon/label/shape).
- **Target size:** interactive targets ≥ **44×44px** (WCAG minimum is 24px — go bigger for seniors), with generous spacing between them.
- **Focus:** every interactive element has a **visible focus ring** (design it explicitly, ~1.5× thicker/high-contrast); it must never be hidden under sticky headers. No "remove outline" without a replacement.
- **Type:** size in **rem**; base ≥ **16px** (≥18–20px in comfort mode); the design must hold at **100/125/150%**.
- **Motion:** every animation needs a **reduced-motion** variant; **no autoplay** attention-grabbing motion; keep transitions calm.
- **Structure:** clear semantic landmarks (header/nav/main/footer), **one H1 per screen**, a **skip link**, logical/linear reading order (critical for guided mode).
- **Popovers/tooltips (glossary):** must be reachable by **keyboard, touch, and screen reader** — designed as real buttons with described content, not hover-only `title` text.

---

## 7. Design tokens to deliver to the build

Hand these over as the output of the design pass:

- **Color** — full light + dark scales, contrast-checked; plus **semantic tokens** for the badge taxonomy (type / visibility / security) and states (success, caution, danger, info). Accent(s) for Library vs Workshop if differentiated.
- **Typography** — a rem-based type scale that supports user scaling; heading/body/mono families; line-height and measure for long-form lessons.
- **Spacing & sizing** — spacing scale; **minimum target size**; card/paness padding at Normal and Comfort densities.
- **Radius, elevation/shadow, borders.**
- **Motion** — durations/easings **and** their reduced-motion equivalents.
- **Density** — the Normal ↔ Comfort deltas expressed as token overrides (font-size, spacing, target size).

---

## 8. States & edge cases checklist (don't skip)

- Empty library (first run) · empty search results · long descriptions · very long tag lists.
- Private/secret asset badges; a plugin whose children are private.
- Detail-level switch mid-scroll (keep position/anchor stable).
- Playground: idle · streaming · done · rate-limited/blocked · **Replay** (offline/scripted) · error.
- Comfort mode + dark mode + 150% text, together, on the densest screen (Library index).
- PL vs EN string-length differences (Polish text is often longer — design for reflow).

---

## 9. What to hand back to the build

1. Token set (§7) — ideally as named variables that map to Tailwind v4 `@theme` / CSS custom properties.
2. The **global frame** (§2) with all control states.
3. Library **index** + **detail** (with the storageKind variants).
4. Workshop **guided lesson** view (with concept-level + glossary + expander) and the **playground**.
5. The **badge system** (§5) as a small, reusable set.
6. One screen shown in the "maximum" accessibility state (comfort + dark + 150%).

Everything else can be derived from these during implementation.
