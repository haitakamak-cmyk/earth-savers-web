import { preload } from "react-dom";

/**
 * ファーストビューの文字だけを収めたサブセット（g0）を先読みする。
 *
 * フォントが遅れて届くとテキストが組み直され、ヒーローのボタンが動いていた
 * （PSI 実測 CLS 0.049）。ここだけ先に届けば組み直しが起きない。
 *
 * 以前フォントの全サブセット 359本を先読みして初期表示を壊したことがあるので、
 * **最初に見える3面ぶんだけ**に限定している（合計 約160KB）。
 * JSX で <link> を書くと重複して出力されるため react-dom の preload を使う。
 */
export function preloadCriticalFonts() {
  for (const href of [
    "/fonts/v1/zen-400.g0.woff2",
    "/fonts/v1/zen-700.g0.woff2",
    "/fonts/v1/serif-700.g0.woff2",
  ]) {
    preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }
}
