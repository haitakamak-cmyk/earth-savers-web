import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ToolkitPageBody } from "@/components/ToolkitPageBody";

export const metadata: Metadata = {
  title: "法律ガイド",
  description:
    "河川法・森林法・都市計画など、水源保全に関係しやすい法令の読みどころを平易にまとめる予定のページです（法的助言ではありません）。",
  alternates: { canonical: "/toolkit/law-guide" },
  openGraph: {
    title: "法律ガイド | ひな形・資料",
    description: "水源保全に関係しやすい法令の読みどころを整理します。",
    url: "/toolkit/law-guide",
  },
};

export default function ToolkitLawGuidePage() {
  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "ひな形・資料", path: "/toolkit" },
          { name: "法律ガイド", path: "/toolkit/law-guide" },
        ]}
      />
      <div className="border-b border-wakakusa/20 bg-ivory-warm/40 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            法律ガイド
          </h1>
          <ToolkitPageBody
            subdir="law-guide"
            lead={
              <>
                関係法令の適用条文・手続の流れ・よくある誤読に触れる構成を想定しています。個別具体的な適用可否は法令と最新の運用によって変わり得るため、必要に応じて弁護士等の法的助言を受けてください。
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
