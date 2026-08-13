type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX = 5;

function prune(now: number) {
  if (buckets.size < 2000) return;
  for (const [key, value] of buckets) {
    if (value.resetAt <= now) buckets.delete(key);
  }
}

export function rateLimit(key: string): {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
} {
  const now = Date.now();
  prune(now);
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX - 1, retryAfterSec: Math.ceil(WINDOW_MS / 1000) };
  }
  if (current.count >= MAX) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }
  current.count += 1;
  return {
    ok: true,
    remaining: MAX - current.count,
    retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}
