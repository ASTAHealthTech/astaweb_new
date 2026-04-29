/**
 * In-memory, IP-based sliding-window rate limiter.
 *
 * Suitable for single-instance deployments (Vercel serverless, standalone Node).
 * Swap the Map for Redis if you scale to multiple instances.
 */

type RateLimitEntry = {
  /** Number of requests made in the current window. */
  count: number;
  /** Epoch ms when the window resets. */
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

/** Interval (ms) between automatic stale-entry sweeps. */
const CLEANUP_INTERVAL_MS = 60_000;

// Periodic cleanup to prevent unbounded memory growth.
let cleanupScheduled = false;
function scheduleCleanup() {
  if (cleanupScheduled) return;
  cleanupScheduled = true;
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now >= entry.resetAt) store.delete(key);
    }
  }, CLEANUP_INTERVAL_MS).unref?.();
}

/**
 * Check (and consume) a rate-limit token for the given key.
 *
 * @param key       Unique identifier — typically the client IP address.
 * @param limit     Maximum requests allowed in each window.
 * @param windowMs  Window duration in milliseconds.
 *
 * @returns An object with:
 *  - `success`   — `true` if the request is within limits.
 *  - `remaining` — how many tokens are left (≥ 0).
 *  - `resetIn`   — milliseconds until the window resets.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { success: boolean; remaining: number; resetIn: number } {
  scheduleCleanup();

  const now = Date.now();
  const entry = store.get(key);

  // First request or window has expired → start a fresh window.
  if (!entry || now >= entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, resetIn: windowMs };
  }

  // Window is still open.
  entry.count += 1;
  const resetIn = Math.max(0, entry.resetAt - now);

  if (entry.count > limit) {
    return { success: false, remaining: 0, resetIn };
  }

  return { success: true, remaining: limit - entry.count, resetIn };
}
