import type { Metadata } from "next";

import { HomeContent } from "../page";

/**
 * フォント先読みの効果を比較するための一時ルート（先読み **なし**）。
 * 対になる perf-ab-on の説明を参照。**検証が終わったら両方削除する。**
 */
export const metadata: Metadata = {
  title: "計測用・先読みなし",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};

export default function PerfAbOff() {
  return <HomeContent />;
}
