import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ResourceLead } from "@/components/ResourceLead";
import {
  POLICY_KIND_LABEL,
  type PolicyKind,
} from "@/lib/policies";

export const metadata: Metadata = {
  title: "政策提言（資料室）",
  description:
    "条例では対応できない制度的課題について、国や都道府県に対して法改正・制度整備を求める提言をまとめたコーナーです。実務資料やひな型はひな形・資料で扱います。",
  alternates: { canonical: "/policy" },
  openGraph: {
    title: "政策提言（資料室）",
    description:
      "国・都道府県への法改正・制度整備の提言。カテゴリ別に整理し、実務のひな型は別コーナーで提供します。",
    url: "/policy",
  },
};

const KIND_ORDER: PolicyKind[] = [
  "national",
  "local",
  "legislative",
  "public-comments",
  "statements",
  "petitions",
];

export default function PolicyHubPage() {
  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "政策提言", path: "/policy" },
        ]}
      />
      <div className="border-b border-aqua/25 bg-aqua-light/35 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-aqua-dark">
            Resource / Policy
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            政策提言
          </h1>
          <ResourceLead>
            条例では対応できない制度的課題について、国や都道府県に対して法改正・制度整備を求める提言をまとめたセクションです。実務資料やひな型は{" "}
            <Link href="/toolkit" className="text-aqua-dark underline underline-offset-2">
              ひな形・資料
            </Link>
            側で扱います。
          </ResourceLead>
          <ul className="space-y-3">
            {KIND_ORDER.map((kind) => (
              <li key={kind}>
                <Link
                  href={`/policy/${kind}`}
                  className="block rounded-xl border border-border bg-white px-4 py-4 text-[15px] font-medium text-text-primary shadow-sm transition-colors hover:border-aqua/35 hover:bg-aqua-light/25"
                >
                  {POLICY_KIND_LABEL[kind]}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-text-muted">
            個別の提言ページは一覧から順次リンクされます（データは{" "}
            <code className="rounded bg-white px-1 text-xs">src/lib/policies.ts</code> に集約）。
          </p>
        </div>
      </div>
    </div>
  );
}
