import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export function getStripePublishableKey(): string | null {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim();
  return key || null;
}

export function getStripeCustomerPortalLoginUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL?.trim();
  return url || null;
}

export function getSiteBaseUrl(): string {
  const fromEnv = process.env.SITE_URL?.trim()?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  const nextPublic = process.env.NEXT_PUBLIC_SITE_URL?.trim()?.replace(/\/$/, "");
  if (nextPublic) return nextPublic;
  return "http://localhost:3000";
}
