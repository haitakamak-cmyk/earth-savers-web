import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ToolkitPageBody } from "@/components/ToolkitPageBody";
import { getToolkitSectionByHref } from "@/lib/toolkit-manifest";

export const metadata: Metadata = {
  title: "実務チェックリスト",
  description:
    "条例を現場で運用するために整備すべき窓口フロー、届出受理チェックリスト、案件管理台帳、年次カレンダー、エスカレーション基準表、窓口FAQの設計仕様をまとめたガイドです。",
  alternates: { canonical: "/toolkit/checklist" },
  openGraph: {
    title: "実務チェックリスト | ひな形・資料",
    description:
      "条例運用に必要な窓口フロー、チェックリスト、台帳、FAQ等の設計仕様です。",
    url: "/toolkit/checklist",
  },
};

export default function ToolkitChecklistPage() {
  const section = getToolkitSectionByHref("/toolkit/checklist");

  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "ひな形・資料", path: "/toolkit" },
          { name: "実務チェックリスト", path: "/toolkit/checklist" },
        ]}
      />
      <div className="border-b border-wakakusa/20 bg-ivory-warm/40 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            実務チェックリスト
          </h1>
          <ToolkitPageBody section={section} />
        </div>
      </div>
    </div>
  );
}
