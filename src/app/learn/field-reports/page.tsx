import type { Metadata } from "next";
import Link from "next/link";

import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ResourceLead } from "@/components/ResourceLead";
import { ORGANIZATION_NAME, SITE_URL } from "@/lib/site";
import { buildFieldReportEntries } from "@/lib/topic-entries";

export const metadata: Metadata = {
  title: "フィールドから",
  description:
    "現地に足を運び、住民の動きや事業の経緯を記録したインタビュー・現地レポート。",
  alternates: { canonical: "/learn/field-reports" },
  openGraph: {
    title: "フィールドから | 学ぶ",
    description: "現地に足を運んだ記録。",
    url: `${SITE_URL}/learn/field-reports`,
  },
};

export default function LearnFieldReportsIndexPage() {
  const entries = buildFieldReportEntries();

  return (
    <div className="bg-ivory">
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "学ぶ", path: "/learn" },
              { name: "フィールドから", path: "/learn/field-reports" },
            ]}
          />
          <p className="text-xs font-medium uppercase tracking-wider text-wakakusa-dark">
            Resource / Learn · Field Reports
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            フィールドから
          </h1>
          <ResourceLead>
            現地に足を運び、住民の動きや事業の経緯を記録した記事です。制度解説とは別に、当事者の言葉と背景を長めに残します。
          </ResourceLead>
          <ul className="mt-10 space-y-4">
            {entries.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/learn/topics/${topic.slug}`}
                  className="block rounded-xl border border-border bg-white px-5 py-5 shadow-sm transition-colors hover:border-wakakusa/35 hover:bg-wakakusa-light/25"
                >
                  <span className="font-serif text-lg font-semibold text-text-primary">
                    {topic.title}
                  </span>
                  {topic.subtitle ? (
                    <span className="mt-1 block text-sm font-medium text-aqua-dark">
                      {topic.subtitle}
                    </span>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {topic.shortDescription}
                  </p>
                  <p className="mt-3 text-xs text-text-muted">
                    公開 {topic.publishedAt}
                    {topic.updatedAt !== topic.publishedAt
                      ? ` · 更新 ${topic.updatedAt}`
                      : ""}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium text-aqua-dark">
                    読む →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <section className="mt-12 border-t border-border pt-8 text-sm">
            <h2 className="font-serif text-lg font-semibold text-text-primary">
              関連リソース
            </h2>
            <ul className="mt-3 space-y-2 text-aqua-dark">
              <li>
                <Link
                  href="/learn/topics"
                  className="underline underline-offset-2"
                >
                  解説記事
                </Link>
              </li>
              <li>
                <Link
                  href="/learn/glossary"
                  className="underline underline-offset-2"
                >
                  環境用語集
                </Link>
              </li>
            </ul>
          </section>
          <p className="mt-8 text-xs text-text-muted">{ORGANIZATION_NAME}</p>
          <div className="mt-8">
            <ContentDisclaimer />
          </div>
        </div>
      </div>
    </div>
  );
}
