import type { Metadata } from "next";
import Link from "next/link";

import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ResourceLead } from "@/components/ResourceLead";
import {
  POLICY_KIND_LABEL,
  hasMultiplePublicPolicyKinds,
  policiesByKind,
  policyKindsWithPublicEntries,
} from "@/lib/policies";

import { PolicyEntryCard } from "./PolicyEntryCard";
import { POLICY_KIND_PATH } from "./policy-kind-path";

export const metadata: Metadata = {
  title: "政策提言（資料室）",
  description:
    "条例では対応できない制度的課題について、国や都道府県に対して法改正・制度整備を求める提言をまとめたコーナーです。実務資料やひな型はひな形・資料で扱います。",
  alternates: { canonical: "/policy" },
  openGraph: {
    title: "政策提言（資料室）",
    description:
      "国・都道府県への法改正・制度整備の提言。実務のひな型は別コーナーで提供します。",
    url: "/policy",
  },
};

export default function PolicyHubPage() {
  const kinds = policyKindsWithPublicEntries();
  // カテゴリが1つの間はカテゴリ見出しを出さず、提言をそのまま並べる
  const showKindHeadings = hasMultiplePublicPolicyKinds();
  return (
    <div className="bg-ivory">
      <div className="border-b border-aqua/25 bg-aqua-light/35 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            tone="aqua"
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "政策提言", path: "/policy" },
            ]}
          />
          <p className="text-xs font-medium uppercase tracking-wider text-aqua-dark">
            Resource / Policy
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            政策提言
          </h1>
          <ResourceLead>
            条例のみでは済まない制度課題について、国や都道府県に求める見解や提言を載せています。実務で使うひな型や資料は{" "}
            <Link href="/toolkit" className="text-aqua-dark underline underline-offset-2">
              ひな形・資料
            </Link>
            をご覧ください。
          </ResourceLead>
          {kinds.map((kind) => (
            <section key={kind} className={showKindHeadings ? "mt-8 first:mt-0" : ""}>
              {showKindHeadings ? (
                <h2 className="mb-3 font-serif text-xl font-semibold text-text-primary">
                  <Link
                    href={`/policy/${POLICY_KIND_PATH[kind]}`}
                    className="underline-offset-4 hover:text-aqua-deep hover:underline"
                  >
                    {POLICY_KIND_LABEL[kind]}
                  </Link>
                </h2>
              ) : null}
              <ul className="space-y-4">
                {policiesByKind(kind).map((policy) => (
                  <li key={policy.slug}>
                    <PolicyEntryCard policy={policy} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
