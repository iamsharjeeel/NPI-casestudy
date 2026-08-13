import { z } from "zod";

export const revenueOptions = [
  "under_250k",
  "250k_1m",
  "1m_5m",
  "5m_20m",
  "20m_plus",
  "prefer_not",
] as const;

export const locationOptions = ["1", "2_5", "6_10", "11_plus"] as const;
export const acvOptions = ["under_250", "250_499", "500_999", "1k_5k", "5k_plus"] as const;
export const industryOptions = [
  "fitness_sports",
  "health_wellness",
  "home_trades",
  "property_finance",
  "other_appointment",
] as const;
export const leadsOptions = ["under_20", "20_49", "50_199", "200_499", "500_plus"] as const;
export const spendOptions = ["none", "under_2k", "2k_10k", "10k_30k", "30k_plus"] as const;
export const leakOptions = [
  "slow_followup",
  "no_owner",
  "no_nurture",
  "ads_not_handoff",
  "crm_ambiguity",
  "other",
] as const;
export const authorityOptions = ["yes", "shared", "no"] as const;
export const timelineOptions = ["now", "30_days", "90_days", "exploring"] as const;
export const investmentOptions = ["yes", "need_to_understand", "not_now"] as const;

export const leadSourcesSchema = z
  .array(
    z.enum([
      "google_ads",
      "meta_ads",
      "organic",
      "referral",
      "walk_in",
      "website",
      "other",
    ]),
  )
  .min(1);

export const step1Schema = z.object({
  website: z.string().min(3).max(200),
  businessName: z.string().min(2).max(120),
  industry: z.enum(industryOptions),
  locations: z.enum(locationOptions),
  annualRevenue: z.enum(revenueOptions),
  averageCustomerValue: z.enum(acvOptions),
});

export const step2Schema = z.object({
  leadsPerMonth: z.enum(leadsOptions),
  adSpendPerMonth: z.enum(spendOptions),
  leadSources: leadSourcesSchema,
  currentSystems: z.string().min(2).max(400),
  biggestLeak: z.enum(leakOptions),
  postLeadProcess: z.string().min(8).max(800),
});

export const step3Schema = z.object({
  decisionAuthority: z.enum(authorityOptions),
  timeline: z.enum(timelineOptions),
  investmentReadiness: z.enum(investmentOptions),
  name: z.string().min(2).max(80),
  workEmail: z.string().email().max(120),
  phone: z.string().min(7).max(32),
  consent: z.literal(true),
});

export const attributionSchema = z.object({
  utmSource: z.string().max(120).optional().default(""),
  utmMedium: z.string().max(120).optional().default(""),
  utmCampaign: z.string().max(180).optional().default(""),
  utmTerm: z.string().max(180).optional().default(""),
  utmContent: z.string().max(180).optional().default(""),
  gclid: z.string().max(200).optional().default(""),
  fbclid: z.string().max(200).optional().default(""),
  referrer: z.string().max(500).optional().default(""),
  landingUrl: z.string().max(500).optional().default(""),
  firstTouch: z.string().max(500).optional().default(""),
});

export const leadRequestSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .extend({
    websiteHoneypot: z.string().max(200).optional().default(""),
    startedAt: z.number().int(),
    eventId: z.string().uuid(),
    challengeToken: z.string().max(400).optional(),
    challengeAnswer: z.string().max(20).optional(),
    attribution: attributionSchema,
  });

export type LeadRequest = z.infer<typeof leadRequestSchema>;
export type LeadRoute = "qualified" | "review" | "disqualified";
