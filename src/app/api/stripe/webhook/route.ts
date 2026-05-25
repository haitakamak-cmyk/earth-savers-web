import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";

import {
  updateMembershipByCustomerId,
  updateMembershipBySubscriptionId,
  upsertMembershipFromCheckout,
} from "@/lib/memberships/db";
import { getStripe } from "@/lib/stripe/client";
import {
  mapStripeSubscriptionStatus,
  planCodeFromPriceId,
  planCodeSchema,
  type PlanCode,
} from "@/lib/stripe/plans";
import { createServiceSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function subscriptionIdFromInvoice(invoice: Stripe.Invoice): string | null {
  const parent = invoice.parent;
  if (parent?.type === "subscription_details" && parent.subscription_details) {
    const sub = parent.subscription_details.subscription;
    if (typeof sub === "string") return sub;
    if (sub && typeof sub === "object" && "id" in sub) return sub.id;
  }
  const legacy = (
    invoice as Stripe.Invoice & {
      subscription?: string | Stripe.Subscription | null;
    }
  ).subscription;
  if (typeof legacy === "string") return legacy;
  if (legacy && typeof legacy === "object" && "id" in legacy) return legacy.id;
  return null;
}

function resolvePlanCode(
  metadataPlan: string | undefined,
  priceId: string | undefined,
): PlanCode | null {
  if (metadataPlan) {
    const parsed = planCodeSchema.safeParse(metadataPlan);
    if (parsed.success) return parsed.data;
  }
  if (priceId) {
    return planCodeFromPriceId(priceId);
  }
  return null;
}

function periodEndFromSubscription(sub: Stripe.Subscription): Date | null {
  const end = sub.items.data[0]?.current_period_end;
  if (!end) return null;
  return new Date(end * 1000);
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription") return;

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  if (!customerId || !subscriptionId) return;

  const email =
    session.customer_details?.email?.toLowerCase() ??
    session.customer_email?.toLowerCase();
  if (!email) return;

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = subscription.items.data[0]?.price.id;
  const planCode = resolvePlanCode(
    session.metadata?.plan_code ?? subscription.metadata?.plan_code,
    priceId,
  );
  if (!planCode) {
    throw new Error("plan_code could not be resolved");
  }

  const donorName =
    session.metadata?.donor_name ??
    subscription.metadata?.donor_name ??
    session.customer_details?.name ??
    null;

  const supabase = createServiceSupabase();
  await upsertMembershipFromCheckout({
    supabase,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    email,
    name: donorName,
    planCode,
    status: mapStripeSubscriptionStatus(subscription.status),
    currentPeriodEnd: periodEndFromSubscription(subscription),
  });
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const subscriptionId = subscription.id;
  const priceId = subscription.items.data[0]?.price.id;
  const planCode = resolvePlanCode(subscription.metadata?.plan_code, priceId);

  const supabase = createServiceSupabase();
  await updateMembershipBySubscriptionId({
    supabase,
    stripeSubscriptionId: subscriptionId,
    patch: {
      status: mapStripeSubscriptionStatus(subscription.status),
      ...(planCode ? { plan_code: planCode } : {}),
      current_period_end: periodEndFromSubscription(subscription)?.toISOString() ?? null,
    },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const supabase = createServiceSupabase();
  await updateMembershipBySubscriptionId({
    supabase,
    stripeSubscriptionId: subscription.id,
    patch: { status: "canceled" },
  });
}

async function handleCustomerUpdated(customer: Stripe.Customer) {
  const customerId = customer.id;
  const email = customer.email?.toLowerCase() ?? null;
  const name = customer.name ?? null;
  if (!email && !name) return;

  const supabase = createServiceSupabase();
  await updateMembershipByCustomerId({
    supabase,
    stripeCustomerId: customerId,
    patch: {
      ...(email ? { email } : {}),
      ...(name ? { name } : {}),
    },
  });
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subId = subscriptionIdFromInvoice(invoice);
  if (!subId) return;

  const supabase = createServiceSupabase();
  await updateMembershipBySubscriptionId({
    supabase,
    stripeSubscriptionId: subId,
    patch: { status: "past_due" },
  });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subId = subscriptionIdFromInvoice(invoice);
  if (!subId) return;

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subId);
  const priceId = subscription.items.data[0]?.price.id;
  const planCode = resolvePlanCode(subscription.metadata?.plan_code, priceId);

  const supabase = createServiceSupabase();
  await updateMembershipBySubscriptionId({
    supabase,
    stripeSubscriptionId: subId,
    patch: {
      status: mapStripeSubscriptionStatus(subscription.status),
      ...(planCode ? { plan_code: planCode } : {}),
      current_period_end: periodEndFromSubscription(subscription)?.toISOString() ?? null,
    },
  });
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) {
    return NextResponse.json({ error: "Misconfigured" }, { status: 500 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Misconfigured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "customer.updated":
        await handleCustomerUpdated(event.data.object as Stripe.Customer);
        break;
      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("[stripe/webhook]", event.type, err);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
