export type MapCaseCategory =
  | "solar"
  | "wind"
  | "ordinance-tax"
  | "infrastructure"
  | "nature"
  | "water-source";

export type MapCase = {
  id: string;
  /** 事例集内の見出し番号（例: "3.1"）。事例集外は空文字 */
  sectionRef: string;
  prefecture: string;
  city: string;
  title: string;
  lat: number;
  lng: number;
  category: MapCaseCategory;
  /** 中立的ステータス */
  status: string;
  /** 事例集のアンカーリンク用（事例集外は空文字） */
  topicAnchor: string;
  /** 一言サマリ（ポップアップ表示用） */
  summary: string;
  /** 事例集外の場合、出典URLを設定 */
  sourceUrl?: string;
  /** 出典ラベル */
  sourceLabel?: string;
};

/** 事例集ページの slug（アンカーリンクのベース） */
export const MAP_TOPIC_SLUG = "solar-wind-opposition-cases";
/** 水源地トピックの slug */
export const MAP_WATER_TOPIC_SLUG = "water-source-land-acquisition";

export function hrefForMapCase(caseItem: MapCase): string | null {
  if (caseItem.topicAnchor) {
    return `/learn/topics/${MAP_TOPIC_SLUG}#${caseItem.topicAnchor}`;
  }
  if (caseItem.category === "water-source" && MAP_WATER_TOPIC_SLUG) {
    return `/learn/topics/${MAP_WATER_TOPIC_SLUG}`;
  }
  return caseItem.sourceUrl ?? null;
}

/** 事例集掲載の事案 */
export const MAP_CASES_TOPIC: MapCase[] = [
  {
    id: "ito",
    sectionRef: "3.1",
    prefecture: "静岡県",
    city: "伊東市",
    title: "伊豆高原メガソーラー",
    lat: 34.8805,
    lng: 139.1064,
    category: "solar",
    status: "係争中",
    topicAnchor: "31-静岡県伊東市伊豆高原メガソーラー",
    summary: "河川占用許可をめぐる行政訴訟が継続中の事案",
  },
  {
    id: "kagamino",
    sectionRef: "3.2",
    prefecture: "岡山県",
    city: "鏡野町",
    title: "鏡野町 風力発電",
    lat: 35.091,
    lng: 133.932,
    category: "wind",
    status: "事業者撤退報道あり",
    topicAnchor: "32-岡山県鏡野町風力発電",
    summary: "盛土規制法の規制区域指定と請願採択が重なった事案",
  },
  {
    id: "kani",
    sectionRef: "3.3",
    prefecture: "岐阜県",
    city: "可児市",
    title: "大森奥山湿地",
    lat: 35.426,
    lng: 137.061,
    category: "solar",
    status: "合意形成済み",
    topicAnchor: "33-岐阜県可児市大森奥山湿地",
    summary: "湿地保全を含む4者協議で合意に至った事案",
  },
  {
    id: "kaiyo",
    sectionRef: "3.4",
    prefecture: "徳島県",
    city: "海陽町",
    title: "海陽町 風力発電",
    lat: 33.584,
    lng: 134.354,
    category: "wind",
    status: "住民運動・議論継続",
    topicAnchor: "34-徳島県海陽町風力発電",
    summary: "住民説明会と条例対応が論点となっている事案",
  },
  {
    id: "heguri",
    sectionRef: "3.5",
    prefecture: "奈良県",
    city: "平群町",
    title: "平群町メガソーラー",
    lat: 34.6315,
    lng: 135.6983,
    category: "solar",
    status: "係争中",
    topicAnchor: "35-奈良県平群町メガソーラー係争中の事案",
    summary: "造成地からの土砂流出が問題となり訴訟に至った事案",
  },
  {
    id: "hokuto",
    sectionRef: "3.6",
    prefecture: "山梨県",
    city: "北杜市",
    title: "北杜市（制度上の課題）",
    lat: 35.781,
    lng: 138.404,
    category: "solar",
    status: "制度的課題が残存",
    topicAnchor: "36-山梨県北杜市制度上の課題が残る事例",
    summary: "条例制定後も制度運用に課題が残る事例",
  },
  {
    id: "ashimori",
    sectionRef: "3.7",
    prefecture: "岡山県",
    city: "岡山市（足守地区）",
    title: "足守地区 太陽光発電",
    lat: 34.733,
    lng: 133.845,
    category: "solar",
    status: "環境アセスメント段階",
    topicAnchor: "37-岡山県岡山市足守地区仮称大規模太陽光発電事業",
    summary: "アセスメント意見で景観・防災が論点の事案",
  },
  {
    id: "mimasaka",
    sectionRef: "3.8",
    prefecture: "岡山県",
    city: "美作市",
    title: "美作市パネル税",
    lat: 35.074,
    lng: 134.143,
    category: "ordinance-tax",
    status: "条例制定・施行未定",
    topicAnchor: "38-岡山県美作市パネル税条例制定後も施行に至らない事例",
    summary: "太陽光パネル税が議論されている全国初の事例",
  },
  {
    id: "shimanto",
    sectionRef: "3.9",
    prefecture: "高知県",
    city: "四万十市",
    title: "四万十川流域メガソーラー",
    lat: 32.993,
    lng: 132.938,
    category: "solar",
    status: "事業者敗訴・確定",
    topicAnchor: "39-高知県四万十市四万十川流域メガソーラー",
    summary: "条例規制の実体的適法性が認められた判決事案",
  },
];

