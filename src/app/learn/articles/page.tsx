import type { Metadata } from "next";
import Link from "next/link";

import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ResourceLead } from "@/components/ResourceLead";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "読みもの",
  description:
    "活動レビュー、論考、背景解説など、サイト内の読み物を一覧します（記事詳細が Article JSON-LD になります）。",
  alternates: { canonical: "/learn/articles" },
  openGraph: {
    title: "読みもの | 学ぶ",
    url: "/learn/articles",
    description: "読み物一覧です。",
  },
  // 記事が0件のうちは中身のないページなので検索対象から外す（sitemap 側でも除外）
  ...(ARTICLES.length === 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function ArticlesIndexPage() {
  return (
    <div className="bg-ivory">
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "学ぶ", path: "/learn" },
              { name: "読みもの", path: "/learn/articles" },
            ]}
          />
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">読みもの</h1>
          <ResourceLead>
            当法人が書き下ろした、サイト内で読み切れる読みものを並べます。新聞・テレビなどの
            外部メディア掲載は{" "}
            <Link href="/media" className="text-aqua-dark underline underline-offset-2">
              メディア・実績
            </Link>
            をご覧ください。
          </ResourceLead>
          {ARTICLES.length === 0 ? (
            <p className="text-[15px] leading-[1.85] text-text-secondary">
              読みものは現在準備中です。公開までの間は{" "}
              <Link href="/learn/topics" className="text-aqua-dark underline underline-offset-2">
                解説記事
              </Link>
              や{" "}
              <Link
                href="/learn/field-reports"
                className="text-aqua-dark underline underline-offset-2"
              >
                フィールドから
              </Link>
              をご覧ください。
            </p>
          ) : (
            <ul className="space-y-3">
              {ARTICLES.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/learn/articles/${a.slug}`}
                    className="block rounded-xl border border-border bg-white px-4 py-4 font-medium shadow-sm hover:border-wakakusa/35"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
