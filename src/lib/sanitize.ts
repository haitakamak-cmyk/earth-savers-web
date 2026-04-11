/**
 * プレーンテキスト向けサニタイズ（HTML タグ除去）。
 * isomorphic-dompurify は Node/Vercel で jsdom → ESM 依存の都合により使わない。
 *
 * 方針: script/style/コメントを除き、`<` + タグらしき始まりの～`>` ブロックを繰り返し除去。
 * `3 < 5` のような不等号は壊さない（`<` の直後が英字・`!`・`/` 等のときだけタグ扱い）。
 */

const SCRIPT_OR_STYLE = /<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi;
const HTML_COMMENT = /<!--[\s\S]*?-->/g;
/** `<div>` `</p>` `<!DOCTYPE ...>` 等。`< 5` にはマッチしない */
const HTML_TAG_CHUNK = /<(?:\/|[a-zA-Z!?])[^>]*>/g;

function decodeBasicHtmlEntities(s: string): string {
  return s
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#(\d+);/g, (_, n) => {
      const code = Number(n);
      if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return _;
      try {
        return String.fromCodePoint(code);
      } catch {
        return _;
      }
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => {
      const code = parseInt(h, 16);
      if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) return _;
      try {
        return String.fromCodePoint(code);
      } catch {
        return _;
      }
    })
    .replace(/&amp;/gi, "&");
}

function stripHtmlTags(raw: string): string {
  let s = raw.replace(SCRIPT_OR_STYLE, " ");
  s = s.replace(HTML_COMMENT, " ");
  for (let i = 0; i < 50; i += 1) {
    const next = s.replace(HTML_TAG_CHUNK, "");
    if (next === s) break;
    s = next;
  }
  return s;
}

/**
 * 汎用テキストサニタイズ: HTML タグを除去し、プレーンテキストとして返す。
 */
export function sanitizeText(raw: string): string {
  const stripped = stripHtmlTags(raw);
  return decodeBasicHtmlEntities(stripped).trim();
}
