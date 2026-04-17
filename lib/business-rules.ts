const restrictedItemPatterns = [
  /paint/i,
  /asbestos/i,
  /chemical/i,
  /biohazard/i,
  /medical waste/i,
  /fuel/i,
  /propane/i,
  /oil drum/i,
  /hazmat/i,
  /needles?/i,
  /ammunition/i,
  /explosive/i,
];

export function mentionsRestrictedItems(text: string) {
  return restrictedItemPatterns.some((pattern) => pattern.test(text));
}

export function classifyLeadIntent(input: {
  timeline?: string;
  details?: string;
  serviceType?: string;
}) {
  let score = 0;
  const text = `${input.timeline || ""} ${input.details || ""} ${input.serviceType || ""}`.toLowerCase();

  if (/today|asap|urgent|right away|same day/.test(text)) score += 3;
  if (/quote|estimate|pricing|price|cost/.test(text)) score += 2;
  if (/office|estate|property|cleanout|eviction/.test(text)) score += 2;
  if (/full truck|multiple rooms|garage|basement/.test(text)) score += 1;

  if (score >= 5) return { score, tier: "hot" as const };
  if (score >= 3) return { score, tier: "warm" as const };
  return { score, tier: "standard" as const };
}
