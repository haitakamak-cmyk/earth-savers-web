import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ToolkitPageBody } from "@/components/ToolkitPageBody";

export const metadata: Metadata = {
  title: "導入・訴訟事例",
  description:
    "国内外の水源地保全・開発規制に関わる事例の要約・整理を順次載せる予定のページです（中立的トーンでの紹介に留めます）。",
  alternates: { canonical: "/toolkit/case-studies" },
  openGraph: {
    title: "導入・訴訟事例 | ツールキット",
    description: "水源保全や開発規制に関する事例整理です。",
    url: "/toolkit/case-studies",
  },
};

export default function ToolkitCaseStudiesPage() {
  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "ツールキット", path: "/toolkit" },
          { name: "導入・訴訟事例", path: "/toolkit/case-studies" },
        ]}
      />
      <div className="border-b border-wakakusa/20 bg-ivory-warm/40 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            導入・訴訟事例
          </h1>
          <ToolkitPageBody
            subdir="case-studies"
            lead={
              <>
                判決文・行政の取扱い・技術導入の経緯などを、事実関係と論点に分けて紹介する形を想定しています。特定の立場への賛否を煽る文言は避け、学習用の資料として整えます。
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
