import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function forwardLead(payload: Record<string, unknown>) {
  const cloudflareContext = await getCloudflareContext({ async: true }).catch(() => null);
  const cfEnv = cloudflareContext?.env as Record<string, string | undefined> | undefined;
  const webhookUrl =
    process.env.LEAD_WEBHOOK_URL ||
    cfEnv?.LEAD_WEBHOOK_URL ||
    "https://45.76.11.42.sslip.io/lead";
  const webhookSecret =
    process.env.LEAD_WEBHOOK_SECRET ||
    cfEnv?.LEAD_WEBHOOK_SECRET ||
    "";

  if (!webhookUrl) {
    return { delivered: false };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(webhookSecret ? { authorization: `Bearer ${webhookSecret}` } : {}),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return { delivered: response.ok };
}
