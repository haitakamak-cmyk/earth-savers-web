<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

> 上のブロックは自動生成される。以下に追記する内容は必ず `END:nextjs-agent-rules` より後ろに置くこと。

# このリポジトリでの作業ルール

## PR 運用

- **`main` への直接 push は禁止。** 必ずブランチを切って PR を作る。
- **merge は依頼者の明示的な GO を待つ。** エージェントは PR 作成までで止める。
- コミットメッセージと PR 本文の末尾に `Conceived by Romuald Członkowski - https://www.aiadvisors.pl/en` を入れる。
- 未マージの PR が同じファイルを触っている場合は、**インデントや構造の変更を避けて差分を最小に保つ**（衝突解決を依頼者にさせない）。

## 検証コマンド

| コマンド | 用途 |
| --- | --- |
| `npx tsc --noEmit` | 型のみ（フォント取得に依存しない） |
| `npm run lint` | エラー 0 が条件。既存の warning は許容 |
| `npm run build` | 本番ビルド |

詳細と環境変数の扱いは [HANDOVER.md](./HANDOVER.md) の「起動・検証」を参照。

## ブラウザで確認するときの落とし穴

Claude Code の Browser pane（および同種のヘッドレス環境）には以下の制約がある。**知らずに使うと「直っていない」と誤判定して、直っている修正を壊す方向に直しにいく。**

- **スクロールが動かない。** `window.scrollTo()` / `scrollIntoView()` / ツールの scroll 操作を使っても `scrollY` は 0 のまま。「アンカーを踏んで画面がその位置へ動いた」ことは確認できない。
  → リンクを実際にクリックしたうえで **`document.querySelector(':target')`** を見る。ブラウザがアンカーをどの要素へ解決したかが分かり、id の一致はこれで確実に押さえられる。
- **コンソールのバッファがリロードやページ遷移で消えない。** 修正前の警告が残り続ける。
  → **新しいタブを開いてから**確認する。hydration 警告は全文が非常に長いので、`didn't match` などで絞ると直っていれば空が返る。
- **モバイル幅（375px）の目次は折りたたみ。** ボタンを押さないとリンクが出ない。スクロールできないので、ボタンとリンクは `element.click()` で踏む。
- **サイト全体の横断確認**は、`npm run build` → `npx next start` したうえで `sitemap.xml` から全 URL を取り、各ページの `href="#..."` が同一ページ内の `id` に解決するかをスクリプトで突き合わせるのが速い（全ページ・アンカー数百本が数秒）。

## Markdown 記事（`MarkdownArticle`）を触るとき

- **見出しの id を render 中に生成しないこと。** `github-slugger` は「同じ文字列の2回目に `-1` を付ける」可変カウンタを持つ。React StrictMode は開発時に見出しコンポーネントを2回呼ぶため、2回目が `-1` 付きになり SSR と食い違って hydration mismatch になる。id は rehype プラグイン `rehypeHeadingSlugIds` が hast 段階で確定させている（PR #71）。
  - `useMemo` をやめて render ごとに `new GithubSlugger()` しても直らない。見出しコンポーネント自体が2回呼ばれるため。可変カウンタ・乱数・時刻を render 中に消費しないという一般則の一例。
- **見出し id の規則を変えるときは `src/lib/markdown-toc.ts` の `extractMarkdownHeadingToc` も必ず揃える。** こちらは別の slugger で `^## ` 行だけを走査するため、`#` や `###` に同じ文字列の見出しがあると連番のズレ方が両者で食い違い、目次リンクが飛ばなくなる。
- GFM 脚注の id（`user-content-fn-` / `user-content-fnref-`）と脚注ラベルの `footnote-label` は id 生成の対象外にすること。

## フォント（自己ホストのサブセット）を触るとき

日本語フォントは `scripts/build-fonts.py` が生成した woff2 を `public/fonts/v1/` に置き、`src/app/fonts.css` の `@font-face` + `unicode-range` で 9 グループに分けて配信している。**`src/app/fonts.css` は生成物なので直接編集しない。**

- **`g0` を太らせない。** g0 は「共通UI（ヘッダー・ナビ・フッター）＋トップのファーストビューで必ず出る文字」だけを収め、全ページで preload している。記事本文の文字やページ固有の見出しを足すと、全訪問者のクリティカルパスが重くなり、preload の利点が消える。目安は1面あたり 100KB 未満。
- **CSS の追加は `layout.tsx` から `import` する。** `globals.css` の中で `@import` すると、ローカルでは通るのに Vercel のビルドで黙って落ちることがある（2026-09-02 に本番のフォントが全消えした）。`npm run postbuild` の `scripts/assert-fonts-emitted.mjs` が、ビルド後の CSS に `@font-face` が30個未満ならビルドを落とす。
- **フォントの preload は「最初に見える文字」だけに限る。** かつて全サブセット 359本を preload しており、モバイルの FCP が 10.9 秒だった（2026-09-03 に 1.0 秒へ改善）。
- 画像は `priority` ではなく `fetchPriority="high"` + `loading="eager"` を使う（Next 16 で `priority` は非推奨）。

### 速度を測るときの注意

- **判断は PageSpeed Insights のモバイルで統一する。** ローカルの Lighthouse は同じ Moto G 相当の設定にしても本番の PSI を再現できず（FCP 2.1秒 vs 10.7秒）、スコアも 55〜94 と振れる。ローカルは差分の方向を見る補助にとどめる。
#### 計測ルール（2026-09-03 に確立）

1. **単発値で判断しない。** 同一ビルド（コード無変更）で 35分のあいだに Performance 97 / 56 / 50、FCP 1.0〜8.3秒と振れた実績がある。
2. **同一時間帯で交互に測る。** 比較したい2条件を続けて交互に測る。時間をおいて別々に測ると、下の「時間帯差」に飲まれて逆の結論が出うる。
3. **中央値とレンジで見る。** スコア単体ではなく FCP 中央値・LCP 中央値・CLS・最速〜最遅のレンジを残す。単発の最良値を成果として書かない。

**時間帯差が、施策の差より大きいことがある。** 2026-09-03 の A/B では、16時台は両条件とも速く、21時台は両条件とも遅かった。時間帯による差（FCP で約6秒）のほうが、条件による差（約3秒）より大きかった。交互に測ったからこそ切り分けられた。

実測レンジ（2026-09-03、PSI モバイル・同一ビルド3回）: Performance 50〜97（中央値 56）/ FCP 1.0〜8.3秒（中央値 8.2秒）/ LCP 2.4〜11.9秒（中央値 10.0秒）/ CLS 0〜0.001。

#### フォント先読み（g0 の3本）の採否の経緯

- **導入の狙いは CLS 改善だった**（本番トップで CLS 0.049 を観測したため）。
- **A/B ではその効果を確認できなかった。** 先読みなしでも CLS は2回とも 0 だった。0.049 は別要因だった可能性がある。
- **最終的な採用根拠は FCP/LCP。** 今回の PSI 条件では、**交互測定した2ペアとも先読みありが FCP/LCP で有利**だった（FCP 中央値 4.9秒 vs 8.0秒、LCP 中央値 7.2秒 vs 10.5秒）。
- **「先読みで常に約3秒速くなる」とは言えない。** 上記の条件下で有利だった、という以上の主張はしない。
