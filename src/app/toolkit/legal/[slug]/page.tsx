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
  return getToolkitViewerSlugs("legal").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = getToolkitFileBySubdirAndViewSlug("legal", slug);
  if (!found || found.file.status !== "published")
    return { title: "法律ガイド" };

  const path = `/toolkit/legal/${slug}`;
  return {
    title: `${found.file.title} | 法律ガイド | ${ORGANIZATION_NAME}`,
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

export default async function ToolkitLegalDocPage({ params }: Props) {
  const { slug } = await params;
  const found = getToolkitFileBySubdirAndViewSlug("legal", slug);
  if (!found || found.file.status !== "published") notFound();

  const { section, file } = found;
  const markdown = await readToolkitPublicMarkdown("legal", file.filename);
  const pagePath = `/toolkit/legal/${slug}`;
  const downloadHref = `/toolkit/legal/${encodeURIComponent(file.filename)}`;
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
          { name: "法律ガイド", path: "/toolkit/legal" },
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
            <Link href="/toolkit/legal" className="text-aqua-dark underline underline-offset-2">
              ← 法律ガイド一覧
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
                    href={`/toolkit/legal/${o.viewSlug}`}
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
          <ToolkitFooterBackNav href="/toolkit/legal" label="← 法律ガイド一覧へ戻る" />
        </div>
      </div>
    </div>
  );
}
