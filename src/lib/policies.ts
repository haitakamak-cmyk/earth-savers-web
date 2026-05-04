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
  /** 一覧・ページ上部での副題表示（任意） */
  subtitle?: string;
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
    title: "土地取得における実質的支配者開示制度の創設に関する提言",
    subtitle:
      "――自治体の条例運用から見えた制度的空白について――",
    summary:
      "市町村向け条例ひな形での第一層届出だけでは実質的支配者まで追跡できないという現場の限界から、法人の土地・不動産取得時に自然人支配者開示・第三者検証・自治体の限定的アクセスなどを国法で義務化する五点を整理。英国ROE／EU AML／米国CTA／FATF勧告24の動向と日本の実質的支配者リストの任意性・株式会社限定・不動産非連動を対比する。",
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
