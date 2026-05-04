export type ToolkitFileStatus = "published" | "preparing";

export type ToolkitFileEntry = {
  title: string;
  filename: string;
  description: string;
  status: ToolkitFileStatus;
};

export type ToolkitSection = {
  label: string;
  href: "/toolkit/ordinance" | "/toolkit/law-guide" | "/toolkit/checklist" | "/toolkit/case-studies";
  subdir: "ordinance" | "legal" | "operations" | "cases";
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
    href: "/toolkit/law-guide",
    subdir: "legal",
    description:
      "条例制定にあたって確認すべき上位法との関係、都道府県条例との調整手順、条例の適法性を支持した判例の要点をまとめています。",
    files: [
      {
        title: "上位法との関係整理",
        filename: "上位法との関係整理.md",
        description:
          "再エネ特措法・森林法・盛土規制法・文化財保護法・景観法・地域生物多様性増進法と条例の関係を整理する予定です。",
        status: "preparing",
      },
      {
        title: "県条例との調整チェックシート",
        filename: "県条例との調整チェックシート.md",
        description: "県条例が既にある場合の上乗せ・横出し確認手順を整理する予定です。",
        status: "preparing",
      },
      {
        title: "判例サマリ",
        filename: "判例サマリ.md",
        description: "条例の適法性を支持した裁判例の要点を整理する予定です。",
        status: "preparing",
      },
    ],
  },
  {
    label: "実務チェックリスト",
    href: "/toolkit/checklist",
    subdir: "operations",
    description:
      "条例を現場で運用するために整備すべきツール（窓口フロー、届出受理チェックリスト、案件管理台帳、年次カレンダー、エスカレーション基準表、窓口FAQ）の設計仕様をまとめたガイドです。具体の様式は各自治体の環境に合わせて作成してください。",
    files: [
      {
        title: "条例運用設計ガイド",
        filename: "条例運用設計ガイド.md",
        description:
          "窓口フローチャート・届出受理チェックリスト・案件管理台帳・年次カレンダー・エスカレーション基準表・窓口FAQの設計仕様書です。",
        status: "published",
      },
    ],
  },
  {
    label: "導入・訴訟事例",
    href: "/toolkit/case-studies",
    subdir: "cases",
    description:
      "全国の自治体における条例導入事例、裁判で条例の適法性が認められた判例、条例がなかったために開発を防げなかった事例をまとめています。",
    files: [
      {
        title: "導入事例・判例集",
        filename: "導入事例・判例集.md",
        description:
          "全国の条例導入自治体事例、裁判で条例が支持された判例概要、条例がなかったために防げなかった事例を整理する予定です。",
        status: "preparing",
      },
    ],
  },
] as const;

export const TOOLKIT_LINKS = TOOLKIT_SECTIONS.map(({ label, href }) => ({ label, href }));

export const TOOLKIT_SUBDIRS = Object.fromEntries(
  TOOLKIT_SECTIONS.map((section) => [section.href, section.subdir]),
) as Record<ToolkitSection["href"], ToolkitSection["subdir"]>;

export function getToolkitSectionByHref(href: ToolkitSection["href"]): ToolkitSection {
  const section = TOOLKIT_SECTIONS.find((item) => item.href === href);
  if (!section) throw new Error(`Unknown toolkit section: ${href}`);
  return section;
}
