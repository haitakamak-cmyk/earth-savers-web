import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { DefinedTermJsonLd } from "@/components/DefinedTermJsonLd";
import { RelatedLinks } from "@/components/RelatedLinks";
import { ResourceLead } from "@/components/ResourceLead";
import { buildGlossaryRelated } from "@/lib/related-resources";
import {
  getAllGlossarySlugs,
  getGlossaryBySlug,
} from "@/lib/glossary";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGlossarySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryBySlug(slug);
  if (!entry)
    return { title: "用語集" };

  const path = `/learn/glossary/${slug}`;
  const descriptionTail = entry.body.trim()
    ? ` ${entry.body.slice(0, 90)}`
    : "";
  return {
    title: entry.term,
    description: `${entry.shortDescription}${descriptionTail}`.trim(),
    alternates: { canonical: path },
    openGraph: {
      title: `${entry.term} | 用語集`,
      description: entry.shortDescription,
      url: path,
    },
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params;
  const entry = getGlossaryBySlug(slug);
  if (!entry) notFound();

  const path = `/learn/glossary/${slug}`;
  const related = buildGlossaryRelated(entry);

  return (
    <div className="bg-ivory">
      <DefinedTermJsonLd
        name={entry.term}
        slug={slug}
        alternateName={entry.alternateNames}
        description={entry.body}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "学ぶ", path: "/learn" },
          { name: "環境用語集", path: "/learn/glossary" },
          { name: entry.term, path },
        ]}
      />
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs text-wakakusa-dark">
            <Link href="/learn/glossary" className="underline-offset-2 hover:underline">
              環境用語集
            </Link>
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {entry.term}
          </h1>
          {entry.reading ? <p className="mt-1 text-sm text-text-muted">{entry.reading}</p> : null}
          <ResourceLead>{entry.shortDescription}</ResourceLead>
          <p className="mt-5">
            <Link
              href="/learn/glossary"
              className="inline-flex items-center gap-1.5 rounded-lg border border-wakakusa/35 bg-white px-4 py-2.5 text-sm font-medium text-wakakusa-dark shadow-sm transition hover:border-wakakusa/60 hover:bg-wakakusa-light/40"
            >
              <span aria-hidden>←</span>
              一覧に戻る
            </Link>
          </p>
          <section className="mt-6">
            <h2 className="font-serif text-xl font-semibold text-text-primary">定義</h2>
            <div className="mt-2 prose prose-neutral max-w-none text-[15px] leading-relaxed text-text-secondary">
              {entry.body.split(/\n\n+/).map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          </section>

          {entry.earthSaversContext ? (
            <section className="mt-8">
              <h2 className="font-serif text-xl font-semibold text-text-primary">地球防衛群との接点</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{entry.earthSaversContext}</p>
            </section>
          ) : null}

          {entry.laws && entry.laws.length > 0 ? (
            <section className="mt-8">
              <h2 className="font-serif text-xl font-semibold text-text-primary">関連法令</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-text-secondary">
                {entry.laws.map((law) => (
                  <li key={law} className="font-medium">{law}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {entry.sources.length > 0 ? (
            <section className="mt-8">
              <h2 className="font-serif text-xl font-semibold text-text-primary">出典</h2>
              <ul className="mt-2 space-y-2 text-sm text-text-secondary">
                {entry.sources.map((source) => (
                  <li key={`${source.label}-${source.url ?? ""}`}>
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-aqua-dark underline underline-offset-2 hover:text-aqua"
                      >
                        {source.label}
                      </a>
                    ) : (
                      <span>{source.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <RelatedLinks items={related} />
          <div className="mt-10">
            <ContentDisclaimer requiresLegalCaveat={entry.requiresLegalCaveat} />
          </div>
        </div>
      </div>
    </div>
  );
}
