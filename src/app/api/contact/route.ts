import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/** Resend でドメイン未認証のときは .env の RESEND_FROM に onboarding@resend.dev を指定 */
const DEFAULT_FROM =
  "地球防衛群 お問い合わせ <noreply@earth-savers.org>";
const DEFAULT_TO = "info@earth-savers.org";

const CATEGORY_LABELS: Record<string, string> = {
  activity: "活動について",
  donation: "寄付・支援について",
  volunteer: "ボランティアについて",
  media: "取材・メディアについて",
  other: "その他",
};

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
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "送信に失敗しました" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
