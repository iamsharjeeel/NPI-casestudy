import { headers } from "next/headers";
import { issueChallenge, verifyChallenge } from "@/lib/challenge";
import { buildCrmPayload, sendToCrm } from "@/lib/crm";
import { isDisposableEmail } from "@/lib/disposable-emails";
import { sendMetaCapi } from "@/lib/meta-capi";
import { toE164 } from "@/lib/phone";
import { qualifyLead } from "@/lib/qualify";
import { rateLimit } from "@/lib/rate-limit";
import { CANONICAL_URL, GHL_CALENDAR_EMBED_URL } from "@/lib/site";
import { normalizeWebsite } from "@/lib/url";
import { leadRequestSchema } from "@/lib/validation";

export const runtime = "nodejs";

function clientIp(headerList: Headers) {
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headerList.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const headerList = await headers();
  const ip = clientIp(headerList);
  const limited = rateLimit(ip);
  if (!limited.ok) {
    return Response.json(
      { ok: false, error: "Too many submissions. Please wait and try again." },
      {
        status: 429,
        headers: { "retry-after": String(limited.retryAfterSec) },
      },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = leadRequestSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        error: "Please check the highlighted fields and try again.",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const input = parsed.data;

  if (input.websiteHoneypot && input.websiteHoneypot.trim() !== "") {
    return Response.json({
      ok: true,
      route: "review",
      message: "Thanks. We will review this and follow up if there is a fit.",
    });
  }

  const elapsed = Date.now() - input.startedAt;
  const suspicious = elapsed < 8000 || isDisposableEmail(input.workEmail);
  if (suspicious) {
    if (!input.challengeToken || !input.challengeAnswer) {
      const challenge = issueChallenge(ip);
      return Response.json(
        {
          ok: false,
          error: "Please confirm this is a real inquiry.",
          challenge,
        },
        { status: 403 },
      );
    }
    if (!verifyChallenge(ip, input.challengeToken, input.challengeAnswer)) {
      const challenge = issueChallenge(ip);
      return Response.json(
        {
          ok: false,
          error: "That confirmation did not match. Try again.",
          challenge,
        },
        { status: 403 },
      );
    }
  }

  let website: string;
  let phoneE164: string;
  try {
    website = normalizeWebsite(input.website);
    phoneE164 = toE164(input.phone);
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Invalid website or phone.",
      },
      { status: 422 },
    );
  }

  if (isDisposableEmail(input.workEmail) && !input.challengeAnswer) {
    return Response.json(
      { ok: false, error: "Use a work email address." },
      { status: 422 },
    );
  }

  const qualification = qualifyLead(input);
  const payload = buildCrmPayload(input, website, phoneE164, qualification);

  try {
    await sendToCrm(payload);
  } catch (error) {
    console.error("[crm]", error);
    return Response.json(
      {
        ok: false,
        error: "We could not save this just now. Email hello@xovera.io and we will pick it up.",
      },
      { status: 503 },
    );
  }

  const userAgent = headerList.get("user-agent") || "";
  const cookie = headerList.get("cookie") || "";
  const fbp = cookie.match(/_fbp=([^;]+)/)?.[1];
  const fbc = cookie.match(/_fbc=([^;]+)/)?.[1];

  await sendMetaCapi({
    eventName: "Lead",
    eventId: input.eventId,
    eventTime: Math.floor(Date.now() / 1000),
    sourceUrl: CANONICAL_URL,
    email: input.workEmail,
    phone: phoneE164,
    clientIp: ip === "unknown" ? undefined : ip,
    userAgent,
    fbp,
    fbc,
  });

  return Response.json({
    ok: true,
    route: qualification.route,
    calendarUrl:
      qualification.route === "qualified" ? GHL_CALENDAR_EMBED_URL : "",
    message:
      qualification.route === "qualified"
        ? "This looks like a fit. Book time with a senior operator below."
        : qualification.route === "review"
          ? "Thanks. A senior person at Xovera will review this and respond if there is a real fit."
          : "Thanks. This does not look like a match for the current engagement model. We will keep a light record in case that changes.",
  });
}
