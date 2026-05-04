/** 条例ひな型ページ／補助資料ハブで共通利用 */
export const ORDINANCE_SUPPLEMENTS_SECTION_TITLE = "条例導入を支える補助資料";

export const ORDINANCE_SUPPLEMENTS_SECTION_INTRO =
  "自治体が条例を導入・運用する各段階で活用できる4種の補助資料を提供します。いずれも参考資料であり、最終条文はご担当の法務・顧問弁護士レビューを前提としてください。";

export type OrdinanceSupplementEntry = {
  slug: string;
  title: string;
  shortDescription: string;
  contentPath: string;
  publishedAt: string;
  updatedAt: string;
  audience: string[];
  requiresLegalCaveat: boolean;
};

/** `/toolkit/ordinance/[slug]` 用（sitemap 等はこのファイルのみ import して fs を引かない） */
export const ORDINANCE_SUPPLEMENTS: readonly OrdinanceSupplementEntry[] = [
  {
    slug: "rules",
    title: "施行規則 骨子案",
    shortDescription:
      "条例本則から委任される事項について、規則レベルで定める内容の骨子と、自治体類型別のパラメータ調整案を整理した。",
    contentPath: "src/content/ordinance-supplements/rules.md",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    audience: ["自治体法務担当者", "顧問弁護士"],
    requiresLegalCaveat: true,
  },
  {
    slug: "adoption-guide",
    title: "自治体導入ガイド・チェックリスト",
    shortDescription:
      "5つの自治体類型（山間町村、中山間市町、平野農村、沿岸・風力混在、都市近郊）に応じたパラメータ調整、導入フローのチェックリストを提供する。",
    contentPath: "src/content/ordinance-supplements/adoption-guide.md",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    audience: ["自治体担当者", "首長", "議会事務局"],
    requiresLegalCaveat: true,
  },
  {
    slug: "qa-council",
    title: "議会想定問答集",
    shortDescription:
      "条例案の議会審議で想定される質疑35問への答弁例。条例の必要性・再エネとの整合性・財産権・既存施設対応・実効性・住民保護・他制度との関係の7カテゴリ。",
    contentPath: "src/content/ordinance-supplements/qa-council.md",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    audience: ["自治体担当者", "議会事務局", "首長"],
    requiresLegalCaveat: true,
  },
  {
    slug: "qa-public",
    title: "パブリックコメント回答集",
    shortDescription:
      "パブリックコメントで想定される事業者・住民からの意見30種類への定型回答のひな型。対応区分（反映・既盛込・参考・対応困難・関係なし）別の整理。",
    contentPath: "src/content/ordinance-supplements/qa-public.md",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    audience: ["自治体担当者", "パブコメ担当者"],
    requiresLegalCaveat: true,
  },
] as const;

/** 一覧の表示順（導入ガイド優先など） */
export const ORDINANCE_SUPPLEMENT_LIST_ORDER = [
  "adoption-guide",
  "qa-council",
  "qa-public",
  "rules",
] as const satisfies readonly OrdinanceSupplementEntry["slug"][];

export function getOrdinanceSupplementBySlug(slug: string): OrdinanceSupplementEntry | undefined {
  return ORDINANCE_SUPPLEMENTS.find((e) => e.slug === slug);
}

export function getAllOrdinanceSupplementSlugs(): string[] {
  return ORDINANCE_SUPPLEMENTS.map((e) => e.slug);
}
