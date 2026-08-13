"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { captureAttribution, newEventId, track } from "@/lib/analytics";
import { CONSENT_VERSION } from "@/lib/site";
import { Button } from "@/components/button";
import { Kicker, Section } from "@/components/layout-bits";
import {
  acvOptions,
  authorityOptions,
  industryOptions,
  investmentOptions,
  leakOptions,
  leadsOptions,
  locationOptions,
  revenueOptions,
  spendOptions,
  timelineOptions,
} from "@/lib/validation";

const STORAGE_KEY = "xovera-npi-fitcheck-v1";

const labels = {
  industry: {
    fitness_sports: "Fitness / sports / clubs",
    health_wellness: "Health & wellness",
    home_trades: "Home & premium trades",
    property_finance: "Property & finance",
    other_appointment: "Other appointment-driven",
  },
  locations: {
    "1": "1 location",
    "2_5": "2–5",
    "6_10": "6–10",
    "11_plus": "11+",
  },
  revenue: {
    under_250k: "Under $250k",
    "250k_1m": "$250k–$1M",
    "1m_5m": "$1M–$5M",
    "5m_20m": "$5M–$20M",
    "20m_plus": "$20M+",
    prefer_not: "Prefer not to say",
  },
  acv: {
    under_250: "Under $250",
    "250_499": "$250–$499",
    "500_999": "$500–$999",
    "1k_5k": "$1k–$5k",
    "5k_plus": "$5k+",
  },
  leads: {
    under_20: "Under 20",
    "20_49": "20–49",
    "50_199": "50–199",
    "200_499": "200–499",
    "500_plus": "500+",
  },
  spend: {
    none: "None / organic only",
    under_2k: "Under $2k",
    "2k_10k": "$2k–$10k",
    "10k_30k": "$10k–$30k",
    "30k_plus": "$30k+",
  },
  leak: {
    slow_followup: "Slow or inconsistent follow-up",
    no_owner: "No clear owner per inquiry",
    no_nurture: "Non-immediate buyers disappear",
    ads_not_handoff: "Ads stop at clicks / forms",
    crm_ambiguity: "Staff have to interpret the CRM",
    other: "Something else",
  },
  authority: {
    yes: "Yes, I can decide",
    shared: "Shared with a partner / owner",
    no: "No",
  },
  timeline: {
    now: "Now",
    "30_days": "Within 30 days",
    "90_days": "Within 90 days",
    exploring: "Exploring",
  },
  investment: {
    yes: "Yes, excluding media",
    need_to_understand: "Need to understand the work first",
    not_now: "Not now",
  },
} as const;

const sourceOptions = [
  ["google_ads", "Google Ads"],
  ["meta_ads", "Meta Ads"],
  ["organic", "Organic / SEO"],
  ["referral", "Referral"],
  ["walk_in", "Walk-in"],
  ["website", "Website"],
  ["other", "Other"],
] as const;

type FormState = {
  website: string;
  businessName: string;
  industry: string;
  locations: string;
  annualRevenue: string;
  averageCustomerValue: string;
  leadsPerMonth: string;
  adSpendPerMonth: string;
  leadSources: string[];
  currentSystems: string;
  biggestLeak: string;
  postLeadProcess: string;
  decisionAuthority: string;
  timeline: string;
  investmentReadiness: string;
  name: string;
  workEmail: string;
  phone: string;
  consent: boolean;
  websiteHoneypot: string;
};

const empty: FormState = {
  website: "",
  businessName: "",
  industry: "",
  locations: "",
  annualRevenue: "",
  averageCustomerValue: "",
  leadsPerMonth: "",
  adSpendPerMonth: "",
  leadSources: [],
  currentSystems: "",
  biggestLeak: "",
  postLeadProcess: "",
  decisionAuthority: "",
  timeline: "",
  investmentReadiness: "",
  name: "",
  workEmail: "",
  phone: "",
  consent: false,
  websiteHoneypot: "",
};

const fieldClass =
  "h-11 w-full rounded-md border border-border bg-input px-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/60 transition-fast focus:outline-none focus:ring-2 focus:ring-ring";
const labelClass = "mb-2 block text-[13px] font-medium text-foreground/85";

type Route = "qualified" | "review" | "disqualified";

function readSaved(): { step: number; data: FormState } {
  if (typeof window === "undefined") return { step: 1, data: empty };
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return { step: 1, data: empty };
    const saved = JSON.parse(raw) as { step: number; data: FormState };
    return {
      step: saved.step || 1,
      data: { ...empty, ...saved.data },
    };
  } catch {
    return { step: 1, data: empty };
  }
}

