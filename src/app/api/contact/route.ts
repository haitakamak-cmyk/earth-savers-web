import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  ORGANIZATION_ADDRESS_LINE,
  ORGANIZATION_NAME,
  SITE_URL,
} from "@/lib/site";
import { validateRequestOrigin } from "@/lib/security";
import { rateLimitAllow } from "@/lib/rate-limit";

import { sanitizeText } from "@/lib/sanitize";

/**
 * デフォルトは Resend 検証用（ドメイン認証不要）。本番で自ドメインから送るときは
 * 環境変数 RESEND_FROM に認証済みアドレスを必ず設定すること。
 */
const DEFAULT_FROM = "地球防衛群 <info@earth-savers.org>";
const DEFAULT_TO = "info@earth-savers.org";

const CATEGORY_LABELS: Record<string, string> = {
  activity: "活動について",
  donation: "寄付・支援について",
  volunteer: "ボランティアについて",
  media: "取材・メディアについて",
  other: "その他",
};

/** 入力バリデーション用の Zod スキーマ */
const contactSchema = z.object({
  name: z.string().trim().min(1, "お名前は必須です").max(50, "お名前が長すぎます"),
  email: z.string().trim().email("正しいメールアドレスの形式で入力してください"),
  category: z.string().trim().optional(),
  message: z.string().trim().min(1, "メッセージを入力してください").max(2000, "メッセージは2000文字以内で入力してください"),
  intent: z.string().trim().optional(),
});

/** Resend のエラーを利用者・運営が次に取るべき行動が分かる日本語に変換 */
function userFacingResendError(err: {
  message: string;
  name: string;
  statusCode: number | null;
}): string {
  const { name, message } = err;
  const m = message.toLowerCase();

  switch (name) {
    case "invalid_from_address":
      return "送信元メール（RESEND_FROM）が Resend で使えません。ドメイン認証が済んでいるアドレスにするか、検証用の onboarding@resend.dev を .env の RESEND_FROM に指定してください。";
    case "daily_quota_exceeded":
    case "monthly_quota_exceeded":
      return "送信上限に達しています。しばらく時間をおいてから再度お試しください。";
    case "rate_limit_exceeded":
      return "送信が集中しています。数分後に再度お試しください。";
    case "invalid_api_key":
    case "missing_api_key":
    case "restricted_api_key":
      return "メール送信の API キーが無効です。環境変数 RESEND_API_KEY を確認してください。";
    default:
      break;
  }

  if (
    m.includes("only send testing") ||
    m.includes("your own email address")
  ) {
    return "Resend のテストモードでは、受信先（CONTACT_TO_EMAIL）を Resend に登録した自分のメールアドレスにしてください。本番で info@ 等へ届けるには resend.com/domains でドメイン認証が必要です。";
  }

  if (m.includes("domain") && (m.includes("verif") || m.includes("認証"))) {
    return "送信元ドメインが Resend で未認証です。.env の RESEND_FROM を Resend ダッシュボードの案内どおり onboarding@resend.dev 等に変更するか、earth-savers.org をドメイン認証してください。";
  }

  if (name === "validation_error" && message.length > 0 && message.length < 200) {
    return `送信サービスからエラーが返りました: ${message}`;
  }

  return "送信に失敗しました。しばらくおいてから再度お試しください。";
}

