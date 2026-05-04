import type { Metadata } from "next";
import Link from "next/link";

import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ResourceLead } from "@/components/ResourceLead";
import { TOOLKIT_HUB_VISIBLE_SECTIONS } from "@/lib/toolkit-manifest";

export const metadata: Metadata = {
  title: "ひな形・資料（資料室）",
  description:
    "現在公開している条例ひな型・実務チェックリストなど、自治体・市民の皆さまが水源や里山を守る活動に使える実務資料を並べています。「法律ガイド」「導入・訴訟事例」等はコンテンツ整備後に追加します。",
  alternates: { canonical: "/toolkit" },
  openGraph: {
    title: "ひな形・資料（資料室）",
    description:
      "公開中の条例ひな型・実務チェックリストなどへの入口です。その他カテゴリは順次追加予定です。",
    url: "/toolkit",
  },
};

export default function ToolkitHubPage() {
  return (
    <div className="bg-ivory">
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "ひな形・資料", path: "/toolkit" },
            ]}
          />
          <p className="text-xs font-medium uppercase tracking-wider text-wakakusa-dark">
            Resource / Toolkit
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
          <ul className="grid gap-4 sm:grid-cols-2">
            {TOOLKIT_HUB_VISIBLE_SECTIONS.map((item) => {
              const preparing = item.files.some((file) => file.status === "preparing");
              return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col rounded-xl border border-border bg-white px-4 py-4 shadow-sm transition-colors hover:border-wakakusa/40 hover:bg-wakakusa-light/40"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-lg font-semibold text-text-primary">
                      {item.label}
                    </span>
                    {preparing ? (
                      <span className="rounded-full border border-aqua/30 bg-aqua-light/40 px-2 py-0.5 text-xs font-semibold text-aqua-dark">
                        準備中あり
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </span>
                  <span className="mt-4 text-sm font-semibold text-aqua-dark underline-offset-4">
                    資料を見る →
                  </span>
                </Link>
              </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
