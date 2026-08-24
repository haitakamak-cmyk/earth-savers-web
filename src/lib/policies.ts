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
  /** ISO 8601 日付（実質更新時のみ更新する） */
  dateModified?: string;
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

/** カテゴリ一覧ページ上部の説明（閲覧者向け／リポジトリのファイル名は表示しない） */
export const POLICY_KIND_PUBLIC_LEAD: Record<PolicyKind, string> = {
  national: "中央政府や国会議員に向けたメッセージや提言をまとめています。",
  local: "地方自治体との連携や条例に関わるモデルや提言をまとめています。",
  legislative: "法律・税制・制度の改善を国や都道府県に求める提言をまとめています。",
  "public-comments": "法令案などに対するパブリックコメント関連の書き起こし・立場をまとめています。",
  statements: "理念や評価に基づく声明などをまとめています。",
  petitions: "著名人との共同署名などの取り組みをまとめています。",
};

/** 公開前は空配列でも可 */
export const POLICIES: readonly PolicyEntry[] = [
  {
    slug: "farmland-food-water-resilience",
    kind: "legislative",
    title: "土と水は、誰が引き継ぐのか",
    subtitle:
      "――地域食料・水循環レジリエンス構想／農地を食・水・生態系・防災の国土インフラへ戻す――",
    summary:
      "農地は食料を生産すると同時に、雨水を貯留し、地下水を涵養し、生態系を支えている。しかしその機能は複数の制度と部局に分かれ、権限は国・県・市町村に割れ、全体を引き受ける主体がいない。本提言は、農地を国土インフラとして捉え直し、その公共機能に公が対価を支払う仕組みを求めるものである。設計の単位は流域に置き、時間軸は100年、動かす周期は20年とする。市区町村・都道府県・国のそれぞれに対して、現行制度で着手できることから順に提言する。",
    contentPath: "src/content/policies/farmland-food-water-resilience.md",
    datePublished: "2026-08-22",
    dateModified: "2026-08-23",
    requiresLegalCaveat: true,
    relatedToolkitPaths: ["/toolkit/ordinance", "/toolkit/disclosure-request"],
    relatedGlossarySlugs: [],
  },
  {
    slug: "landowner-beneficial-owner-disclosure",
    kind: "legislative",
    title: "土地取得における実質的支配者開示制度の創設に関する提言",
    subtitle:
      "――自治体の条例運用から見えた制度的空白について――",
    summary:
      "法人が土地を取得する際、最終的に誰が意思決定しているのかを自治体は把握できない。条例の届出では第一層の株主までしか見えず、その先を追う権限がないためだ。本提言は、この制度的空白を埋めるために、不動産取得時の実質的支配者の開示義務化を含む五つの措置を国に求めるものである。英国・EU・米国の先行制度とFATF勧告を踏まえ、日本の現行制度の課題を整理した。",
    contentPath:
      "src/content/policies/landowner-beneficial-owner-disclosure.md",
    datePublished: "2026-05-04",
    dateModified: "2026-07-25",
    requiresLegalCaveat: true,
    relatedToolkitPaths: ["/toolkit/ordinance"],
    relatedGlossarySlugs: [],
  },
];

export function policiesByKind(kind: PolicyKind): readonly PolicyEntry[] {
  return POLICIES.filter((p) => p.kind === kind);
}

/** 政策提言ハブのカード並び順（掲載が無い kind は表示しない） */
export const POLICY_HUB_KIND_ORDER: readonly PolicyKind[] = [
  "national",
  "local",
  "legislative",
  "public-comments",
  "statements",
  "petitions",
];

export function policyKindsWithPublicEntries(): readonly PolicyKind[] {
  return POLICY_HUB_KIND_ORDER.filter((k) => policiesByKind(k).length > 0);
}

/**
 * 掲載のあるカテゴリが2つ以上あるか。
 * 1つしかない間は、ハブでカテゴリ見出しを出さず提言を直接並べ、パンくずからも
 * カテゴリ階層を省く（カード1枚だけの中継ページを挟まないため）。
 * カテゴリが増えたら自動的に見出し付きの一覧へ戻る。
 */
export function hasMultiplePublicPolicyKinds(): boolean {
  return policyKindsWithPublicEntries().length > 1;
}

export function getPolicyBySlug(slug: string): PolicyEntry | undefined {
  return POLICIES.find((p) => p.slug === slug);
}

export function getAllPolicySlugs(): string[] {
  return POLICIES.map((p) => p.slug);
}
