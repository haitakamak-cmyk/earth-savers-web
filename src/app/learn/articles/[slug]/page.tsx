import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { RelatedLinks } from "@/components/RelatedLinks";
import { ResourceLead } from "@/components/ResourceLead";
import {
  getAllArticleSlugs,
  getArticleBySlug,
} from "@/lib/articles";
import { buildArticleRelated } from "@/lib/related-resources";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article)
    return { title: "読みもの" };

  const path = `/learn/articles/${slug}`;
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: path },
    openGraph: {
      title: article.title,
      description: article.summary,
      url: path,
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const path = `/learn/articles/${slug}`;
  const related = buildArticleRelated(article);

  return (
    <div className="bg-ivory">
      <ArticleJsonLd
        headline={article.title}
        pathname={path}
        description={article.summary}
        datePublished={article.datePublished}
        articleSection="学ぶ（読み物）"
      />
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "学ぶ", path: "/learn" },
              { name: "読みもの", path: "/learn/articles" },
              { name: article.title, path },
            ]}
          />
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {article.title}
          </h1>
          <ResourceLead>{article.summary}</ResourceLead>
          <div className="prose prose-neutral max-w-none text-[15px] leading-relaxed text-text-secondary">
            {article.body.split(/\n\n+/).map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>
          <RelatedLinks items={related} />
        </div>
      </div>
    </div>
  );
}
