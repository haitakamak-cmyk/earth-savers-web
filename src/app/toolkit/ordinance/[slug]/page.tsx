import { readFile } from "fs/promises";
import path from "path";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { ResourceLead } from "@/components/ResourceLead";
import {
  getAllOrdinanceSupplementSlugs,
  getOrdinanceSupplementBySlug,
  ORDINANCE_SUPPLEMENTS,
} from "@/lib/ordinance-supplements-data";
import {
  ORGANIZATION_NAME,
  SITE_ALLOW_SEARCH_INDEXING,
  SITE_URL,
} from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllOrdinanceSupplementSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getOrdinanceSupplementBySlug(slug);
  if (!entry)
    return { title: "条例ひな型 補助資料" };

  const path = `/toolkit/ordinance/${entry.slug}`;
  return {
    title: `${entry.title} | 条例ひな型 補助資料 | ${ORGANIZATION_NAME}`,
    description: entry.shortDescription,
    alternates: { canonical: path },
    openGraph: {
      title: entry.title,
      description: entry.shortDescription,
      url: `${SITE_URL}${path}`,
      siteName: ORGANIZATION_NAME,
      locale: "ja_JP",
      type: "article",
    },
    robots: SITE_ALLOW_SEARCH_INDEXING
      ? undefined
      : { index: false, follow: false },
  };
}

export default async function OrdinanceSupplementPage({ params }: Props) {
  const { slug } = await params;
  const entry = getOrdinanceSupplementBySlug(slug);
  if (!entry) notFound();

  let markdown = "";
  try {
    markdown = await readFile(
      path.join(process.cwd(), entry.contentPath),
      "utf-8",
    );
  } catch {
    markdown =
      "> 補助資料 Markdown を読み込めませんでした。`src/content/ordinance-supplements/` にファイルがあるか確認してください。\n";
  }

  const pagePath = `/toolkit/ordinance/${entry.slug}`;
  const others = ORDINANCE_SUPPLEMENTS.filter((e) => e.slug !== slug);

  return (
    <div className="bg-ivory pb-16">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "資料室", path: "/toolkit" },
          { name: "ひな形・資料", path: "/toolkit" },
          { name: "条例ひな型", path: "/toolkit/ordinance" },
          { name: entry.title, path: pagePath },
        ]}
      />
      <nav
        aria-label="パンくず"
        className="mx-auto max-w-3xl border-b border-border bg-ivory-warm/35 px-4 py-3 text-xs text-text-muted sm:px-6"
      >
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
          <li>
            <Link href="/" className="underline-offset-2 hover:underline">
              HOME
            </Link>
          </li>
          <li aria-hidden className="text-text-muted">
            /
          </li>
          <li>
            <Link href="/toolkit" className="underline-offset-2 hover:underline">
              ひな形・資料
            </Link>
          </li>
          <li aria-hidden className="text-text-muted">
            /
          </li>
          <li>
            <Link
              href="/toolkit/ordinance"
              className="underline-offset-2 hover:underline"
            >
              条例ひな型
            </Link>
          </li>
          <li aria-hidden className="text-text-muted">
            /
          </li>
          <li className="font-medium text-text-primary">{entry.title}</li>
        </ol>
      </nav>

      <div className="border-b border-wakakusa/25 bg-aqua-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {entry.title}
          </h1>
          <ResourceLead>{entry.shortDescription}</ResourceLead>
          <p className="mt-2 text-sm text-text-muted">
            公開 {entry.publishedAt}
            {entry.updatedAt !== entry.publishedAt ? ` · 更新 ${entry.updatedAt}` : ""}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <MarkdownArticle markdown={markdown} narrowProse />
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="font-serif text-lg font-semibold text-text-primary">
            関連リソース
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/toolkit/ordinance" className="text-aqua-dark underline underline-offset-2">
                条例ひな型ページへ
              </Link>
            </li>
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/toolkit/ordinance/${o.slug}`}
                  className="text-aqua-dark underline underline-offset-2"
                >
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-10 space-y-4">
          <ContentDisclaimer
            requiresLegalCaveat={entry.requiresLegalCaveat}
            ordinanceDraftFinalizeNote
          />
        </div>
      </div>
    </div>
  );
}
