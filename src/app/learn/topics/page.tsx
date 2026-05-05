import type { Metadata } from "next";
import Link from "next/link";

import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { ResourceLead } from "@/components/ResourceLead";
import {
  buildTopicHubRows,
  getTopicBySlug,
} from "@/lib/topic-entries";
import { ORGANIZATION_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "解説記事",
  description:
    "制度・政策の背景を長めの文章で整理するコーナーです。用語集・条例ひな型・政策提言と相互に参照できます。",
  alternates: { canonical: "/learn/topics" },
  openGraph: {
    title: "解説記事 | 学ぶ",
    description: "制度解説・政策解説の長尺記事。",
    url: `${SITE_URL}/learn/topics`,
  },
};

export default function LearnTopicsIndexPage() {
  const hubRows = buildTopicHubRows();

  return (
    <div className="bg-ivory">
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "学ぶ", path: "/learn" },
              { name: "解説記事", path: "/learn/topics" },
            ]}
          />
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
            {hubRows.map((row) =>
              row.kind === "series" ? (
                <li key={row.card.key}>
                  <div className="rounded-xl border border-border bg-white px-5 py-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-wakakusa-dark">
                      連載
                    </p>
                    <span className="mt-1 block font-serif text-lg font-semibold text-text-primary">
                      {row.card.title}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {row.card.overview}
                    </p>
                    <p className="mt-3 text-xs text-text-muted">
                      公開 {row.card.hubSortPublishedAt}
                    </p>
                    <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      {row.card.episodeSlugs.map((slug, index) => {
                        const ep = getTopicBySlug(slug);
                        const n = index + 1;
                        return ep ? (
                          <Link
                            key={slug}
                            href={`/learn/topics/${slug}`}
                            className="text-sm font-semibold text-aqua-dark underline underline-offset-2 hover:text-aqua"
                          >
                            {n}話→
                          </Link>
                        ) : (
                          <span
                            key={slug}
                            className="text-sm text-text-muted"
                          >
                            {n}話（準備中）
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={row.topic.slug}>
                  <Link
                    href={`/learn/topics/${row.topic.slug}`}
                    className="block rounded-xl border border-border bg-white px-5 py-5 shadow-sm transition-colors hover:border-wakakusa/35 hover:bg-wakakusa-light/25"
                  >
                    <span className="font-serif text-lg font-semibold text-text-primary">
                      {row.topic.title}
                    </span>
                    {row.topic.subtitle ? (
                      <span className="mt-1 block text-sm font-medium text-aqua-dark">
                        {row.topic.subtitle}
                      </span>
                    ) : null}
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {row.topic.shortDescription}
                    </p>
                    <p className="mt-3 text-xs text-text-muted">
                      公開 {row.topic.publishedAt}
                      {row.topic.updatedAt !== row.topic.publishedAt
                        ? ` · 更新 ${row.topic.updatedAt}`
                        : ""}
                    </p>
                    <span className="mt-3 inline-block text-sm font-medium text-aqua-dark">
                      読む →
                    </span>
                  </Link>
                </li>
              ),
            )}
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
                  条例ひな型
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
