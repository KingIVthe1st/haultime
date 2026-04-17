export async function forwardLead(payload: Record<string, unknown>) {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  const webhookSecret = process.env.LEAD_WEBHOOK_SECRET;

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
