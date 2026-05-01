import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ResourceLead } from "@/components/ResourceLead";
import { GLOSSARY_ENTRIES } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "用語集",
  description:
    "水源保全・里山・生態系に関わる用語を短く定義し、政策提言・ツールキット・読み物へ橋渡しします。公開前データは空でもページ自体は確認できます。",
  alternates: { canonical: "/learn/glossary" },
  openGraph: {
    title: "用語集 | まなぶ",
    url: "/learn/glossary",
    description: "用語の定義と関連リンクです。",
  },
};

export default function GlossaryIndexPage() {
  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "まなぶ", path: "/learn" },
          { name: "用語集", path: "/learn/glossary" },
        ]}
      />
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">用語集</h1>
          <ResourceLead>
            「なんとなくわかっている」状態を、「誰かに説明できる」状態へ近づけるための短文定義です。記事との重複より、用語側を正とします。
          </ResourceLead>

          {GLOSSARY_ENTRIES.length === 0 ? (
            <p className="text-[15px] text-text-secondary">
              現在、公開準備中の用語があります。コンテンツ投入後、この一覧から個別ページ（JSON-LD: DefinedTerm）へリンクされます。
            </p>
          ) : (
            <ul className="space-y-2">
              {GLOSSARY_ENTRIES.map((e) => (
                <li key={e.slug}>
                  <Link href={`/learn/glossary/${e.slug}`} className="text-aqua-dark underline">
                    {e.term}
                  </Link>
                  <span className="text-text-muted"> — {e.shortDescription}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
