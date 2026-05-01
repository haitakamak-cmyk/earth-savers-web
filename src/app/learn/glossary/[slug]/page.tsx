import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
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
  return {
    title: entry.term,
    description: entry.shortDescription,
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
        description={entry.shortDescription}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "まなぶ", path: "/learn" },
          { name: "用語集", path: "/learn/glossary" },
          { name: entry.term, path },
        ]}
      />
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs text-wakakusa-dark">
            <Link href="/learn/glossary" className="underline-offset-2 hover:underline">
              用語集
            </Link>
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {entry.term}
          </h1>
          <ResourceLead>{entry.shortDescription}</ResourceLead>
          <div className="prose prose-neutral max-w-none text-[15px] leading-relaxed text-text-secondary">
            {entry.body.split(/\n\n+/).map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>
          <RelatedLinks items={related} />
        </div>
      </div>
    </div>
  );
}
