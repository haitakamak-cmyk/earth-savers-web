import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

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

  const testError = new Error("earth-savers-web sentry test event");
  Sentry.captureException(testError);

  return NextResponse.json({
    ok: true,
    message: "Test event sent to Sentry (if DSN is configured).",
  });
}
