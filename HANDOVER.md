#earth-savers-web #引き継ぎ #Next.js #公式サイト

# 公式サイト earth-savers-web — 引き継ぎ（HANDOVER）

**リポジトリ内パス**: `Web/earth-savers-web/`  
**メンバーアプリ**（別デプロイ）との共通メモは `earth-savers-app/HANDOVER.md`。**公開サイトの実装詳細は本ファイルを正**とする（齟齬時はこちらを優先）。

**直近更新**: 2026-05-03（**条例 v2.1 への発展＋補助資料パッケージ公開準備**。(1)**条例テンプレ v2.1 改訂**＝既設施設対応のための附則を11条構成に拡張（附則第2条 既存事業の定義／第3条 概要届出＋不利益取扱い禁止／第4条 物理的基準の適用除外／第5条 維持管理計画作成義務／第6条 年次報告開始時期／第7条 廃棄等費用積立金の経過措置（5,000円/kW下限）／第8条 事業承継時の確認／第9条 FIT満了時の事業継続届出／第10条 管理不全への対応／第11条 検討規定）。トリガー事由アプローチ（事業承継・FIT満了・管理不全）により遡及禁止と実効性のバランスを確保。第28条（適用除外）に第2項・第3項を新設し、行政中立スタンス（小規模施設は所有者・地域の自主的判断に委ね、相談・助言の道は残す）を明文化。(2)**条例補助資料パッケージ**を `Web/ordinance-template/` に整備（01施行規則骨子案／02図解・サマリー案【保留】／03自治体導入ガイド・5類型別パラメータ／04議会想定問答集35問／05パブコメ回答集30種／06附則ドラフト【本体に統合済】）。公開フローは `Web/指示書_ロクロー_条例補助資料公開_2026-05-03.md` を参照。前回（2026-05-02）の更新内容＝条例v2大規模改訂・用語集v1.2・解説記事v1.1は維持。差し替えフローは `Web/指示書_ロクロー_リソース差し替え_2026-05-02.md` 及び `Web/指示書_ロクロー_ウェブサイト微修正_2026-05-02.md` を参照）

**直近更新（履歴）**: 2026-05（**リソース三本柱** `/policy`・`/toolkit`・`/learn`、ヘッダー「リソース」DM、JSON-LD 部品、`sitemap.xml` と `SITE_ALLOW_SEARCH_INDEXING` 連動、**ヘッダー整理**＝重複していた「支援・参加する」テキストリンク削除＋ナビ全体に `whitespace-nowrap`、**条例テンプレ v0** を `/toolkit/ordinance` で全文公開＋Markdown ダウンロード）

---

## コピペ用（短文サマリ）

