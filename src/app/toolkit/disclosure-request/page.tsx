import Link from "next/link";
import type { Metadata } from "next";

import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ResourceLead } from "@/components/ResourceLead";
import { ToolkitFooterBackNav } from "@/components/ToolkitFooterBackNav";
import { TopicToc } from "@/components/TopicToc";
import { extractMarkdownHeadingToc } from "@/lib/markdown-toc";
import { getToolkitSectionByHref } from "@/lib/toolkit-manifest";
import { readToolkitPublicMarkdown } from "@/lib/toolkit-public-md";

const PATH = "/toolkit/disclosure-request" as const;

export const metadata: Metadata = {
  title: "行政文書開示請求のはじめかた",
  description:
    "計画の中身を確かめ、議論の材料をそろえるために。開示請求の手順、請求書の書き方、資料の読み方、公表するときの注意までをまとめた実務ガイドです。",
  alternates: { canonical: PATH },
  openGraph: {
    title: "行政文書開示請求のはじめかた | ひな形・資料",
    description:
      "開示請求の手順から公表時の注意まで。特定の事業・個人を名指ししない、一般向け実務ガイドです。",
    url: PATH,
  },
};

export default async function ToolkitDisclosureRequestPage() {
  const section = getToolkitSectionByHref(PATH);
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
  const toc = extractMarkdownHeadingToc(markdown);
  // 静的ファイルは public/toolkit/disclosure/ 配下（ページURLの disclosure-request とは別）
  const downloadHref = `/toolkit/disclosure/${encodeURIComponent(published.filename)}`;

  return (
    <div className="bg-ivory pb-16">
      <div className="border-b border-wakakusa/20 bg-ivory-warm/40 py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "資料室", path: "/learn" },
              { name: "ひな形・資料", path: "/toolkit" },
              {
                name: "行政文書開示請求のはじめかた",
                path: PATH,
              },
            ]}
          />
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {published.title}
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
          <div id="disclosure-guide-main" className="mt-12 lg:flex lg:gap-10">
            <TopicToc items={toc} />
            <div className="min-w-0 flex-1">
              <MarkdownArticle markdown={markdown} narrowProse />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <ContentDisclaimer />
        <ToolkitFooterBackNav
          href="/toolkit"
          label="← ひな形・資料一覧へ戻る"
          navAriaLabel="ひな形・資料一覧へ戻る"
        />
      </div>
    </div>
  );
}
