import type { ErrorEvent, EventHint } from "@sentry/nextjs";

const SENSITIVE_KEY =
  /email|password|token|secret|authorization|cookie|stripe|customer|session|phone|name|address/i;

function scrubValue(value: unknown): unknown {
  if (typeof value === "string") {
    if (value.includes("@")) return "[Filtered Email]";
    if (/^(sk|pk|rk|whsec)_/i.test(value)) return "[Filtered Stripe Key]";
    if (/^eyJ/.test(value)) return "[Filtered JWT]";
    return value.length > 256 ? `${value.slice(0, 64)}…[truncated]` : value;
  }
  if (Array.isArray(value)) {
    return value.map(scrubValue);
  }
  if (value && typeof value === "object") {
    return scrubObject(value as Record<string, unknown>);
  }
  return value;
}

function scrubObject(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (SENSITIVE_KEY.test(key)) {
      out[key] = "[Filtered]";
      continue;
    }
    out[key] = scrubValue(value);
  }
  return out;
}

export function sentryBeforeSend(
  event: ErrorEvent,
  _hint: EventHint,
): ErrorEvent | null {
  if (event.request) {
    const headers = event.request.headers;
    if (headers && typeof headers === "object") {
      event.request.headers = scrubObject(
        headers as Record<string, unknown>,
      ) as typeof headers;
    }
    if (event.request.data) {
      event.request.data = scrubValue(event.request.data);
    }
    if (event.request.query_string) {
      event.request.query_string = "[Filtered Query]";
    }
  }

  if (event.user) {
    event.user = { id: event.user.id ? "[Filtered User]" : undefined };
  }

  if (event.extra) {
    event.extra = scrubObject(event.extra as Record<string, unknown>);
  }

  if (event.contexts) {
    event.contexts = scrubObject(
      event.contexts as Record<string, unknown>,
    ) as ErrorEvent["contexts"];
  }

  return event;
}
