import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * プロセス内メモリのみ。サーバーレス（Vercel 等）ではインスタンスごとに独立したカウンタになり、
 * 厳密なグローバル制限には Redis 等が必要。
 * UPSTASH_REDIS_REST_URL/TOKEN があれば Upstash Redis を使用し、
 * なければ従来のインメモリ方式でベストエフォートの制限を行う。
 */

// Upstash Redis クライアントの初期化（環境変数がある場合のみ）
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Upstash Ratelimit インスタンス（Redis がある場合）
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '60 s'), // ウェブサイト用（例: お問い合わせは1分間に5回まで）
      analytics: true,
    })
  : null;

// 従来のインメモリバケット（Redis がない場合のフォールバック）
const buckets = new Map<string, number[]>();

/**
 * 指定したキーに対してレート制限をチェックする。
 * @param key 制限の識別子（例: "contact:ip_address"）
 * @param max 指定期間内の最大リクエスト数（Redis 使用時は現在は無視され Ratelimit インスタンスのデフォルトが優先される可能性あり）
 * @param windowMs 期間（ミリ秒）
 * @returns 許可される場合は true
 */
export async function rateLimitAllow(
  key: string,
  max: number,
  windowMs: number,
): Promise<boolean> {
  // 1. Upstash Redis が利用可能な場合
  if (ratelimit) {
    try {
      const result = await ratelimit.limit(key);
      return result.success;
    } catch (e) {
      console.error('Rate limit error (Upstash):', e);
    }
  }

  // 2. インメモリフォールバック（または Redis がない場合）
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
