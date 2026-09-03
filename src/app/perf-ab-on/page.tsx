import type { Metadata } from "next";

import { HomeContent } from "../page";
import { preloadCriticalFonts } from "@/lib/font-preload";

/**
 * フォント先読み（g0 の3本・約160KB）の効果を PageSpeed Insights で比較するための
 * 一時ルート（先読み **あり**）。**検証が終わったら perf-ab-off ごと削除する。**
 *
 * 本番の `/` と直接比べず専用ルートを2つ置くのは、PSI が URL 単位でしか測れないため。
 * 両方とも静的プリレンダリングで、中身はトップページと同一（HomeContent）。
 * 違いは先読みリンク3本の有無だけなので、そこだけを変数にできる。
 *
 *   あり: https://earth-savers.org/perf-ab-on
 *   なし: https://earth-savers.org/perf-ab-off
 */
export const metadata: Metadata = {
  title: "計測用・先読みあり",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function PerfAbOn() {
  preloadCriticalFonts();
  return <HomeContent />;
}
