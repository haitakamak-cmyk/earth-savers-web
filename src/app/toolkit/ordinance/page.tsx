import { readFile } from "fs/promises";

import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { ResourceLead } from "@/components/ResourceLead";

import {
  ORDINANCE_MARKDOWN_FILENAME,
  ORDINANCE_MARKDOWN_PATH,
} from "./md-path";

export const metadata: Metadata = {
  title: "条例テンプレ（暫定 v0）",
  description:
    "「命の水と森を守る条例」テンプレート案（全文39条相当・地下水・水源の保全、投機・悪質事業者向け「9重の障壁」を含む）。たたき台として自治体での議論にお使いいただく前提です。",
  alternates: { canonical: "/toolkit/ordinance" },
  openGraph: {
    title: "条例テンプレ（暫定 v0）| ツールキット",
    description:
      "水源・地下水・開発規制の条例たたき台（Markdown）。専門家・議会との調整前提でご利用ください。",
    url: "/toolkit/ordinance",
  },
};

export default async function ToolkitOrdinancePage() {
  let markdown = "";
  try {
    markdown = await readFile(ORDINANCE_MARKDOWN_PATH, "utf-8");
  } catch {
    markdown =
      "> 条例 Markdown を読み込めませんでした。`public/toolkit/ordinance/` にファイルが配置されているか確認してください。\n";
  }

  const downloadHref = `/toolkit/ordinance/${encodeURIComponent(ORDINANCE_MARKDOWN_FILENAME)}`;

  return (
    <div className="bg-ivory pb-16">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "ツールキット", path: "/toolkit" },
          { name: "条例テンプレ", path: "/toolkit/ordinance" },
        ]}
      />
      <div className="border-b border-wakakusa/20 bg-ivory-warm/40 py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-wakakusa-dark">
            Resource / Toolkit · Ordinance template
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            条例テンプレ
          </h1>
          <p className="mt-1 text-sm font-medium text-aqua-dark">暫定 v0｜条文39条構成（地下水・9重の障壁を反映）</p>
          <ResourceLead>
            「命の水と森を守る条例」のたたき台です。条文・逐条解説・別表案・末尾の活用ガイドまで1本の Markdown で公開しています。採用に際しては法務担当・議会と必ず協議してください。サイト表記ポリシーのとおり
            <strong>外部資本</strong>
            で統一されています。
          </ResourceLead>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-white px-4 py-4 text-sm shadow-sm">
            <a
              href={downloadHref}
              download={ORDINANCE_MARKDOWN_FILENAME}
              className="inline-flex items-center rounded-lg bg-wakakusa px-4 py-2.5 font-semibold text-white hover:bg-wakakusa-dark"
            >
              Markdown をダウンロード
            </a>
            <Link href="/toolkit" className="text-aqua-dark underline underline-offset-2">
              ← ツールキット一覧
            </Link>
          </div>
          <MarkdownArticle markdown={markdown} className="mt-12" />
        </div>
      </div>
    </div>
  );
}
