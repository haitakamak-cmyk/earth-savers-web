/** 本番ドメイン（構造化データ・OG のベース URL） */
export const SITE_URL = "https://earth-savers.org";

/**
 * 検索エンジンに載せたくない間は **false**（全ページ `noindex`、Organization JSON-LD 非出力、`robots.txt` で `/` 拒否）。
 * 正式オープン時に **true** にし、Google Search Console で再クロールをリクエストすると反映が早まることが多い。
 */
export const SITE_ALLOW_SEARCH_INDEXING = false;

/**
 * 公式サイトをアプリより先に公開するときは false のままにする。
 * アプリ（app.earth-savers.org）への誘導リンクを止め、準備中の表示にする。
 * リリース時に true に変更する。
 */
export const APP_EXTERNAL_LINKS_READY = false;

/**
 * サイト表記の法人名（公益財団法人の認定は実績後のため、現段階では「財団法人」表記とする）
 */
export const ORGANIZATION_NAME = "一般財団法人 地球防衛群";
export const ORGANIZATION_NAME_SHORT = "地球防衛群";

/** ヘッダーロゴ下など。登記の正式名は `ORGANIZATION_NAME`（一般財団法人）のまま */
export const ORGANIZATION_NAME_HEADER_LINE = "財団法人 地球防衛群";

/**
 * 法人概要・JSON-LD・規約・お問い合わせメールで共通化（表記ゆれ防止）
 */
export const ORGANIZATION_POSTAL_CODE = "708-0006";

/** 構造化データ用（schema.org PostalAddress） */
export const ORGANIZATION_ADDRESS_STRUCTURED = {
  postalCode: ORGANIZATION_POSTAL_CODE,
  addressRegion: "岡山県",
  addressLocality: "津山市",
  streetAddress: "小田中1403",
} as const;

/** 表示用1行（〒付きは別途） */
export const ORGANIZATION_ADDRESS_LINE = `${ORGANIZATION_ADDRESS_STRUCTURED.addressRegion}${ORGANIZATION_ADDRESS_STRUCTURED.addressLocality}${ORGANIZATION_ADDRESS_STRUCTURED.streetAddress}`;

export const ORGANIZATION_REPRESENTATIVE_TITLE = "代表理事";
export const ORGANIZATION_REPRESENTATIVE_NAME = "杉山 孔太";

/** 法人概要の「設立」表示用（登記の年月まで） */
export const ORGANIZATION_FOUNDED_LABEL = "2026年4月";

/** JSON-LD `foundingDate`（ISO 8601 の年月） */
export const ORGANIZATION_FOUNDING_DATE_ISO = "2026-04";

/** メタディスクリプション・OG 等で共通化する一段説明（`SITE_ALLOW_SEARCH_INDEXING` が true のときに使用） */
export const SITE_ORGANIZATION_DESCRIPTION =
  "水源地の保全・里山の再生・生態系の回復・環境教育に取り組む一般財団法人 地球防衛群（earth savers）。岡山を拠点に、乱開発から水と森を守り、次世代へつなぐ現場の活動・会員募集・寄付受付をご案内します。";

/** 構造化データ・短文向け */
export const SITE_ORGANIZATION_DESCRIPTION_SHORT =
  "水源地保全・里山再生・生態系の回復・環境教育に取り組み、日本の水と森を次の世代へつなぐ一般財団法人です。";

/** `SITE_ALLOW_SEARCH_INDEXING` が false のときのメタ説明（検索用・準備中表示） */
export const SITE_ORGANIZATION_DESCRIPTION_PRELAUNCH =
  "水源地の保全・里山の再生・生態系の回復・環境教育に取り組む一般財団法人 地球防衛群（earth savers）。公式サイトは準備中です。活動情報・会員募集は公開後にこちらでご案内します。";
