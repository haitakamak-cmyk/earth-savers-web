import { NextRequest, NextResponse } from "next/server";

import { sendOpsAlert } from "@/lib/ops/alerts";
import { createServiceSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Supabase 無料プランは 7 日間アクセスが無いとプロジェクトを自動停止する。
 * 停止すると Stripe Webhook が全て 500 になり、寄付が取りこぼされる
 * （2026-08-10 〜 08-13 に実際に発生。21 件の配信失敗・寄付 1 件が未記録）。
 *
 * この cron は 1 日 1 回 DB を軽く読み、アイドル判定に到達させないためのもの。
 * 併せて「DB に到達できるか」の死活監視も兼ねる。
 */
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  // Vercel Cron は CRON_SECRET 設定時に Authorization: Bearer <secret> を付与する。
  if (!secret) {
    // 未設定時は Vercel Cron からの呼び出しのみ許可（ローカル dev では常に許可）。
    if (process.env.NODE_ENV !== "production") return true;
    return request.headers.get("x-vercel-cron") !== null;
  }
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!isSupabaseConfigured()) {
    await sendOpsAlert({
      key: "cron-keepalive-misconfigured",
      subject: "DB keepalive: Supabase の環境変数が未設定",
      lines: [
        "NEXT_PUBLIC_SUPABASE_URL または SUPABASE_SERVICE_ROLE_KEY が設定されていません。",
        "この状態では Stripe Webhook も全て 500 になります。",
      ],
    });
    return NextResponse.json({ error: "Misconfigured" }, { status: 500 });
  }

  try {
    const supabase = createServiceSupabase();
    const { count, error } = await supabase
      .from("stripe_events")
      .select("event_id", { count: "exact", head: true });

    if (error) {
      throw new Error(`stripe_events probe failed: ${error.message}`);
    }

    return NextResponse.json({ ok: true, stripeEvents: count ?? null });
  } catch (err) {
    await sendOpsAlert({
      key: "cron-keepalive-unreachable",
      subject: "DB keepalive: Supabase に接続できません",
      lines: [
        "定期の疎通確認が失敗しました。Supabase プロジェクトが停止している可能性があります。",
        "https://supabase.com/dashboard/project/xtjidhyuprqpfhqdkgdk",
        "",
        "復旧しないと Stripe Webhook が 500 を返し続け、寄付が記録されません。",
      ],
      error: err,
    });
    console.error("[cron/keepalive]", err);
    return NextResponse.json({ error: "Probe failed" }, { status: 500 });
  }
}
