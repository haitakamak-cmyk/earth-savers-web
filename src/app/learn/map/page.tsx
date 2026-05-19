import type { Metadata } from "next";
import Link from "next/link";

import NationalMapLoader from "@/components/NationalMapLoader";
import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ResourceLead } from "@/components/ResourceLead";
import { MAP_TOPIC_SLUG } from "@/lib/map-cases";

export const metadata: Metadata = {
  title: "全国マップ｜自然・水源・地域合意をめぐる事例",
  description:
    "大規模太陽光・風力発電の開発計画をめぐる主要事案の所在地を地図上にプロットし、事例集へのリンクとともに概要を表示します。",
  alternates: { canonical: "/learn/map" },
  openGraph: {
    title: "全国マップ｜自然・水源・地域合意をめぐる事例",
    description: "主要事案の所在地を地図で確認できます。",
    url: "/learn/map",
  },
};

export default function LearnMapPage() {
  return (
    <div className="bg-ivory pb-16">
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "学ぶ", path: "/learn" },
              { name: "全国マップ", path: "/learn/map" },
            ]}
          />
          <p className="text-xs font-medium uppercase tracking-wider text-wakakusa-dark">
            Resource / Learn · Map
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            自然・水源・地域合意をめぐる全国マップ
          </h1>
          <ResourceLead>
            事例集で整理した主要事案の所在地を、日本地図上で概略的に確認できます。マーカーをクリックすると概要と事例集へのリンクが表示されます。
          </ResourceLead>

          <aside className="mt-6 border-l-4 border-wakakusa bg-wakakusa-light/20 py-3 pl-4">
            <h2 className="font-serif text-base font-semibold text-text-primary">掲載方針</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              本マップは、
              <Link
                href={`/learn/topics/${MAP_TOPIC_SLUG}`}
                className="font-medium text-wakakusa-dark underline-offset-2 hover:underline"
              >
                事例集（再生可能エネルギー開発計画と地域対応の事例整理）
              </Link>
              で取り上げた事案の所在地を地図上に表示したものです。
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-text-secondary">
              <li>掲載対象は事例集で記載した事案に限定しています</li>
              <li>
                各マーカーの情報は事例集本文の要約であり、最新の状況は事例集本文および出典を参照してください
              </li>
              <li>特定の事業者・個人を非難する目的のものではありません</li>
              <li>
                位置情報は自治体単位の概略位置であり、個別の事業用地を特定するものではありません
              </li>
            </ul>
            <p className="mt-3 text-sm text-text-secondary">
              事案ごとの詳細な経緯と出典は事例集をご覧ください。
            </p>
          </aside>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <NationalMapLoader />

        <p className="mt-8 text-center">
          <Link
            href={`/learn/topics/${MAP_TOPIC_SLUG}`}
            className="inline-flex items-center justify-center rounded-lg border border-wakakusa bg-wakakusa px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-wakakusa-dark"
          >
            事例集を読む
          </Link>
        </p>
      </div>
    </div>
  );
}
