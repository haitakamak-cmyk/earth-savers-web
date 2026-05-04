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
            サイト内だけで読み切れる原則読みものを並べます。外部メディア掲載の紹介は{" "}
            <Link href="/media" className="text-aqua-dark underline underline-offset-2">
              メディア・実績
            </Link>
            と重複しないよう体裁を変えていきます。
          </ResourceLead>
          {ARTICLES.length === 0 ? (
            <p className="text-[15px] text-text-secondary">
              現在公開中の読みものはありません。
              <code className="mx-0.5 rounded bg-ivory-warm px-1 text-xs">src/lib/articles.ts</code>
              に追加すると一覧・静的パラメータが自動生成されます。
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
