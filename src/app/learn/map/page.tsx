import type { Metadata } from "next";
import Link from "next/link";

import NationalMapLoader from "@/components/NationalMapLoader";
import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ResourceLead } from "@/components/ResourceLead";
import {
  CATEGORY_META,
  hrefForMapCase,
  MAP_CASES,
  MAP_TOPIC_SLUG,
  type MapCase,
  type MapCaseCategory,
} from "@/lib/map-cases";

/** ページ内メタ情報（更新時にここだけ変える） */
const MAP_META = {
  lastUpdated: "2026年5月20日",
  caseCount: MAP_CASES.length,
  dataVersion: "v2.0",
} as const;

export const metadata: Metadata = {
  title: "全国マップ｜自然・水源・地域合意をめぐる事例",
  description:
    "自然環境、水源、森林、地域合意に関わる開発・環境事案の所在地を、公開情報と事例集へのリンクとともに地図上で確認できます。",
  alternates: { canonical: "/learn/map" },
  openGraph: {
    title: "全国マップ｜自然・水源・地域合意をめぐる事例",
    description:
      "自然環境、水源、森林、地域合意に関わる事案の所在地を地図で確認できます。",
    url: "/learn/map",
  },
};

/* ------------------------------------------------------------------ */
/*  一覧表コンポーネント                                                */
/* ------------------------------------------------------------------ */
function CaseListTable({ cases }: { cases: MapCase[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-wakakusa/25 text-xs text-text-muted">
            <th className="whitespace-nowrap py-2 pr-3 font-medium">地域</th>
            <th className="whitespace-nowrap py-2 pr-3 font-medium">分類</th>
            <th className="whitespace-nowrap py-2 pr-3 font-medium">事案名</th>
            <th className="whitespace-nowrap py-2 pr-3 font-medium">ステータス</th>
            <th className="whitespace-nowrap py-2 font-medium">詳細</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-wakakusa/10">
          {cases.map((c) => {
            const meta = CATEGORY_META[c.category];
            const href = hrefForMapCase(c);
            const isInternal = !!c.topicAnchor;
            return (
              <tr key={c.id} className="text-text-secondary">
                <td className="whitespace-nowrap py-2 pr-3">
                  {c.prefecture}
                  {c.city}
                </td>
                <td className="whitespace-nowrap py-2 pr-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full border border-white shadow-sm"
                      style={{ backgroundColor: meta.hex }}
                    />
                    {meta.label}
                  </span>
                </td>
                <td className="min-w-[8rem] py-2 pr-3 font-medium text-text-primary">{c.title}</td>
                <td className="whitespace-nowrap py-2 pr-3">
                  <span className="rounded bg-wakakusa-light/50 px-1.5 py-0.5 text-xs text-wakakusa-dark">
                    {c.status}
                  </span>
                </td>
                <td className="whitespace-nowrap py-2">
                  {href && isInternal && (
                    <Link
                      href={href}
                      className="text-wakakusa-dark underline-offset-2 hover:underline"
                    >
                      事例集&nbsp;→
                    </Link>
                  )}
                  {href && !isInternal && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-wakakusa-dark underline-offset-2 hover:underline"
                    >
                      {c.sourceLabel ?? "出典"}&nbsp;↗
                    </a>
                  )}
                  {!href && <span className="text-text-muted">—</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ページ本体                                                         */
/* ------------------------------------------------------------------ */
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
            このマップは、自然環境・水源・森林・地域合意に関わる開発事案について、公開情報に基づき所在地を概略的に示したものです。各事案の評価や判断ではなく、地域で生じている論点を知るための入口としてご覧ください。
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
              で取り上げた事案と、サイト内のトピック記事で整理している関連事案の所在地を地図上に表示したものです。
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-text-secondary">
              <li>掲載対象は事例集およびサイト内トピック記事で取り上げた事案、またはそれらと関連する公開報道に基づく事案です</li>
              <li>
                掲載内容は、各事案についての賛否を示すものではなく、公開情報に基づき地域で生じている論点を整理するものです
              </li>
              <li>
                各マーカーの情報は要約であり、最新の状況は各記事本文および出典を参照してください
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

        {/* 更新情報 */}
        <p className="mt-3 text-right text-xs text-text-muted">
          最終更新：{MAP_META.lastUpdated}　／　掲載件数：{MAP_META.caseCount}件　／　データ版：{MAP_META.dataVersion}
        </p>

        {/* 一覧表 */}
        <section className="mt-10">
          <h2 className="font-serif text-xl font-bold text-text-primary">掲載事案一覧</h2>
          <p className="mt-1 text-sm text-text-muted">
            地図が表示されない環境でも、以下の一覧から各事案を確認できます。
          </p>
          <div className="mt-4 rounded-xl border border-wakakusa/25 bg-white p-4 shadow-sm sm:p-6">
            <CaseListTable cases={MAP_CASES} />
          </div>
        </section>

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
