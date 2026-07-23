import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * プロセス内メモリのみ。サーバーレス（Vercel 等）ではインスタンスごとに独立したカウンタになり、
 * 厳密なグローバル制限には Redis 等が必要。
 * UPSTASH_REDIS_REST_URL/TOKEN があれば Upstash Redis を使用し、
 * なければ従来のインメモリ方式でベストエフォートの制限を行う。
 */

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
        retry: { retries: 0 },
        signal: () => AbortSignal.timeout(2_000),
      })
    : null;

const ratelimitCache = new Map<string, Ratelimit>();

function windowMsToDuration(windowMs: number): `${number} s` {
  const seconds = Math.max(1, Math.ceil(windowMs / 1000));
  return `${seconds} s`;
}

function getRatelimit(max: number, windowMs: number): Ratelimit | null {
  if (!redis) return null;

  const cacheKey = ratelimitInstanceCacheKey(max, windowMs);
  const cached = ratelimitCache.get(cacheKey);
  if (cached) return cached;

  const instance = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(max, windowMsToDuration(windowMs)),
    analytics: true,
  });
  ratelimitCache.set(cacheKey, instance);
  return instance;
}

const buckets = new Map<string, number[]>();

/** Redis モードで max/windowMs ごとに別インスタンスを使うためのキャッシュキー */
export function ratelimitInstanceCacheKey(max: number, windowMs: number): string {
  return `${max}:${windowMs}`;
}

/**
 * 指定したキーに対してレート制限をチェックする。
 * @param key 制限の識別子（例: "contact:ip_address"）
 * @param max 指定期間内の最大リクエスト数
 * @param windowMs 期間（ミリ秒）
 * @returns 許可される場合は true
 */
export async function rateLimitAllow(
  key: string,
  max: number,
  windowMs: number,
): Promise<boolean> {
  const ratelimit = getRatelimit(max, windowMs);
  if (ratelimit) {
    try {
      const result = await ratelimit.limit(key);
      return result.success;
    } catch (e) {
      console.error("Rate limit error (Upstash):", e);
    }
  }

  const now = Date.now();
  const stamps = buckets.get(key) ?? [];
  const pruned = stamps.filter((t) => now - t < windowMs);
  if (pruned.length >= max) {
    buckets.set(key, pruned);
    return false;
  }
  pruned.push(now);
  buckets.set(key, pruned);
  return true;
}
