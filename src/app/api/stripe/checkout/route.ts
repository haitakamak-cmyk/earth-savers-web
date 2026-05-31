import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { rateLimitAllow } from "@/lib/rate-limit";
import { validateRequestOrigin } from "@/lib/security";
import { sanitizeText } from "@/lib/sanitize";
import { getSiteBaseUrl, getStripe } from "@/lib/stripe/client";
import {
  findPlan,
  getPriceIdForPlan,
  planCodeSchema,
} from "@/lib/stripe/plans";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

const bodySchema = z.object({
  plan_code: planCodeSchema,
  email: z.string().trim().email("正しいメールアドレスを入力してください"),
  name: z.string().trim().max(80).optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
  if (!(await rateLimitAllow(`stripe-checkout:${ip}`, 10, 60 * 1000))) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。しばらくしてから再度お試しください。" },
      { status: 429 },
    );
  }

  if (!(await validateRequestOrigin())) {
    return NextResponse.json({ error: "不正なリクエスト元です" }, { status: 403 });
  }

  if (!process.env.STRIPE_SECRET_KEY?.trim()) {
    return NextResponse.json(
      { error: "決済機能は現在準備中です" },
      { status: 503 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "サーバー設定が未完了です（Supabase）" },
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

  const { plan_code: planCode, email, name: rawName } = parsed.data;
  const plan = findPlan(planCode);
  if (!plan) {
    return NextResponse.json({ error: "不明なプランです" }, { status: 400 });
  }

  const priceId = getPriceIdForPlan(planCode);
  if (!priceId) {
    return NextResponse.json(
      { error: "このプランは現在お申し込みできません（設定待ち）" },
      { status: 503 },
    );
  }

  const name = rawName ? sanitizeText(rawName) : undefined;
  const siteUrl = getSiteBaseUrl();
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    submit_type: "donate",
    locale: "ja",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    success_url: `${siteUrl}/join/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/join/subscribe/cancel`,
    metadata: {
      plan_code: planCode,
      ...(name ? { donor_name: name } : {}),
    },
    subscription_data: {
      metadata: {
        plan_code: planCode,
        ...(name ? { donor_name: name } : {}),
      },
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "決済ページを作成できませんでした" },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: session.url });
}
