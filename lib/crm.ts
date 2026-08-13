import { CONSENT_VERSION, PAGE_VERSION, SOURCE_PAGE } from "@/lib/site";
import type { QualificationResult } from "@/lib/qualify";
import type { LeadRequest } from "@/lib/validation";

export type CrmPayload = {
  source: "xovera-newtown-case-study";
  sourcePage: string;
  pageVersion: string;
  route: QualificationResult["route"];
  score: number;
  reasons: string[];
  consent: {
    version: string;
    timestamp: string;
    granted: true;
  };
  qualification: {
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
  };
  contact: {
    name: string;
    workEmail: string;
    phoneE164: string;
  };
  attribution: LeadRequest["attribution"] & {
    eventId: string;
  };
};

export function buildCrmPayload(
  input: LeadRequest,
  website: string,
  phoneE164: string,
  qualification: QualificationResult,
): CrmPayload {
  return {
    source: "xovera-newtown-case-study",
    sourcePage: SOURCE_PAGE,
    pageVersion: PAGE_VERSION,
    route: qualification.route,
    score: qualification.score,
    reasons: qualification.reasons,
    consent: {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      granted: true,
    },
    qualification: {
      website,
      businessName: input.businessName,
      industry: input.industry,
      locations: input.locations,
      annualRevenue: input.annualRevenue,
      averageCustomerValue: input.averageCustomerValue,
      leadsPerMonth: input.leadsPerMonth,
      adSpendPerMonth: input.adSpendPerMonth,
      leadSources: input.leadSources,
      currentSystems: input.currentSystems,
      biggestLeak: input.biggestLeak,
      postLeadProcess: input.postLeadProcess,
      decisionAuthority: input.decisionAuthority,
      timeline: input.timeline,
      investmentReadiness: input.investmentReadiness,
    },
    contact: {
      name: input.name,
      workEmail: input.workEmail.toLowerCase(),
      phoneE164,
    },
    attribution: {
      ...input.attribution,
      eventId: input.eventId,
    },
  };
}

export async function sendToCrm(payload: CrmPayload): Promise<void> {
  const url = process.env.GHL_INBOUND_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("GHL_INBOUND_WEBHOOK_URL is not configured.");
    }
    console.info("[crm:dev]", JSON.stringify({ route: payload.route, score: payload.score }));
    return;
  }

  const tags = [
    "newtown-case-study",
    `route-${payload.route}`,
    `industry-${payload.qualification.industry}`,
  ];

  const body = {
    ...payload,
    tags,
    name: payload.contact.name,
    email: payload.contact.workEmail,
    phone: payload.contact.phoneE164,
    companyName: payload.qualification.businessName,
    website: payload.qualification.website,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.GHL_WEBHOOK_SECRET
        ? { "x-webhook-secret": process.env.GHL_WEBHOOK_SECRET }
        : {}),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`CRM webhook failed (${response.status}): ${text.slice(0, 200)}`);
  }
}
