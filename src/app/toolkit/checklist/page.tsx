import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ToolkitPageBody } from "@/components/ToolkitPageBody";

export const metadata: Metadata = {
  title: "実務チェックリスト",
  description:
    "開発案件の見極め、パブコメ、住民説明など、現場で使える確認項目リストを順次載せる予定のページです。",
  alternates: { canonical: "/toolkit/checklist" },
  openGraph: {
    title: "実務チェックリスト | ひな形・資料",
    description: "水源・里山に関わる案件の論点確認に使えるチェックリストです。",
    url: "/toolkit/checklist",
  },
};

export default function ToolkitChecklistPage() {
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
          <ToolkitPageBody
            subdir="checklist"
            lead={
              <>
                メガソーラー・宅地開発・水道水源などテーマごとに、「誰が・いつ・何を確認するか」を箇条書きにした実務リストを置く計画です。地域の法令・ガイドラインとあわせてご利用ください。
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}