export function QualificationForm() {
  const [step, setStep] = useState(() => readSaved().step);
  const [data, setData] = useState<FormState>(() => readSaved().data);
  const [startedAt] = useState(() => Date.now());
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ route: Route; message: string; calendarUrl: string } | null>(null);
  const [challenge, setChallenge] = useState<{ token: string; prompt: string } | null>(null);
  const [challengeAnswer, setChallengeAnswer] = useState("");
  const [started, setStarted] = useState(false);

  function persist(nextStep: number, nextData: FormState) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step: nextStep, data: nextData }));
    } catch {
      /* ignore */
    }
  }

  const eventId = useMemo(() => newEventId(), []);

  function start() {
    if (!started) {
      setStarted(true);
      track("form_start");
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    start();
    setError("");
    setData((prev) => {
      const next = { ...prev, [key]: value };
      persist(step, next);
      return next;
    });
  }

  function toggleSource(value: string) {
    start();
    setData((prev) => {
      const next = {
        ...prev,
        leadSources: prev.leadSources.includes(value)
          ? prev.leadSources.filter((item) => item !== value)
          : [...prev.leadSources, value],
      };
      persist(step, next);
      return next;
    });
  }

  function validateStep(current: number) {
    if (current === 1) {
      if (!data.website || !data.businessName || !data.industry || !data.locations || !data.annualRevenue || !data.averageCustomerValue) {
        setError("Complete the business profile before continuing.");
        return false;
      }
    }
    if (current === 2) {
      if (!data.leadsPerMonth || !data.adSpendPerMonth || data.leadSources.length === 0 || !data.currentSystems || !data.biggestLeak || data.postLeadProcess.trim().length < 8) {
        setError("Tell us how demand currently moves before continuing.");
        return false;
      }
    }
    return true;
  }

  function next() {
    if (!validateStep(step)) return;
    if (step === 1) track("form_step_1", { step: 1 });
    if (step === 2) track("form_step_2", { step: 2 });
    setError("");
    setStep((s) => {
      const next = Math.min(3, s + 1);
      persist(next, data);
      return next;
    });
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (step !== 3) return;
    if (!data.decisionAuthority || !data.timeline || !data.investmentReadiness || !data.name || !data.workEmail || !data.phone || !data.consent) {
      setError("Complete the last step, including consent, before submitting.");
      return;
    }
    setPending(true);
    setError("");
    setFieldErrors({});
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          startedAt,
          eventId,
          challengeToken: challenge?.token,
          challengeAnswer: challengeAnswer || undefined,
          attribution: captureAttribution(),
        }),
      });
      const json = (await response.json()) as {
        ok: boolean;
        error?: string;
        fields?: Record<string, string[]>;
        route?: Route;
        message?: string;
        calendarUrl?: string;
        challenge?: { token: string; prompt: string };
      };
      if (json.challenge) {
        setChallenge(json.challenge);
        setError(json.error || "Please confirm this is a real inquiry.");
        setPending(false);
        return;
      }
      if (!response.ok || !json.ok || !json.route) {
        setFieldErrors(json.fields || {});
        setError(json.error || "We could not submit this. Try again.");
        setPending(false);
        return;
      }
      track("form_submit", { event_id: eventId, route: json.route });
      track(
        json.route === "qualified"
          ? "lead_qualified"
          : json.route === "review"
            ? "lead_review"
            : "lead_disqualified",
        { event_id: eventId, route: json.route },
      );
      if (json.route === "qualified") {
        track("calendar_view", { event_id: eventId });
      }
      setResult({
        route: json.route,
        message: json.message || "",
        calendarUrl: json.calendarUrl || "",
      });
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      setError("Network error. Check the connection and try again.");
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      const data = event.data;
      const text = typeof data === "string" ? data : JSON.stringify(data ?? "");
      if (/appointment|booking|scheduled|meeting/i.test(text)) {
        track("meeting_booked");
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <Section id="review">
      <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Kicker>Growth systems review</Kicker>
          <h2
            className="max-w-[16ch] text-balance text-4xl font-semibold tracking-tight md:text-5xl"
            style={{ lineHeight: 1.04, letterSpacing: "-0.03em" }}
          >
            Show us the operation, not a pitch.
          </h2>
          <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-foreground/85">
            We work best when there is already a real business, real demand and a measurable leak. Share the basics below. We will review the revenue profile, lead flow, current systems and bottleneck before we ask you to book time.
          </p>
        </div>
        <div className="rounded-lg border border-border/50 bg-card p-6 shadow-card md:p-8">
          {result ? (
            <SuccessState result={result} />
          ) : (
            <form className="relative" onSubmit={submit} noValidate>
              <div className="mb-6 flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Step {step} of 3
                </p>
                <p className="text-[13px] text-muted-foreground">About two minutes</p>
              </div>
              <div className="mb-6 h-1 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-gradient-primary" style={{ width: `${(step / 3) * 100}%` }} />
              </div>
              {step === 1 ? (
                <div className="space-y-4">
                  <Field label="Website" error={fieldErrors.website}>
                    <input className={fieldClass} value={data.website} onChange={(e) => update("website", e.target.value)} autoComplete="url" inputMode="url" placeholder="yourclub.com" required />
                  </Field>
                  <Honeypot value={data.websiteHoneypot} onChange={(value) => update("websiteHoneypot", value)} />
                  <Field label="Business name" error={fieldErrors.businessName}>
                    <input className={fieldClass} value={data.businessName} onChange={(e) => update("businessName", e.target.value)} autoComplete="organization" required />
                  </Field>
                  <Field label="Industry" error={fieldErrors.industry}>
                    <select className={fieldClass} value={data.industry} onChange={(e) => update("industry", e.target.value)} required>
                      <option value="">Select</option>
                      {industryOptions.map((option) => (
                        <option key={option} value={option}>{labels.industry[option]}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Locations" error={fieldErrors.locations}>
                    <select className={fieldClass} value={data.locations} onChange={(e) => update("locations", e.target.value)} required>
                      <option value="">Select</option>
                      {locationOptions.map((option) => (
                        <option key={option} value={option}>{labels.locations[option]}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Annual revenue" error={fieldErrors.annualRevenue}>
                    <select className={fieldClass} value={data.annualRevenue} onChange={(e) => update("annualRevenue", e.target.value)} required>
                      <option value="">Select</option>
                      {revenueOptions.map((option) => (
                        <option key={option} value={option}>{labels.revenue[option]}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Average customer value" error={fieldErrors.averageCustomerValue}>
                    <select className={fieldClass} value={data.averageCustomerValue} onChange={(e) => update("averageCustomerValue", e.target.value)} required>
                      <option value="">Select</option>
                      {acvOptions.map((option) => (
                        <option key={option} value={option}>{labels.acv[option]}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              ) : null}
              {step === 2 ? (
                <div className="space-y-4">
                  <Field label="Leads / month" error={fieldErrors.leadsPerMonth}>
                    <select className={fieldClass} value={data.leadsPerMonth} onChange={(e) => update("leadsPerMonth", e.target.value)} required>
                      <option value="">Select</option>
                      {leadsOptions.map((option) => (
                        <option key={option} value={option}>{labels.leads[option]}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Ad spend / month" error={fieldErrors.adSpendPerMonth}>
                    <select className={fieldClass} value={data.adSpendPerMonth} onChange={(e) => update("adSpendPerMonth", e.target.value)} required>
                      <option value="">Select</option>
                      {spendOptions.map((option) => (
                        <option key={option} value={option}>{labels.spend[option]}</option>
                      ))}
                    </select>
                  </Field>
                  <fieldset>
                    <legend className={labelClass}>Lead sources</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {sourceOptions.map(([value, label]) => (
                        <label key={value} className="flex items-center gap-2 text-[14px]">
                          <input type="checkbox" checked={data.leadSources.includes(value)} onChange={() => toggleSource(value)} />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <Field label="Current CRM / booking / club systems" error={fieldErrors.currentSystems}>
                    <input className={fieldClass} value={data.currentSystems} onChange={(e) => update("currentSystems", e.target.value)} placeholder="HighLevel, WellnessLiving, Mindbody…" required />
                  </Field>
                  <Field label="Biggest leak" error={fieldErrors.biggestLeak}>
                    <select className={fieldClass} value={data.biggestLeak} onChange={(e) => update("biggestLeak", e.target.value)} required>
                      <option value="">Select</option>
                      {leakOptions.map((option) => (
                        <option key={option} value={option}>{labels.leak[option]}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="What happens after a lead comes in today?" error={fieldErrors.postLeadProcess}>
                    <textarea className={`${fieldClass} h-28 py-3`} value={data.postLeadProcess} onChange={(e) => update("postLeadProcess", e.target.value)} required />
                  </Field>
                </div>
              ) : null}
              {step === 3 ? (
                <div className="space-y-4">
                  <Field label="Decision authority" error={fieldErrors.decisionAuthority}>
                    <select className={fieldClass} value={data.decisionAuthority} onChange={(e) => update("decisionAuthority", e.target.value)} required>
                      <option value="">Select</option>
                      {authorityOptions.map((option) => (
                        <option key={option} value={option}>{labels.authority[option]}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Timeline" error={fieldErrors.timeline}>
                    <select className={fieldClass} value={data.timeline} onChange={(e) => update("timeline", e.target.value)} required>
                      <option value="">Select</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>{labels.timeline[option]}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Investment readiness, excluding media" error={fieldErrors.investmentReadiness}>
                    <select className={fieldClass} value={data.investmentReadiness} onChange={(e) => update("investmentReadiness", e.target.value)} required>
                      <option value="">Select</option>
                      {investmentOptions.map((option) => (
                        <option key={option} value={option}>{labels.investment[option]}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Name" error={fieldErrors.name}>
                    <input className={fieldClass} value={data.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" required />
                  </Field>
                  <Field label="Work email" error={fieldErrors.workEmail}>
                    <input className={fieldClass} type="email" inputMode="email" value={data.workEmail} onChange={(e) => update("workEmail", e.target.value)} autoComplete="email" required />
                  </Field>
                  <Field label="Phone" error={fieldErrors.phone}>
                    <input className={fieldClass} type="tel" inputMode="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" required />
                    <p className="mt-1 text-[12px] text-muted-foreground">Include country code if outside the US (e.g. +1, +44, +61).</p>
                  </Field>
                  {challenge ? (
                    <Field label={challenge.prompt}>
                      <input className={fieldClass} value={challengeAnswer} onChange={(e) => setChallengeAnswer(e.target.value)} inputMode="numeric" required />
                    </Field>
                  ) : null}
                  <label className="flex items-start gap-3 text-[13px] leading-relaxed text-foreground/85">
                    <input className="mt-1" type="checkbox" checked={data.consent} onChange={(e) => update("consent", e.target.checked)} required />
                    <span>
                      I agree Xovera may use these details to review fit and follow up. Consent version {CONSENT_VERSION}. We do not sell this information.
                    </span>
                  </label>
                </div>
              ) : null}
              {error ? (
                <p className="mt-4 text-[14px] text-destructive" role="alert">{error}</p>
              ) : null}
              <div className="mt-6 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button type="button" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setStep((s) => { const next = s - 1; persist(next, data); return next; })}>
                    Back
                  </button>
                ) : <span />}
                {step < 3 ? (
                  <Button type="button" variant="primary" size="md" onClick={next}>
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" variant="primary" size="md" disabled={pending} conic>
                    {pending ? "Reviewing…" : "Start the 2-minute fit check"}
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

import type { ReactNode } from "react";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string[];
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
      {error?.length ? <span className="mt-1 block text-[12px] text-destructive">{error.join(" ")}</span> : null}
    </label>
  );
}

function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="absolute left-[-10000px] h-px w-px overflow-hidden">
      Company website
      <input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function SuccessState({
  result,
}: {
  result: { route: Route; message: string; calendarUrl: string };
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {result.route === "qualified" ? "Qualified" : result.route === "review" ? "In review" : "Recorded"}
      </p>
      <h3 className="mt-2 text-2xl font-semibold tracking-tight">{result.message}</h3>
      {result.route === "qualified" && result.calendarUrl ? (
        <div className="mt-6 overflow-hidden rounded-md border border-border/50">
          <iframe
            title="Book a Growth Systems Review"
            src={result.calendarUrl}
            className="h-[640px] w-full"
          />
        </div>
      ) : null}
      {result.route === "qualified" && !result.calendarUrl ? (
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
          Calendar embed is not configured in this environment. A senior operator will send a booking link.
        </p>
      ) : null}
      {result.route === "review" ? (
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
          No calendar is shown until the review is complete. If this is a fit, someone senior from Xovera will respond.
        </p>
      ) : null}
      {result.route === "disqualified" ? (
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">
          We prefer fewer high-fit conversations. You are on a light follow-up path, not a sales sequence.
        </p>
      ) : null}
    </div>
  );
}
