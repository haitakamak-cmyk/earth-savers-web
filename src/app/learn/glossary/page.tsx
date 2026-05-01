import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ResourceLead } from "@/components/ResourceLead";
import { GLOSSARY_ENTRIES } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "環境用語集",
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
  const entries = [...GLOSSARY_ENTRIES].sort((a, b) => a.slug.localeCompare(b.slug, "ja"));

  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "まなぶ", path: "/learn" },
          { name: "環境用語集", path: "/learn/glossary" },
        ]}
      />
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">環境用語集</h1>
          <ResourceLead>
            地球防衛群の活動・条例テンプレート・政策提言の理解を支える v0（27語）です。定義の正確さが必要な場面では一次資料へ遷移できるよう、各ページに出典を明記しています。
          </ResourceLead>
          <blockquote className="rounded-lg border-l-4 border-aqua bg-aqua-light/45 px-4 py-3 text-sm leading-relaxed text-text-secondary">
            本用語集は地球防衛群の活動・条例テンプレート・政策提言の理解を補助するために作成した参考資料です。各用語の解釈は学術的・行政的な議論があり得るため、正確性が必要な場面では一次資料を確認してください。
          </blockquote>

          {entries.length === 0 ? (
            <p className="text-[15px] text-text-secondary">
              現在、公開準備中の用語があります。コンテンツ投入後、この一覧から個別ページ（JSON-LD: DefinedTerm）へリンクされます。
            </p>
          ) : (
            <>
              <p className="mb-4 text-sm text-text-muted">{entries.length}語を公開中</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {entries.map((e) => (
                  <li key={e.slug} className="rounded-xl border border-border bg-white p-4 shadow-sm">
                    <Link href={`/learn/glossary/${e.slug}`} className="text-base font-semibold text-aqua-dark underline">
                      {e.term}
                    </Link>
                    {e.reading ? <p className="mt-1 text-xs text-text-muted">{e.reading}</p> : null}
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{e.shortDescription}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-sm">
                <Link href="/toolkit/ordinance" className="text-aqua-dark underline underline-offset-2">
                  条例テンプレート
                </Link>
                <span className="mx-2 text-text-muted">/</span>
                <Link href="/policy" className="text-aqua-dark underline underline-offset-2">
                  政策提言一覧
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
