export type MapCase = {
  id: string;
  /** 事例集内の見出し番号（例: "3.1"） */
  sectionRef: string;
  prefecture: string;
  city: string;
  title: string;
  lat: number;
  lng: number;
  category: "solar" | "wind" | "ordinance-tax";
  /** 中立的ステータス */
  status: string;
  /** 事例集のアンカーリンク用（セクション見出しのslug） */
  topicAnchor: string;
  /** 一言サマリ（ポップアップ表示用、50文字以内） */
  summary: string;
};

/** 事例集ページの slug（アンカーリンクのベース） */
export const MAP_TOPIC_SLUG = "solar-wind-opposition-cases";

export function hrefForMapCaseTopic(caseItem: MapCase): string {
  return `/learn/topics/${MAP_TOPIC_SLUG}#${caseItem.topicAnchor}`;
}

export const MAP_CASES: MapCase[] = [
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

/** カテゴリ表示名とピンカラー */
export const CATEGORY_META: Record<
  MapCase["category"],
  { label: string; color: string; hex: string }
> = {
  solar: { label: "太陽光発電", color: "yellow", hex: "#EAB308" },
  wind: { label: "風力発電", color: "lightblue", hex: "#38BDF8" },
  "ordinance-tax": { label: "条例・税制", color: "orange", hex: "#F97316" },
};
