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
  // sourceUrl があればそちらを優先（水源地含む）
  if (caseItem.sourceUrl) {
    return caseItem.sourceUrl;
  }
  if (caseItem.category === "water-source" && MAP_WATER_TOPIC_SLUG) {
    return `/learn/topics/${MAP_WATER_TOPIC_SLUG}`;
  }
  return null;
}

/** 水源地トピック記事へのリンク（ポップアップでサブリンクとして使用） */
export function hrefForWaterTopic(caseItem: MapCase): string | null {
  if (caseItem.category === "water-source" && MAP_WATER_TOPIC_SLUG) {
    return `/learn/topics/${MAP_WATER_TOPIC_SLUG}`;
  }
  return null;
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
    status: "行政訴訟の報道あり",
    topicAnchor: "31-静岡県伊東市伊豆高原メガソーラー",
    summary: "河川占用許可をめぐる行政訴訟が報じられている事案",
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
    status: "環境影響評価手続上の廃止公告済み",
    topicAnchor: "34-徳島県海陽町風力発電",
    summary: "住民説明会と条例対応が論点となり、環境影響評価手続上の廃止公告に至った事案",
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
    status: "訴訟提起の報道あり",
    topicAnchor: "35-奈良県平群町メガソーラー係争中の事案",
    summary: "造成地からの土砂流出が問題となり訴訟に至ったと報じられている事案",
  },
  {
    id: "hokuto",
    sectionRef: "3.6",
    prefecture: "山梨県",
    city: "北杜市",
    title: "北杜市 太陽光発電と条例運用",
    lat: 35.781,
    lng: 138.404,
    category: "solar",
    status: "条例制定済・運用状況の議論継続",
    topicAnchor: "36-山梨県北杜市制度上の課題が残る事例",
    summary: "条例制定後の運用状況が議論されている事例",
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
    status: "条例規制の適法性を認めた判決あり",
    topicAnchor: "39-高知県四万十市四万十川流域メガソーラー",
    summary: "条例規制の実体的適法性が認められた判決事案",
  },
  {
    id: "kamogawa",
    sectionRef: "3.10",
    prefecture: "千葉県",
    city: "鴨川市",
    title: "鴨川市田原地区メガソーラー",
    lat: 35.114,
    lng: 140.099,
    category: "solar",
    status: "FIT認定失効が公表",
    topicAnchor: "310-千葉県鴨川市田原地区メガソーラーFIT認定失効に至った事例",
    summary: "大規模な山林造成計画をめぐり行政指導が継続する中、FIT認定が失効したと鴨川市が公表した事案",
  },
  {
    id: "fukushima-solar",
    sectionRef: "3.11",
    prefecture: "福島県",
    city: "福島市",
    title: "福島市 市長宣言と条例化",
    lat: 37.75,
    lng: 140.468,
    category: "solar",
    status: "宣言発出・条例施行済",
    topicAnchor: "311-福島県福島市市長宣言と条例化に至った事例",
    summary:
      "山間部へのメガソーラー建設が相次ぎ、市長が宣言を発出。ガイドライン改正を経て条例を制定・施行した事案",
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
    sourceUrl: "https://www.city.kushiro.lg.jp/machi/kankyou/1017276/1017277.html",
    sourceLabel: "釧路市（太陽光条例）",
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
    sourceUrl: "https://www.pref.miyagi.jp/soshiki/kankyo-t/assess-list/hou-huuryoku-3.html",
    sourceLabel: "宮城県（宮城加美風力アセス）",
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
    summary: "景観や自然環境への影響を懸念し、周辺自治体が計画の見直しを要望している",
    sourceUrl: "https://www.pref.aomori.lg.jp/soshiki/kankyo/kankyo/reene_kyousei_jyourei_seido.html",
    sourceLabel: "青森県（再エネ共生条例）",
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
    status: "訴訟提起の報道あり・議論継続",
    topicAnchor: "",
    summary: "再開発に伴う多数の樹木伐採計画が論点となっている",
    sourceUrl: "https://www.toshiseibi.metro.tokyo.lg.jp/machizukuri/machi_project/toshi_saisei/saisei07",
    sourceLabel: "東京都（都市整備局）",
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
    summary: "外国法人等による森林取得が林野庁調査で確認されている",
    sourceUrl: "https://www.rinya.maff.go.jp/j/press/keikaku/240719.html",
    sourceLabel: "林野庁",
  },
  {
    id: "aso-solar",
    sectionRef: "",
    prefecture: "熊本県",
    city: "阿蘇地域",
    title: "阿蘇外輪山 メガソーラー",
    lat: 32.884,
    lng: 131.084,
    category: "solar",
    status: "国立公園拡張・規制強化",
    topicAnchor: "",
    summary: "世界文化遺産登録を目指す草原にパネル設置が進み、国立公園拡張で規制強化",
    sourceUrl: "https://www.pref.kumamoto.jp/soshiki/67/241509.html",
    sourceLabel: "熊本県（阿蘇太陽光抑制エリア）",
  },
  {
    id: "beppu-geothermal",
    sectionRef: "",
    prefecture: "大分県",
    city: "別府市",
    title: "別府温泉 地熱発電と掘削規制をめぐる議論",
    lat: 33.283,
    lng: 131.492,
    category: "nature",
    status: "県が新たな掘削規制地域を指定",
    topicAnchor: "",
    summary: "地熱発電等と温泉への影響をめぐり、県が掘削規制地域を新たに指定した事案",
    sourceUrl: "https://www.pref.oita.jp/site/onsen/onsen-flow.html",
    sourceLabel: "大分県（温泉手続）",
  },
  /* ── 優先度A 追加事案 ─────────────────────── */
  {
    id: "gojo-solar",
    sectionRef: "",
    prefecture: "奈良県",
    city: "五條市",
    title: "五條市 県有地メガソーラー計画",
    lat: 34.351,
    lng: 135.694,
    category: "solar",
    status: "県が計画を事実上断念",
    topicAnchor: "",
    summary:
      "防災拠点予定地の県有地活用をめぐり大規模太陽光発電を含む計画が示されたが、地元反発や条例制定を背景に県は計画を事実上断念したと報じられている",
    sourceUrl: "https://www.pref.nara.lg.jp/n002/65482.html",
    sourceLabel: "奈良県（知事記者会見）",
  },
  {
    id: "kannami-solar",
    sectionRef: "",
    prefecture: "静岡県",
    city: "函南町",
    title: "函南町 大規模太陽光発電計画",
    lat: 35.069,
    lng: 138.957,
    category: "solar",
    status: "事業中止・撤退の報道あり",
    topicAnchor: "",
    summary:
      "町が条例に基づく措置を講じ、地域住民の反対を背景に事業中止・撤退に至ったと報じられている",
    sourceUrl: "https://www.tokyo-np.co.jp/article/373679",
    sourceLabel: "東京新聞",
  },
  {
    id: "uku-solar",
    sectionRef: "",
    prefecture: "長崎県",
    city: "佐世保市（宇久島）",
    title: "宇久島 大規模太陽光発電事業",
    lat: 33.268,
    lng: 129.069,
    category: "solar",
    status: "議論継続中",
    topicAnchor: "",
    summary:
      "島の面積に対し大規模な太陽光発電計画が進められ、島嶼環境・地下水・景観・生態系への影響が論点となっている",
    sourceLabel:
      "日本経済新聞「長崎・宇久島のメガソーラー、生態学者が環境保全を要望」",
  },
  {
    id: "ishiki-dam",
    sectionRef: "",
    prefecture: "長崎県",
    city: "川棚町",
    title: "石木ダム事業",
    lat: 33.048,
    lng: 129.821,
    category: "infrastructure",
    status: "土地収用等をめぐる議論継続",
    topicAnchor: "",
    summary:
      "治水・利水を目的としたダム事業をめぐり、土地収用や地域合意のあり方が長年にわたり論点となっている",
    sourceUrl: "https://www.nagasaki-np.co.jp/feature/ishikidam/",
    sourceLabel: "長崎新聞（石木ダム特集）",
  },
  {
    id: "hokuto-solar",
    sectionRef: "",
    prefecture: "北海道",
    city: "北斗市",
    title: "北斗市 太陽光発電施設周辺の土砂流出報道",
    lat: 41.824,
    lng: 140.653,
    category: "solar",
    status: "土砂流出の報道あり",
    topicAnchor: "",
    summary:
      "太陽光発電施設の造成工事に関連して土砂流出が報じられ、防災面での懸念が指摘されている",
    sourceLabel: "STV札幌テレビ",
  },
  /* ── 優先度B 追加事案 ─────────────────────── */
  {
    id: "zao-wind",
    sectionRef: "",
    prefecture: "宮城県",
    city: "蔵王山麓",
    title: "蔵王山麓 風力発電計画",
    lat: 38.14,
    lng: 140.397,
    category: "wind",
    status: "事業者が計画撤回",
    topicAnchor: "",
    summary:
      "蔵王の景観・観光資源・自然環境への影響懸念から、事業者が風力発電計画を撤回したと報じられている",
    sourceUrl: "https://www.khb-tv.co.jp/news/14682329",
    sourceLabel: "khb東日本放送",
  },
  {
    id: "kawabegawa-dam",
    sectionRef: "",
    prefecture: "熊本県",
    city: "五木村・相良村",
    title: "川辺川 流水型ダム",
    lat: 32.37,
    lng: 130.948,
    category: "infrastructure",
    status: "環境配慮の議論継続",
    topicAnchor: "",
    summary:
      "球磨川水系の治水を目的とした流水型ダム計画をめぐり、清流・生態系保全との両立が論点となっている",
    sourceUrl:
      "https://www.qsr.mlit.go.jp/kawabe/dam/kankyou_torikumi/hairyo_report.html",
    sourceLabel: "国交省 九州地方整備局",
  },
  {
    id: "henoko-landfill",
    sectionRef: "",
    prefecture: "沖縄県",
    city: "名護市",
    title: "辺野古沿岸部 埋立事業",
    lat: 26.532,
    lng: 128.043,
    category: "nature",
    status: "国と自治体の対話継続",
    topicAnchor: "",
    summary:
      "沿岸部の埋立事業をめぐり、サンゴ礁や海洋生態系への影響と地域合意のあり方が論点となっている",
    sourceUrl: "https://www.pref.okinawa.jp/site/chijiko/henoko/index.html",
    sourceLabel: "沖縄県公式",
  },
  {
    id: "marugame-pond-solar",
    sectionRef: "",
    prefecture: "香川県",
    city: "丸亀市",
    title: "丸亀市 ため池水上太陽光発電",
    lat: 34.289,
    lng: 133.798,
    category: "solar",
    status: "条例案の議論あり",
    topicAnchor: "",
    summary:
      "ため池の水面に設置された太陽光発電施設をめぐり、水環境・景観・地域合意が論点となっている",
    sourceUrl:
      "https://www.asahi.com/articles/ASTDX416YTDXPLXB00GM.html",
    sourceLabel: "朝日新聞",
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
  solar: { label: "太陽光発電", color: "yellow", hex: "#F4B400" },
  wind: { label: "風力発電", color: "lightblue", hex: "#2BB3D9" },
  "ordinance-tax": { label: "制度・条例", color: "brown", hex: "#B7791F" },
  infrastructure: { label: "ダム・大型土木・水資源", color: "blue", hex: "#2563EB" },
  nature: { label: "森林・自然環境・景観", color: "green", hex: "#22C55E" },
  "water-source": { label: "土地・水源地取得", color: "purple", hex: "#8B5CF6" },
};