export async function POST(req: NextRequest) {
  // 1. レート制限 (IP単位または固定キー)
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
  if (!(await rateLimitAllow(`contact:${ip}`, 5, 60 * 1000))) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。しばらく時間をおいてから再度お試しください。" },
      { status: 429 },
    );
  }

  // 2. セキュリティチェック（送信元検証）
  const isValidOrigin = await validateRequestOrigin();
  if (!isValidOrigin) {
    console.error("[contact] Potential CSRF or unauthorized cross-origin request");
    return NextResponse.json(
      { error: "不正なリクエスト元です" },
      { status: 403 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "メール送信が設定されていません" },
      { status: 503 },
    );
  }

  // 2. 入力バリデーション
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message || "入力内容に誤りがあります" },
      { status: 400 },
    );
  }

  const {
    name: rawName,
    email: emailStr,
    category,
    message: rawMessage,
    intent,
  } = result.data;

  // セキュリティ 30 条 第 27 条: 全入力をサニタイズ
  const nameStr = sanitizeText(rawName);
  const messageStr = sanitizeText(rawMessage);

  const categoryStr = category || "";
  const intentStr = intent || "";


  const categoryLabel =
    categoryStr && CATEGORY_LABELS[categoryStr]
      ? CATEGORY_LABELS[categoryStr]
      : categoryStr || "その他";

  const to = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO;
  const from = process.env.RESEND_FROM?.trim() || DEFAULT_FROM;

  const resend = new Resend(apiKey);

  const staffBody = `お名前: ${nameStr}\nメール: ${emailStr}\n種別: ${categoryLabel}\n\n${messageStr}`;

  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: emailStr,
    subject: `【お問い合わせ】${categoryLabel} - ${nameStr}様`,
    text: staffBody,
  });

  if (error) {
    console.error("[contact] Resend error:", JSON.stringify(error, null, 2));
    console.error("[contact] from used:", from);
    return NextResponse.json(
      { error: userFacingResendError(error) },
      { status: 500 },
    );
  }

  if (data?.id) {
    console.info("[contact] Resend accepted staff email id:", data.id, "to:", to);
  }

  const isBankDonationFlow =
    intentStr === "bank-donation" && categoryStr === "donation";

  const bankDetails = process.env.BANK_TRANSFER_DETAILS?.trim();
  const bankSubject =
    process.env.BANK_DONATION_REPLY_SUBJECT?.trim() ||
    "【地球防衛群】都度寄付（銀行振込・郵便振替）のご案内";

  const bankIntro =
    process.env.BANK_DONATION_REPLY_INTRO?.trim() ||
    `この度は${ORGANIZATION_NAME}へ、都度寄付（銀行振込・郵便振替）のお申し出をいただき、ありがとうございます。
以下の口座へお振込みください。`;

  const bankFooter =
    process.env.BANK_DONATION_REPLY_FOOTER?.trim() ||
    `※ 振込名義は、できるだけご登録のお名前と同一でお願いいたします。

---
ご不明な点は、本メールにそのままご返信いただくか、
${to} までお問い合わせください。

${ORGANIZATION_NAME}
${ORGANIZATION_ADDRESS_LINE}
${SITE_URL}`;

  let applicantSubject: string;
  let applicantBody: string;

  if (isBankDonationFlow && bankDetails) {
    applicantSubject = bankSubject;
    applicantBody = `${nameStr} 様

${bankIntro}

【振込先】
${bankDetails}

${bankFooter}
`;
  } else {
    if (isBankDonationFlow && !bankDetails) {
      console.warn(
        "[contact] bank-donation だが BANK_TRANSFER_DETAILS 未設定。一般の受付メールを送ります。",
      );
    }
    applicantSubject = "【地球防衛群】お問い合わせを受け付けました";
    applicantBody = `${nameStr} 様

この度は${ORGANIZATION_NAME}（earth savers foundation）へお問い合わせいただき、誠にありがとうございます。
以下の内容でお問い合わせを受け付けました。

【お問い合わせ種別】${categoryLabel}

担当より追ってご連絡いたしますので、恐れ入りますが今しばらくお待ちくださいませ。

---
※ご不明な点などがございましたら、本メールにそのままご返信いただくか、
${to} までお問い合わせください。

${ORGANIZATION_NAME}
${ORGANIZATION_ADDRESS_LINE}
${SITE_URL}
`;
  }

  const { error: autoReplyError } = await resend.emails.send({
    from,
    to: emailStr,
    replyTo: to,
    subject: applicantSubject,
    text: applicantBody,
  });

  if (autoReplyError) {
    console.error(
      "[contact] applicant auto-reply failed:",
      JSON.stringify(autoReplyError, null, 2),
    );
  } else {
    console.info(
      "[contact] applicant email sent to:",
      emailStr,
      isBankDonationFlow && bankDetails ? "(bank template)" : "(generic)",
    );
  }

  return NextResponse.json({ ok: true });
}
