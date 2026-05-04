#earth-savers-web #引き継ぎ #Next.js #公式サイト

# 公式サイト earth-savers-web — 引き継ぎ（HANDOVER）

**リポジトリ内パス**: `Web/earth-savers-web/`  
**メンバーアプリ**（別デプロイ）との共通メモは `earth-savers-app/HANDOVER.md`。**公開サイトの実装詳細は本ファイルを正**とする（齟齬時はこちらを優先）。

**直近更新**: 2026-05-04 — **本番復旧デプロイ（Vercel production）**: `npx vercel deploy --prod --yes` 成功。本番エイリアス `https://earth-savers.org`。当該ビルドのデプロイURL `https://earth-savers-1lddk5trp-haitaka0512-7940s-projects.vercel.app`。Vercel deployment id `dpl_8G8JwnB6q53ctaq6Nfp2w5Y8cwEd`、インスペクタ `https://vercel.com/haitaka0512-7940s-projects/earth-savers-web/8G8JwnB6q53ctaq6Nfp2w5Y8cwEd`。Git自動デプロイで共通Headerが古い状態（`資料室` 不在・`支援・参加する` テキストリンク残存）に戻ったため、`Header.tsx` を **資料室▼（政策提言／ひな形・資料／学ぶ）＋支援CTA一本** に復旧し、`Footer.tsx` に資料室リンク群を復元、`/join#supporter` アンカーを実体化。`https://earth-savers.org/` のHTMLで `資料室` 表示と `支援・参加する` 非表示を確認済み。このリリースには **ひな形・資料4カテゴリ**、**用語集**、**政策提言 v0** も含まれる。

**直近更新**: 2026-05-04 — **ひな形・資料 4カテゴリ構成**: `public/toolkit/` 配下に `legal/`・`operations/`・`cases/` を追加。`legal/` は `上位法との関係整理.md`・`県条例との調整チェックシート.md`・`判例サマリ.md` をプレースホルダ（「準備中です。」）で固定配置、`cases/導入事例・判例集.md` も同様。`operations/条例運用設計ガイド.md` は本文をMarkdown化し、誤字 **「両方が揃って初めに」→「両方が揃って初めて」** を修正。`src/lib/toolkit-manifest.ts` に4カテゴリの説明文・配布Markdown一覧・`published/preparing` 状態を集約し、`/toolkit` のカード説明と準備中バッジ、`/toolkit/law-guide`・`/toolkit/checklist`・`/toolkit/case-studies` の固定ファイルリンク表示に反映。**`npm run build` 成功**（既存のTurbopack NFT警告は継続）。

**直近更新**: 2026-05-04 — **用語集詳細ページ**: `src/lib/glossary.ts` の `parseSectionBody` から正規表現の **`m`（multiline）フラグを削除**（`$` が各行末にマッチし、`### 定義\n\n本文` の直後でキャプチャが空になり **定義・出典が全件消える** 不具合）。見出し **`当法人との接点`** をパース（従来の「財団との接点」もフォールバック）。出典行の **`[表示](https://…)`** 形式を `parseSourceLine` で URL 抽出。`/learn/glossary/[slug]` に **「一覧に戻る」** ボタン（`/learn/glossary` へ）を追加。`generateMetadata` の description は本文空時に `shortDescription` のみ。**本番デプロイ済**。

