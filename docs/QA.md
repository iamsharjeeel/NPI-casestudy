# QA checklist

## Content integrity

- [ ] No Xovera AI / kiosk / payments / sign-on displays claimed as live for Newtown
- [ ] MMA stage copy is exactly “Converted to Member”
- [ ] 1,885 / 707 / &lt; 3 months labeled as snapshot / client-reported
- [ ] No revenue or cohort conversion rates
- [ ] No invented Doug quotes
- [ ] Birthday visible-stage note (219) is present
- [ ] Adult Fitness clipped-stage note is present

## Conversion

- [ ] Single primary CTA language: Request a Growth Systems Review
- [ ] Form button: Start the 2-minute fit check
- [ ] Sticky CTA only after Doug section, mobile only
- [ ] Qualified sees calendar (or honest fallback)
- [ ] Review / low-fit never see a calendar
- [ ] Honeypot does not create a CRM record
- [ ] Disposable email or sub-8s submit triggers challenge
- [ ] Invalid phone / URL show field errors and preserve other answers

## Accessibility / motion

- [ ] Keyboard through header, video, form, transcript
- [ ] Focus rings visible
- [ ] `prefers-reduced-motion` stops conic animation and hover scale
- [ ] Video has no autoplay audio
- [ ] Transcript drawer is a button with expanded state

## Analytics

- [ ] `case_view` on load
- [ ] Proof click → `proof_interaction`
- [ ] Form start / step / submit events fire without email/phone in payload
- [ ] `event_id` shared with Meta CAPI when token is set

## Visual

- [ ] Desktop: large type, negative space, dark Xovera tokens
- [ ] Mobile order: hero → proof → video → story → proof grid → qualification
- [ ] Images AVIF/WebP via `next/image` formats
- [ ] Logo is live `/brand/xovera-color.svg`

## Build

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
