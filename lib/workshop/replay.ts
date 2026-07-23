import type { Locale } from './i18n';

// Canned prompt -> response pairs for the playground's Replay mode. Bilingual;
// the Polish is a first pass — have a native speaker review. Scripted demos
// never touch the network and double as the offline / failure fallback.

export interface ReplayItem {
  id: string;
  label: Record<Locale, string>;
  prompt: Record<Locale, string>;
  response: Record<Locale, string>;
}

export const REPLAY: ReplayItem[] = [
  {
    id: 'eli5',
    label: { en: 'Explain simply', pl: 'Wyjaśnij prosto' },
    prompt: {
      en: 'Explain how a rainbow forms, for a 6-year-old.',
      pl: 'Wytłumacz sześciolatkowi, jak powstaje tęcza.',
    },
    response: {
      en: 'A rainbow is sunlight taking a bath in raindrops!\n\nWhen the sun shines while it is raining, its white light zips into each tiny raindrop, bounces off the back like a mirror, and comes out the front — spreading into all its hidden colours. Lots of raindrops doing this together make the big colourful arc. That is why you need both sun AND rain to spot one.',
      pl: 'Tęcza to światło słońca, które kąpie się w kroplach deszczu!\n\nGdy słońce świeci podczas deszczu, jego białe światło wpada do każdej małej kropli, odbija się w niej jak w lusterku i wychodzi z powrotem — rozdzielając się na wszystkie ukryte kolory. Wiele kropli robi to naraz i tak powstaje wielki kolorowy łuk. Dlatego potrzebne są jednocześnie słońce I deszcz.',
    },
  },
  {
    id: 'email',
    label: { en: 'Make it polite', pl: 'Ujmij to uprzejmie' },
    prompt: {
      en: 'Rewrite this to sound friendly and professional: "Send me the report now."',
      pl: 'Przeredaguj to na uprzejmie i profesjonalnie: „Wyślij mi raport teraz”.',
    },
    response: {
      en: 'Here is a warmer version:\n\n"Hi — when you have a moment, could you send over the report? I would like to review it before our next step. Thanks so much!"\n\nWhat changed: a greeting, a softer request, a reason, and a thank-you. Same ask, friendlier tone.',
      pl: 'Oto cieplejsza wersja:\n\n„Cześć — czy mógłbyś/mogłabyś przesłać raport, gdy znajdziesz chwilę? Chciał(a)bym go przejrzeć przed kolejnym krokiem. Bardzo dziękuję!”\n\nCo się zmieniło: powitanie, łagodniejsza prośba, uzasadnienie i podziękowanie. Ta sama prośba, milszy ton.',
    },
  },
  {
    id: 'summary',
    label: { en: 'Summarize notes', pl: 'Podsumuj notatki' },
    prompt: {
      en: 'Summarize these notes into decisions and action items: "We agreed to ship v2 in March. Ana will draft the changelog. Budget stays flat. Still deciding on the pricing page."',
      pl: 'Podsumuj te notatki na decyzje i zadania: „Zgodziliśmy się wydać v2 w marcu. Ana przygotuje changelog. Budżet bez zmian. Wciąż decydujemy o stronie cennika”.',
    },
    response: {
      en: 'Decisions\n- Ship v2 in March.\n- Budget stays flat.\n\nAction items\n- Ana: draft the changelog.\n\nOpen questions\n- Pricing page — still to be decided.',
      pl: 'Decyzje\n- Wydać v2 w marcu.\n- Budżet bez zmian.\n\nZadania\n- Ana: przygotować changelog.\n\nOtwarte kwestie\n- Strona cennika — do ustalenia.',
    },
  },
  {
    id: 'skill',
    label: { en: 'What is a skill?', pl: 'Czym jest skill?' },
    prompt: {
      en: 'In one short paragraph, what is a Claude skill and when would I use one?',
      pl: 'W jednym krótkim akapicie: czym jest skill w Claude i kiedy go użyć?',
    },
    response: {
      en: 'A skill is a small folder of instructions — a SKILL.md file, plus optional scripts and reference notes — that teaches an assistant how to do one specific task well. You reach for one when you keep explaining the same procedure: package it once as a skill and it is reused across projects, loading its detail only when it is actually needed.',
      pl: 'Skill to mały folder z instrukcjami — plik SKILL.md oraz opcjonalne skrypty i notatki — który uczy asystenta, jak dobrze wykonać jedno konkretne zadanie. Sięgasz po niego, gdy wciąż tłumaczysz tę samą procedurę: pakujesz ją raz jako skill i używasz w wielu projektach, a szczegóły wczytują się dopiero wtedy, gdy są potrzebne.',
    },
  },
];

export const DEMO_FALLBACK: Record<Locale, string> = {
  en: "This playground is in Replay mode, so replies are pre-recorded and free. In a live workshop, this is where Claude's real answer would appear.",
  pl: 'Ta piaskownica działa w trybie powtórki, więc odpowiedzi są nagrane wcześniej i darmowe. Na żywych warsztatach pojawiłaby się tu prawdziwa odpowiedź Claude.',
};

export const OFFLINE_FALLBACK: Record<Locale, string> = {
  en: "Looks like we're offline — so here's a pre-recorded reply. The demo keeps working even without a connection.",
  pl: 'Wygląda na to, że jesteśmy offline — więc oto nagrana odpowiedź. Demo działa nawet bez połączenia.',
};

export function findReplay(prompt: string, locale: Locale = 'en'): string | null {
  const p = prompt.trim().toLowerCase();
  const hit = REPLAY.find(
    (r) => r.prompt.en.trim().toLowerCase() === p || r.prompt.pl.trim().toLowerCase() === p,
  );
  return hit ? hit.response[locale] : null;
}
