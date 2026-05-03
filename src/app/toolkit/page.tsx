import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ResourceLead } from "@/components/ResourceLead";
import { TOOLKIT_LINKS } from "@/lib/toolkit-manifest";

export const metadata: Metadata = {
  title: "ひな形・資料（資料室）",
  description:
    "条例ひな形、法律ガイド、実務チェックリスト、導入・訴訟事例など、自治体・市民の皆さまが水源や里山を守る活動に使える実務情報を整理するコーナーです。トーンは中立で、政治的主張は政策提言ページで扱います。",
  alternates: { canonical: "/toolkit" },
  openGraph: {
    title: "ひな形・資料（資料室）",
    description:
      "条例・法律・チェックリスト・事例など、水源保全の実務に使える情報を整理するコーナーです。",
    url: "/toolkit",
  },
};

export default function ToolkitHubPage() {
  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "ひな形・資料", path: "/toolkit" },
        ]}
      />
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-wakakusa-dark">
            資料室 / ひな形・資料
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            ひな形・資料
          </h1>
          <ResourceLead>
            自治体・市民の皆さまが、水源や里山を守る活動に使える「型」と「観点」をまとめたコーナーです。政治的主張やキャンペーンは
            <Link href="/policy" className="text-aqua-dark underline underline-offset-2">
              政策提言
            </Link>
            で扱い、ここではできるだけ中立的な実務情報に絞ります。
          </ResourceLead>
          <ul className="space-y-3">
            {TOOLKIT_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl border border-border bg-white px-4 py-4 text-[15px] font-medium text-text-primary shadow-sm transition-colors hover:border-wakakusa/40 hover:bg-wakakusa-light/40"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
