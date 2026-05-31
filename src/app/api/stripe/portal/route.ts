import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { rateLimitAllow } from "@/lib/rate-limit";
import { validateRequestOrigin } from "@/lib/security";
import { getStripeCustomerPortalLoginUrl } from "@/lib/stripe/client";

const bodySchema = z.object({
  email: z.string().trim().email("正しいメールアドレスを入力してください"),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
  if (!(await rateLimitAllow(`stripe-portal:${ip}`, 3, 60 * 60 * 1000))) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。しばらくしてから再度お試しください。" },
      { status: 429 },
    );
  }

  if (!(await validateRequestOrigin())) {
    return NextResponse.json({ error: "不正なリクエスト元です" }, { status: 403 });
  }

  const portalUrl = getStripeCustomerPortalLoginUrl();
  if (!portalUrl) {
    return NextResponse.json(
      { error: "寄付内容の確認・変更機能は現在準備中です" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "不正なリクエストです" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "入力内容に誤りがあります" },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  let url: URL;
  try {
    url = new URL(portalUrl);
  } catch {
    return NextResponse.json(
      { error: "寄付内容の確認・変更機能の設定に誤りがあります" },
      { status: 500 },
    );
  }
  url.searchParams.set("prefilled_email", email);

  return NextResponse.json({ url: url.toString() });
}
