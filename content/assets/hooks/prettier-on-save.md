---
title: "Prettier on Save"
description: "A PostToolUse hook that automatically runs Prettier to format any JavaScript or TypeScript file right after Claude writes or edits it. Use to keep AI-generated code consistently formatted to your project's Prettier config without manual cleanup."
library:
  tags: [hook, formatting]
  category: "Automation"
  visibility: project
  targets: [claude-code]
  sourceProject: null
  trustRequired: true
  containsSecrets: false
---

## What it does
After every `Write` or `Edit`, this hook checks the touched file's extension and, if
it is JS/TS (`.js .jsx .ts .tsx .mjs .cjs`), runs Prettier on just that file. Other
file types are ignored.

## Install
Merge the `hooks` block into `.claude/settings.json` (this project) or
`~/.claude/settings.json` (all projects). Run `/hooks` or restart Claude Code so it
picks up the change.

## Requirements
- **Prettier** available in the project (`npm i -D prettier`) or globally.
  `npx --no-install` uses your local install and won't fetch from the network; if
  Prettier isn't found, the hook exits quietly without failing the edit.
- **jq** installed — used to read the tool's `file_path` from the hook's JSON stdin.

## How it works
Claude Code passes each hook event as JSON on stdin. The command extracts
`.tool_input.file_path`, matches the extension with a POSIX `case`, and runs
`prettier --write` on that single file. It always exits 0 (`|| true`) so a formatting
hiccup never blocks the edit.

## Customize
- **More file types:** add patterns to the `case` (e.g. `*.json|*.css|*.md`).
- **Project config:** Prettier automatically respects a `.prettierrc`/`prettier`
  field and `.prettierignore` in the repo — no extra flags needed.
- **Different formatter:** swap the `prettier` call for `biome format --write`,
  `eslint --fix`, etc.

## Safety
- `trustRequired: true` — this hook executes a shell command on your machine on every
  write. Enable it only in projects you trust, and read the command before installing.
- `containsSecrets: false` — no credentials involved.
