"use client";

import { PAGE_VERSION, SOURCE_PAGE } from "@/lib/site";
import type { AnalyticsEvent, AnalyticsParams } from "@/lib/events";
import { FORBIDDEN_PII_KEYS } from "@/lib/events";

type Gtag = (...args: unknown[]) => void;
type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
    dataLayer?: unknown[];
    xoveraTrack?: typeof track;
  }
}

function sanitize(params: AnalyticsParams) {
  const clean: Record<string, string | number> = {
    page_version: PAGE_VERSION,
    source_page: SOURCE_PAGE,
  };
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    if ((FORBIDDEN_PII_KEYS as readonly string[]).includes(key)) continue;
    clean[key] = value;
  }
  return clean;
}

export function newEventId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  const eventId = params.event_id || newEventId();
  const payload = sanitize({ ...params, event_id: eventId });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }
  if (typeof window.fbq === "function") {
    const map: Partial<Record<AnalyticsEvent, string>> = {
      case_view: "ViewContent",
      form_start: "InitiateCheckout",
      form_submit: "Lead",
      lead_qualified: "CompleteRegistration",
      calendar_view: "Schedule",
      meeting_booked: "Schedule",
    };
    const standard = map[event];
    if (standard) {
      window.fbq("track", standard, payload, { eventID: eventId });
    } else {
      window.fbq("trackCustom", event, payload, { eventID: eventId });
    }
  }
}

export function captureAttribution() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const current = {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
    referrer: document.referrer || "",
    landingUrl: window.location.href,
  };
  try {
    const existing = window.localStorage.getItem("xovera_first_touch");
    if (!existing) {
      window.localStorage.setItem("xovera_first_touch", JSON.stringify(current));
    }
    window.sessionStorage.setItem("xovera_last_touch", JSON.stringify(current));
    return {
      ...current,
      firstTouch: existing || JSON.stringify(current),
    };
  } catch {
    return current;
  }
}
