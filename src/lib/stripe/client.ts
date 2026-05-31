import Stripe from "stripe";

/** Dashboard 確認済みアカウント default（2026-05-25）。2026-04-22.dahlia へは未アップグレード。 */
export const STRIPE_API_VERSION = "2026-03-25.dahlia" as const;

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  if (!stripeClient) {
    // stripe@22 の型は 2026-04-22.dahlia 前提。実行時はアカウント default (2026-03-25.dahlia) に固定。
    const config = {
      apiVersion: STRIPE_API_VERSION,
    } as unknown as NonNullable<ConstructorParameters<typeof Stripe>[1]>;
    stripeClient = new Stripe(key, config);
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

function normalizeSiteUrl(raw: string): string {
  return raw.trim().replace(/\/$/, "");
}

function siteUrlFromVercelProductionHost(raw: string): string {
  const host = normalizeSiteUrl(raw);
  if (host.startsWith("http://") || host.startsWith("https://")) {
    return host;
  }
  return `https://${host}`;
}

export function getSiteBaseUrl(): string {
  const fromEnv = process.env.SITE_URL?.trim();
  if (fromEnv) return normalizeSiteUrl(fromEnv);

  const nextPublic = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (nextPublic) return normalizeSiteUrl(nextPublic);

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) {
    return siteUrlFromVercelProductionHost(vercelProduction);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SITE_URL, NEXT_PUBLIC_SITE_URL, or VERCEL_PROJECT_PRODUCTION_URL must be configured in production",
    );
  }

  return "http://localhost:3000";
}
