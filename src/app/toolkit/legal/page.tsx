import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ToolkitPageBody } from "@/components/ToolkitPageBody";
import { getToolkitSectionByHref } from "@/lib/toolkit-manifest";
import { ORGANIZATION_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `法律ガイド | ${ORGANIZATION_NAME}`,
  description:
    "条例制定にあたって確認すべき上位法との関係、都道府県条例との調整手順、条例の適法性を支持した判例の要点をまとめています。",
  alternates: { canonical: "/toolkit/legal" },
  openGraph: {
    title: "法律ガイド | ひな形・資料",
    description: "上位法・県条例・判例の整理資料です。",
    url: "/toolkit/legal",
  },
};

export default function ToolkitLegalHubPage() {
  const section = getToolkitSectionByHref("/toolkit/legal");

  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "資料室", path: "/toolkit" },
          { name: "ひな形・資料", path: "/toolkit" },
          { name: "法律ガイド", path: "/toolkit/legal" },
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
