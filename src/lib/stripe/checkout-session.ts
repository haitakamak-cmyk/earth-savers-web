import type Stripe from "stripe";

import { getStripe } from "@/lib/stripe/client";
import {
  findPlan,
  getPriceIdForPlan,
  planCodeFromPriceId,
  planCodeSchema,
  type PlanCode,
} from "@/lib/stripe/plans";

export type VerifiedSubscribeCheckout = {
  planCode: PlanCode;
  planName: string;
  amountMonthly: number;
  planIcon: string;
};

function lineItemPriceId(item: Stripe.LineItem | undefined): string | null {
  const price = item?.price;
  if (!price) return null;
  if (typeof price === "string") return price;
  return price.id ?? null;
}

export async function verifySubscribeCheckoutSession(
  sessionId: string | undefined,
): Promise<VerifiedSubscribeCheckout | null> {
  if (!sessionId?.startsWith("cs_")) return null;
  if (!process.env.STRIPE_SECRET_KEY?.trim()) return null;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price"],
    });

    if (session.mode !== "subscription") return null;
    if (session.status !== "complete") return null;

    const metadataPlan = session.metadata?.plan_code;
    const parsedPlanCode = planCodeSchema.safeParse(metadataPlan);
    if (!parsedPlanCode.success) return null;

    const planCode = parsedPlanCode.data;
    const plan = findPlan(planCode);
    if (!plan) return null;

    const linePriceId = lineItemPriceId(session.line_items?.data[0]);
    if (!linePriceId) return null;

    const expectedPriceId = getPriceIdForPlan(planCode);
    if (!expectedPriceId || linePriceId !== expectedPriceId) return null;

    const pricePlanCode = planCodeFromPriceId(linePriceId);
    if (pricePlanCode !== planCode) return null;

    return {
      planCode,
      planName: plan.name,
      amountMonthly: plan.amountMonthly,
      planIcon: plan.icon,
    };
  } catch {
    return null;
  }
}
