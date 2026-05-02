import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { ResourceLead } from "@/components/ResourceLead";
import { TOPICS } from "@/lib/topic-entries";
import { ORGANIZATION_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "解説記事",
  description:
    "制度・政策の背景を長めの文章で整理するコーナーです。用語集・条例テンプレ・政策提言と相互に参照できます。",
  alternates: { canonical: "/learn/topics" },
  openGraph: {
    title: "解説記事 | 学ぶ",
    description: "制度解説・政策解説の長尺記事。",
    url: `${SITE_URL}/learn/topics`,
  },
};

export default function LearnTopicsIndexPage() {
  const sorted = [...TOPICS].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "学ぶ", path: "/learn" },
          { name: "解説記事", path: "/learn/topics" },
        ]}
      />
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-wakakusa-dark">
            Resource / Learn · Topics
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            解説記事
          </h1>
          <ResourceLead>
            当団体が作成する制度解説・政策解説の長尺記事です。環境用語集の用語とあわせて読むと、全体像をつかみやすくなります。
          </ResourceLead>
          <ContentDisclaimer />
          <ul className="mt-10 space-y-4">
            {sorted.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/learn/topics/${t.slug}`}
                  className="block rounded-xl border border-border bg-white px-5 py-5 shadow-sm transition-colors hover:border-wakakusa/35 hover:bg-wakakusa-light/25"
                >
                  <span className="font-serif text-lg font-semibold text-text-primary">
                    {t.title}
                  </span>
                  {t.subtitle ? (
                    <span className="mt-1 block text-sm font-medium text-aqua-dark">
                      {t.subtitle}
                    </span>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {t.shortDescription}
                  </p>
                  <p className="mt-3 text-xs text-text-muted">
                    公開 {t.publishedAt}
                    {t.updatedAt !== t.publishedAt ? ` · 更新 ${t.updatedAt}` : ""}
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
                <Link href="/learn/glossary" className="underline underline-offset-2">
                  環境用語集
                </Link>
              </li>
              <li>
                <Link href="/toolkit/ordinance" className="underline underline-offset-2">
                  条例テンプレート
                </Link>
              </li>
              <li>
                <Link href="/policy" className="underline underline-offset-2">
                  政策提言一覧
                </Link>
              </li>
            </ul>
          </section>
          <p className="mt-8 text-xs text-text-muted">
            {ORGANIZATION_NAME}
          </p>
        </div>
      </div>
    </div>
  );
}
