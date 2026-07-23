import { Resend } from "resend";

import { sanitizeText } from "@/lib/sanitize";
import type { StripeAdminNotification } from "@/lib/stripe/admin-notifications";
import { getSiteBaseUrl } from "@/lib/stripe/client";
import { findPlan, formatYen } from "@/lib/stripe/plans";

const DEFAULT_FROM = "地球防衛群 <info@earth-savers.org>";
const REPLY_TO = "info@earth-savers.org";

function formatOccurredAt(date: Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Tokyo",
  }).format(date);
}

export async function sendStripeDonorThankYou(
  notification: StripeAdminNotification,
): Promise<void> {
  if (
    notification.action !== "completed" ||
    !notification.email ||
    !notification.planCode
  ) {
    return;
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.info("[stripe/donor-thank-you] skipped: RESEND_API_KEY is not set");
    return;
  }

  try {
    const plan = findPlan(notification.planCode);
    if (!plan) {
      console.error("[stripe/donor-thank-you] skipped: plan could not be resolved");
      return;
    }

    const to = notification.email.trim().toLowerCase();
    const name = notification.name ? sanitizeText(notification.name) : "";
    const from = process.env.RESEND_FROM?.trim() || DEFAULT_FROM;
    const manageUrl = new URL("/join/manage", getSiteBaseUrl()).toString();
    const greeting = name ? `${name} 様` : "ご支援者様";

    const body = [
      greeting,
      "",
      "このたびは、一般財団法人 地球防衛群の活動にご支援いただき、誠にありがとうございます。",
      "毎月の継続寄付のお申し込みを受け付けました。",
      "",
      `寄付プラン: ${plan.name}`,
      `毎月の寄付額: ${formatYen(plan.amountMonthly)}`,
      `お申し込み日時: ${formatOccurredAt(notification.occurredAt)}`,
      "",
      "寄付内容の確認・変更・停止は、以下のページから行えます。",
      manageUrl,
      "",
      "このメールは寄付受付のご案内であり、寄付金受領証明書などの税務上の証明書ではありません。",
      "",
      "一般財団法人 地球防衛群",
      "https://earth-savers.org",
    ].join("\n");

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send(
      {
        from,
        to,
        replyTo: REPLY_TO,
        subject: "【地球防衛群】毎月の寄付を受け付けました",
        text: body,
      },
      {
        idempotencyKey: `stripe-donor-thank-you-${notification.stripeEventId}`,
      },
    );

    if (error) {
      console.error(
        "[stripe/donor-thank-you] Resend error:",
        JSON.stringify(error, null, 2),
      );
      return;
    }

    if (data?.id) {
      console.info("[stripe/donor-thank-you] sent", data.id);
    }
  } catch (err) {
    console.error("[stripe/donor-thank-you] send failed", err);
  }
}
