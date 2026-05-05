import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { ResourceLead } from "@/components/ResourceLead";
import { ToolkitFooterBackNav } from "@/components/ToolkitFooterBackNav";
import {
  getToolkitFileBySubdirAndViewSlug,
  getToolkitViewerSlugs,
} from "@/lib/toolkit-manifest";
import { readToolkitPublicMarkdown } from "@/lib/toolkit-public-md";
import { ORGANIZATION_NAME, SITE_ALLOW_SEARCH_INDEXING, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getToolkitViewerSlugs("cases").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = getToolkitFileBySubdirAndViewSlug("cases", slug);
  if (!found || found.file.status !== "published")
    return { title: "導入・訴訟事例" };

  const path = `/toolkit/cases/${slug}`;
  return {
    title: `${found.file.title} | 導入・訴訟事例 | ${ORGANIZATION_NAME}`,
    description: found.file.description,
    alternates: { canonical: path },
    openGraph: {
      title: found.file.title,
      description: found.file.description,
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

export default async function ToolkitCasesDocPage({ params }: Props) {
  const { slug } = await params;
  const found = getToolkitFileBySubdirAndViewSlug("cases", slug);
  if (!found || found.file.status !== "published") notFound();

  const { section, file } = found;
  const markdown = await readToolkitPublicMarkdown("cases", file.filename);
  const pagePath = `/toolkit/cases/${slug}`;
  const downloadHref = `/toolkit/cases/${encodeURIComponent(file.filename)}`;
  const others = section.files.filter(
    (f) => f.status === "published" && f.viewSlug !== slug && f.viewSlug,
  );

  return (
    <div className="bg-ivory pb-16">
      <ResourceBreadcrumbs
        layout="ribbon"
        items={[
          { name: "HOME", path: "/" },
          { name: "ひな形・資料", path: "/toolkit" },
          { name: "導入・訴訟事例", path: "/toolkit/cases" },
          { name: file.title, path: pagePath },
        ]}
      />

      <div className="border-b border-wakakusa/25 bg-aqua-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {file.title}
          </h1>
          <ResourceLead>{file.description}</ResourceLead>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <a
              href={downloadHref}
              download={file.filename}
              className="inline-flex items-center rounded-lg bg-wakakusa px-4 py-2.5 font-semibold text-white hover:bg-wakakusa-dark"
            >
              Markdown をダウンロード
            </a>
            <Link href="/toolkit/cases" className="text-aqua-dark underline underline-offset-2">
              ← 導入・訴訟事例一覧
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <MarkdownArticle markdown={markdown} narrowProse />
        {others.length > 0 ? (
          <section className="mt-14 border-t border-border pt-10">
            <h2 className="font-serif text-lg font-semibold text-text-primary">
              同じカテゴリの資料
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {others.map((o) => (
                <li key={o.viewSlug}>
                  <Link
                    href={`/toolkit/cases/${o.viewSlug}`}
                    className="text-aqua-dark underline underline-offset-2"
                  >
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <div className="mt-10">
          <ContentDisclaimer requiresLegalCaveat />
          <ToolkitFooterBackNav href="/toolkit/cases" label="← 導入・訴訟事例一覧へ戻る" />
        </div>
      </div>
    </div>
  );
}