**直近更新**: 2026-05-04 — **政策提言 v0 公開**: 「土地取得における実質的支配者開示制度の創設に関する提言──FATF勧告24・英国 Register of Overseas Entities との整合に向けて」を `/policy/landowner-beneficial-owner-disclosure` として公開（kind: `legislative`）。**条例 v2.1 第9条の2（第一層の届出）の国制度補完版** という位置付けで、英国 ROE・EU マネロン指令・米 CTA・FATF 対日相互審査（2021-08）・FATF 勧告24（2023-03改訂）を根拠に、(1)不動産取得時の実質的支配者開示の義務化、(2)第三者検証制度（英国 verification checks 型）、(3)自治体への情報提供、(4)閾値の段階的引下げ、(5)重要土地等調査法の対象拡大、を提言。**正本** `Web/政策提言_土地取得_実質的支配者開示_v0.md` ／**サイト配信** `src/content/policies/landowner-beneficial-owner-disclosure.md`（正本コピー、Topics 同様の `src/content/` 配置）。**実装**: `src/lib/policies.ts` に `contentPath?: string`／`audience?: readonly string[]`／`requiresLegalCaveat?: boolean` を追加し POLICIES に1件登録、`src/app/policy/[slug]/page.tsx` を `MarkdownArticle`（`react-markdown` + `remark-gfm`）表示に改修して GFM 脚注・テーブル・コードブロック対応、末尾に `ContentDisclaimer` を追加、`BreadcrumbJsonLd` を「HOME / 資料室 / 政策提言 / {kind} / {title}」に拡張、`generateMetadata` を OG・robots 連動の標準形に揃えた。**依存追加**: `package.json` `dependencies` に `react-markdown@^10` `remark-gfm@^4` `github-slugger@^2`（ローカル `node_modules` には残っていたが Vercel ビルドで消えていた既存問題を解消）／同じく `@upstash/ratelimit` `@upstash/redis` も再導入。**TODO（一次資料の最終確認）**: 英国 ROE 遡及起算日（England&Wales／Scotland／NI 別）・FATF 勧告24最新 Methodology・対日相互審査 R.24/R.25 評価文言・米 CTA 暫定最終規則（2025-03）の Federal Register 番号と現時点ステータス・EU 6AMLD/AMLA 状況・19.9% 分散の実例出典（取れないものは載せない方針）。**本番デプロイ成功**（`https://earth-savers.org/policy/landowner-beneficial-owner-disclosure`）。

**直近更新**: 2026-05-05 — **サイト表記「条例ひな型」統一**（旧「条例テンプレート」「条例ひな形」等を製品名として **条例ひな型** に揃えた。関連リソース・`toolkit-manifest`・`/toolkit/ordinance`・補助資料・`learn` 各ページ・公開用語集 MD 等）。**条例正本**（`Web/条例テンプレ_v0_暫定版.md`）＝逐条解説の公開トーン調整（内部メモ調・訴訟で引用されうる表現の中立化）、第18条の2の憲法審査「必須」注記は逐条解説から削除し **ご利用にあたって** 免責へ法務審査一文を移設、「ペーパーカンパニー」等を **不透明／実体を伴わない法人** 表現へ置換。`public/toolkit/ordinance/` は正本コピーで同期。**`npm run build` 成功**。詳細は下「2026-05-05 条例・サイトメモ」。

**直近更新**: 2026-05-05（履歴）— `**/toolkit/ordinance` 公開ページの表記・ナビ整備**（見出し **条例ひな形**／サブ **v2.1（2026年5月改訂）・全56条・参入・運転・承継・出口＋既設**/リードに補助資料4種の言及／ページ上段を **「資料室 / ひな形・資料 / 条例ひな形」** に統一。`BreadcrumbJsonLd` も HOME→資料室→ひな形・資料→条例ひな形）。補助資料個別（`src/app/toolkit/ordinance/[slug]/page.tsx`）のパンくず・メタ **条例ひな形 補助資料**、関連リンク「条例ひな形ページへ」。`toolkit-manifest.ts` の `/toolkit` カードラベル、`/toolkit` のメタ説明を **条例ひな形** に整合。**本番 Vercel 再デプロイ**（`earth-savers.org`）。**確認**: ヘッダーは **資料室 ▼**／ソースに「9重の障壁」「9つの壁」なし。→ **同一日の追記**で UI 上の製品名は **条例ひな型** に再統一済み（上段「直近更新」参照）。

**直近更新**: 2026-05-04 — **条例ひな型正本** `Web/条例テンプレ_v0_暫定版.md` の議会向け一括整備（条番号整合・誤参照修正・炎上リスク平準化・免責強化・歴史景観抑制区域・国動向数字・用語「ひな型」統一）。**詳細は下の「2026-05-04 条例ひな型（正本）サマリー」**。

