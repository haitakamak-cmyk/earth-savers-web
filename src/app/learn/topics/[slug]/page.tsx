import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { TopicToc } from "@/components/TopicToc";
import { getGlossaryBySlug } from "@/lib/glossary";
import { getTopicSeriesEpisodeNeighbors } from "@/lib/topic-entries";
import {
  applyGlossaryLinksOnce,
  extractTopicToc,
  getAllTopicSlugs,
  getTopicBySlug,
  hrefForOrdinanceArticleLabel,
  loadTopicRawMarkdown,
  splitTopicMarkdown,
  stripTopicSourceHeader,
} from "@/lib/topics";
import {
  ORGANIZATION_NAME,
  SITE_ALLOW_SEARCH_INDEXING,
  SITE_URL,
} from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getTopicBySlug(slug);
  if (!entry) return { title: "解説記事" };

  const path = `/learn/topics/${entry.slug}`;
  const description = entry.shortDescription;
  return {
    title: `${entry.title} | 解説記事 | ${ORGANIZATION_NAME}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: entry.title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: ORGANIZATION_NAME,
      locale: "ja_JP",
      type: "article",
      publishedTime: entry.publishedAt,
      modifiedTime: entry.updatedAt,
    },
    robots: SITE_ALLOW_SEARCH_INDEXING
      ? undefined
      : { index: false, follow: false },
  };
}

export default async function TopicDetailPage({ params }: Props) {
  const { slug } = await params;
  const entry = getTopicBySlug(slug);
  if (!entry) notFound();

  const path = `/learn/topics/${entry.slug}`;
  const raw = loadTopicRawMarkdown(entry);
  const stripped = stripTopicSourceHeader(raw);
  const { mainMarkdown, referencesMarkdown, footnoteMarkdown } =
    splitTopicMarkdown(stripped);
  const linkedMain = applyGlossaryLinksOnce(mainMarkdown);
  const toc = extractTopicToc(mainMarkdown);
  const episodeNav = getTopicSeriesEpisodeNeighbors(entry.slug);

  return (
    <div className="bg-ivory pb-16">
      <ArticleJsonLd
        headline={entry.title}
        pathname={path}
        description={entry.shortDescription}
        datePublished={entry.publishedAt}
        dateModified={entry.updatedAt}
        articleSection="学ぶ（解説記事）"
      />
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <a
            href="#topic-main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-wakakusa focus:px-3 focus:py-2 focus:text-white"
          >
            本文へスキップ
          </a>
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "学ぶ", path: "/learn" },
              { name: "解説記事", path: "/learn/topics" },
              { name: entry.title, path },
            ]}
          />
          <h1 className="mt-2 max-w-[720px] font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {entry.title}
          </h1>
          {entry.subtitle ? (
            <p className="mt-2 max-w-[720px] text-lg font-medium text-aqua-dark">
              {entry.subtitle}
            </p>
          ) : null}
          <p className="mt-4 text-sm text-text-muted">
            公開 {entry.publishedAt}
            {entry.updatedAt !== entry.publishedAt
              ? ` · 最終更新 ${entry.updatedAt}`
              : ""}
            {" · "}
            {ORGANIZATION_NAME}
          </p>
        </div>
      </div>

      <div
        id="topic-main"
        className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:flex lg:gap-10 lg:px-8"
      >
        <TopicToc items={toc} />
        <div className="min-w-0 flex-1">
          <MarkdownArticle markdown={linkedMain} narrowProse />

          <nav
            aria-label="ほかの解説記事へ移動する"
            className="mx-auto mt-12 max-w-[720px] border-t border-border pt-10"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-6 sm:gap-y-3">
              {episodeNav?.next ? (
                <Link
                  href={`/learn/topics/${episodeNav.next.slug}`}
                  className="inline-flex rounded-lg border border-wakakusa/35 bg-wakakusa-light/40 px-4 py-2.5 text-sm font-semibold text-aqua-dark shadow-sm transition-colors hover:border-wakakusa/55 hover:bg-wakakusa-light/60"
                >
                  {episodeNav.next.subtitle}へ →
                </Link>
              ) : null}
              <Link
                href="/learn/topics"
                className="inline-flex items-center px-1 py-2 text-sm font-medium text-aqua-dark underline underline-offset-2 hover:text-aqua sm:py-2.5"
              >
                ← 解説記事一覧へ
              </Link>
            </div>
            {episodeNav?.prev ? (
              <Link
                href={`/learn/topics/${episodeNav.prev.slug}`}
                className="mt-3 inline-block px-1 text-sm font-medium text-text-secondary underline underline-offset-2 hover:text-aqua-dark"
              >
                ← {episodeNav.prev.subtitle}
              </Link>
            ) : null}
          </nav>

          {entry.relatedGlossarySlugs.length > 0 ? (
            <section className="mt-14 max-w-[720px] border-t border-border pt-10">
              <h2 className="font-serif text-xl font-semibold text-text-primary">
                関連用語
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {entry.relatedGlossarySlugs.flatMap((gSlug) => {
                  const term = getGlossaryBySlug(gSlug);
                  if (!term) return [];
                  return [
                    <li
                      key={gSlug}
                      className="rounded-xl border border-border bg-white p-4 shadow-sm"
                    >
                      <Link
                        href={`/learn/glossary/${gSlug}`}
                        className="font-semibold text-aqua-dark underline underline-offset-2"
                      >
                        {term.term}
                      </Link>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {term.shortDescription}
                      </p>
                      <Link
                        href={`/learn/glossary/${gSlug}`}
                        className="mt-2 inline-block text-sm font-medium text-wakakusa-dark underline"
                      >
                        用語集で詳しく見る →
                      </Link>
                    </li>,
                  ];
                })}
              </ul>
            </section>
          ) : null}

          {entry.relatedOrdinanceArticles &&
          entry.relatedOrdinanceArticles.length > 0 ? (
            <section className="mt-12 max-w-[720px] border-t border-border pt-10">
              <h2 className="font-serif text-xl font-semibold text-text-primary">
                関連条例条項（ひな型）
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                {entry.relatedOrdinanceArticles.map((label) => {
                  const href = hrefForOrdinanceArticleLabel(label);
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        className="font-medium text-aqua-dark underline underline-offset-2"
                      >
                        条例{label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {referencesMarkdown ? (
            <section className="mt-14 max-w-[720px] border-t border-border pt-10">
              <MarkdownArticle markdown={referencesMarkdown} narrowProse />
            </section>
          ) : null}

          <div className="mt-10 max-w-[720px] space-y-8">
            <ContentDisclaimer requiresLegalCaveat={entry.requiresLegalCaveat} />
            {footnoteMarkdown ? (
              <MarkdownArticle markdown={footnoteMarkdown} narrowProse />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
