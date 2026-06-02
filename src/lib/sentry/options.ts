import * as Sentry from "@sentry/nextjs";

import { sentryBeforeSend } from "./pii-scrub";

type SentryInitOptions = NonNullable<Parameters<typeof Sentry.init>[0]>;

export function getSentryOptions(): SentryInitOptions {
  const dsn = process.env.SENTRY_DSN?.trim();
  const enabled = Boolean(dsn);

  return {
    dsn,
    enabled,
    environment:
      process.env.SENTRY_ENVIRONMENT?.trim() ??
      process.env.VERCEL_ENV ??
      process.env.NODE_ENV,
    release: process.env.SENTRY_RELEASE?.trim() ?? process.env.VERCEL_GIT_COMMIT_SHA,
    tracesSampleRate:
      process.env.NODE_ENV === "production"
        ? Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0.1")
        : 1,
    beforeSend: sentryBeforeSend,
    sendDefaultPii: false,
  };
}
