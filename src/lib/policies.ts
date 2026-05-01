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
  /** 詳細本文（サイト表示） */
  body: string;
  /** ISO 8601 日付（Article JSON-LD 用） */
  datePublished?: string;
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
export const POLICIES: readonly PolicyEntry[] = [];

export function policiesByKind(kind: PolicyKind): readonly PolicyEntry[] {
  return POLICIES.filter((p) => p.kind === kind);
}

export function getPolicyBySlug(slug: string): PolicyEntry | undefined {
  return POLICIES.find((p) => p.slug === slug);
}

export function getAllPolicySlugs(): string[] {
  return POLICIES.map((p) => p.slug);
}
