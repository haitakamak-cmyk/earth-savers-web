#earth-savers-web #引き継ぎ #Next.js #公式サイト

# 公式サイト earth-savers-web — 引き継ぎ（HANDOVER）

**リポジトリ内パス**: `Web/earth-savers-web/`  
**メンバーアプリ**（別デプロイ）との共通メモは `earth-savers-app/HANDOVER.md`。**公開サイトの実装詳細は本ファイルを正**とする（齟齬時はこちらを優先）。

**直近更新**: 2026-05（**リソース三本柱** `/policy`・`/toolkit`・`/learn`、ヘッダー「リソース」DM、JSON-LD 部品、`sitemap.xml` と `SITE_ALLOW_SEARCH_INDEXING` 連動）

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
・**リソース（三本柱）**: ヘッダー／フッター「リソース」→ `/policy`（政策）、`/toolkit`（実務中立）、`/learn`（学び）。文言・データは `policies.ts` / `articles.ts` / `glossary.ts`。`SITE_ALLOW_SEARCH_INDEXING === false` の間は構造化データ（ breadcrumbs 等）は出さず robots で全 disallow
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
| **リソース** データソース | `src/lib/policies.ts`（個別ページ `/policy/[slug]`）、`src/lib/articles.ts`（`/learn/articles/[slug]`）、`src/lib/glossary.ts`（`/learn/glossary/[slug]`） |
| リソース共通 UI | `ResourceLead.tsx`（先頭リード）、`RelatedLinks.tsx`、ツール下層 `ToolkitPageBody.tsx`、長文 Markdown `MarkdownArticle.tsx` |
| ナビ定数「三本柱」 | `src/lib/resource-nav.ts`（`RESOURCE_NAV_LINKS`。Header と Footer と一致させる） |
| サイトマップ（index 許可時のみ URL 出力） | `src/app/sitemap.ts` |

---

## リソース（`/policy` / `/toolkit` / `/learn`）

- **導線**: ヘッダー主ナビは「活動内容」の次に **リソース ▼**（政策提言・ツールキット・まなぶ）。その次が「支援・参加する」。フッターに **リソース** 列（同3リンク）。
- **役割分担**: **ツールキット**は条文・チェックリスト等の中立整理。**政策提言**はキャンペーン・声明などメッセージ性の高いもの。**まなぶ**は用語・法令整理・環境リスク概要・サイト内読み物。
- **公開資料**: `public/toolkit/<subdir>/` にファイルを置くと該当ツールページで「資料あり」トーンになる（`src/lib/toolkit-files.ts`）。未配置時は準備中表示。
- **条例テンプレ**: `public/toolkit/ordinance/条例テンプレ_v0_暫定版.md` を編集・差し替えると `/toolkit/ordinance` の本文とダウンロードが更新される。表示は `MarkdownArticle.tsx`（`react-markdown` + `remark-gfm`）。再ビルド／デプロイで反映。
- **SEO**: メタ・ canonical・OG は各 `page`。

## リソース三本柱：戦略の意図と設計判断（2026-05）

**起票指示書**: `Web/タスク_リソースセクション新設.md`（サイゾー → ロクロー）

### なぜ作るのか
財団のミッション（水源・山・未来を守る）を、**現場活動だけでなく「他者を動かす資産」にも展開する**ため。具体的には、メガソーラー・風力発電などの自然破壊型開発から地域の生態系を守る**多層防御**を成立させる。3 つの柱は次の役割分担で機能する：

- **政策提言（`/policy`）** — 国・自治体・業界への公の主張（攻め）
- **ツールキット（`/toolkit`）** — 自治体・他団体に渡す道具（横展開）
- **まなぶ（`/learn`）** — 用語・法令の理解の土台（被引用ハブ）

### 法的フック
**生物多様性増進活動促進法（令和6年法律第18号、2024年4月施行）** を戦略の中核に据える。NPO・財団が「増進活動実施計画」の認定を受けることで、対象地に**先手で保全レイヤー**を被せ、開発側の参入を法的・社会的に困難にする筋立て。OECM 国際登録、自然共生サイト、TNFD などの周辺制度と接続する。

### IA設計判断（重要）
- **政策提言とツールキットは混ぜない**（声色／読者／時間軸が異なる）。中立資料に主張が混入すると採用ハードルが上がる。逆も然り。
- **URL は分離、ナビ表示は統合**（「リソース ▼」ドロップダウン）。トップメニュー肥大化を避けつつ、それぞれの一級市民性は維持。
- **各ページ冒頭に要旨ブロック**を必置。AI 引用最適化（LLMO）の起点。

### LLMO（LLM最適化）の意図
- `/learn/glossary/[slug]` を**引用ハブ**と位置付ける。1 用語 1 URL、`DefinedTerm` JSON-LD 出力、相互リンク密。
- 政策提言・ツールキット・まなぶの 3 セクションは互いに `relatedXxxSlugs` で参照し合い、**セマンティックな引用網**を構成する。AI が「メガソーラー 規制」等で検索した際に 3 点セットで引用されることを狙う。
- `SITE_ALLOW_SEARCH_INDEXING === false` の間は構造化データを出さない既存規律を遵守。

### コンテンツ取り扱い
- **箱（実装・ナビ・コンポーネント・データ層スキーマ）**: ロクロー
- **中身（用語定義・提言本文・解説記事・条例テンプレ完成版）**: サイゾー（マスター承認のうえ順次提供）
- **調査一次資料**: マスターが Gemini 等で収集 → NotebookLM に蓄積 → サイゾーが統合・執筆
- **データ追加の流れ**: `glossary.ts` / `policies.ts` / `articles.ts` の配列に push（最初は空でビルド通る設計）

### 直近で予定している中身
1. 用語集の最初の 20 語（OECM、ネイチャーポジティブ、30by30、TNFD、生物多様性増進活動促進法、自然共生サイト、外部資本… 等）
2. 初期 3 提言（国向け：再エネ立地規制ガイドライン／自治体向け：環境配慮型再エネ条例モデル／業界向け：TNFD 準拠の自然資本影響評価）
3. 条例テンプレート完成版（メガソーラー・風力規制条例の汎用ひな型）
4. 法律活用ガイド（生物多様性増進活動促進法の認定取得手順と戦略的使い方）

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
