# Form endpoint contract

`POST /api/leads`  
Content-Type: `application/json`

## Request

```json
{
  "website": "newtownathletic.com",
  "businessName": "Example Club",
  "industry": "fitness_sports",
  "locations": "1",
  "annualRevenue": "5m_20m",
  "averageCustomerValue": "1k_5k",
  "leadsPerMonth": "50_199",
  "adSpendPerMonth": "10k_30k",
  "leadSources": ["google_ads", "meta_ads"],
  "currentSystems": "GoHighLevel + WellnessLiving",
  "biggestLeak": "no_nurture",
  "postLeadProcess": "Front desk tries to call when they can.",
  "decisionAuthority": "yes",
  "timeline": "now",
  "investmentReadiness": "yes",
  "name": "Alex Rivera",
  "workEmail": "alex@example.com",
  "phone": "+12155550100",
  "consent": true,
  "websiteHoneypot": "",
  "startedAt": 1786590000000,
  "eventId": "uuid",
  "challengeToken": "",
  "challengeAnswer": "",
  "attribution": {
    "utmSource": "",
    "utmMedium": "",
    "utmCampaign": "",
    "utmTerm": "",
    "utmContent": "",
    "gclid": "",
    "fbclid": "",
    "referrer": "",
    "landingUrl": "",
    "firstTouch": ""
  }
}
```

Enums live in `lib/validation.ts`.

## Responses

| Status | Body |
| --- | --- |
| 200 | `{ ok: true, route: "qualified" \| "review" \| "disqualified", calendarUrl, message }` |
| 403 | `{ ok: false, error, challenge: { token, prompt } }` — retry with `challengeToken` + `challengeAnswer` |
| 422 | `{ ok: false, error, fields? }` |
| 429 | `{ ok: false, error }` + `Retry-After` |
| 503 | CRM webhook missing/failing in production |

Honeypot filled: fake 200 `review` and no CRM write.

## Server work

1. Rate limit 5 / 15 min / IP
2. Zod parse
3. Honeypot
4. Fast-submit or disposable email → challenge
5. URL normalize + E.164 phone
6. Score / route (`lib/qualify.ts`)
7. CRM payload to `GHL_INBOUND_WEBHOOK_URL`
8. Meta CAPI `Lead` with same `eventId`

## CRM payload (minimum)

`source`, `sourcePage`, `pageVersion`, `route`, `score`, `reasons`, `consent.version`, `consent.timestamp`, `qualification.*`, `contact.{name,workEmail,phoneE164}`, `attribution.*` including UTMs, referrer, gclid, fbclid.
