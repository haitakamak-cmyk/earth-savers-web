import { readFile } from "fs/promises";
import path from "path";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleJsonLd } from "@/components/ArticleJsonLd";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { RelatedLinks } from "@/components/RelatedLinks";
import { ResourceLead } from "@/components/ResourceLead";
import { buildPolicyRelated } from "@/lib/related-resources";
import {
  POLICY_KIND_LABEL,
  type PolicyEntry,
  type PolicyKind,
  getAllPolicySlugs,
  getPolicyBySlug,
} from "@/lib/policies";
import {
  ORGANIZATION_NAME,
  SITE_ALLOW_SEARCH_INDEXING,
  SITE_URL,
} from "@/lib/site";

import { POLICY_KIND_PATH } from "../policy-kind-path";

function policyDocumentTitle(policy: PolicyEntry): string {
  const sub = policy.subtitle?.trim();
  return sub ? `${policy.title} ${sub}` : policy.title;
}

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPolicySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);
  if (!policy)
    return { title: "政策提言" };

  const pathname = `/policy/${slug}`;
  const documentTitle = policyDocumentTitle(policy);
  return {
    title: `${documentTitle} | 政策提言 | ${ORGANIZATION_NAME}`,
    description: policy.summary,
    alternates: { canonical: pathname },
    openGraph: {
      title: documentTitle,
      description: policy.summary,
      url: `${SITE_URL}${pathname}`,
      siteName: ORGANIZATION_NAME,
      locale: "ja_JP",
      type: "article",
      publishedTime: policy.datePublished,
    },
    robots: SITE_ALLOW_SEARCH_INDEXING
      ? undefined
      : { index: false, follow: false },
  };
}

function kindHref(kind: PolicyKind) {
  return `/policy/${POLICY_KIND_PATH[kind]}`;
}

export default async function PolicyDetailPage({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicyBySlug(slug);
  if (!policy) notFound();

  const related = buildPolicyRelated(policy);
  const pathname = `/policy/${slug}`;
  const documentTitle = policyDocumentTitle(policy);

  let markdown: string | null = null;
  if (policy.contentPath) {
    try {
      markdown = await readFile(
        path.join(process.cwd(), policy.contentPath),
        "utf-8",
      );
    } catch {
      markdown =
        "> 政策提言 Markdown を読み込めませんでした。`src/content/policies/` にファイルがあるか確認してください。\n";
    }
  }

  return (
    <div className="bg-ivory pb-16">
      <ArticleJsonLd
        headline={documentTitle}
        pathname={pathname}
        description={policy.summary}
        datePublished={policy.datePublished}
        articleSection="政策提言"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "資料室", path: "/policy" },
          { name: "政策提言", path: "/policy" },
          {
            name: POLICY_KIND_LABEL[policy.kind],
            path: kindHref(policy.kind),
          },
          { name: documentTitle, path: pathname },
        ]}
      />
      <div className="border-b border-aqua/25 bg-aqua-light/35 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs text-aqua-dark">
            <Link href="/policy" className="underline-offset-2 hover:underline">
              政策提言
            </Link>
            {" / "}
            <Link href={kindHref(policy.kind)} className="underline-offset-2 hover:underline">
              {POLICY_KIND_LABEL[policy.kind]}
            </Link>
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {policy.title}
          </h1>
          {policy.subtitle ? (
            <p className="mt-3 font-serif text-lg text-text-secondary sm:text-xl">
              {policy.subtitle}
            </p>
          ) : null}
          <ResourceLead>{policy.summary}</ResourceLead>
          {policy.datePublished ? (
            <p className="mt-2 text-sm text-text-muted">公開 {policy.datePublished}</p>
          ) : null}
          {policy.audience && policy.audience.length > 0 ? (
            <p className="mt-2 text-sm text-text-secondary">
              <span className="font-medium text-text-primary">想定読者：</span>
              {policy.audience.join("、")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        {markdown ? (
          <MarkdownArticle markdown={markdown} narrowProse />
        ) : policy.body ? (
          <div className="prose prose-neutral max-w-none text-[15px] leading-relaxed text-text-secondary">
            {policy.body.split(/\n\n+/).map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>
        ) : null}

        <RelatedLinks items={related} />

        <div className="mt-10 space-y-4">
          <ContentDisclaimer requiresLegalCaveat={policy.requiresLegalCaveat} />
        </div>
      </div>
    </div>
  );
}
