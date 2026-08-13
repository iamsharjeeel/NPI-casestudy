# Manual steps

- Set `GHL_INBOUND_WEBHOOK_URL` before production traffic or qualified leads will 503.
- Set `NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL` or qualified leads see a fallback “booking link will be sent” state.
- Drop Doug’s approved MP4/WebM on CDN or Blob and set `NEXT_PUBLIC_TESTIMONIAL_VIDEO_URL`.
- Add `META_CAPI_ACCESS_TOKEN` for server-side Meta dedupe.
- Add `NEXT_PUBLIC_GA4_MEASUREMENT_ID` if this page should report into GA4 directly rather than only the live-site Google Ads gtag.

# Handover

## What changed

Production Next.js 16 landing page for the Newtown Athletic Club / Newtown Performance Institute success story. Brand tokens, logo, Geist fonts, kickers, primary CTA chrome, and form field styling match the live Xovera site. Copy and pipeline numbers follow the supplied brief; revenue/cohort conversion is not claimed.

## Why

Xovera needed an evidence-led case page that qualifies established operators instead of collecting low-fit demo volume, and that does not attribute this result to Xovera AI.

## Files

- `app/page.tsx` — page composition
- `app/api/leads/route.ts` — validation, scoring, CRM, CAPI
- `components/*` — sections, form, chrome
- `lib/*` — facts, scoring, analytics, CRM
- `public/brand/*` — live Xovera marks
- `public/images/*` — official NPI/NAC photography (AVIF/WebP/JPEG)
- `docs/*` — analytics map, form contract, QA

## Pending

- Client video, transcript, duration
- GHL webhook + calendar IDs
- Optional GA4 property + Meta CAPI token
- Do not run cosmetic A/B tests until analytics events are verified in GA4/Ads/Meta
