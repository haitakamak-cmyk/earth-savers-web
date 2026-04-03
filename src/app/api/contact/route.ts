import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_URL } from "@/lib/site";

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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "メール送信が設定されていません" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const { name, email, category, message, intent } = body as Record<
    string,
    unknown
  >;

  const nameStr = typeof name === "string" ? name.trim() : "";
  const emailStr = typeof email === "string" ? email.trim() : "";
  const messageStr = typeof message === "string" ? message.trim() : "";
  const categoryStr = typeof category === "string" ? category.trim() : "";
  const intentStr = typeof intent === "string" ? intent.trim() : "";

  if (!nameStr || !emailStr || !messageStr) {
    return NextResponse.json(
      { error: "必須項目が未入力です" },
      { status: 400 }
    );
  }

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
      { status: 500 }
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
    `この度は公益財団法人 地球防衛群へ、都度寄付（銀行振込・郵便振替）のお申し出をいただき、ありがとうございます。
以下の口座へお振込みください。`;

  const bankFooter =
    process.env.BANK_DONATION_REPLY_FOOTER?.trim() ||
    `※ 振込名義は、できるだけご登録のお名前と同一でお願いいたします。
※ 寄付金受領証明書が必要な場合は、お振込後に事務局までご連絡ください。

---
ご不明な点は、本メールにそのままご返信いただくか、
${to} までお問い合わせください。

一般財団法人 地球防衛群
岡山県津山市小田中1403
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

この度は一般財団法人 地球防衛群（earth savers foundation）へお問い合わせいただき、誠にありがとうございます。
以下の内容でお問い合わせを受け付けました。

【お問い合わせ種別】${categoryLabel}

担当より追ってご連絡いたしますので、恐れ入りますが今しばらくお待ちくださいませ。

---
※ご不明な点などがございましたら、本メールにそのままご返信いただくか、
${to} までお問い合わせください。

一般財団法人 地球防衛群
岡山県津山市小田中1403
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
