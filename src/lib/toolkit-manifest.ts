import {
  ORDINANCE_SUPPLEMENTS_SECTION_INTRO,
  ORDINANCE_SUPPLEMENTS_SECTION_TITLE,
} from "./ordinance-supplements-data";

export type ToolkitFileStatus = "published" | "preparing";

export type ToolkitFileEntry = {
  title: string;
  filename: string;
  /**
   * HTML 表示用のパス `/toolkit/.../この値`（英数字スラッグ）。
   * セクション直下1ページのみの運用（実務チェックリスト）では省略可。
   */
  viewSlug?: string;
  description: string;
  status: ToolkitFileStatus;
};

export type ToolkitSection = {
  label: string;
  href:
    | "/toolkit/ordinance"
    | "/toolkit/legal"
    | "/toolkit/operations"
    | "/toolkit/cases"
    | "/toolkit/supplements";
  subdir: "ordinance" | "legal" | "operations" | "cases" | "supplements";
  description: string;
  files: readonly ToolkitFileEntry[];
};

/** ツールキット一覧（関連リンク生成・ツールハブでのカード一覧） */
export const TOOLKIT_SECTIONS: readonly ToolkitSection[] = [
  {
    label: "条例ひな型",
    href: "/toolkit/ordinance",
    subdir: "ordinance",
    description:
      "水源・農地・森林の保全と土地開発行為の適正化に関する条例のひな型案です。条例本文、逐条解説、別表を含みます。採用に際しては必ず法務担当者・顧問弁護士と協議のうえ、地域の実情に合わせて修正してください。",
    files: [
      {
        title: "条例本文＋逐条解説",
        filename: "条例テンプレ_v0_暫定版.md",
        description: "条例本文、逐条解説、全条・附則・別表を含むMarkdown原本です。",
        status: "published",
      },
    ],
  },
  {
    label: "法律ガイド",
    href: "/toolkit/legal",
    subdir: "legal",
    description:
      "条例制定にあたって確認すべき上位法との関係、都道府県条例との調整手順、条例の適法性を支持した判例の要点をまとめています。",
    files: [
      {
        title: "上位法との関係整理",
        filename: "上位法との関係整理.md",
        viewSlug: "upper-law-relations",
        description:
          "再エネ特措法・森林法・盛土規制法・文化財保護法・景観法・地域生物多様性増進法と条例の関係を整理する予定です。",
        status: "preparing",
      },
      {
        title: "県条例との調整チェックシート",
        filename: "県条例との調整チェックシート.md",
        viewSlug: "prefectural-ordinance-checklist",
        description: "県条例が既にある場合の上乗せ・横出し確認手順を整理する予定です。",
        status: "preparing",
      },
      {
        title: "判例サマリ",
        filename: "判例サマリ.md",
        viewSlug: "case-law-summary",
        description: "条例の適法性を支持した裁判例の要点を整理する予定です。",
        status: "preparing",
      },
    ],
  },
  {
    label: "実務チェックリスト",
    href: "/toolkit/operations",
    subdir: "operations",
    description:
      "施行初日に窓口が止まらないよう、窓口フロー・届出チェックリスト・FAQ・台帳・年次カレンダー・エスカレーションの「決めておくこと」を、引き継ぎメモのトーンで整理したガイドです。様式は各自治体で作成してください。",
    files: [
      {
        title: "条例運用設計ガイド",
        filename: "条例運用設計ガイド.md",
        description:
          "窓口フロー・届出チェックリスト・台帳・カレンダー・エスカレーション・FAQを、現場の引き継ぎを想定した書き方で整理したガイドです。",
        status: "published",
      },
    ],
  },
  {
    label: ORDINANCE_SUPPLEMENTS_SECTION_TITLE,
    href: "/toolkit/supplements",
    subdir: "supplements",
    description: ORDINANCE_SUPPLEMENTS_SECTION_INTRO,
    files: [],
  },
  {
    label: "導入・訴訟事例",
    href: "/toolkit/cases",
    subdir: "cases",
    description:
      "全国の自治体における条例導入事例、裁判で条例の適法性が認められた判例、条例がなかったために開発を防げなかった事例をまとめています。",
    files: [
      {
        title: "導入事例・判例集",
        filename: "導入事例・判例集.md",
        viewSlug: "case-studies-and-precedents",
        description:
          "全国の条例導入自治体事例、裁判で条例が支持された判例概要、条例がなかったために防げなかった事例を整理する予定です。",
        status: "preparing",
      },
    ],
  },
] as const;

export const TOOLKIT_LINKS = TOOLKIT_SECTIONS.map(({ label, href }) => ({ label, href }));

/** ハブ一覧・サイトマップ用: 公開済み資料が1件以上あるセクション、または補助資料ハブ */
export function toolkitSectionHasPublishedContent(section: ToolkitSection): boolean {
  if (section.href === "/toolkit/supplements") return true;
  return section.files.some((file) => file.status === "published");
}

export const TOOLKIT_HUB_VISIBLE_SECTIONS: readonly ToolkitSection[] =
  TOOLKIT_SECTIONS.filter(toolkitSectionHasPublishedContent);

export const TOOLKIT_SUBDIRS = Object.fromEntries(
  TOOLKIT_SECTIONS.map((section) => [section.href, section.subdir]),
) as Record<ToolkitSection["href"], ToolkitSection["subdir"]>;

export function getToolkitSectionByHref(href: ToolkitSection["href"]): ToolkitSection {
  const section = TOOLKIT_SECTIONS.find((item) => item.href === href);
  if (!section) throw new Error(`Unknown toolkit section: ${href}`);
  return section;
}

/** 法律ガイド・導入事例など、`viewSlug` 付きで HTML 表示するセクション用 */
export function getToolkitFileBySubdirAndViewSlug(
  subdir: "legal" | "cases",
  viewSlug: string,
): { section: ToolkitSection; file: ToolkitFileEntry } | undefined {
  const section = TOOLKIT_SECTIONS.find((s) => s.subdir === subdir);
  if (!section) return undefined;
  const file = section.files.find((f) => f.viewSlug === viewSlug);
  if (!file) return undefined;
  return { section, file };
}

export function getToolkitViewerSlugs(subdir: "legal" | "cases"): string[] {
  const section = TOOLKIT_SECTIONS.find((s) => s.subdir === subdir);
  if (!section) return [];
  return section.files
    .filter((f) => f.status === "published")
    .map((f) => f.viewSlug)
    .filter((s): s is string => Boolean(s));
}

/** sitemap 用: 公開済みの `/toolkit/legal/foo` 形式のみ（準備中の viewer は含めない） */
export function getAllToolkitMarkdownViewerPaths(): string[] {
  const paths: string[] = [];
  for (const section of TOOLKIT_SECTIONS) {
    if (!toolkitSectionHasPublishedContent(section)) continue;
    for (const f of section.files) {
      if (f.status !== "published" || !f.viewSlug) continue;
      paths.push(`${section.href}/${f.viewSlug}`);
    }
  }
  return paths;
}

/** サイトマップ: `/toolkit` と公開中セクションの index のみ */
export function getToolkitSitemapHubPaths(): readonly string[] {
  return [
    "/toolkit",
    ...TOOLKIT_HUB_VISIBLE_SECTIONS.map((s) => s.href),
  ];
}
