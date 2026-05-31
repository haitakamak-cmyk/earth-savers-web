/**
 * Redis 有効時に checkout(10/分) と portal(3/時) が別 Ratelimit インスタンスになることを確認する。
 * 実行: npx tsx scripts/verify-ratelimit-separation.ts
 */
import {
  rateLimitAllow,
  ratelimitInstanceCacheKey,
} from "../src/lib/rate-limit";

async function main() {
  const checkoutKey = ratelimitInstanceCacheKey(10, 60 * 1000);
  const portalKey = ratelimitInstanceCacheKey(3, 60 * 60 * 1000);

  if (checkoutKey === portalKey) {
    console.error("FAIL: cache keys must differ for checkout vs portal");
    process.exit(1);
  }

  const ip = "verify-test-ip";
  const checkoutAllowed = await rateLimitAllow(`stripe-checkout:${ip}`, 10, 60 * 1000);
  const portalAllowed = await rateLimitAllow(`stripe-portal:${ip}`, 3, 60 * 60 * 1000);

  if (!checkoutAllowed || !portalAllowed) {
    console.error("FAIL: first requests should be allowed", {
      checkoutAllowed,
      portalAllowed,
    });
    process.exit(1);
  }

  console.log("OK: ratelimit cache keys separated", { checkoutKey, portalKey });
  console.log("OK: in-memory mode allows first checkout and portal requests");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
