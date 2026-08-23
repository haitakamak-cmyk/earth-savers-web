/**
 * 記事 Markdown から引用元（一次資料）を抽出し、JSON-LD の `citation` に載せる。
 *
 * 記事側は既に脚注・参考文献で出典を明示しているため、ここで新たな情報は作らない。
 * 画面に表示されている出典だけを構造化データへ写す。
 *
 * 対応する記法は2種類:
 * 1. GFM 脚注定義  `[^S1]: 出典名 https://example.go.jp/...（補足）`
 * 2. `## 参考文献` 配下の箇条書き  `- 出典名：https://example.go.jp/...`
 */

export type MarkdownCitation = {
  /** 出典名（URL より前の説明文） */
  name: string;
  url: string;
};

/** 脚注定義行。`[^ラベル]: 本文` */
const FOOTNOTE_DEFINITION = /^\[\^[^\]]+\]:\s*(.+)$/;

/** 参考文献セクションの箇条書き。`- 本文` / `* 本文` */
const BULLET_ITEM = /^[-*]\s+(.+)$/;

/** 日本語の閉じ括弧・句読点は URL に含めない */
const URL_IN_TEXT = /https?:\/\/[^\s）)、。」』]+/;

const REFERENCES_HEADING = /^##\s+参考文献\s*$/;

/** 参考文献セクションの終わり（次の `##` 見出し） */
const H2_HEADING = /^##\s+/;

/** JSON-LD が肥大化しないよう、1記事あたりの上限を設ける */
const MAX_CITATIONS = 40;

/** 出典名の上限。長い法令名がそのまま入るため余裕を持たせる */
const MAX_NAME_LENGTH = 200;

/** 強調記号・コードスパンを外し、前後の記号を落として表示用の名前にする */
function toCitationName(rawPrefix: string, fallbackUrl: string): string {
  const name = rawPrefix
    .replace(/[*`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[（(［[]$/, "")
    .replace(/[。、,：:／/]+$/, "")
    .trim();
  if (!name) return fallbackUrl;
  return name.length > MAX_NAME_LENGTH
    ? `${name.slice(0, MAX_NAME_LENGTH)}…`
    : name;
}

/** 1行から「URL より前のテキスト」と URL を取り出す。URL が無ければ null */
function citationFromLine(body: string): MarkdownCitation | null {
  const match = URL_IN_TEXT.exec(body);
  if (!match) return null;
  // 末尾に紛れ込んだ句読点は URL から外す
  const url = match[0].replace(/[.,]+$/, "");
  return { name: toCitationName(body.slice(0, match.index), url), url };
}

/**
 * 脚注定義と `## 参考文献` の箇条書きから引用元を集める。
 * 本文中のリンクは「引用元」とは限らないため対象にしない。
 */
export function extractMarkdownCitations(markdown: string): MarkdownCitation[] {
  const citations: MarkdownCitation[] = [];
  const seenUrls = new Set<string>();
  let inReferences = false;

  const push = (citation: MarkdownCitation | null) => {
    if (!citation || seenUrls.has(citation.url)) return;
    if (citations.length >= MAX_CITATIONS) return;
    seenUrls.add(citation.url);
    citations.push(citation);
  };

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();

    if (REFERENCES_HEADING.test(line)) {
      inReferences = true;
      continue;
    }
    if (inReferences && H2_HEADING.test(line)) {
      inReferences = false;
    }

    const footnote = FOOTNOTE_DEFINITION.exec(line);
    if (footnote) {
      push(citationFromLine(footnote[1]));
      continue;
    }

    if (inReferences) {
      const bullet = BULLET_ITEM.exec(line);
      if (bullet) push(citationFromLine(bullet[1]));
    }
  }

  return citations;
}
