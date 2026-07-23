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
  /** 記事の形式軸。未指定は "explainer"（解説記事）扱い。 */
  format?: "explainer" | "field-report";
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
      "2018年、熊本県の荒瀬ダムが撤去された。翌年から球磨川の干潟に砂が戻り、川底の生物種が10年前の7倍に増えた。日本には約3,000基のダムがある。竣工50年を超えたものが2割を占め、堆砂で洪水調節容量を失いつつあるものは300基を超える。世界では欧州・米国が撤去を戦略として進め、一方で日本はダム再生ビジョンに「撤去」という語すらない。この連載で老朽化・堆砂・既得構造・制度案までをたどり、3,000基を流域の水循環と安全から問い直す記録とした。",
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
    slug: "solar-wind-opposition-cases",
    title: "再生可能エネルギー開発計画と地域対応の事例整理",
    subtitle: "主要事案にみる制度運用と地域調整の実際",
    shortDescription:
      "大規模太陽光・風力発電の開発計画をめぐり、各地で論点となった条例運用、行政付随許可、協議体制、訴訟・告発の経緯を公開資料に基づいて整理する。",
    publishedAt: "2026-05-16",
    updatedAt: "2026-07-20",
    contentPath: "src/content/topics/solar-wind-opposition-cases.md",
    relatedGlossarySlugs: [
      "nature-coexistence-site",
      "oecm",
      "fit-fip",
      "biodiversity-promotion-act",
    ],
    category: "energy",
    requiresLegalCaveat: true,
  },
  {
    slug: "water-source-land-acquisition",
    title: "外資等による水源地周辺の土地取得と制度的対応の整理",
    shortDescription:
      "外国法人等による森林・水源地周辺の土地取得をめぐる林野庁調査の経年データと、森林法・重要土地等調査法・水循環基本法・自治体条例による制度的対応の現状を、公開資料に基づいて整理する。",
    publishedAt: "2026-05-19",
    updatedAt: "2026-05-19",
    contentPath: "src/content/topics/water-source-land-acquisition.md",
    relatedGlossarySlugs: [
      "water-cycle-basic-act",
    ],
    category: "water",
    requiresLegalCaveat: true,
  },
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
  {
    slug: "dam-reassessment-4",
    title: "ダムと川のこれから——3,000基の再評価と、日本の治水を問い直すとき",
    subtitle: "第4話｜「撤去しない」を支える構造——そして、変えるための仕組み",
    shortDescription:
      "「ダム再生ビジョン」に「撤去」の二文字はない。公共事業の経済圏・発電ダムという資産・水利権の既得構造——三つの壁が「撤去しない」を支える。評価制度・積立制度・合意形成プロセスの整備を連載の結論として提案する。",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    contentPath: "src/content/topics/dam-reassessment-4.md",
    relatedGlossarySlugs: ["water-cycle-basic-act", "ecosystem-services"],
    category: "water",
    requiresLegalCaveat: true,
  },
  {
    slug: "kagamino-wind-interview",
    title:
      "「反対」ではなく、「適切な開発を」——鏡野風力発電を考える会に聞く",
    subtitle: "住民が動き、事業が止まった2年半の記録",
    shortDescription:
      "撤退が報じられた鏡野町の大規模風力発電計画。住民組織「考える会」のメンバーに、計画を知った経緯、説明会での経験、記録と情報公開請求の活用、そして「反対ではなく適切な開発を求める」と決めた理由を聞いた。",
    publishedAt: "2026-07-12",
    updatedAt: "2026-07-20",
    contentPath: "src/content/topics/kagamino-wind-interview.md",
    relatedGlossarySlugs: ["fit-fip", "amended-renewable-energy-act"],
    category: "energy",
    format: "field-report",
    requiresLegalCaveat: true,
  },
  {
    slug: "solar-panel-end-of-life",
    title:
      "太陽光パネルは、役目を終えた後どこへ行くのか——有害物質の溶出リスクと2030年代の廃棄問題",
    shortDescription:
      "太陽光パネルの含有物質と溶出リスクを4段階（含有→試験溶出→判定基準超過→実環境影響）で整理し、2026年6月公布の「太陽電池廃棄物の再資源化等の推進に関する法律」の三層構造（全廃棄者の努力義務／事業用の判断基準・指導助言／多量廃棄者の届出・排出制限・勧告命令・罰則）を条文に即して解説。設置段階から地域と自治体が確認できる論点まで接続する。",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-21",
    contentPath: "src/content/topics/solar-panel-end-of-life.md",
    relatedGlossarySlugs: [
      "fit-fip",
      "amended-renewable-energy-act",
      "pv-recycling-act",
      "waste-disposal-plan-filing",
    ],
    relatedOrdinanceArticles: [
      "第18条",
      "第18条の2",
      "第18条の3",
      "第20条の7",
      "第20条の3",
    ],
    category: "energy",
    format: "explainer",
    requiresLegalCaveat: true,
  },
  {
    slug: "wind-birds-collision",
    title:
      "風車は鳥にとって何なのか——バードストライクと猛禽類保護、そして地域が動ける制度",
    shortDescription:
      "「風車は良いか悪いか」ではなく「どこに・どの条件で・誰の確認を経て建てるのか」——バードストライクの実態、猛禽類の個体群感受性、風車の鳥類影響を扱った近年の査読研究の並置、環境影響評価法の風力対象閾値（2021年改正で50MW/37.5MW）と規模要件から外れる領域、事後調査の建付け（発電所アセス省令第31条）、そして都道府県条例（岡山県1.5MW以上）・市町村条例（福島市・高崎市）・地域協定による補完まで、住民・自治体が計画段階から動ける実用ガイドとして整理する。",
    publishedAt: "2026-07-21",
    updatedAt: "2026-07-24",
    contentPath: "src/content/topics/wind-birds-collision.md",
    relatedGlossarySlugs: [
      "amended-renewable-energy-act",
      "eia-first-second-class",
      "post-project-monitoring-eia",
    ],
    relatedOrdinanceArticles: [
      "第11条",
      "第15条の2",
      "第15条の3",
      "第20条の2の2",
    ],
    category: "biodiversity",
    format: "explainer",
    requiresLegalCaveat: true,
  },
];

