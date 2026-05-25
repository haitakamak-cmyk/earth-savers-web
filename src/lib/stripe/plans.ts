import { z } from "zod";

/** Web 寄付サブスク（auth 不要・6プラン） */
export const SUBSCRIPTION_PLANS = [
  {
    code: "tane",
    name: "種の友",
    amountMonthly: 1_000,
    description: "継続支援の入口。活動の土台を支えるプラン",
    icon: "🌱",
    envKey: "STRIPE_PRICE_TANE",
  },
  {
    code: "midori",
    name: "緑の友",
    amountMonthly: 5_000,
    description: "森づくり・地域活動を継続的に支えるプラン",
    icon: "🌿",
    envKey: "STRIPE_PRICE_MIDORI",
  },
  {
    code: "mizu",
    name: "水の守人",
    amountMonthly: 10_000,
    description: "水源地・水脈の保全を支えるプラン",
    icon: "💧",
    envKey: "STRIPE_PRICE_MIZU",
  },
  {
    code: "mori",
    name: "森の番人",
    amountMonthly: 30_000,
    description: "里山・森林再生を支えるアンバサダープラン",
    icon: "🌳",
    envKey: "STRIPE_PRICE_MORI",
  },
  {
    code: "yama",
    name: "山の守護者",
    amountMonthly: 50_000,
    description: "山岳・流域全体の保全に寄与するプラン",
    icon: "⛰️",
    envKey: "STRIPE_PRICE_YAMA",
  },
  {
    code: "nana",
    name: "七世代の大使",
    amountMonthly: 100_000,
    description: "七世代にわたる再生を支える最高位プラン",
    icon: "🌍",
    envKey: "STRIPE_PRICE_NANA",
  },
] as const;

export type PlanCode = (typeof SUBSCRIPTION_PLANS)[number]["code"];

export const planCodeSchema = z.enum(
  SUBSCRIPTION_PLANS.map((p) => p.code) as [PlanCode, ...PlanCode[]],
);

export type MembershipStatus =
  | "active"
  | "past_due"
  | "canceled"
  | "incomplete";

export function findPlan(code: PlanCode) {
  return SUBSCRIPTION_PLANS.find((p) => p.code === code) ?? null;
}

export function getPriceIdForPlan(code: PlanCode): string | null {
  const plan = findPlan(code);
  if (!plan) return null;
  const value = process.env[plan.envKey]?.trim();
  if (!value || !value.startsWith("price_")) return null;
  return value;
}

export function planCodeFromPriceId(priceId: string): PlanCode | null {
  for (const plan of SUBSCRIPTION_PLANS) {
    const envPrice = process.env[plan.envKey]?.trim();
    if (envPrice === priceId) return plan.code;
  }
  return null;
}

export function mapStripeSubscriptionStatus(
  stripeStatus: string,
): MembershipStatus {
  switch (stripeStatus) {
    case "active":
    case "trialing":
      return "active";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
      return "canceled";
    case "incomplete":
    case "incomplete_expired":
    case "paused":
      return "incomplete";
    default:
      return "incomplete";
  }
}

export function formatYen(amount: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
    maximumFractionDigits: 0,
  }).format(amount);
}