```
【earth-savers-web 引き継ぎ】
・Next.js 16 App Router。本番ビルド: npm run build（2026-04 時点で成功）
・法人表記: ORGANIZATION_NAME＝「一般財団法人 地球防衛群」（法人概要・JSON-LD・メール等）。ヘッダーロゴ下だけ ORGANIZATION_NAME_HEADER_LINE＝「財団法人 地球防衛群」（一般を省略）
・設立表示: ORGANIZATION_FOUNDED_LABEL＝「2026年4月」、JSON-LD foundingDate＝ ORGANIZATION_FOUNDING_DATE_ISO（例: 2026-04）
・資本の表記: 「外国資本」「外資」は使わずサイト全体で **外部資本** に統一（トップ・activities・about FAQ 等）
・activities: ページ冒頭リードは活動全体の幅広い紹介。sr-only は要約列挙。B-369 の詳細文は **生態系復活セクションのみ**（リードと sr-only で長文を重複させない）
・shop: 表記は **オンラインショップ**（ン付き）。誤って「オンライショップ」と見える場合はキャッシュ・旧デプロイを疑う
・クラファン: /join → https://for-good.net/project/1003493（CROWDFUNDING_URL）
・検索掲載: `SITE_ALLOW_SEARCH_INDEXING`（site.ts）。false の間は全ページ noindex・`robots.txt` で全パス disallow・JSON-LD 非表示。公開時に true＋Search Console で URL 検査／再クロール
・外部送信規律（総務省）: 現状は重い計測タグ前提の実装は薄い想定。ただし **外部送信の棚卸し（タグ/埋め込み/SDK）を継続**し、導入時は「送信情報・送信先・利用目的」を日本語で公表
・アプリ先行公開しない間: APP_EXTERNAL_LINKS_READY = false
  → app CTA は join / bank-donation / app-intro で準備中、ナビ「公式アプリ紹介」は disabled（/app-intro 直打ちは可）
・アプリ・SNS: src/lib/app-sns-links.ts のみ（Header + Footer）
・/media: 本＋新聞・万博写真枠（画像は public/images/media/）
・フッター「財団について」: 法人概要、運営体制（ラベル。※リンク先は /about#members）
・検証: npx tsc --noEmit && npm run lint && npm run build
・**リソース → 資料室（三本柱）**: ヘッダー／フッターは **資料室 ▼** → `/policy`（政策）、`/toolkit`（**ひな形・資料**）、`/learn`（**学ぶ**）。文言・データは `policies.ts` / `articles.ts` / `glossary.ts`。`SITE_ALLOW_SEARCH_INDEXING === false` の間は構造化データ（ breadcrumbs 等）は出さず robots で全 disallow
・**ヘッダー（PC）順序**: HOME / 財団について / メンバー / 活動内容 / **資料室 ▼** / アプリ・SNS▼ / 買って応援 / メディア・実績 / [支援する CTA]。**「支援・参加する」テキストリンクは廃止**（緑CTA「支援する」と `/join` で完全重複だったため）。`navItemsAfterResource` は空配列で残してある（差し戻し or 別項目追加が必要なときに 1 行 push するだけ）
・**ナビ折り返し対策**: `navLinkClassDesktop()` に `whitespace-nowrap` 必須。項目を増やしたら折り返さんかチェック
・**条例テンプレ公開フロー**: 正本 `Web/条例テンプレ_v0_暫定版.md` → サイト配信用 `Web/earth-savers-web/public/toolkit/ordinance/条例テンプレ_v0_暫定版.md` にコピー → 再ビルド／デプロイで `/toolkit/ordinance` に反映。表示は `MarkdownArticle.tsx`（`react-markdown` + `remark-gfm`）。指示書: `Web/指示書_ロクロー_条例テンプレ公開.md`
・**用語集 v1.2 公開**: 27語を `/learn/glossary/[slug]` で配信。データは `public/learn/glossary/用語集_v0_完成版.md` から `src/lib/glossary.ts` が `GLOSSARY` 配列へ変換して生成。個別ページは `DefinedTerm` JSON-LD / `BreadcrumbList` を出力（`SITE_ALLOW_SEARCH_INDEXING === false` の間は既存規律どおり非出力）。**v1.2 改訂（2026-05-02）**＝NIMBY印象の回避（再エネ非否定スタンス明記）／OECM登録条件の明示／「当法人」表記統一／`requiresLegalCaveat` フラグで制度系用語に改正注記表示／法的助言代替不可の注記を全ページ末尾に追加
・**解説記事（topics）**: `/learn/topics` 一覧・`/learn/topics/[slug]` 個別。記事データは `src/lib/topic-entries.ts` の `TOPICS`、本文は `src/content/topics/*.md`（第1号 `oecm-30by30`）。変換・内部リンクは `src/lib/topics.ts`。個別ページは `Article` JSON-LD（`ArticleJsonLd.tsx`）・パンくず・目次 `TopicToc.tsx`。**学ぶ**ハブ `/learn` にカードあり
・解説記事 第1号 = OECMと30by30 v1.1、`/learn/topics/oecm-30by30/` で配信、Article JSON-LD 出力（index 許可時）。**v1.1 改訂（2026-05-02）**＝「地域社会との対話と合意形成」セクション新設／税制20%減を「一定の要件を満たす場合」と限定明記／OECM登録条件の明示／著者表記を「一般財団法人 地球防衛群」に統一／第29条条項リンクは条例本体アンカーへ接続。
・**条例テンプレ補助資料**: `src/lib/ordinance-supplements-data.ts` ＋ `src/content/ordinance-supplements/*.md`。**4ページ** `/toolkit/ordinance/rules`・`adoption-guide`・`qa-council`・`qa-public`（`src/app/toolkit/ordinance/[slug]/page.tsx`）。一覧は `/toolkit/ordinance` の「条例導入を支える補助資料」。ZIP 一括はなし。
・**条例テンプレ v2**: `/toolkit/ordinance` で配信。前文「本条例の理念と基本スタンス」を新設（「再エネ否定ではない・適切な開発は歓迎」を冒頭明言）。**入口規制（第3章 参入段階）＋運転規制（第3章の2 維持管理）＋承継規制（第3章の3 事業の承継）＋出口規制（第3章の4 廃止及び撤去）＋第29条 生物多様性維持協定等の推進** という4軸構成。第9条の2 土地取引事前届出は水源含有確認・補正命令・個人情報保護・届出制非許可制明文化を含む拡張版。第18条は廃棄等費用積立金（1kWあたり1万円下限・FIT積立2分の1充当）。第17条の2〜の4で離隔100m／傾斜20度／調整池3,000㎡基準を導入。第26条の3 地域環境保全協力金は努力義務型（5,000㎡以上）。第25条過料は11項目（既存6項目＋出口5項目）。総括は参入・運転・出口の3段階対応表で再構成。煽り表現を全面解体
・**法務ガイドライン（2026-05-02 確立）**: 用語集・解説記事・条例の全公開ドキュメントに対し、(1)NIMBY印象を与えない（再エネ非否定スタンスを明記）、(2)税制・補助制度の適用可否を保証しない、(3)法的助言・税務助言の代替ではない旨を明記、(4)出典は官公庁・国際機関・一次資料を優先、(5)登記済み法人として「一般財団法人 地球防衛群」「当法人」で統一、を遵守
・正本: Web/earth-savers-web/HANDOVER.md
```

---

## 起動・検証

| コマンド | 用途 |
|----------|------|
| `npm run dev` | 開発サーバー |
| `npx tsc --noEmit` | 型のみ（フォント取得に依存しない） |
| `npm run lint` | ESLint（**警告 2**: `ContactFaqSection.tsx` / `OrganizationJsonLd.tsx` の未使用 `eslint-disable`。エラー 0） |
| `npm run build` | 本番ビルド |

`.env.local` があるとビルド時に読み込まれる（Contact の Resend 等）。CI で無い場合は空でもビルド通る想定で確認済みの環境あり。

---

## 最重要フラグ: `APP_EXTERNAL_LINKS_READY`

**ファイル**: `src/lib/site.ts`

- **`false`（既定・サイト先行）**:  
  - `app.earth-savers.org` へのリンクは **`join` / `join/bank-donation` / `app-intro`** でボタン無効または文言「準備中」。  
  - **`src/lib/app-sns-links.ts`** 先頭行（公式アプリ紹介）に **`disabled: true`** が付き、**Header / Footer では `<span>` のみ**（遷移しない）。ラベルは「公式アプリ紹介（準備中）」。
- **`true`（アプリ公開後）**: 上記がすべて通常リンクに戻る。**リリース時はこの定数だけ `true` に変える**のが第一歩。

---

## 主要ファイルマップ

| 領域 | パス |
|------|------|
| サイト定数・法人名・住所・代表者・上記フラグ | `src/lib/site.ts`（`ORGANIZATION_POSTAL_CODE` / `ORGANIZATION_ADDRESS_LINE` / `ORGANIZATION_REPRESENTATIVE_*` / `ORGANIZATION_FOUNDED_LABEL`・`ORGANIZATION_FOUNDING_DATE_ISO`。JSON-LD・規約・PP・お問い合わせメールと同期） |
| アプリ紹介 + SNS 一覧（`id` / `disabled` / `external`） | `src/lib/app-sns-links.ts` |
| ヘッダー（ロゴ下は `ORGANIZATION_NAME_HEADER_LINE`＝「財団法人…」。正式名は `ORGANIZATION_NAME`） | `src/components/Header.tsx` |
| フッター | `src/components/Footer.tsx` |
| メディア・実績 | `src/app/media/page.tsx` |
| 財団について・法人概要・マニフェスト等 | `src/app/about/page.tsx`（`#overview` 法人概要。設立・住所は `site.ts` 参照） |
| 活動内容 | `src/app/activities/page.tsx`（リード＋`sr-only` と各 `activities[]` セクションの役割分担に注意） |
| トップ | `src/app/page.tsx` |
| 買って応援 | `src/app/shop/page.tsx` |
| アプリ紹介ページ | `src/app/app-intro/page.tsx` |
| 参加・寄付 | `src/app/join/page.tsx`、銀行都度 `src/app/join/bank-donation/page.tsx` |
| お問い合わせ API | `src/app/api/contact/route.ts` |
| 構造化データ（Organization のほか breadcrumbs / DefinedTerm / Article） | `src/components/OrganizationJsonLd.tsx`、`BreadcrumbJsonLd.tsx`、`DefinedTermJsonLd.tsx`、`ArticleJsonLd.tsx` |
| **資料室** データソース | `src/lib/policies.ts`（個別ページ `/policy/[slug]`）、`src/lib/articles.ts`（`/learn/articles/[slug]`）、`src/lib/glossary.ts`（**用語集**: 27語、`/learn/glossary/[slug]`）、**解説記事** `src/lib/topic-entries.ts`（`TOPICS`）＋本文処理 `src/lib/topics.ts`（`/learn/topics/[slug]`）、**条例補助資料** `src/lib/ordinance-supplements-data.ts` ＋ `src/content/ordinance-supplements/*.md`（`/toolkit/ordinance/[slug]`） |
| リソース共通 UI | `ResourceLead.tsx`（先頭リード）、`RelatedLinks.tsx`、ツール下層 `ToolkitPageBody.tsx`、長文 Markdown `MarkdownArticle.tsx`、`ContentDisclaimer.tsx`（用語集一覧・解説記事の利用注意）、`TopicToc.tsx`（解説記事の目次） |
| ナビ定数「三本柱」 | `src/lib/resource-nav.ts`（`RESOURCE_NAV_LINKS`。Header と Footer と一致させる） |
| サイトマップ（index 許可時のみ URL 出力） | `src/app/sitemap.ts` |

---

## リソース／資料室（`/policy` / `/toolkit` / `/learn`）

- **導線**: ヘッダー主ナビは「活動内容」の次に **資料室 ▼**（政策提言・ひな形・資料・学ぶ）。フッターは **資料室** 列（同3リンク）。
- **役割分担**: **ひな形・資料（`/toolkit`）** は条文・チェックリスト等の中立整理。**政策提言** はキャンペーン・声明などメッセージ性の高いもの。**学ぶ（`/learn`）** は用語・法令整理・環境リスク概要・サイト内読み物・**解説記事（長尺、`/learn/topics`）**。
- **公開資料**: `public/toolkit/<subdir>/` にファイルを置くと該当ツールページで「資料あり」トーンになる（`src/lib/toolkit-files.ts`）。未配置時は準備中表示。
- **条例テンプレ**: `public/toolkit/ordinance/条例テンプレ_v0_暫定版.md` を編集・差し替えると `/toolkit/ordinance` の本文とダウンロードが更新される。表示は `MarkdownArticle.tsx`（`react-markdown` + `remark-gfm`）。再ビルド／デプロイで反映。
- **SEO**: メタ・ canonical・OG は各 `page`。

## リソース三本柱：戦略の意図と設計判断（2026-05）

**起票指示書**: `Web/タスク_リソースセクション新設.md`（サイゾー → ロクロー）

### なぜ作るのか
財団のミッション（水源・山・未来を守る）を、**現場活動だけでなく「他者を動かす資産」にも展開する**ため。具体的には、メガソーラー・風力発電などの自然破壊型開発から地域の生態系を守る**多層防御**を成立させる。3 つの柱は次の役割分担で機能する：

- **政策提言（`/policy`）** — 国・自治体・業界への公の主張（攻め）
- **ひな形・資料（`/toolkit`）** — 自治体・他団体に渡す道具（横展開）
- **学ぶ（`/learn`）** — 用語・法令の理解の土台（被引用ハブ）

### 法的フック
**生物多様性増進活動促進法（令和6年法律第18号、2024年4月施行）** を戦略の中核に据える。NPO・財団が「増進活動実施計画」の認定を受けることで、対象地に**先手で保全レイヤー**を被せ、開発側の参入を法的・社会的に困難にする筋立て。OECM 国際登録、自然共生サイト、TNFD などの周辺制度と接続する。

### IA設計判断（重要）
- **政策提言とひな形・資料は混ぜない**（声色／読者／時間軸が異なる）。中立資料に主張が混入すると採用ハードルが上がる。逆も然り。
- **URL は分離、ナビ表示は統合**（「資料室 ▼」ドロップダウン）。トップメニュー肥大化を避けつつ、それぞれの一級市民性は維持。
- **各ページ冒頭に要旨ブロック**を必置。AI 引用最適化（LLMO）の起点。

### LLMO（LLM最適化）の意図
- `/learn/glossary/[slug]` を**引用ハブ**と位置付ける。1 用語 1 URL、`DefinedTerm` JSON-LD 出力、相互リンク密。
- 政策提言・ひな形・資料・学ぶの各セクションは互いに `relatedXxxSlugs` で参照し合い、**セマンティックな引用網**を構成する。AI が「メガソーラー 規制」等で検索した際に複数セクションで引用されることを狙う。
- `SITE_ALLOW_SEARCH_INDEXING === false` の間は構造化データを出さない既存規律を遵守。

### コンテンツ取り扱い
- **箱（実装・ナビ・コンポーネント・データ層スキーマ）**: ロクロー
- **中身（用語定義・提言本文・解説記事・条例テンプレ完成版）**: サイゾー（マスター承認のうえ順次提供）
- **調査一次資料**: マスターが Gemini 等で収集 → NotebookLM に蓄積 → サイゾーが統合・執筆
- **データ追加の流れ**: `glossary.ts` / `policies.ts` / `articles.ts` の配列に push（最初は空でビルド通る設計）

### 直近で予定している中身
1. ✅ **用語集 v1.2（27語）実装済み・改訂済み**（`/learn/glossary` 一覧 + `/learn/glossary/[slug]` 個別。`GLOSSARY` 配列から静的生成。法務観点レビュー反映済み）
2. ✅ **解説記事 第1号（OECMと30by30）v1.1 公開**（`/learn/topics/oecm-30by30/`。Article JSON-LD 出力）
3. ✅ **条例テンプレ v1 公開**（`/toolkit/ordinance`。第29条 生物多様性維持協定等の推進を新設）
4. 初期 3 提言（国向け：再エネ立地規制ガイドライン／自治体向け：環境配慮型再エネ条例モデル／業界向け：TNFD 準拠の自然資本影響評価）
5. 政策提言 第3号「廃棄段階責任」（メガソーラー・風力施設の撤去・廃棄に関する責任主体・財源確保）
6. 政策提言 第4号「生物多様性維持協定による先制ロックイン戦略」（条例第29条の解説と政策的位置付け）
7. 解説記事 第2号以降の候補：(a) 水循環基本法と地下水公共性、(b) 重要土地等調査法と土地利用ガバナンス、(c) FIT/FIP制度と地域協調
8. **事例集 `/learn/cases/` の整備**（第1号候補：鏡野町風力発電阻止事例。ヒアリング許諾取得後に執筆。質問リストは `Web/ヒアリング質問リスト_鏡野町風力発電阻止事例.md`）

---

## `/media`（メディア・実績）

- **本**: Back Nature Store `book1`。画像 `public/images/media/book-minna-dekiru-chikyu-osoji.png`。CTA 文言・地球防衛群ショップリンクは `page.tsx` 内定数。
- **新聞ブロック**: データは `NEWSPAPER_ITEMS`（山陽新聞、津山朝日新聞、諏訪周辺）。**万博**は `EXPO_HIGHLIGHT` で別見出し（横長 `layout="wide"`）。
- **画像配置**: `public/images/media/` に以下の**ベース名**で置く（`.jpg` に加え `.png` / `.webp` / `.jpeg` も自動解決）:
  - `newspaper-sanyo-shimbun`
  - `newspaper-tsuyama-asahi`
  - `newspaper-suwa`
  - `expo-stage`
- 未配置時はサーバーで `fs.existsSync` 相当の解決失敗 → **プレースホルダ UI**（ビルドは落ちない）。
- 実績文面のソースはマスター手元 PDF（Obsidian 配下の実績資料等）。**文言修正は `media/page.tsx` の定数配列**を編集。

---

## ナビ・表記のポリシー（要約）

- ヘッダー主ナビに **お問い合わせは出さない**（フッター「支援・参加」に ` /contact`）。
- 「**リソース**」は三本柱（`/policy` `/toolkit` `/learn`）のみ。ラベル変更は `resource-nav.ts` を一箇所直す。
- ナビ項目名 **「アプリ・SNS」**（Instagram / TikTok / YouTube / Facebook + 先頭のアプリ紹介行）。
- フッター「財団について」の **運営体制**（文言。`href` は `/about#members`）。
- **ヘッダーPC（2026-05〜）の順序**: `HOME / 財団について / メンバー / 活動内容 / リソース▼ / アプリ・SNS▼ / 買って応援 / メディア・実績 / [支援する CTA]`。
  - **「支援・参加する」テキストリンクは廃止**（緑CTA「支援する」と `/join` で完全重複だった）。`Header.tsx` の `navItemsAfterResource` を空配列にしてある（差し戻し or 別項目追加が必要なときは 1 行 push）。
  - **`navLinkClassDesktop()` に `whitespace-nowrap` 必須**（語の途中で折れるのを防ぐ）。項目を増やすときは折り返さんか実機チェック。
  - これでも詰まりだしたら、未実装の **B案**（`応援する▼` ドロップダウンに `/join` ＋ `/shop` をまとめ、CTA は「寄付する」に改名）か、**C案**（`メディア・実績` をフッター行きに）を検討。

## 表記・トーン（固定したいこと）

- **外部資本**: 水源地取得リスクの説明は **「外部資本」** で統一。「外国資本」「外資」はニュアンス上避ける（マスター方針）。
- **オンラインショップ**: カタカナは **オンライン**（`ン` 必須）。

## 外部送信規律（総務省）メモ

- 参照: [総務省 外部送信規律FAQ](https://www.soumu.go.jp/main_sosiki/joho_tsusin/d_syohi/gaibusoushin_kiritsu_00002.html)
- 位置づけ: 公式サイトが会社案内中心でも、将来タグや埋め込みが増えると外部送信の説明が必要になる可能性あり。
- 現行方針（マスター合意）:
  - いまは **準備中/noindex** を維持しつつ、先に公開文面の型を確保する。
  - 新しい外部送信（解析タグ、埋め込み、SDK）を入れる時は **同時に公表文面を更新**する。
- 最低限の公表項目（FAQの趣旨）:
  - 送信される利用者情報の内容
  - 送信先事業者名（必要ならサービス名併記）
  - 利用目的（自社・送信先）
- 実務タスク（次担当向け）:
  - `rg` でタグ/SDKの棚卸し（例: analytics, gtag, GTM, pixel, sentry 等）
  - `/privacy` か別ページに「外部送信に関する公表」を追加（日本語・平易）

## `/about` 法人概要

- セクション **`#overview`**。リードの注釈は削除済み（シンプルな定義リスト）。
- 表示内容は **`site.ts`** の `ORGANIZATION_*` から出力。**変更は site.ts を一箇所直す**と JSON-LD・メール・規約類と揃う。

---

## 未完了・フォロー（リポジトリ全体と共有）

- 特になし（クラファン URL は確定済み・`CROWDFUNDING_URL`）。新しいフォローが出たらここに追記。

---

## 関連ドキュメント

- メンバーアプリ・インフラ・DB: `earth-savers-app/HANDOVER.md`（その中の「公式 Web」節は本ファイルへの入口）。
- エージェント向け短い指示: 同ディレクトリ `AGENTS.md`。
