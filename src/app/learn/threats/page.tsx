import type { Metadata } from "next";
import Link from "next/link";

import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ResourceLead } from "@/components/ResourceLead";

export const metadata: Metadata = {
  title: "環境脅威のサマリ",
  description:
    "水源地・里山・生態系に関わりやすいリスク区分（大規模設備開発、土地利用の転換、外部資本の取得など）を要約します。",
  alternates: { canonical: "/learn/threats" },
  openGraph: {
    title: "環境脅威のサマリ | 学ぶ",
    url: "/learn/threats",
    description: "代表的な環境リスク区分の概要です。",
  },
};

const threats = [
  {
    tit: "大規模施設開発と周辺生態系",
    desc: "景観変化や土砂流出、取水・浸透への影響など、開発スケールに応じた論点があるものとして整理します（個別評価はエビデンス依存）。",
  },
  {
    tit: "切り捨て林や里山の荒廃",
    desc: "公益的機能（治水・炭素貯蓄・絶滅危惧種の生息環境など）との関係を、現場視点でも踏まえた概説です。",
  },
  {
    tit: "土地・水源取得と外部資本",
    desc: "サイト表記に合わせ、取得リスクの説明では「外部資本」で統一します。「外国資本」「外資」といった語は用いません。長期の土地利用権のようなパッケージ取引への注意も要約します。",
  },
  {
    tit: "気候変動と二次災害",
    desc: "豪雨増加など、長期変化が現場のリスク評価にどう効くか、政策提言と役割分担しながら要約していきます。",
  },
] as const;

export default function ThreatsPage() {
  return (
    <div className="bg-ivory">
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "学ぶ", path: "/learn" },
              { name: "環境脅威のサマリ", path: "/learn/threats" },
            ]}
          />
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            環境脅威のサマリ
          </h1>
          <ResourceLead>
            ここでの目的は断定ではなく、「なぜ現場が不安を抱きやすいか」の輪郭を共有することです。
            <Link href="/policy" className="text-aqua-dark underline underline-offset-2">
              政策提言
            </Link>
            側での立場表明と役割分担します。
          </ResourceLead>
          <ul className="space-y-6">
            {threats.map((t) => (
              <li key={t.tit}>
                <h2 className="font-serif text-lg font-semibold text-text-primary">{t.tit}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{t.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
