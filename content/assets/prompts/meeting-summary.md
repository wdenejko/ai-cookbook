---
title: "Meeting Notes to Decisions and Action Items"
description: "A user prompt that converts raw, messy meeting notes into a structured summary of decisions, action items with owners, and open questions. Use right after a meeting to turn scribbled notes into a shareable, follow-up-ready recap."
role: user
variables:
  - name: notes
    hint: "The raw meeting notes or transcript, pasted verbatim"
library:
  tags: [meetings, productivity, summarization]
  category: "Productivity"
  visibility: public
  targets: [openai-api, chatgpt]
  sourceProject: null
---

Turn the raw meeting notes below into a clean, shareable summary.

Raw notes:
"""
{{notes}}
"""

Produce exactly these sections, in this order, in Markdown:

## TL;DR
2–3 sentences on what the meeting was about and the most important outcome.

## Decisions
- Each decision as a standalone bullet, stated as a fact ("Chose Postgres over
  DynamoDB for the billing store"). Include this section only if decisions were made.

## Action Items
A table with columns: **Owner | Action | Due**.
- One row per commitment. Name the owner if the notes name one; otherwise
  "Unassigned". Use the stated due date, or "TBD". Phrase each action as a concrete
  verb.

## Open Questions / Risks
- Unresolved questions, blockers, or risks raised but not settled.

Rules:
- Use only what's in the notes — do not invent decisions, owners, or dates. If
  something is unclear, put it under Open Questions rather than guessing.
- Be concise; strip filler and side chatter.
- Preserve specific numbers, names, dates, and system names exactly as written.
