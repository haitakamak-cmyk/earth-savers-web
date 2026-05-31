import { Resend } from "resend";

import { findPlan, formatYen, type PlanCode } from "@/lib/stripe/plans";

const DEFAULT_FROM = "地球防衛群 <info@earth-savers.org>";
const DEFAULT_TO = "info@earth-savers.org";

export type StripeAdminNotificationAction =
  | "completed"
  | "changed"
  | "canceled";

export interface StripeAdminNotification {
  action: StripeAdminNotificationAction;
  email: string | null;
  name: string | null;
  planCode: PlanCode | null;
  status: string | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripeEventId: string;
  stripeEventType: string;
  occurredAt: Date;
}

function actionLabel(action: StripeAdminNotificationAction): string {
  switch (action) {
    case "completed":
      return "寄付完了";
    case "changed":
      return "寄付内容変更";
    case "canceled":
      return "寄付停止";
  }
}

export async function sendStripeAdminNotification(
  notification: StripeAdminNotification,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.info("[stripe/admin-notification] skipped: RESEND_API_KEY is not set");
    return;
  }

  const to =
    process.env.STRIPE_NOTIFICATION_TO_EMAIL?.trim() ||
    process.env.CONTACT_TO_EMAIL?.trim() ||
    DEFAULT_TO;
  const from = process.env.RESEND_FROM?.trim() || DEFAULT_FROM;

  const plan = notification.planCode ? findPlan(notification.planCode) : null;
  const planLine = plan
    ? `${plan.name}（${formatYen(plan.amountMonthly)} / 月）`
    : "未取得";
  const label = actionLabel(notification.action);

  const body = [
    `種別: ${label}`,
    `発生日時: ${notification.occurredAt.toISOString()}`,
    "",
    `お名前: ${notification.name || "未入力"}`,
    `メールアドレス: ${notification.email || "未取得"}`,
    `プラン: ${planLine}`,
    `ステータス: ${notification.status || "未取得"}`,
    "",
    `Stripe customer: ${notification.stripeCustomerId || "未取得"}`,
    `Stripe subscription: ${notification.stripeSubscriptionId || "未取得"}`,
    `Stripe event: ${notification.stripeEventId}`,
    `Webhook type: ${notification.stripeEventType}`,
  ].join("\n");

  const resend = new Resend(apiKey);
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: `【地球防衛群】${label}の控え`,
      text: body,
    });

    if (error) {
      console.error(
        "[stripe/admin-notification] Resend error:",
        JSON.stringify(error, null, 2),
      );
      return;
    }

    if (data?.id) {
      console.info("[stripe/admin-notification] sent", data.id, "to:", to);
    }
  } catch (err) {
    console.error("[stripe/admin-notification] send failed", err);
  }
}
