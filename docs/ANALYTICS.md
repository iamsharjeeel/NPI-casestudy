# Analytics event map

Page version: `newtown-npi-v1.0.0`  
Source page: `newtown-athletic-club-success-story`

No raw PII (name, email, phone, website, business name) is sent in client analytics parameters. Meta CAPI hashes email/phone server-side for match quality only.

## Providers

| Channel | ID / env | Notes |
| --- | --- | --- |
| GA4 | `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Optional; add when the GA4 property is confirmed |
| Google Ads | `NEXT_PUBLIC_GOOGLE_ADS_ID` (default `AW-11078657396` from xovera.io) | gtag config |
| Meta Pixel | `NEXT_PUBLIC_META_PIXEL_ID` (default `2382126995606331`) | `eventID` = client `event_id` |
| Meta CAPI | `META_CAPI_ACCESS_TOKEN` | Same `event_id` for dedupe |
| GTM | `NEXT_PUBLIC_GTM_ID` | Optional; live site uses `GTM-MZJFTGNK` |

Do not add the live-site LeadConnector chat widget on this page.

## Events

| Event | When | Params (non-PII) | Pixel mapping |
| --- | --- | --- | --- |
| `case_view` | Page load | `page_version`, `source_page`, `event_id` | ViewContent |
| `testimonial_play` | Video play | same | custom |
| `testimonial_25` | ≥25% | same | custom |
| `testimonial_50` | ≥50% | same | custom |
| `testimonial_75` | ≥75% | same | custom |
| `testimonial_complete` | ended | same | custom |
| `proof_interaction` | Proof ribbon or program card | `location`, `program?` | custom |
| `form_start` | First field interaction | `step` optional | InitiateCheckout |
| `form_step_1` | Continue from step 1 | `step: 1` | custom |
| `form_step_2` | Continue from step 2 | `step: 2` | custom |
| `form_submit` | Server accepted | `route` | Lead |
| `lead_qualified` | Route = qualified | `route` | CompleteRegistration |
| `lead_review` | Route = review | `route` | custom |
| `lead_disqualified` | Route = disqualified | `route` | custom |
| `calendar_view` | Qualified success + calendar shown | `route` | Schedule |
| `meeting_booked` | Calendar iframe postMessage looks like a booking | none extra | Schedule |
| `downstream_customer` | Future CRM/offline conversion | do not fire on this page | — |

A/B tests only after these events appear in GA4 / Ads / Meta. Sequence tests (headline, proof, CTA) — not cosmetic color tests.
