export const ANALYTICS_EVENTS = [
  "case_view",
  "testimonial_play",
  "testimonial_25",
  "testimonial_50",
  "testimonial_75",
  "testimonial_complete",
  "proof_interaction",
  "form_start",
  "form_step_1",
  "form_step_2",
  "form_submit",
  "lead_qualified",
  "lead_review",
  "lead_disqualified",
  "calendar_view",
  "meeting_booked",
  "downstream_customer",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsParams = {
  page_version?: string;
  source_page?: string;
  step?: number;
  route?: "qualified" | "review" | "disqualified";
  program?: string;
  location?: string;
  event_id?: string;
};

export const FORBIDDEN_PII_KEYS = [
  "email",
  "phone",
  "name",
  "first_name",
  "last_name",
  "full_name",
  "work_email",
  "website",
  "business_name",
  "user_data",
] as const;
