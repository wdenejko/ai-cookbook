import { type NextRequest, NextResponse } from 'next/server';
import { DEMO_FALLBACK, findReplay } from '@/lib/workshop/replay';

export const runtime = 'nodejs';

// --- Rate limit ---------------------------------------------------------------
// Simple in-memory sliding window. Good enough for a single-instance workshop;
// for multi-instance production swap in @upstash/ratelimit (see .env.example).
const WINDOW_MS = 60_000;
const MAX = Number(process.env.DEMO_RATE_LIMIT ?? 8);
const hits = new Map<string, number[]>();

function isLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX;
}

function sessionKey(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
}

// --- Handler ------------------------------------------------------------------
export async function POST(req: NextRequest) {
  let prompt = '';
  try {
    prompt = String(((await req.json()) as { prompt?: unknown })?.prompt ?? '').slice(0, 2000);
  } catch {
    // ignore malformed body
  }
  if (!prompt.trim()) {
    return NextResponse.json({ error: 'empty' }, { status: 400 });
  }

  if (isLimited(sessionKey(req))) {
    return NextResponse.json(
      { reply: 'Slow down a moment — the demo is rate-limited. Try again shortly.', mode: 'rate-limited' },
      { status: 429 },
    );
  }

  // Scripted prompts always answer from replay data — deterministic and free.
  const scripted = findReplay(prompt);
  if (scripted) return NextResponse.json({ reply: scripted, mode: 'replay' });

  const mode = process.env.DEMO_MODE ?? 'replay';

  if (mode === 'live' && process.env.ANTHROPIC_API_KEY) {
    try {
      const { default: Anthropic } = await import('@anthropic-ai/sdk');
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const message = await client.messages.create({
        model: process.env.DEMO_MODEL ?? 'claude-haiku-4-5-20251001',
        max_tokens: Number(process.env.DEMO_MAX_TOKENS ?? 400),
        messages: [{ role: 'user', content: prompt }],
      });
      const text = message.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
      return NextResponse.json({ reply: text || DEMO_FALLBACK, mode: 'live' });
    } catch {
      // Never break the demo: any live failure (key, network, quota) → fallback.
      return NextResponse.json({ reply: DEMO_FALLBACK, mode: 'fallback' });
    }
  }

  // Replay mode, free-text prompt.
  return NextResponse.json({ reply: DEMO_FALLBACK, mode: 'replay' });
}
