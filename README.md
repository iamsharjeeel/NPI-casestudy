# Xovera × Newtown Athletic Club / NPI

Premium B2B success-story landing page for Xovera. One conversion: an established, revenue-producing business completes a qualification form. Fewer high-fit leads over more low-quality submissions.

Live brand tokens, logo, Geist typography, button language, and component conventions are taken from [xovera.io](https://www.xovera.io/) and [xovera.io/ai-for-gyms](https://www.xovera.io/ai-for-gyms).

## Local run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run typecheck
npm run build
```

## Vercel

- Framework: Next.js 16 (App Router)
- Root directory: repository root
- Install: `npm install`
- Build: `npm run build`
- Output: default Next.js
- Set environment variables from `.env.example` in the Vercel project
- Required in production: `GHL_INBOUND_WEBHOOK_URL`
- Required for qualified-lead calendar: `NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL`
- Required for Meta CAPI dedupe: `META_CAPI_ACCESS_TOKEN`

## Form endpoint

`POST /api/leads` — see [docs/FORM-CONTRACT.md](docs/FORM-CONTRACT.md).

Routes:

- **qualified** — calendar embed (if configured)
- **review** — manual senior review, no calendar
- **disqualified** — light nurture path, no calendar

## Analytics

Event map: [docs/ANALYTICS.md](docs/ANALYTICS.md). Raw PII is never sent as analytics event parameters. Meta CAPI hashes email/phone for matching only.

## Client assets still required

- Doug testimonial video (`NEXT_PUBLIC_TESTIMONIAL_VIDEO_URL`)
- Optional Doug poster still (page currently uses an official NPI facility photo)
- Client-approved verbatim transcript
- Exact video duration
- GHL calendar embed + inbound webhook

Photography on the page is from official Newtown Performance Institute / Newtown Athletic Club public sites. No stock gym imagery and no invented quotes.

## QA

See [docs/QA.md](docs/QA.md).
