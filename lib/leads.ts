export async function forwardLead(payload: Record<string, unknown>) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL || "https://45.76.11.42.sslip.io/lead";
  const webhookSecret =
    process.env.LEAD_WEBHOOK_SECRET || "iyyvoaCX9M1vkI-FMO9SgBSBIwHJoHqb4QfKvmGBEjs";

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
