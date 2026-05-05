export type TopicEntry = {
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  publishedAt: string;
  updatedAt: string;
  contentPath: string;
  relatedGlossarySlugs: string[];
  relatedOrdinanceArticles?: string[];
  category?:
    | "biodiversity"
    | "water"
    | "land-use"
    | "energy"
    | "governance";
  requiresLegalCaveat?: boolean;
};

export const TOPICS: TopicEntry[] = [
  {
    slug: "oecm-30by30",
    title: "OECMと30by30——日本の生物多様性戦略と民間主体の役割",
    subtitle: "保護地域だけでは守れない、これからの自然保全のかたち",
    shortDescription:
      "OECMと30by30の国際枠組み、日本の自然共生サイト認定制度、生物多様性増進活動促進法を解説し、自治体・地域住民・NPO・企業の役割を整理する。",
    publishedAt: "2026-05-02",
    updatedAt: "2026-05-02",
    contentPath: "src/content/topics/oecm-30by30.md",
    relatedGlossarySlugs: [
      "30by30",
      "oecm",
      "nature-coexistence-site",
      "nature-positive",
      "kunming-montreal-framework",
      "biodiversity-promotion-act",
      "tnfd",
    ],
    relatedOrdinanceArticles: ["第5条第1項第5号", "第29条"],
    category: "biodiversity",
    requiresLegalCaveat: true,
  },
  {
    slug: "dam-reassessment",
    title: "ダムと川のこれから——3,000基の再評価と、日本の治水を問い直すとき",
    subtitle: "第1話｜荒瀬ダムが撤去された日",
    shortDescription:
      "2018年、熊本県の荒瀬ダムが日本初の本格撤去を完了した。発電専用ダムが姿を消した翌年から、球磨川の生態系は予想を超える速度で回復し始める。3,000基とも言われる日本のダムを、流域の水循環と生態系を基準に再評価する——その出発点として、荒瀬ダムが示したものを記録する。",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    contentPath: "src/content/topics/dam-reassessment.md",
    relatedGlossarySlugs: ["water-cycle-basic-act", "ecosystem-services"],
    category: "water",
    requiresLegalCaveat: true,
  },
  {
    slug: "dam-reassessment-2",
    title: "ダムと川のこれから——3,000基の再評価と、日本の治水を問い直すとき",
    subtitle: "第2話｜欧米では、ダムを壊すことが戦略になっている",
    shortDescription:
      "2024年、欧州23カ国で542基の河川障壁が撤去された。米国ではエルワ川で高さ64メートルのダムが消え、絶滅寸前だったサケが帰ってきた。世界の動きを踏まえたうえで、日本に何が持ち込めて何が持ち込めないのかを考える。",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    contentPath: "src/content/topics/dam-reassessment-2.md",
    relatedGlossarySlugs: ["water-cycle-basic-act", "ecosystem-services"],
    category: "water",
    requiresLegalCaveat: true,
  },
];

export function getAllTopicSlugs(): string[] {
  return TOPICS.map((t) => t.slug);
}

export function getTopicBySlug(slug: string): TopicEntry | undefined {
  return TOPICS.find((t) => t.slug === slug);
}
