/**
 * Tiny in-memory token bucket per key (IP or composite). Good enough for
 * a low-volume lead form to make scripted abuse expensive without adding
 * Redis or a third-party dep. Resets per container restart, which is the
 * intended trade-off — we just want to slow down obvious abuse, not
 * survive a determined attacker.
 *
 * Usage:
 *   const allowed = take({ key: ip, max: 5, windowMs: 60_000 });
 *   if (!allowed) return 429;
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function take({
  key,
  max,
  windowMs,
}: {
  key: string;
  max: number;
  windowMs: number;
}): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= max) return false;
  bucket.count += 1;
  return true;
}

/**
 * Extract a best-effort client IP from a Next.js Request. Falls back
 * progressively: x-forwarded-for (first value) → x-real-ip → "unknown".
 * Trust the upstream proxy (Traefik in our setup) to set these.
 */
export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}
