import type { Metadata } from "next";
import Link from "next/link";

import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ContentDisclaimer } from "@/components/ContentDisclaimer";
import { OrdinanceSupplementsCardGrid } from "@/components/OrdinanceSupplementsCardGrid";
import { ResourceLead } from "@/components/ResourceLead";
import {
  ORDINANCE_SUPPLEMENTS_SECTION_INTRO,
  ORDINANCE_SUPPLEMENTS_SECTION_TITLE,
} from "@/lib/ordinance-supplements-data";
import { ORGANIZATION_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `条例導入を支える補助資料 | ひな形・資料 | ${ORGANIZATION_NAME}`,
  description: ORDINANCE_SUPPLEMENTS_SECTION_INTRO,
  alternates: { canonical: "/toolkit/supplements" },
  openGraph: {
    title: `${ORDINANCE_SUPPLEMENTS_SECTION_TITLE} | ひな形・資料`,
    description: ORDINANCE_SUPPLEMENTS_SECTION_INTRO,
    url: "/toolkit/supplements",
  },
};

export default function ToolkitSupplementsHubPage() {
  const path = "/toolkit/supplements";
  return (
    <div className="bg-ivory pb-16">
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "ひな形・資料", path: "/toolkit" },
              { name: ORDINANCE_SUPPLEMENTS_SECTION_TITLE, path },
            ]}
          />
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            {ORDINANCE_SUPPLEMENTS_SECTION_TITLE}
          </h1>
          <ResourceLead>{ORDINANCE_SUPPLEMENTS_SECTION_INTRO}</ResourceLead>
          <Link
            href="/toolkit"
            className="mt-4 inline-block text-sm font-semibold text-aqua-dark underline underline-offset-2"
          >
            ← ひな形・資料一覧
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-wakakusa/25 bg-wakakusa-light/20 px-4 py-8 sm:px-8">
          <OrdinanceSupplementsCardGrid />
        </div>
        <p className="mt-10 text-sm leading-relaxed text-text-secondary">
          本文の閲覧やファイルのダウンロードは、下にある一覧から各資料を選んでください。条例のひな型本文（Markdown 一括）は{" "}
          <Link href="/toolkit/ordinance" className="font-medium text-aqua-dark underline underline-offset-2">
            条例ひな型ページ
          </Link>
          からも利用できます。
        </p>
        <div className="mx-auto mt-10 max-w-3xl border-t border-border pt-10">
          <ContentDisclaimer ordinanceDraftFinalizeNote />
        </div>
      </div>
    </div>
  );
}
