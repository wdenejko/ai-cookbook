// Canned prompt -> response pairs for the playground's Replay mode. These are
// deterministic and cost nothing: scripted demos never touch the network, and
// they double as the fallback when a live call fails or the room is offline.

export interface ReplayItem {
  id: string;
  label: string; // button label
  prompt: string; // exact prompt text
  response: string; // pre-recorded reply
}

export const REPLAY: ReplayItem[] = [
  {
    id: 'eli5',
    label: 'Explain simply',
    prompt: 'Explain how a rainbow forms, for a 6-year-old.',
    response:
      'A rainbow is sunlight taking a bath in raindrops!\n\nWhen the sun shines while it is raining, its white light zips into each tiny raindrop, bounces off the back like a mirror, and comes out the front. On the way, the light spreads into all its hidden colours — red, orange, yellow, green, blue, and purple.\n\nLots of raindrops doing this together make the big colourful arc you see in the sky. That is why you need both sun AND rain to spot one.',
  },
  {
    id: 'email',
    label: 'Make it polite',
    prompt: 'Rewrite this to sound friendly and professional: "Send me the report now."',
    response:
      'Here is a warmer version:\n\n"Hi — when you have a moment, could you send over the report? I would like to review it before our next step. Thanks so much for your help!"\n\nWhat changed: a greeting, a softer request ("when you have a moment"), a reason, and a thank-you. Same ask, friendlier tone.',
  },
  {
    id: 'summary',
    label: 'Summarize notes',
    prompt:
      'Summarize these notes into decisions and action items: "We agreed to ship v2 in March. Ana will draft the changelog. Budget stays flat. Still deciding on the pricing page."',
    response:
      'Decisions\n- Ship v2 in March.\n- Budget stays flat.\n\nAction items\n- Ana: draft the changelog.\n\nOpen questions\n- Pricing page approach — still to be decided.',
  },
  {
    id: 'skill',
    label: 'What is a skill?',
    prompt: 'In one short paragraph, what is a Claude skill and when would I use one?',
    response:
      'A skill is a small folder of instructions — a SKILL.md file, plus optional scripts and reference notes — that teaches an assistant how to do one specific task well (say, filling PDF forms or exploring a database). You reach for one when you find yourself explaining the same procedure again and again: package it once as a skill and it is reused across projects, loading its detail only when it is actually needed.',
  },
];

export const DEMO_FALLBACK =
  "This playground is in Replay mode, so replies are pre-recorded and free. In a live workshop, this is where Claude's real answer would appear.";

export const OFFLINE_FALLBACK =
  "Looks like we're offline — so here's a pre-recorded reply. The demo keeps working even without a connection; in a live session Claude would answer here.";

export function findReplay(prompt: string): string | null {
  const p = prompt.trim().toLowerCase();
  return REPLAY.find((r) => r.prompt.trim().toLowerCase() === p)?.response ?? null;
}