**直近更新**: 2026-05-03（**条例 v2.1 への発展＋補助資料パッケージ公開準備**。(1)**条例テンプレ v2.1 改訂**＝既設施設対応のための附則を11条構成に拡張（附則第2条 既存事業の定義／第3条 概要届出＋不利益取扱い禁止／第4条 物理的基準の適用除外／第5条 維持管理計画作成義務／第6条 年次報告開始時期／第7条 廃棄等費用積立金の経過措置（5,000円/kW下限）／第8条 事業承継時の確認／第9条 FIT満了時の事業継続届出／第10条 管理不全への対応／第11条 検討規定）。トリガー事由アプローチ（事業承継・FIT満了・管理不全）により遡及禁止と実効性のバランスを確保。第28条（適用除外）に第2項・第3項を新設し、行政中立スタンス（小規模施設は所有者・地域の自主的判断に委ね、相談・助言の道は残す）を明文化。(2)**条例補助資料パッケージ**を `Web/ordinance-template/` に整備（01施行規則骨子案／02図解・サマリー案【保留】／03自治体導入ガイド・5類型別パラメータ／04議会想定問答集35問／05パブコメ回答集30種／06附則ドラフト【本体に統合済】）。公開フローは `Web/指示書_ロクロー_条例補助資料公開_2026-05-03.md` を参照。前回（2026-05-02）の更新内容＝条例v2大規模改訂・用語集v1.2・解説記事v1.1は維持。差し替えフローは `Web/指示書_ロクロー_リソース差し替え_2026-05-02.md` 及び `Web/指示書_ロクロー_ウェブサイト微修正_2026-05-02.md` を参照）

**直近更新（履歴）**: 2026-05（**リソース三本柱** `/policy`・`/toolkit`・`/learn`、ヘッダー「リソース」DM、JSON-LD 部品、`sitemap.xml` と `SITE_ALLOW_SEARCH_INDEXING` 連動、**ヘッダー整理**＝重複していた「支援・参加する」テキストリンク削除＋ナビ全体に `whitespace-nowrap`、**条例テンプレ v0** を `/toolkit/ordinance` で全文公開＋Markdown ダウンロード）

### 2026-05-04 条例ひな型（正本）サマリー

対象: `**Web/条例テンプレ_v0_暫定版.md`**（サイト反映は従来どおり正本 → `public/toolkit/ordinance/条例テンプレ_v0_暫定版.md` コピー → ビルド／デプロイ）。


| 区分               | 内容                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **条番号**          | 第3章の4「廃止及び撤去」と乖離していた **第18条の4〜7** を **第20条の7〜10** に振替。附則・総括表・過料・関連条項を連動更新。                                                                       |
| **誤参照**          | 第17条の3第2号の「第8条の2第2項（存在しない）」→ **第6条第1項第3号**（水源抑制区域）に修正。                                                                                           |
| **新設**           | 第6条第1項 **第11号**（町長が歴史的・文化的・自然的景観保全のため指定する抑制区域）。元第11号は第12号へ繰下げ。阿蘇・奈良型の補完を逐条解説に記載。                                                                 |
| **表現・リスク**       | 攻撃語の平準化（例: 自然資本の循環原則／責任主体の形骸化防止）、政治的断定の弱体化、WTO/GATS・内国民待遇の記述削除（公平性・全当事者へ圧縮）、AI臭低減（総括の長文削除・「これにより」等の整理・富士河口湖・水循環の重複整理）。                           |
| **法的メモ**         | 第18条の2（連帯保証）に法務審査必須の注記。第17条の3に傾斜20度の合理性補強。冒頭・末尾に免責（個別法的助言でない旨）強化。                                                                                |
| **国・数字**         | 第1条解説に地域生物多様性増進法の趣旨接続・全国310本超条例・アセス閾値検討。第13条に再エネ特措法説明会要件の整理。第24条に FIT 一時停止57件・認定取消55件（2025年度実績・2026年4月公表の整理として記載）。総括の法的基盤リストを更新。                 |
| **用語**           | 文書内 **「テンプレート」→「ひな型」** に統一。見出しは「（ひな型案）」。**通称は「命の水と森を守る条例」のみ**（機能的名称の併記は外す方針で確定）。法人名は登記通り **一般財団法人 地球防衛群**。                                       |
| **意図的に入れていないもの** | 外国資本向けの「全体像」表・投資心理の言い切り段落は**依頼どおり未掲載**（仕組みは第9条の2等の逐条解説に既存）。**宣誓書条項は未組み込み**。積立は条文どおり **1万円/kW下限**（マスター覚書の「2万/kW」とは別）。                             |
| **逐条解説の用語**      | 「狙い／真意／本音」→趣旨・目的。「抑止する」等→適正な管理・防ぐ・担保。「外国資本／外部資本」等の属性名→届出義務者・取得者・事業者等。「議会対策として」「攻撃されないために」は書かない。**抑止力**（制裁の実効性の説明）は法技術用語として可。正本に 2026-05-04 反映済み。 |


