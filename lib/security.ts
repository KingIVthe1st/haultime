const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function takeRateLimit(key: string, limit = 12, windowMs = 60_000) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return { allowed: true, remaining: limit - current.count };
}

const suspiciousPatterns = [
  /ignore previous instructions/i,
  /reveal (your|the) prompt/i,
  /system prompt/i,
  /developer message/i,
  /act as/i,
  /bypass/i,
  /jailbreak/i,
  /tool/i,
  /shell/i,
  /api key/i,
  /password/i,
  /secrets?/i,
  /configuration/i,
];

export function detectPromptInjection(text: string) {
  return suspiciousPatterns.some((pattern) => pattern.test(text));
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
