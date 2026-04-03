import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * デフォルトは Resend 検証用（ドメイン認証不要）。本番で自ドメインから送るときは
 * 環境変数 RESEND_FROM に認証済みアドレスを必ず設定すること。
 */
const DEFAULT_FROM =
  "地球防衛群 お問い合わせ <onboarding@resend.dev>";
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

  const { name, email, category, message } = body as Record<string, unknown>;

  const nameStr = typeof name === "string" ? name.trim() : "";
  const emailStr = typeof email === "string" ? email.trim() : "";
  const messageStr = typeof message === "string" ? message.trim() : "";
  const categoryStr = typeof category === "string" ? category.trim() : "";

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

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: emailStr,
    subject: `【お問い合わせ】${categoryLabel} - ${nameStr}様`,
    text: `お名前: ${nameStr}\nメール: ${emailStr}\n種別: ${categoryLabel}\n\n${messageStr}`,
  });

  if (error) {
    console.error("[contact] Resend error:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: userFacingResendError(error) },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
