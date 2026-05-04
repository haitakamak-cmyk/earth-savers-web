export type PolicyKind =
  | "national"
  | "local"
  | "legislative"
  | "public-comments"
  | "statements"
  | "petitions";

export type PolicyEntry = {
  slug: string;
  kind: PolicyKind;
  title: string;
  /** 一覧用リード・OG 説明など */
  summary: string;
  /** 詳細本文（contentPath 未指定時のフォールバック。段落分割で表示）。 */
  body?: string;
  /** Markdown 全文を `src/content/policies/` に配置している場合のパス（リポジトリルート相対）。指定時は MarkdownArticle で表示する。 */
  contentPath?: string;
  /** ISO 8601 日付（Article JSON-LD 用） */
  datePublished?: string;
  /** 想定読者（任意・本文上部表示） */
  audience?: readonly string[];
  /** 制度・法令系の改正注意を出すか（個別ページ末尾の ContentDisclaimer 用） */
  requiresLegalCaveat?: boolean;
  relatedToolkitPaths?: readonly string[];
  relatedGlossarySlugs?: readonly string[];
  relatedLawAnchors?: readonly string[];
};

export const POLICY_KIND_LABEL: Record<PolicyKind, string> = {
  national: "中央政府・議員向けメッセージ",
  local: "地方自治体との連携モデル／条例",
  legislative: "法律・税制・制度への提言パッケージ",
  "public-comments": "パブリックコメント",
  statements: "理念・評価に基づく声明",
  petitions: "著名人との共同署名",
};

/** 公開前は空配列でも可 */
export const POLICIES: readonly PolicyEntry[] = [
  {
    slug: "landowner-beneficial-owner-disclosure",
    kind: "legislative",
    title:
      "土地取得における実質的支配者開示制度の創設に関する提言──FATF勧告24・英国 Register of Overseas Entities との整合に向けて",
    summary:
      "土地・不動産取得時の実質的支配者（自然人）開示と第三者検証を国制度として求める提言。英国 Register of Overseas Entities（2022年8月施行）・EU マネロン指令・米国 Corporate Transparency Act・FATF 勧告24（2023年改訂）との整合を軸に、自治体条例で執行不能な範囲を国法で補完する5つの提言を整理。",
    contentPath:
      "src/content/policies/landowner-beneficial-owner-disclosure.md",
    datePublished: "2026-05-04",
    audience: [
      "環境省",
      "経済産業省",
      "国土交通省",
      "法務省",
      "金融庁",
      "国会議員",
      "地方議会",
    ],
    requiresLegalCaveat: true,
    relatedToolkitPaths: ["/toolkit/ordinance"],
    relatedGlossarySlugs: [],
  },
];

export function policiesByKind(kind: PolicyKind): readonly PolicyEntry[] {
  return POLICIES.filter((p) => p.kind === kind);
}

export function getPolicyBySlug(slug: string): PolicyEntry | undefined {
  return POLICIES.find((p) => p.slug === slug);
}

export function getAllPolicySlugs(): string[] {
  return POLICIES.map((p) => p.slug);
}