### 2026-05-05 条例・サイトメモ（公開トーン・表記統一）

| 区分 | 内容 |
| ---- | ---- |
| **正本パス** | `Web/条例テンプレ_v0_暫定版.md` → サイト配信は従来どおり `public/toolkit/ordinance/条例テンプレ_v0_暫定版.md` にコピー（ファイル名は据え置き）。 |
| **逐条解説（追加整備）** | 内部検討調・他自治体へのリスク断定・制度弱点の自認・「投機目的」等を削し、根拠・趣旨の中立説明へ（例: 第6条実務留意、総括の土地取得段落・第三層・表、第17条の3、第18条の2ただし書、第24条本文、第25条、第26条の3、附則第7条）。第18条の2末尾の「憲法適合性の厳格な審査が必須」系注記は**逐条解説から削除**し、**ご利用にあたって**の免責段落へ「第18条の2の連帯保証条項を含む各規定の導入に際しては、自治体の実情に応じた法務審査を経ること」を追記。 |
| **「ペーパーカンパニー」除去** | 正本内の該当語を **資本関係が不透明な法人／実体を伴わない法人** 等へ置換。あわせて「温床」「責任のすり替え」「蒸発」比喩を緩和（第20条の3・附則第8条の逐条解説）。 |
| **サイト（earth-savers-web）** | ユーザー向け文言の **「条例テンプレート」「条例テンプレ」「条例ひな形」（製品名部分）** を **条例ひな型** に統一。主な実装: `src/lib/toolkit-manifest.ts`、`src/app/toolkit/page.tsx`、`src/app/toolkit/ordinance/page.tsx`・`[slug]/page.tsx`、`src/app/learn/topics/page.tsx`・`[slug]/page.tsx`（見出し「関連条例条項（ひな型）」）、`src/app/learn/glossary/page.tsx`、`src/app/policy/page.tsx`、`src/content/topics/oecm-30by30.md`、`src/content/ordinance-supplements/*.md`（「本テンプレート」等→**本ひな型**／パブコメ資料は**回答ひな型**）、`src/lib/ordinance-supplements-data.ts`、`public/learn/glossary/用語集_v0_完成版.md`。セクション名 **「ひな形・資料」**（資料室コーナー）はそのまま。 |
| **検証** | `Web/earth-savers-web` で `npm run build` 成功。 |


### 2026-05-05 `/toolkit/ordinance` サイト表記（UI・メタ）


| 項目         | 内容                                                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **実装**     | `src/app/toolkit/ordinance/page.tsx`（H1・サブタイトル・`ResourceLead`・上段ラベル・`metadata` / `openGraph`・`BreadcrumbJsonLd`）                                               |
| **連動**     | `src/app/toolkit/ordinance/[slug]/page.tsx`（補助資料のパンくず・メタ・「条例ひな型ページへ」）、`src/lib/toolkit-manifest.ts`（一覧ラベル）、`src/app/toolkit/page.tsx`（メタ description の「条例ひな型」）※2026-05-05 追記で **条例ひな型** 表記に再統一 |
| **旧表記の除去** | 英語の `Resource / Toolkit · Ordinance template` 廃止、「9重の障壁」系はサイト `src/` に残存なし（grep 確認）                                                                            |
| **デプロイ**   | `npx vercel deploy --prod` 成功（本番 `https://earth-savers.org`）                                                                                                   |


### 参照メモ（GCP・Gemini API キー不正利用）

