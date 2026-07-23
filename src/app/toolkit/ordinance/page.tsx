import { readFile } from "fs/promises";

import type { Metadata } from "next";
import Link from "next/link";

import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { ResourceLead } from "@/components/ResourceLead";
import { TopicToc } from "@/components/TopicToc";
import { ToolkitFooterBackNav } from "@/components/ToolkitFooterBackNav";
import { extractMarkdownHeadingToc } from "@/lib/markdown-toc";
import {
  ORDINANCE_SUPPLEMENTS_SECTION_INTRO,
  ORDINANCE_SUPPLEMENTS_SECTION_TITLE,
} from "@/lib/ordinance-supplements-data";
import { OrdinanceSupplementsCardGrid } from "@/components/OrdinanceSupplementsCardGrid";
import {
  ORDINANCE_MARKDOWN_FILENAME,
  ORDINANCE_MARKDOWN_PATH,
} from "./md-path";

export const metadata: Metadata = {
  title: "条例ひな型（v2.1）",
  description:
    "市町村向けひな形「命の水と森を守る条例」の全文 Markdown（条文・逐条解説・別表・経過措置）。施行規則骨子案・導入ガイド・議会問答・パブコメ回答の補助資料への導線付きです。",
  alternates: { canonical: "/toolkit/ordinance" },
  openGraph: {
    title: "条例ひな型（v2.1）| ひな形・資料",
    description:
      "全74条構成（本則62条・附則12条）のひな形全文と補助資料。採用前に法務・議会での協議が必要です。",
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

  const toc = extractMarkdownHeadingToc(markdown);
  const downloadHref = `/toolkit/ordinance/${encodeURIComponent(ORDINANCE_MARKDOWN_FILENAME)}`;

  return (
    <div className="bg-ivory pb-16">
      <div className="border-b border-wakakusa/20 bg-ivory-warm/40 py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "ひな形・資料", path: "/toolkit" },
              { name: "条例ひな型", path: "/toolkit/ordinance" },
            ]}
          />
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            条例ひな型
          </h1>
          <p className="mt-1 text-sm font-medium text-aqua-dark">
            v2.1（2026年7月改訂）｜参入・運転・承継・出口の四段階規制と既設施設対応
          </p>
          <ResourceLead>
            「命の水と森を守る条例」の市町村向けひな形です。本資料は完成条例ではなく、自治体での検討用ひな型です。採用に際しては、必ず法務担当・顧問弁護士・議会と協議してください。
          </ResourceLead>
          <nav
            aria-label="この資料を読む"
            className="mb-4 rounded-xl border border-aqua/30 bg-aqua-light/20 px-5 py-4"
          >
            <p className="text-sm font-semibold text-text-primary">この資料を読む</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              <li>
                <Link
                  href="/toolkit/ordinance/plain-guide"
                  className="flex h-full flex-col rounded-lg border border-aqua/40 bg-white px-3.5 py-3 text-sm hover:border-aqua hover:bg-ivory"
                >
                  <span className="font-semibold text-aqua-dark">はじめての方・一般向け解説</span>
                  <span className="mt-1 text-xs leading-relaxed text-text-secondary">誤解Q&A・読み方ガイド付き</span>
                </Link>
              </li>
              <li>
                <a
                  href="#3分でわかる命の水と森を守る条例"
                  className="flex h-full flex-col rounded-lg border border-aqua/40 bg-white px-3.5 py-3 text-sm hover:border-aqua hover:bg-ivory"
                >
                  <span className="font-semibold text-aqua-dark">条例本文・逐条解説へ進む</span>
                  <span className="mt-1 text-xs leading-relaxed text-text-secondary">3分サマリー→本則→附則の順</span>
                </a>
              </li>
              <li>
                <a
                  href="#更新履歴"
                  className="flex h-full flex-col rounded-lg border border-aqua/40 bg-white px-3.5 py-3 text-sm hover:border-aqua hover:bg-ivory"
                >
                  <span className="font-semibold text-aqua-dark">更新履歴を見る</span>
                  <span className="mt-1 text-xs leading-relaxed text-text-secondary">v2.1／v1.2／v1.1</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-white px-4 py-4 text-sm shadow-sm">
            <a
              href={downloadHref}
              download={ORDINANCE_MARKDOWN_FILENAME}
              className="inline-flex items-center rounded-lg bg-wakakusa px-4 py-2.5 font-semibold text-white hover:bg-wakakusa-dark"
            >
              Markdown をダウンロード
            </a>
            <Link href="/toolkit" className="text-aqua-dark underline underline-offset-2">
              ← ひな形・資料一覧
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <a
          href="#ordinance-doc-main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-wakakusa focus:px-3 focus:py-2 focus:text-white"
        >
          本文へスキップ
        </a>
        <div id="ordinance-doc-main" className="lg:flex lg:gap-10">
          <TopicToc items={toc} />
          <div className="min-w-0 flex-1">
            <MarkdownArticle markdown={markdown} narrowProse />
          </div>
        </div>
      </div>

      <section
        aria-labelledby="ordinance-supplements-heading"
        className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6"
      >
        <div className="rounded-2xl border border-wakakusa/25 bg-wakakusa-light/20 px-4 py-8 sm:px-8">
          <h2
            id="ordinance-supplements-heading"
            className="font-serif text-2xl font-bold text-text-primary"
          >
            {ORDINANCE_SUPPLEMENTS_SECTION_TITLE}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
            {ORDINANCE_SUPPLEMENTS_SECTION_INTRO}
          </p>
          <p className="mt-2 text-sm text-text-muted">
            <Link
              href="/toolkit/supplements"
              className="font-medium text-aqua-dark underline underline-offset-2"
            >
              補助資料の一覧ページ
            </Link>
            にも同じ5件への導線をまとめています。
          </p>
          <div className="mt-8">
            <OrdinanceSupplementsCardGrid />
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-3xl border-t border-border pt-10">
          <ContentDisclaimer ordinanceDraftFinalizeNote />
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            ※ 本ひな型は無償で公開しています。ご利用にあたって寄付や対価は必要ありません。
          </p>
          <ToolkitFooterBackNav
            href="/toolkit"
            label="← ひな形・資料一覧へ戻る"
            navAriaLabel="ひな形・資料一覧へ戻る"
          />
        </div>
      </section>
    </div>
  );
}
