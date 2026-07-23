export interface GlossaryEntry {
  title: string;
  definition: string;
}

// Plain-language definitions. Keys are lowercase; used by <Term name="…"> and
// the /learn/glossary page. Keep definitions jargon-light and accurate.
export const GLOSSARY: Record<string, GlossaryEntry> = {
  prompt: {
    title: 'Prompt',
    definition:
      'The instruction or question you give an AI — the text you type in. A clearer prompt usually gets a better answer.',
  },
  'system-prompt': {
    title: 'System prompt',
    definition:
      "A behind-the-scenes instruction that sets the AI's role and rules for a whole conversation, before you type anything.",
  },
  skill: {
    title: 'Skill',
    definition:
      'A reusable folder of instructions (a SKILL.md file, plus optional scripts and references) that teaches an AI assistant how to do a specific task well.',
  },
  subagent: {
    title: 'Subagent',
    definition:
      'A helper AI the main assistant can hand a focused job to — like a specialist it delegates to and gets results back from.',
  },
  agent: {
    title: 'Agent',
    definition:
      'An AI that can take actions on its own to reach a goal — reading files, running tools, and deciding the next step — not just replying once.',
  },
  mcp: {
    title: 'MCP (Model Context Protocol)',
    definition:
      'A standard way to plug an AI into outside tools and data — like a universal adapter that lets it reach things such as your files, a database, or Notion.',
  },
  hook: {
    title: 'Hook',
    definition:
      'A small automation that runs at a set moment — for example, formatting a file right after the AI edits it.',
  },
  memory: {
    title: 'Memory',
    definition:
      'Notes the assistant keeps and re-reads across sessions, so it remembers your preferences and project facts instead of starting fresh each time.',
  },
  llm: {
    title: 'LLM (large language model)',
    definition:
      'The kind of AI behind assistants like Claude. It predicts text, which lets it answer questions, write, and reason.',
  },
  token: {
    title: 'Token',
    definition:
      'The small chunks of text an AI reads and writes — roughly a short word or part of a word. Usage and limits are measured in tokens.',
  },
  'context-window': {
    title: 'Context window',
    definition:
      "How much text the AI can consider at once — its short-term memory for the current conversation. Go past it and the earliest parts drop off.",
  },
  frontmatter: {
    title: 'Frontmatter',
    definition:
      'A small block of settings at the top of a file (between --- lines) that describes it — a name, a description, and other options.',
  },
  tool: {
    title: 'Tool',
    definition:
      'A capability the AI can call to do something concrete — read a file, search the web, run a command — rather than only producing text.',
  },
  'slash-command': {
    title: 'Slash command',
    definition:
      'A shortcut you trigger by typing /name — it expands into a saved prompt or action. In newer versions these are a flat kind of skill.',
  },
  plugin: {
    title: 'Plugin',
    definition:
      'A bundle that packages several assets together — skills, subagents, commands, hooks — so they can be shared and installed in one step.',
  },
};

export function getGlossaryTerm(name: string): GlossaryEntry | undefined {
  return GLOSSARY[name.toLowerCase()];
}

export function allGlossaryTerms(): (GlossaryEntry & { key: string })[] {
  return Object.entries(GLOSSARY).map(([key, entry]) => ({ key, ...entry }));
}
