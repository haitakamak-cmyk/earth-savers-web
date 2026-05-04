import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ResourceLead } from "@/components/ResourceLead";
import {
  POLICY_KIND_LABEL,
  POLICY_KIND_PUBLIC_LEAD,
  policyKindsWithPublicEntries,
} from "@/lib/policies";

import { POLICY_KIND_PATH } from "./policy-kind-path";

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

export default function PolicyHubPage() {
  const kinds = policyKindsWithPublicEntries();
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
            条例のみでは済まない制度課題について、国や都道府県に求める見解や提言をカテゴリ別に載せています。実務で使うひな型や資料は{" "}
            <Link href="/toolkit" className="text-aqua-dark underline underline-offset-2">
              ひな形・資料
            </Link>
            をご覧ください。
          </ResourceLead>
          <ul className="grid gap-4 sm:grid-cols-2">
            {kinds.map((kind) => (
              <li key={kind}>
                <Link
                  href={`/policy/${POLICY_KIND_PATH[kind]}`}
                  className="flex h-full flex-col rounded-xl border border-border bg-white px-4 py-4 shadow-sm transition-colors hover:border-aqua/35 hover:bg-aqua-light/25"
                >
                  <span className="font-serif text-lg font-semibold text-text-primary">
                    {POLICY_KIND_LABEL[kind]}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {POLICY_KIND_PUBLIC_LEAD[kind]}
                  </span>
                  <span className="mt-4 text-sm font-semibold text-aqua-dark underline-offset-4">
                    一覧を見る →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
