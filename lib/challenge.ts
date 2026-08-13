import { createHmac, timingSafeEqual } from "crypto";

const TTL_MS = 10 * 60 * 1000;

function secret() {
  return process.env.LEAD_CHALLENGE_SECRET || process.env.CRM_SHARED_SECRET || "dev-challenge-secret";
}

export function issueChallenge(ip: string): { token: string; prompt: string } {
  const a = 4 + Math.floor(Math.random() * 9);
  const b = 3 + Math.floor(Math.random() * 8);
  const exp = Date.now() + TTL_MS;
  const payload = `${ip}|${a}|${b}|${exp}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return {
    token: Buffer.from(JSON.stringify({ a, b, exp, sig })).toString("base64url"),
    prompt: `Confirm this is a real inquiry: what is ${a} + ${b}?`,
  };
}

export function verifyChallenge(
  ip: string,
  token: string,
  answer: string,
): boolean {
  try {
    const parsed = JSON.parse(Buffer.from(token, "base64url").toString("utf8")) as {
      a: number;
      b: number;
      exp: number;
      sig: string;
    };
    if (Date.now() > parsed.exp) return false;
    const payload = `${ip}|${parsed.a}|${parsed.b}|${parsed.exp}`;
    const expected = createHmac("sha256", secret()).update(payload).digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(parsed.sig);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
    return Number(answer.trim()) === parsed.a + parsed.b;
  } catch {
    return false;
  }
}
