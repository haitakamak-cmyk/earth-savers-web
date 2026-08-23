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
