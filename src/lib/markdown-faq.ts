/**
 * 想定問答形式の Markdown から Q&A を抽出し、JSON-LD の `FAQPage` に載せる。
 *
 * 画面に見えている問答をそのまま構造化データへ写すだけで、内容の追加・要約はしない。
 *
 * 対応する記法は2種類:
 * 1. `### 【P-01】「質問」` + 引用ブロックの `> **回答：** …`（住民向け想定問答）
 * 2. `**【A-1】質問**` + 引用ブロックの `> **答弁（案）：** …`（議会答弁想定問答）
 */

export type MarkdownFaqEntry = {
  question: string;
  answer: string;
};

/** `### 【ラベル】質問` */
const QUESTION_HEADING = /^###\s+【[^】]+】\s*(.+?)\s*$/;

/** `**【ラベル】質問**` */
const QUESTION_BOLD = /^\*\*【[^】]+】\s*(.+?)\*\*\s*$/;

/** 引用ブロック中の回答開始行。`> **回答：** …` / `> **答弁（案）：** …` */
const ANSWER_MARKER = /^>\s*\*\*(?:回答|答弁（案）|答弁)[：:]\*\*\s*(.*)$/;

/** 引用ブロックの行 */
const BLOCKQUOTE_LINE = /^>\s?(.*)$/;

/** 回答が長すぎると構造化データが肥大化するため上限を設ける */
const MAX_ANSWER_LENGTH = 1200;

/** 強調記号・コードスパンを外して1行のプレーンテキストにする */
function toPlainText(value: string): string {
  return value
    .replace(/[*`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** 見出しの鉤括弧は質問文の一部ではないため外す */
function toQuestionText(raw: string): string {
  return toPlainText(raw).replace(/^「/, "").replace(/」$/, "");
}

/**
 * 質問行の直後の引用ブロックから回答本文を集める。
 * `対応区分` など回答マーカーより前の行は回答に含めない。
 */
function readAnswer(lines: string[], startIndex: number): string | null {
  const parts: string[] = [];
  let started = false;

  for (let i = startIndex; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === "") {
      if (started) break;
      continue;
    }
    if (!BLOCKQUOTE_LINE.test(line)) break;

    const marker = ANSWER_MARKER.exec(line);
    if (marker) {
      started = true;
      if (marker[1].trim()) parts.push(marker[1]);
      continue;
    }
    if (started) {
      const quoted = BLOCKQUOTE_LINE.exec(line);
      if (quoted) parts.push(quoted[1]);
    }
  }

  if (!started || parts.length === 0) return null;
  const answer = toPlainText(parts.join(" "));
  if (!answer) return null;
  return answer.length > MAX_ANSWER_LENGTH
    ? `${answer.slice(0, MAX_ANSWER_LENGTH)}…`
    : answer;
}

/** 想定問答の Q&A を抽出する。問答形式でない資料では空配列を返す。 */
export function extractMarkdownFaq(markdown: string): MarkdownFaqEntry[] {
  const lines = markdown.split("\n");
  const entries: MarkdownFaqEntry[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const match = QUESTION_HEADING.exec(lines[i]) ?? QUESTION_BOLD.exec(lines[i]);
    if (!match) continue;

    const question = toQuestionText(match[1]);
    if (!question) continue;

    const answer = readAnswer(lines, i + 1);
    if (!answer) continue;

    entries.push({ question, answer });
  }

  return entries;
}
