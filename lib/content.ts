export const programs = [
  {
    id: "personal-training",
    name: "Personal Training",
    records: 785,
    stages: [
      { label: "New Member", count: 322 },
      { label: "Working Lead", count: 92 },
      { label: "Onboarding Booked", count: 17 },
      { label: "Onboarding Completed", count: 55 },
      { label: "Re-engagement", count: 287 },
    ],
    note: null as string | null,
  },
  {
    id: "mma",
    name: "MMA",
    records: 640,
    stages: [
      { label: "Trial Booked", count: 31 },
      { label: "Trial Completed/Post Trial Follow Up", count: 17 },
      { label: "Evaluation Booked", count: 15 },
      { label: "Converted to Member", count: 140 },
      { label: "Nurture", count: 358 },
    ],
    note: '140 records sit in a stage labeled "Converted to Member".',
  },
  {
    id: "birthday-parties",
    name: "Birthday Parties",
    records: 233,
    stages: [
      { label: "Party Booked", count: 22 },
      { label: "Waiver Submitted", count: 105 },
      { label: "Party Completed", count: 4 },
      { label: "Working Lead", count: 82 },
    ],
    note: "Visible stage headers account for 219 records.",
  },
  {
    id: "youth-performance",
    name: "Youth Performance",
    records: 138,
    stages: [
      { label: "Evaluation Booked", count: 52 },
      { label: "Signed Up", count: 5 },
      { label: "Re-engagement", count: 61 },
      { label: "Rework", count: 10 },
    ],
    note: null,
  },
  {
    id: "newtown-sports-center",
    name: "Newtown Sports Center",
    records: 59,
    stages: [
      { label: "New Lead", count: 20 },
      { label: "Working Lead", count: 18 },
      { label: "Working Event Lead", count: 1 },
      { label: "Closed", count: 20 },
    ],
    note: null,
  },
  {
    id: "adult-fitness",
    name: "Adult Fitness",
    records: 30,
    stages: [
      { label: "New Lead", count: 21 },
      { label: "Working Lead", count: 5 },
      { label: "Trial Booked", count: 3 },
    ],
    note: "One record sits in a clipped/off-screen stage.",
  },
] as const;

export const pipelineTotals = {
  recordsRepresented: 1885,
  nurtureReengagement: 707,
  nurtureBreakdown: {
    personalTraining: 287,
    mma: 358,
    youthPerformance: 61,
    birthdayParties: 1,
  },
  timeToVisibleResults: "< 3 months",
} as const;

export const operatingSteps = [
  {
    id: "acquire",
    label: "Acquire",
    copy: "Google + Meta campaigns bring demand into defined offers.",
  },
  {
    id: "route",
    label: "Route",
    copy: "Forms, source and program determine the correct pipeline and staff owner.",
  },
  {
    id: "work",
    label: "Work",
    copy: "Tasks and unified conversations keep the next action visible.",
  },
  {
    id: "book",
    label: "Book",
    copy: "Calendars and booking stages convert interest into a scheduled next step.",
  },
  {
    id: "nurture",
    label: "Nurture",
    copy: "Non-immediate buyers stay in an intentional follow-up path.",
  },
  {
    id: "reengage",
    label: "Re-engage",
    copy: "Old demand returns to a live queue instead of disappearing.",
  },
  {
    id: "measure",
    label: "Measure",
    copy: "Pipeline state is visible now; downstream revenue attribution is the next data layer.",
  },
] as const;

export const beforeAfter = [
  {
    before: "Lead ownership depends on memory and a scattered inbox.",
    after: "Owner, stage, task, and cadence are visible in one place.",
  },
  {
    before: "A generic process is asked to cover every program.",
    after: "Each program has its own sales path.",
  },
  {
    before: "The non-immediate buyer disappears.",
    after: "Nurture and re-engagement keep that demand in a live queue.",
  },
  {
    before: "Ads are judged by clicks and form fills.",
    after:
      "Handoff into bookings and pipeline is visible. Downstream revenue attribution is the next data layer.",
  },
  {
    before: "Staff have to interpret the CRM.",
    after: "Assignments, tasks, and unified history reduce ambiguity.",
  },
] as const;

export const icp = {
  employees: "5–50",
  revenue: "$1M–$20M",
  locations: "1–10",
  acv: "$500+",
} as const;

export const inScope = [
  "GoHighLevel as the growth operating layer",
  "Tailored pipelines",
  "Nurtures",
  "Staff assignment",
  "Timely tasks and follow-ups",
  "Bookings and calendars",
  "Unified conversations",
  "Google Ads",
  "Meta Ads",
] as const;

export const outOfScope = [
  "Xovera AI / AI receptionist",
  "Walk-in kiosk",
  "Payments",
  "Sign-on displays (discussed for future use only)",
] as const;

export const testimonial = {
  speaker: "Doug",
  title: "Director of Newtown Performance Institute",
  organization: "Newtown Athletic Club / Newtown Performance Institute",
  location: "Newtown, Pennsylvania",
  themes: [
    "Responsiveness",
    "Ease of use",
    "Fast changes",
    "Support",
    "Forms",
    "Sales-process structure",
  ],
} as const;

export const assetTodos = [
  {
    id: "doug-video",
    item: "Client-approved testimonial video file (MP4/WebM) for Doug.",
    env: "NEXT_PUBLIC_TESTIMONIAL_VIDEO_URL",
  },
  {
    id: "doug-poster",
    item: "Optional dedicated poster still of Doug. The page currently uses an official NPI facility photograph as the player poster.",
    env: "Replace public/images/testimonial-poster.*",
  },
  {
    id: "transcript",
    item: "Client-approved verbatim transcript. Themes are listed; no quotes have been invented.",
    env: "lib/content.ts testimonial transcript",
  },
  {
    id: "duration",
    item: "Exact video duration once the file is supplied.",
    env: "NEXT_PUBLIC_TESTIMONIAL_DURATION",
  },
  {
    id: "ghl-calendar",
    item: "GoHighLevel calendar embed URL for qualified leads.",
    env: "NEXT_PUBLIC_GHL_CALENDAR_EMBED_URL",
  },
  {
    id: "ghl-webhook",
    item: "GoHighLevel inbound webhook or CRM endpoint for qualified payloads.",
    env: "GHL_INBOUND_WEBHOOK_URL",
  },
  {
    id: "ga4",
    item: "GA4 measurement ID if this page should report into a property other than the live-site GTM container.",
    env: "NEXT_PUBLIC_GA4_MEASUREMENT_ID",
  },
  {
    id: "meta-capi",
    item: "Meta Conversion API access token for server-side deduped events.",
    env: "META_CAPI_ACCESS_TOKEN",
  },
] as const;