/** サイト内トピックと関連する参考事案（事例集には未掲載） */
export const MAP_CASES_REFERENCE: MapCase[] = [
  {
    id: "kushiro-solar",
    sectionRef: "",
    prefecture: "北海道",
    city: "釧路市周辺",
    title: "釧路湿原周辺メガソーラー",
    lat: 43.109,
    lng: 144.331,
    category: "solar",
    status: "道・自治体が規制条例等を検討中",
    topicAnchor: "",
    summary: "湿原周辺で太陽光施設建設が相次ぎ、タンチョウ等の生息環境が懸念されている",
    sourceUrl: "https://www.city.kushiro.lg.jp/kurashi/kankyou/1009175/1009513.html",
    sourceLabel: "釧路市（再エネ条例）",
  },
  {
    id: "kami-wind",
    sectionRef: "",
    prefecture: "宮城県",
    city: "加美町",
    title: "加美町 陸上風力発電計画",
    lat: 38.573,
    lng: 140.758,
    category: "wind",
    status: "議論継続中",
    topicAnchor: "",
    summary: "最大150基規模の風車計画に対し、森林伐採や水源への影響が懸念されている",
    sourceUrl: "https://www.town.kami.miyagi.jp/",
    sourceLabel: "加美町公式",
  },
  {
    id: "hakkoda-wind",
    sectionRef: "",
    prefecture: "青森県",
    city: "八甲田周辺",
    title: "八甲田周辺 陸上風力計画",
    lat: 40.655,
    lng: 140.876,
    category: "wind",
    status: "自治体が見直し要望",
    topicAnchor: "",
    summary: "景観や自然環境への影響懸念から、周辺自治体が白紙撤回を求めている",
    sourceUrl: "https://www.pref.aomori.lg.jp/soshiki/kankyo/kankyo/saiene_furyoku.html",
    sourceLabel: "青森県（再エネ関連）",
  },
  {
    id: "yuza-offshore",
    sectionRef: "",
    prefecture: "山形県",
    city: "遊佐町沖",
    title: "遊佐町沖 洋上風力",
    lat: 39.019,
    lng: 139.873,
    category: "wind",
    status: "国の促進区域指定",
    topicAnchor: "",
    summary: "洋上風力に対し住民団体が反対署名。漁業・低周波音・景観が論点",
    sourceUrl:
      "https://www.enecho.meti.go.jp/category/saving_and_new/saiene/yojo_furyoku/dl/public/yamagata_yuza_opinion.pdf",
    sourceLabel: "資源エネルギー庁",
  },
  {
    id: "yura-wind",
    sectionRef: "",
    prefecture: "和歌山県",
    city: "由良町",
    title: "由良町 風力発電",
    lat: 33.963,
    lng: 135.114,
    category: "wind",
    status: "県議会等で議論",
    topicAnchor: "",
    summary: "稼働後に低周波音の健康影響が懸念されている事案",
    sourceUrl: "https://www.pref.wakayama.lg.jp/gijiroku/p041509.html",
    sourceLabel: "和歌山県議会会議録",
  },
  {
    id: "linear-shizuoka",
    sectionRef: "",
    prefecture: "静岡県",
    city: "大井川流域",
    title: "リニア中央新幹線 静岡工区",
    lat: 35.483,
    lng: 138.183,
    category: "infrastructure",
    status: "水資源補償の合意あり・対話継続",
    topicAnchor: "",
    summary: "トンネル工事による大井川水系の水量・地下水への影響が懸念されている",
    sourceUrl:
      "https://www.pref.shizuoka.jp/kurashikankyo/kankyo/1040554/1002001/1068405/index.html",
    sourceLabel: "静岡県公式",
  },
  {
    id: "jingu-gaien",
    sectionRef: "",
    prefecture: "東京都",
    city: "新宿区・港区",
    title: "神宮外苑再開発",
    lat: 35.674,
    lng: 139.718,
    category: "nature",
    status: "住民訴訟・議論継続",
    topicAnchor: "",
    summary: "再開発に伴う多数の樹木伐採計画が論点となっている",
    sourceUrl: "https://www.metro.tokyo.lg.jp/tosei/hodohappyo/press/2024/03/29/20.html",
    sourceLabel: "東京都",
  },
  {
    id: "niseko-water",
    sectionRef: "",
    prefecture: "北海道",
    city: "ニセコ町等",
    title: "ニセコ周辺 水源地・森林取得",
    lat: 42.804,
    lng: 140.687,
    category: "water-source",
    status: "国・自治体資料で取得継続確認",
    topicAnchor: "",
    summary: "外国法人等による森林取得が多数確認され、水源涵養林の管理が課題に",
    sourceUrl: "https://www.rinya.maff.go.jp/j/press/keikaku/240719.html",
    sourceLabel: "林野庁",
  },
  {
    id: "myoko-water",
    sectionRef: "",
    prefecture: "新潟県",
    city: "妙高市",
    title: "妙高市 森林取得",
    lat: 36.985,
    lng: 138.214,
    category: "water-source",
    status: "国資料で取得確認",
    topicAnchor: "",
    summary: "シンガポール法人等による森林取得が林野庁調査で確認されている",
    sourceUrl: "https://www.rinya.maff.go.jp/j/press/keikaku/240719.html",
    sourceLabel: "林野庁",
  },
  {
    id: "beppu-geothermal",
    sectionRef: "",
    prefecture: "大分県",
    city: "別府市",
    title: "別府温泉 地熱発電と温度低下",
    lat: 33.283,
    lng: 131.492,
    category: "nature",
    status: "県が新たな掘削規制地域を指定",
    topicAnchor: "",
    summary: "地熱発電等の影響で源泉温度の低下がデータで確認されている",
    sourceUrl: "https://www.pref.oita.jp/soshiki/13550/onsen-kisei.html",
    sourceLabel: "大分県（温泉掘削規制）",
  },
];

/** 全事案（地図表示用） */
export const MAP_CASES: MapCase[] = [
  ...MAP_CASES_TOPIC,
  ...MAP_CASES_REFERENCE,
];

/** カテゴリ表示名とピンカラー */
export const CATEGORY_META: Record<
  MapCaseCategory,
  { label: string; color: string; hex: string }
> = {
  solar: { label: "太陽光発電", color: "yellow", hex: "#EAB308" },
  wind: { label: "風力発電", color: "lightblue", hex: "#38BDF8" },
  "ordinance-tax": { label: "条例・税制", color: "orange", hex: "#F97316" },
  infrastructure: { label: "巨大構造物・水資源", color: "blue", hex: "#3B82F6" },
  nature: { label: "自然環境・景観", color: "green", hex: "#22C55E" },
  "water-source": { label: "水源地取得", color: "purple", hex: "#A855F7" },
};
