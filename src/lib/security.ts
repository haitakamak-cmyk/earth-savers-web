import { headers } from "next/headers";

/**
 * Validates that the request is coming from the same origin.
 * This is a basic CSRF protection for API routes that perform side effects.
 */
export async function validateRequestOrigin() {
  const headerList = await headers();
  const origin = headerList.get("origin");
  const referer = headerList.get("referer");
  const host = headerList.get("host");

  // In production, we should compare against the actual site URL.
  // In development, localhost is usually fine.
  const siteUrl = process.env.SITE_URL || (host ? `http://${host}` : "");

  if (!origin && !referer) {
    return false;
  }

  const requestOrigin = origin || (referer ? new URL(referer).origin : null);

  if (!requestOrigin) {
    return false;
  }

  // Basic check: starts with the same origin
  // Note: For more robust check, parse and compare the actual domain
  return requestOrigin.startsWith(siteUrl) || requestOrigin.includes("localhost") || requestOrigin.includes("127.0.0.1");
}
