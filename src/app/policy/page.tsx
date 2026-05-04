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
    "中央政府・地方自治体・立法・パブコメ・声明・共同署名まで、わたしたちが社会に届けたいメッセージと提言を体系立てて掲載するコーナーです。理念と実績評価に基づく立場表明はこちらで扱います。",
  alternates: { canonical: "/policy" },
  openGraph: {
    title: "政策提言（資料室）",
    description:
      "国・自治体・法制度への提言、パブコメ、声明、署名活動までを一覧するコーナーです。",
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
            メッセージ性の高いキャンペーン・理念に基づく声明や共同署名などは、この「政策提言」セクションで扱います。実務資料やひな型の中立整理は{" "}
            <Link href="/toolkit" className="text-aqua-dark underline underline-offset-2">
              ひな形・資料
            </Link>
            側へ分け、「読み込みたい順番」を迷わせない構成にします。
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
