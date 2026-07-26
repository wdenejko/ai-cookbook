---
title: Engineering Pack
description: A small bundle of everyday engineering helpers — code review, test writing, and changelog generation.
library:
  tags: [engineering, bundle]
  category: Bundles
  visibility: public
  targets: [codex]
  components:
    - subagent/code-reviewer
    - subagent/test-writer
    - command/changelog
---

A starter plugin that bundles three engineering assets already in this library.
Install it through a plugin marketplace and enable it to get the
`code-reviewer` and `test-writer` subagents plus the `/changelog` command in one
step.

Bundling assets in a plugin is also how personal `~/.codex` assets reach cloud
and ChatGPT Work sessions — a loose skill or subagent stays local unless it is
committed to a repo or shipped in a plugin.
