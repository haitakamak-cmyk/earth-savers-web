import Link from "next/link";
import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { ResourceLead } from "@/components/ResourceLead";
import { getToolkitSectionByHref } from "@/lib/toolkit-manifest";
import { readToolkitPublicMarkdown } from "@/lib/toolkit-public-md";
import { ORGANIZATION_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `実務チェックリスト | ${ORGANIZATION_NAME}`,
  description:
    "条例を現場で運用するために整備すべき窓口フロー、届出受理チェックリスト、案件管理台帳、年次カレンダー、エスカレーション基準表、窓口FAQの設計仕様をまとめたガイドです。",
  alternates: { canonical: "/toolkit/operations" },
  openGraph: {
    title: "実務チェックリスト | ひな形・資料",
    description:
      "条例運用に必要な窓口フロー、チェックリスト、台帳、FAQ等の設計仕様です。",
    url: "/toolkit/operations",
  },
};

export default async function ToolkitOperationsPage() {
  const section = getToolkitSectionByHref("/toolkit/operations");
  const published = section.files.find((f) => f.status === "published");
  if (!published) {
    return (
      <div className="bg-ivory px-4 py-12 sm:px-6">
        <p className="mx-auto max-w-3xl text-text-secondary">
          公開中の Markdown が manifest にありません。`src/lib/toolkit-manifest.ts` を確認してください。
        </p>
      </div>
    );
  }

  const markdown = await readToolkitPublicMarkdown(section.subdir, published.filename);
  const downloadHref = `/toolkit/operations/${encodeURIComponent(published.filename)}`;

  return (
    <div className="bg-ivory pb-16">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "資料室", path: "/toolkit" },
          { name: "ひな形・資料", path: "/toolkit" },
          { name: section.label, path: "/toolkit/operations" },
        ]}
      />
      <div className="border-b border-wakakusa/20 bg-ivory-warm/40 py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-xs font-medium tracking-wide text-wakakusa-dark">
            資料室 / ひな形・資料 / {section.label}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {section.label}
          </h1>
          <ResourceLead>{section.description}</ResourceLead>
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-white px-4 py-4 text-sm shadow-sm">
            <a
              href={downloadHref}
              download={published.filename}
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
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <ContentDisclaimer />
      </div>
    </div>
  );
}
