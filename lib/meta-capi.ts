import { createHash } from "crypto";
import { ANALYTICS_IDS } from "@/lib/site";

function sha256(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function sendMetaCapi(input: {
  eventName: string;
  eventId: string;
  eventTime: number;
  sourceUrl: string;
  email?: string;
  phone?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}) {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const pixelId = process.env.META_PIXEL_ID || ANALYTICS_IDS.metaPixel;
  if (!token || !pixelId) return;

  const user_data: Record<string, unknown> = {};
  if (input.email) user_data.em = [sha256(input.email)];
  if (input.phone) user_data.ph = [sha256(input.phone.replace(/\D/g, ""))];
  if (input.clientIp) user_data.client_ip_address = input.clientIp;
  if (input.userAgent) user_data.client_user_agent = input.userAgent;
  if (input.fbp) user_data.fbp = input.fbp;
  if (input.fbc) user_data.fbc = input.fbc;

  await fetch(
    `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: input.eventName,
            event_time: input.eventTime,
            event_id: input.eventId,
            event_source_url: input.sourceUrl,
            action_source: "website",
            user_data,
            custom_data: {
              content_name: "newtown-success-story",
              content_category: "qualification",
            },
          },
        ],
      }),
    },
  ).catch((error) => {
    console.error("[meta-capi]", error);
  });
}
