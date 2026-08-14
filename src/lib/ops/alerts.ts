import * as Sentry from "@sentry/nextjs";
import { Resend } from "resend";

const DEFAULT_FROM = "地球防衛群 <info@earth-savers.org>";
const DEFAULT_TO = "info@earth-savers.org";

/**
 * 同一インスタンス内での連投を抑える窓。
 * Stripe のリトライは新しい Lambda に当たることもあるため完全な重複排除にはならない。
 * 障害中は「静かになる」より「多少うるさい」ほうを優先する方針。
 */
const THROTTLE_MS = 10 * 60 * 1000;
const lastSentAt = new Map<string, number>();

function shouldSend(key: string): boolean {
  const now = Date.now();
  const previous = lastSentAt.get(key);
  if (previous && now - previous < THROTTLE_MS) return false;
  lastSentAt.set(key, now);
  return true;
}

export interface OpsAlert {
  /** 重複抑制のキー。障害の種類ごとに固定文字列を渡す。 */
  key: string;
  subject: string;
  lines: string[];
  error?: unknown;
}

/**
 * 運営宛の障害通知。決して throw しない（通知の失敗で本処理を壊さない）。
 * Sentry には常に送り、メールは throttle 窓の範囲で送る。
 */
export async function sendOpsAlert(alert: OpsAlert): Promise<void> {
  try {
    if (alert.error) {
      Sentry.captureException(alert.error, {
        tags: { ops_alert: alert.key },
      });
    } else {
      Sentry.captureMessage(alert.subject, {
        level: "error",
        tags: { ops_alert: alert.key },
      });
    }
  } catch (err) {
    console.error("[ops/alert] sentry capture failed", err);
  }

  if (!shouldSend(alert.key)) return;

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.info("[ops/alert] skipped: RESEND_API_KEY is not set");
    return;
  }

  const to =
    process.env.OPS_ALERT_TO_EMAIL?.trim() ||
    process.env.STRIPE_NOTIFICATION_TO_EMAIL?.trim() ||
    process.env.CONTACT_TO_EMAIL?.trim() ||
    DEFAULT_TO;
  const from = process.env.RESEND_FROM?.trim() || DEFAULT_FROM;

  const body = [
    ...alert.lines,
    "",
    `発生日時: ${new Date().toISOString()}`,
    `環境: ${process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown"}`,
    alert.error ? `エラー: ${errorText(alert.error)}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `【地球防衛群・障害】${alert.subject}`,
      text: body,
    });
    if (error) {
      console.error("[ops/alert] Resend error:", JSON.stringify(error, null, 2));
    }
  } catch (err) {
    console.error("[ops/alert] send failed", err);
  }
}

function errorText(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  return String(error);
}
