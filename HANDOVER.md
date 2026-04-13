#earth-savers-web #引き継ぎ #Next.js #公式サイト

# 公式サイト earth-savers-web — 引き継ぎ（HANDOVER）

**リポジトリ内パス**: `Web/earth-savers-web/`  
**メンバーアプリ**（別デプロイ）との共通メモは `earth-savers-app/HANDOVER.md`。**公開サイトの実装詳細は本ファイルを正**とする（齟齬時はこちらを優先）。

**直近更新**: 2026-04（法人概要・設立2026年4月・外部資本表記統一・activities リード整理・フッター「運営体制」・クラファン URL 等）

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
・アプリ先行公開しない間: APP_EXTERNAL_LINKS_READY = false
  → app CTA は join / bank-donation / app-intro で準備中、ナビ「公式アプリ紹介」は disabled（/app-intro 直打ちは可）
・アプリ・SNS: src/lib/app-sns-links.ts のみ（Header + Footer）
・/media: 本＋新聞・万博写真枠（画像は public/images/media/）
・フッター「財団について」: 法人概要、運営体制（ラベル。※リンク先は /about#members）
・検証: npx tsc --noEmit && npm run lint && npm run build
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
| 構造化データ | `src/components/OrganizationJsonLd.tsx` |

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
- ナビ項目名 **「アプリ・SNS」**（Instagram / TikTok / YouTube / Facebook + 先頭のアプリ紹介行）。
- フッター「財団について」の **運営体制**（文言。`href` は `/about#members`）。

## 表記・トーン（固定したいこと）

- **外部資本**: 水源地取得リスクの説明は **「外部資本」** で統一。「外国資本」「外資」はニュアンス上避ける（マスター方針）。
- **オンラインショップ**: カタカナは **オンライン**（`ン` 必須）。

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
