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

/** `/learn/topics` で1枚のカードにまとめる連載（各話は従来どおり別URL） */
export type TopicSeriesListItem = {
  key: string;
  title: string;
  /** 一覧カードに出す連載全体の概要 */
  overview: string;
  /** 並び順＝話数（先頭が1話） */
  episodeSlugs: readonly string[];
};

export const TOPIC_SERIES_LIST: readonly TopicSeriesListItem[] = [
  {
    key: "dam-and-rivers",
    title: "ダムと川のこれから——3,000基の再評価と、日本の治水を問い直すとき",
    overview:
      "2018年、熊本県の荒瀬ダムが撤去された。翌年から球磨川の干潟に砂が戻り、川底の生物種が10年前の7倍に増えた。日本には河川法上のダムだけで約1,500基。竣工50年を超えたものが2割を占め、堆砂で洪水調節容量を失いつつあるものは300基を超える。世界では欧州・米国が撤去を戦略として進め、日本は制度のないまま構造物だけが老いていく。この連載は、3,000基を流域の水循環と安全から問い直す記録だ。",
    episodeSlugs: [
      "dam-reassessment",
      "dam-reassessment-2",
      "dam-reassessment-3",
      "dam-reassessment-4",
    ],
  },
];

/** 一覧では連載カードに吸い上げるため、このスラッグは単独カードにしない */
export function topicSlugsBundledIntoSeries(): ReadonlySet<string> {
  return new Set(TOPIC_SERIES_LIST.flatMap((s) => s.episodeSlugs));
}

export type TopicSeriesHubCard = TopicSeriesListItem & {
  publishedEpisodes: TopicEntry[];
  /** 並び順用・公開済み話のうち最新の日付（話が無いときは一覧の末尾寄りになるよう古い値） */
  hubSortPublishedAt: string;
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
  {
    slug: "dam-reassessment-3",
    title: "ダムと川のこれから——3,000基の再評価と、日本の治水を問い直すとき",
    subtitle: "第3話｜日本の3,000基——老朽化・土砂堆積と、撤去しないリスク",
    shortDescription:
      "竣工から50年を超えたダムが全体の2割。堆砂で洪水調節容量を食われているダムは326基。老朽化した構造物を「撤去しない」選択は、安全の担保ではなくリスクの先送りだ——壊れる前に壊す判断を可能にする制度を問う。",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    contentPath: "src/content/topics/dam-reassessment-3.md",
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

export function getTopicSeriesHubCards(): TopicSeriesHubCard[] {
  return TOPIC_SERIES_LIST.map((series) => {
    const publishedEpisodes = series.episodeSlugs
      .map((slug) => getTopicBySlug(slug))
      .filter((t): t is TopicEntry => t != null);
    const hubSortPublishedAt =
      publishedEpisodes.length === 0
        ? "1970-01-01"
        : publishedEpisodes.reduce(
            (m, e) => (e.publishedAt > m ? e.publishedAt : m),
            publishedEpisodes[0]!.publishedAt,
          );
    return {
      ...series,
      publishedEpisodes,
      hubSortPublishedAt,
    };
  });
}

export function getStandaloneTopicsForHubSorted(): TopicEntry[] {
  const bundled = topicSlugsBundledIntoSeries();
  return [...TOPICS].filter((t) => !bundled.has(t.slug)).sort((a, b) => {
    const d = b.publishedAt.localeCompare(a.publishedAt);
    if (d !== 0) return d;
    return a.slug.localeCompare(b.slug);
  });
}

/** 一覧用：`publishedAt` 降順で連載カードと単話を混ぜる */
export function buildTopicHubRows(): (
  | { kind: "series"; card: TopicSeriesHubCard }
  | { kind: "topic"; topic: TopicEntry }
)[] {
  const seriesCards = getTopicSeriesHubCards().map((card) => ({
    kind: "series" as const,
    card,
    sortKey: card.hubSortPublishedAt,
  }));
  const topics = getStandaloneTopicsForHubSorted().map((topic) => ({
    kind: "topic" as const,
    topic,
    sortKey: topic.publishedAt,
  }));
  return [...seriesCards, ...topics]
    .sort((a, b) => {
      const d = b.sortKey.localeCompare(a.sortKey);
      if (d !== 0) return d;
      if (a.kind === "series" && b.kind === "topic") return -1;
      if (a.kind === "topic" && b.kind === "series") return 1;
      return 0;
    })
    .map((row) =>
      row.kind === "series"
        ? { kind: "series" as const, card: row.card }
        : { kind: "topic" as const, topic: row.topic },
    );
}
