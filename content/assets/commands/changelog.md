---
description: "Generates a Keep a Changelog entry from recent git history, grouping commits into Added/Changed/Fixed/Removed under a version heading. Use when cutting a release and you want a clean, human-readable changelog section from raw commit messages."
argument-hint: "[version]"
allowed-tools: "Bash(git log:*), Bash(git tag:*), Bash(git describe:*), Read, Edit"
library:
  tags: [changelog, git, release]
  category: "Engineering"
  visibility: public
  targets: [codex]
  sourceProject: null
---

Generate a **Keep a Changelog** (keepachangelog.com) entry for version `$ARGUMENTS`
from recent git history.

## Steps
1. Find the previous release and the commits since it:
   - Latest tag: !`git describe --tags --abbrev=0 2>/dev/null`
   - If a tag exists, collect commits with
     `git log <tag>..HEAD --no-merges --pretty=format:"%s (%h)"`.
   - If there are no tags, use `git log --no-merges --pretty=format:"%s (%h)"`.
2. If `$ARGUMENTS` is empty, propose the next semver version from the change mix
   (breaking → major, feature → minor, fixes only → patch) and state your reasoning.
3. Classify each commit into exactly one group: **Added, Changed, Deprecated,
   Removed, Fixed, Security**. Infer from Conventional Commit prefixes when present
   (`feat:`→Added, `fix:`→Fixed, `refactor/perf/chore:`→Changed, `!` or
   `BREAKING CHANGE`→Changed and call it out). Drop noise (merge commits,
   version bumps, formatting-only churn).
4. Rewrite each entry as a concise, user-facing line
   ("feat: add dark mode toggle" → "Added a dark-mode toggle"). Don't just echo raw
   commit subjects.

## Output
Print a Markdown block, including only groups that have entries, dated today:

```
## [$ARGUMENTS] - YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Fixed
- ...
```

If a `CHANGELOG.md` exists at the repo root, show the entry, then offer to insert it
directly beneath the `## [Unreleased]` heading (or at the top of the version list).
Do not edit the file until the user confirms.
