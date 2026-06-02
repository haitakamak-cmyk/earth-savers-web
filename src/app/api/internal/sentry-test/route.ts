import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Vercel Preview / Production は NODE_ENV=production のため、
 * test route を有効にするには SENTRY_ENABLE_TEST_ROUTE=1 が必要。
 * ローカル dev のみ SENTRY_DSN があれば有効。
 */
function sentryTestEnabled(): boolean {
  if (process.env.NODE_ENV === "production") {
    return process.env.SENTRY_ENABLE_TEST_ROUTE === "1";
  }
  return Boolean(process.env.SENTRY_DSN?.trim());
}

export async function GET() {
  if (!sentryTestEnabled()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!process.env.SENTRY_DSN?.trim()) {
    return NextResponse.json(
      { error: "SENTRY_DSN is not configured" },
      { status: 500 },
    );
  }

  const testError = new Error("earth-savers-web sentry test event");
  Sentry.captureException(testError);
  await Sentry.flush(2000);

  return NextResponse.json({
    ok: true,
    message: "Test event sent to Sentry (if DSN is configured).",
  });
}