export function getAllTopicSlugs(): string[] {
  return TOPICS.map((t) => t.slug);
}

export function getTopicBySlug(slug: string): TopicEntry | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

/** 連載なら「前話・次話」（単独記事は null） */
export type TopicEpisodeNeighbors = {
  prev: { slug: string; subtitle: string } | null;
  next: { slug: string; subtitle: string } | null;
};

export function getTopicSeriesEpisodeNeighbors(
  slug: string,
): TopicEpisodeNeighbors | null {
  for (const series of TOPIC_SERIES_LIST) {
    const idx = series.episodeSlugs.indexOf(slug);
    if (idx === -1) continue;
    const prevSlug =
      idx > 0 ? (series.episodeSlugs[idx - 1] as string | undefined) : undefined;
    const nextSlug =
      idx < series.episodeSlugs.length - 1
        ? (series.episodeSlugs[idx + 1] as string | undefined)
        : undefined;
    const prev = prevSlug ? getTopicBySlug(prevSlug) : undefined;
    const next = nextSlug ? getTopicBySlug(nextSlug) : undefined;
    return {
      prev:
        prev && prev.subtitle
          ? { slug: prev.slug, subtitle: prev.subtitle }
          : prev
            ? { slug: prev.slug, subtitle: prev.title }
            : null,
      next:
        next && next.subtitle
          ? { slug: next.slug, subtitle: next.subtitle }
          : next
            ? { slug: next.slug, subtitle: next.title }
            : null,
    };
  }
  return null;
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
  return [...TOPICS]
    .filter((t) => !bundled.has(t.slug) && t.format !== "field-report")
    .sort((a, b) => {
      const d = b.publishedAt.localeCompare(a.publishedAt);
      if (d !== 0) return d;
      return a.slug.localeCompare(b.slug);
    });
}

/** `/learn/field-reports` 用：フィールドレポートを新しい順で返す */
export function buildFieldReportEntries(): TopicEntry[] {
  return TOPICS.filter((t) => t.format === "field-report").sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

/** 一覧用：`publishedAt` 降順で連載カードと単話を混ぜる（フィールドレポートは除外） */
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
