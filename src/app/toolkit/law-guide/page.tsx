import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ToolkitPageBody } from "@/components/ToolkitPageBody";
import { getToolkitSectionByHref } from "@/lib/toolkit-manifest";

export const metadata: Metadata = {
  title: "法律ガイド",
  description:
    "条例制定にあたって確認すべき上位法との関係、都道府県条例との調整手順、条例の適法性を支持した判例の要点をまとめています。",
  alternates: { canonical: "/toolkit/law-guide" },
  openGraph: {
    title: "法律ガイド | ひな形・資料",
    description:
      "上位法との関係、県条例との調整、条例適法性の判例要点を整理します。",
    url: "/toolkit/law-guide",
  },
};

export default function ToolkitLawGuidePage() {
  const section = getToolkitSectionByHref("/toolkit/law-guide");

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
          <ToolkitPageBody section={section} />
        </div>
      </div>
    </div>
  );
}
