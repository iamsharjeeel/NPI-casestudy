export const PAGE_VERSION = "newtown-npi-v1.0.0";
export const CONSENT_VERSION = "xovera-growth-review-2026-08";
export const SOURCE_PAGE = "newtown-athletic-club-success-story";

export const SITE_NAME = "Xovera";
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.xovera.io";
export const PAGE_PATH = process.env.NEXT_PUBLIC_PAGE_PATH || "/";
export const CANONICAL_URL = `${SITE_ORIGIN}${PAGE_PATH === "/" ? "" : PAGE_PATH}`;

export const XOVERA_HOME = "https://www.xovera.io";
export const XOVERA_EMAIL = "hello@xovera.io";
export const XOVERA_GO = "https://go.xovera.io/";
export const XOVERA_ADS = "https://ads.xovera.io/";
export const XOVERA_AI = "https://app.xovera.io/";

export const ANALYTICS_IDS = {
  ga4: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "",
  googleAds: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-11078657396",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID || "2382126995606331",
  gtm: process.env.NEXT_PUBLIC_GTM_ID || "",
} as const;

export const GHL_CALENDAR_EMBED_URL =
  process.env.NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL || "";

export const TESTIMONIAL_VIDEO_URL =
  process.env.NEXT_PUBLIC_TESTIMONIAL_VIDEO_URL || "";
export const TESTIMONIAL_VIDEO_DURATION =
  process.env.NEXT_PUBLIC_TESTIMONIAL_DURATION || "";
