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
];

export function getAllTopicSlugs(): string[] {
  return TOPICS.map((t) => t.slug);
}

export function getTopicBySlug(slug: string): TopicEntry | undefined {
  return TOPICS.find((t) => t.slug === slug);
}