[G-gen: Gemini API と API キーの不正使用](https://blog.g-gen.co.jp/entry/gemini-api-abuse-explanation-and-prevention) の論点（クライアント露出キー × 制限なし × 同一プロジェクトで Generative Language API 有効化 → 第三者の大量利用）。**本リポジトリの `earth-savers-web` ソース**では `AIza` / `GEMINI_` / `@google/generative-ai` 等のヒットなし（2026-05 確認）。**GCP 側のキー制限・予算アラート・プロジェクト分割**はコード外の運用で別途監査すること。

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
・**条例ひな型公開フロー**: 正本 `Web/条例テンプレ_v0_暫定版.md` → サイト配信用 `Web/earth-savers-web/public/toolkit/ordinance/条例テンプレ_v0_暫定版.md` にコピー → 再ビルド／デプロイで `/toolkit/ordinance` に反映。表示は `MarkdownArticle.tsx`（`react-markdown` + `remark-gfm`）。指示書: `Web/指示書_ロクロー_条例テンプレ公開.md`。**2026-05-04** 正本を議会向けに一括整備（HANDOVER 内「2026-05-04 条例ひな型（正本）サマリー」参照）
・**用語集 v1.2 公開**: 27語を `/learn/glossary/[slug]` で配信。データは `public/learn/glossary/用語集_v0_完成版.md` から `src/lib/glossary.ts` が `GLOSSARY` 配列へ変換して生成。個別ページは `DefinedTerm` JSON-LD / `BreadcrumbList` を出力（`SITE_ALLOW_SEARCH_INDEXING === false` の間は既存規律どおり非出力）。**v1.2 改訂（2026-05-02）**＝NIMBY印象の回避（再エネ非否定スタンス明記）／OECM登録条件の明示／「当法人」表記統一／`requiresLegalCaveat` フラグで制度系用語に改正注記表示／法的助言代替不可の注記を全ページ末尾に追加
・**解説記事（topics）**: `/learn/topics` 一覧・`/learn/topics/[slug]` 個別。記事データは `src/lib/topic-entries.ts` の `TOPICS`、本文は `src/content/topics/*.md`（第1号 `oecm-30by30`）。変換・内部リンクは `src/lib/topics.ts`。個別ページは `Article` JSON-LD（`ArticleJsonLd.tsx`）・パンくず・目次 `TopicToc.tsx`。**学ぶ**ハブ `/learn` にカードあり
・解説記事 第1号 = OECMと30by30 v1.1、`/learn/topics/oecm-30by30/` で配信、Article JSON-LD 出力（index 許可時）。**v1.1 改訂（2026-05-02）**＝「地域社会との対話と合意形成」セクション新設／税制20%減を「一定の要件を満たす場合」と限定明記／OECM登録条件の明示／著者表記を「一般財団法人 地球防衛群」に統一／第29条条項リンクは条例本体アンカーへ接続。
・**条例ひな型 補助資料**: `src/lib/ordinance-supplements-data.ts` ＋ `src/content/ordinance-supplements/*.md`。**4ページ** `/toolkit/ordinance/rules`・`adoption-guide`・`qa-council`・`qa-public`（`src/app/toolkit/ordinance/[slug]/page.tsx`）。一覧は `/toolkit/ordinance` の「条例導入を支える補助資料」。ZIP 一括はなし。パンくず・メタは **条例ひな型** 表記に統一（2026-05-05 追記）。
・**条例テンプレ v2**: `/toolkit/ordinance` で配信。前文「本条例の理念と基本スタンス」を新設（「再エネ否定ではない・適切な開発は歓迎」を冒頭明言）。**入口規制（第3章 参入段階）＋運転規制（第3章の2 維持管理）＋承継規制（第3章の3 事業の承継）＋出口規制（第3章の4 廃止及び撤去）＋第29条 生物多様性維持協定等の推進** という4軸構成。第9条の2 土地取引事前届出は水源含有確認・補正命令・個人情報保護・届出制非許可制明文化を含む拡張版。第18条は廃棄等費用積立金（1kWあたり1万円下限・FIT積立2分の1充当）。第17条の2〜の4で離隔100m／傾斜20度／調整池3,000㎡基準を導入。第26条の3 地域環境保全協力金は努力義務型（5,000㎡以上）。第25条過料は11項目（既存6項目＋出口5項目）。総括は参入・運転・出口の3段階対応表で再構成。煽り表現を全面解体
・**法務ガイドライン（2026-05-02 確立）**: 用語集・解説記事・条例の全公開ドキュメントに対し、(1)NIMBY印象を与えない（再エネ非否定スタンスを明記）、(2)税制・補助制度の適用可否を保証しない、(3)法的助言・税務助言の代替ではない旨を明記、(4)出典は官公庁・国際機関・一次資料を優先、(5)登記済み法人として「一般財団法人 地球防衛群」「当法人」で統一、を遵守
・正本: Web/earth-savers-web/HANDOVER.md
```

---

## 起動・検証


| コマンド               | 用途                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `npm run dev`      | 開発サーバー                                                                                           |
| `npx tsc --noEmit` | 型のみ（フォント取得に依存しない）                                                                                |
| `npm run lint`     | ESLint（**警告 2**: `ContactFaqSection.tsx` / `OrganizationJsonLd.tsx` の未使用 `eslint-disable`。エラー 0） |
| `npm run build`    | 本番ビルド                                                                                            |


`.env.local` があるとビルド時に読み込まれる（Contact の Resend 等）。CI で無い場合は空でもビルド通る想定で確認済みの環境あり。

---

## 最重要フラグ: `APP_EXTERNAL_LINKS_READY`

**ファイル**: `src/lib/site.ts`

- `**false`（既定・サイト先行）**:  
  - `app.earth-savers.org` へのリンクは `**join` / `join/bank-donation` / `app-intro`** でボタン無効または文言「準備中」。  
  - `**src/lib/app-sns-links.ts`** 先頭行（公式アプリ紹介）に `**disabled: true`** が付き、**Header / Footer では `<span>` のみ**（遷移しない）。ラベルは「公式アプリ紹介（準備中）」。
- `**true`（アプリ公開後）**: 上記がすべて通常リンクに戻る。**リリース時はこの定数だけ `true` に変える**のが第一歩。

---

## 主要ファイルマップ


| 領域                                                                          | パス                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| サイト定数・法人名・住所・代表者・上記フラグ                                                      | `src/lib/site.ts`（`ORGANIZATION_POSTAL_CODE` / `ORGANIZATION_ADDRESS_LINE` / `ORGANIZATION_REPRESENTATIVE_`* / `ORGANIZATION_FOUNDED_LABEL`・`ORGANIZATION_FOUNDING_DATE_ISO`。JSON-LD・規約・PP・お問い合わせメールと同期）                                                                                                                                                                             |
| アプリ紹介 + SNS 一覧（`id` / `disabled` / `external`）                              | `src/lib/app-sns-links.ts`                                                                                                                                                                                                                                                                                                                                                           |
| ヘッダー（ロゴ下は `ORGANIZATION_NAME_HEADER_LINE`＝「財団法人…」。正式名は `ORGANIZATION_NAME`） | `src/components/Header.tsx`                                                                                                                                                                                                                                                                                                                                                          |
| フッター                                                                        | `src/components/Footer.tsx`                                                                                                                                                                                                                                                                                                                                                          |
| メディア・実績                                                                     | `src/app/media/page.tsx`                                                                                                                                                                                                                                                                                                                                                             |
| 財団について・法人概要・マニフェスト等                                                         | `src/app/about/page.tsx`（`#overview` 法人概要。設立・住所は `site.ts` 参照）                                                                                                                                                                                                                                                                                                                       |
| 活動内容                                                                        | `src/app/activities/page.tsx`（リード＋`sr-only` と各 `activities[]` セクションの役割分担に注意）                                                                                                                                                                                                                                                                                                         |
| トップ                                                                         | `src/app/page.tsx`                                                                                                                                                                                                                                                                                                                                                                   |
| 買って応援                                                                       | `src/app/shop/page.tsx`                                                                                                                                                                                                                                                                                                                                                              |
| アプリ紹介ページ                                                                    | `src/app/app-intro/page.tsx`                                                                                                                                                                                                                                                                                                                                                         |
| 参加・寄付                                                                       | `src/app/join/page.tsx`、銀行都度 `src/app/join/bank-donation/page.tsx`                                                                                                                                                                                                                                                                                                                   |
| お問い合わせ API                                                                  | `src/app/api/contact/route.ts`                                                                                                                                                                                                                                                                                                                                                       |
| 構造化データ（Organization のほか breadcrumbs / DefinedTerm / Article）                | `src/components/OrganizationJsonLd.tsx`、`BreadcrumbJsonLd.tsx`、`DefinedTermJsonLd.tsx`、`ArticleJsonLd.tsx`                                                                                                                                                                                                                                                                           |
| **資料室** データソース                                                              | `src/lib/policies.ts`（個別ページ `/policy/[slug]`）、`src/lib/articles.ts`（`/learn/articles/[slug]`）、`src/lib/glossary.ts`（**用語集**: 27語、`/learn/glossary/[slug]`）、**解説記事** `src/lib/topic-entries.ts`（`TOPICS`）＋本文処理 `src/lib/topics.ts`（`/learn/topics/[slug]`）、**条例補助資料** `src/lib/ordinance-supplements-data.ts` ＋ `src/content/ordinance-supplements/*.md`（`/toolkit/ordinance/[slug]`） |
| リソース共通 UI                                                                   | `ResourceLead.tsx`（先頭リード）、`RelatedLinks.tsx`、ツール下層 `ToolkitPageBody.tsx`、長文 Markdown `MarkdownArticle.tsx`、`ContentDisclaimer.tsx`（用語集一覧・解説記事の利用注意）、`TopicToc.tsx`（解説記事の目次）                                                                                                                                                                                                          |
| ナビ定数「三本柱」                                                                   | `src/lib/resource-nav.ts`（`RESOURCE_NAV_LINKS`。Header と Footer と一致させる）                                                                                                                                                                                                                                                                                                               |
| サイトマップ（index 許可時のみ URL 出力）                                                  | `src/app/sitemap.ts`                                                                                                                                                                                                                                                                                                                                                                 |


---

## リソース／資料室（`/policy` / `/toolkit` / `/learn`）

- **導線**: ヘッダー主ナビは「活動内容」の次に **資料室 ▼**（政策提言・ひな形・資料・学ぶ）。フッターは **資料室** 列（同3リンク）。
- **役割分担**: **ひな形・資料（`/toolkit`）** は条文・チェックリスト等の中立整理。**政策提言** はキャンペーン・声明などメッセージ性の高いもの。**学ぶ（`/learn`）** は用語・法令整理・環境リスク概要・サイト内読み物・**解説記事（長尺、`/learn/topics`）**。
- **公開資料**: `public/toolkit/<subdir>/` にファイルを置くと該当ツールページで「資料あり」トーンになる（`src/lib/toolkit-files.ts`）。未配置時は準備中表示。
- **条例ひな型（本体）**: `public/toolkit/ordinance/条例テンプレ_v0_暫定版.md`（ファイル名は従来どおり）を編集・差し替えると `/toolkit/ordinance` の本文とダウンロードが更新される。**公開ページの製品名表記は「条例ひな型」**（2026-05-05 追記で統一。コーナー名「ひな形・資料」とは別）。表示は `MarkdownArticle.tsx`（`react-markdown` + `remark-gfm`）。再ビルド／デプロイで反映。
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

- ヘッダー主ナビに **お問い合わせは出さない**（フッター「支援・参加」に  `/contact`）。
- 「**リソース**」は三本柱（`/policy` `/toolkit` `/learn`）のみ。ラベル変更は `resource-nav.ts` を一箇所直す。
- ナビ項目名 **「アプリ・SNS」**（Instagram / TikTok / YouTube / Facebook + 先頭のアプリ紹介行）。
- フッター「財団について」の **運営体制**（文言。`href` は `/about#members`）。
- **ヘッダーPC（2026-05〜）の順序**: `HOME / 財団について / メンバー / 活動内容 / リソース▼ / アプリ・SNS▼ / 買って応援 / メディア・実績 / [支援する CTA]`。
  - **「支援・参加する」テキストリンクは廃止**（緑CTA「支援する」と `/join` で完全重複だった）。`Header.tsx` の `navItemsAfterResource` を空配列にしてある（差し戻し or 別項目追加が必要なときは 1 行 push）。
  - `**navLinkClassDesktop()` に `whitespace-nowrap` 必須**（語の途中で折れるのを防ぐ）。項目を増やすときは折り返さんか実機チェック。
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

- セクション `**#overview`**。リードの注釈は削除済み（シンプルな定義リスト）。
- 表示内容は `**site.ts`** の `ORGANIZATION_`* から出力。**変更は site.ts を一箇所直す**と JSON-LD・メール・規約類と揃う。

---

## 未完了・フォロー（リポジトリ全体と共有）

- 特になし（クラファン URL は確定済み・`CROWDFUNDING_URL`）。新しいフォローが出たらここに追記。

---

## 関連ドキュメント

- メンバーアプリ・インフラ・DB: `earth-savers-app/HANDOVER.md`（その中の「公式 Web」節は本ファイルへの入口）。
- エージェント向け短い指示: 同ディレクトリ `AGENTS.md`。

