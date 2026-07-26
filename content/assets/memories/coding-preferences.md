---
name: coding-preferences
description: "Captures the owner's concrete, cross-project coding-style preferences — language settings, module conventions, testing, and formatting — so ChatGPT writes code their way by default. Use as a personal memory loaded across projects to avoid restating style rules each session."
type: user
library:
  tags: [preferences, typescript, style]
  category: "Preferences"
  visibility: private
  targets: [codex]
  sourceProject: null
---

# Coding preferences

Personal defaults. Apply these unless a project's own config or AGENTS.md says
otherwise.

## Language & typing
- **TypeScript** for all new JS/TS code. `tsconfig` runs in `strict` mode; treat type
  errors as build failures.
- No `any`. Use `unknown` + narrowing, generics, or a precise type. A
  `// @ts-expect-error` must carry a reason comment.
- Prefer `type` aliases for unions and object shapes; reserve `interface` for
  declaration merging or public extension points.
- Avoid non-null assertions (`!`) except where provably safe with a comment.

## Modules
- **Named exports only — no default exports.** Defaults hurt refactoring,
  auto-import, and grep-ability.
- One primary concern per file; co-locate small helpers, extract when shared.
- Use path aliases (`@/…`) over deep `../../..` relative imports.

## Style & structure
- Prefer `const`; use `let` only when reassigning. Never `var`.
- Pure functions and early returns over deep nesting. Keep functions small and
  single-purpose.
- Handle errors explicitly — no empty `catch` blocks, no swallowed rejections.
- `async`/`await` over raw `.then()` chains.

## Testing
- **Vitest** for unit/integration tests (Jest-compatible API, faster). Co-locate as
  `*.test.ts` next to the source.
- Test behavior and edge cases, not implementation details. Arrange–Act–Assert.
- Every bug fix ships with a regression test.

## Formatting & tooling
- **Prettier** for formatting, **ESLint** for correctness — don't hand-format.
- 2-space indent, single quotes, trailing commas, semicolons on.
- Meaningful names over comments; comment the *why*, not the *what*.

## Commits
- Conventional Commits (`feat:`, `fix:`, `refactor:`, `test:`, `docs:`). Small,
  focused commits.
