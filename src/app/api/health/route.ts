import { NextResponse } from "next/server";

import { createServiceSupabase, isSupabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 公開ヘルスチェック。外部の監視サービス（UptimeRobot 等）から定期的に叩く前提。
 *
 * 目的は 2 つ:
 * 1. Supabase 無料プランの 7 日アイドル自動停止を防ぐ。停止すると Stripe Webhook が
 *    全件 500 になり寄付が記録されない（2026-08 に実発生）。
 *    Vercel Cron は Hobby プランでは実行保証が無く、実測で 72 時間 0 回だったため使わない。
 * 2. 「寄付が通る経路」そのものの死活監視。トップページの Uptime 監視は静的配信のため、
 *    DB が落ちていても 200 を返し続ける（同障害を 4 日間「正常」と報告した）。
 *
 * 認証は付けない（監視サービスにシークレットを預けないため）。
 * その代わり、返す情報は ok / error のみに限り、内部状態は一切出さない。
 */
export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "misconfigured" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const supabase = createServiceSupabase();
    const { error } = await supabase
      .from("stripe_events")
      .select("event_id", { count: "exact", head: true });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { ok: true },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    // 監視サービスが 5xx を検知して通知する。ここで自前の通知は出さない
    // （15 分おきに叩かれるため、障害中にメールが大量送信されるのを避ける）。
    console.error("[api/health] database unreachable", err);
    return NextResponse.json(
      { ok: false, error: "database_unreachable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
