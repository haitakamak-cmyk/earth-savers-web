import { readFile } from "fs/promises";

import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { ResourceLead } from "@/components/ResourceLead";
import {
  ORDINANCE_SUPPLEMENT_LIST_ORDER,
  ORDINANCE_SUPPLEMENTS,
} from "@/lib/ordinance-supplements-data";
import { ORGANIZATION_NAME } from "@/lib/site";

import {
  ORDINANCE_MARKDOWN_FILENAME,
  ORDINANCE_MARKDOWN_PATH,
} from "./md-path";

export const metadata: Metadata = {
  title: `条例ひな形（v2.1） | ${ORGANIZATION_NAME}`,
  description:
    "市町村向けひな形「命の水と森を守る条例」の全文 Markdown（条文・逐条解説・別表・経過措置）。施行規則骨子案・導入ガイド・議会問答・パブコメ回答の補助資料への導線付きです。",
  alternates: { canonical: "/toolkit/ordinance" },
  openGraph: {
    title: "条例ひな形（v2.1）| ひな形・資料",
    description:
      "全56条構成のひな形全文と補助資料。採用前に法務・議会での協議が必要です。",
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

  const supplementEntries = ORDINANCE_SUPPLEMENT_LIST_ORDER.map((slug) =>
    ORDINANCE_SUPPLEMENTS.find((e) => e.slug === slug),
  ).filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <div className="bg-ivory pb-16">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "資料室", path: "/toolkit" },
          { name: "ひな形・資料", path: "/toolkit" },
          { name: "条例ひな形", path: "/toolkit/ordinance" },
        ]}
      />
      <div className="border-b border-wakakusa/20 bg-ivory-warm/40 py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-xs font-medium tracking-wide text-wakakusa-dark">
            資料室 / ひな形・資料 / 条例ひな形
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            条例ひな形
          </h1>
          <p className="mt-1 text-sm font-medium text-aqua-dark">
            v2.1（2026年5月改訂）｜全56条構成（参入・運転・承継・出口の四段階規制と既設施設対応）
          </p>
          <ResourceLead>
            「命の水と森を守る条例」の市町村向けひな形です。条文・逐条解説・別表案・既設施設の経過措置・活用ガイドまでを1本のMarkdownで公開しています。本ページとあわせて、施行規則骨子案・自治体導入ガイド・議会想定問答集・パブコメ回答集の補助資料も公開しています。採用に際しては、必ず法務担当・顧問弁護士・議会と協議してください。
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
              ← ひな形・資料一覧
            </Link>
          </div>
          <MarkdownArticle markdown={markdown} className="mt-12" />
        </div>
      </div>

      <section
        aria-labelledby="ordinance-supplements-heading"
        className="mx-auto max-w-4xl px-4 pb-12 pt-10 sm:px-6"
      >
        <div className="rounded-2xl border border-wakakusa/25 bg-wakakusa-light/20 px-4 py-8 sm:px-8">
          <h2
            id="ordinance-supplements-heading"
            className="font-serif text-2xl font-bold text-text-primary"
          >
            条例導入を支える補助資料
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
            自治体が条例を導入・運用する各段階で活用できる4種の補助資料を提供します。いずれも参考資料であり、最終条文はご担当の法務・顧問弁護士レビューを前提としてください。
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {supplementEntries.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/toolkit/ordinance/${entry.slug}`}
                  className="flex h-full flex-col rounded-xl border border-border bg-white p-5 shadow-sm transition-colors hover:border-wakakusa/35 hover:bg-ivory"
                >
                  <span className="font-serif text-lg font-semibold text-text-primary">
                    {entry.title}
                  </span>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {entry.shortDescription}
                  </p>
                  <p className="mt-3 text-xs text-text-muted">
                    想定読者：{entry.audience.join("、")}
                  </p>
                  <span className="mt-4 text-sm font-semibold text-aqua-dark underline-offset-4 group-hover:underline">
                    読む →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto mt-12 max-w-3xl border-t border-border pt-10">
          <ContentDisclaimer ordinanceDraftFinalizeNote />
        </div>
      </section>
    </div>
  );
}
