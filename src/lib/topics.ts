import { readFileSync } from "fs";
import path from "path";

import GithubSlugger from "github-slugger";

import type { TopicEntry } from "./topic-entries";

export type { TopicEntry } from "./topic-entries";
export { getAllTopicSlugs, getTopicBySlug, TOPICS } from "./topic-entries";

const GLOSSARY_LINK_RULES: { phrase: string; href: string }[] = [
  {
    phrase: "昆明・モントリオール生物多様性枠組",
    href: "/learn/glossary/kunming-montreal-framework",
  },
  {
    phrase: "生物多様性増進活動促進法",
    href: "/learn/glossary/biodiversity-promotion-act",
  },
  { phrase: "ネイチャーポジティブ", href: "/learn/glossary/nature-positive" },
  {
    phrase: "自然共生サイト",
    href: "/learn/glossary/nature-coexistence-site",
  },
  { phrase: "30by30", href: "/learn/glossary/30by30" },
  { phrase: "TNFD", href: "/learn/glossary/tnfd" },
  { phrase: "OECM", href: "/learn/glossary/oecm" },
].sort((a, b) => b.phrase.length - a.phrase.length);

/** 条例テンプレの見出し id（MarkdownArticle の slugger・maintainCase と一致） */
const ORDINANCE_ANCHOR_ARTICLE5 = "第5条設置禁止区域";

export function hrefForOrdinanceArticleLabel(label: string): string {
  if (label.includes("第5条"))
    return `/toolkit/ordinance#${encodeURIComponent(ORDINANCE_ANCHOR_ARTICLE5)}`;
  if (label.includes("第29条"))
    return "/toolkit/ordinance";
  return "/toolkit/ordinance";
}

export function ordinanceArticleLinkSubtitle(label: string): string | undefined {
  if (label.includes("第29条"))
    return "条例テンプレの逐条本文は編集責任者が追記する前提です（ページ先頭へ）。";
  return undefined;
}

export function loadTopicRawMarkdown(entry: TopicEntry): string {
  const abs = path.join(process.cwd(), entry.contentPath);
  return readFileSync(abs, "utf-8");
}

/** `# タイトル` とメタ行・最初の `---` までを除去 */
export function stripTopicSourceHeader(raw: string): string {
  const lines = raw.split("\n");
  let i = 0;
  if (lines[i]?.startsWith("# ")) i += 1;
  while (i < lines.length && lines[i]?.trim() !== "---") i += 1;
  if (i < lines.length && lines[i]?.trim() === "---") i += 1;
  while (i < lines.length && lines[i]?.trim() === "") i += 1;
  return lines.slice(i).join("\n").trimStart();
}

/** 本文_main部のみ、各用語の初出を内部リンク化（参考文献ブロックは別処理のため呼び出し側で除外） */
export function applyGlossaryLinksOnce(mainMarkdown: string): string {
  let text = mainMarkdown;
  for (const { phrase, href } of GLOSSARY_LINK_RULES) {
    const index = text.indexOf(phrase);
    if (index === -1) continue;
    const before = text.slice(0, index);
    const bracketOpens = (before.match(/\[/g) ?? []).length;
    const linkStarts = (before.match(/\]\(/g) ?? []).length;
    if (bracketOpens > linkStarts) continue;
    text =
      `${before}[${phrase}](${href})${text.slice(index + phrase.length)}`;
  }
  return text;
}

export type SplitTopicMarkdown = {
  mainMarkdown: string;
  referencesMarkdown: string;
  footnoteMarkdown: string;
};

export function splitTopicMarkdown(body: string): SplitTopicMarkdown {
  const refHeading = "## 参考文献";
  const refStart = body.indexOf(refHeading);
  if (refStart === -1) {
    return {
      mainMarkdown: body.trimEnd(),
      referencesMarkdown: "",
      footnoteMarkdown: "",
    };
  }
  const mainMarkdown = body.slice(0, refStart).trimEnd();
  const fromRefs = body.slice(refStart).trimStart();
  const footMarker = "\n\n> **本記事に関するご注意**";
  const footIdx = fromRefs.indexOf(footMarker);
  if (footIdx === -1) {
    return {
      mainMarkdown,
      referencesMarkdown: fromRefs,
      footnoteMarkdown: "",
    };
  }
  return {
    mainMarkdown,
    referencesMarkdown: fromRefs.slice(0, footIdx).trimEnd(),
    footnoteMarkdown: fromRefs.slice(footIdx).trimStart(),
  };
}

export type TopicTocItem = { id: string; title: string };

/** mainMarkdown 内の `## 見出し` から目次用 id を生成（MarkdownArticle と同一アルゴリズム） */
export function extractTopicToc(mainMarkdown: string): TopicTocItem[] {
  const slugger = new GithubSlugger();
  const items: TopicTocItem[] = [];
  for (const line of mainMarkdown.split("\n")) {
    const m = /^## (.+)$/.exec(line);
    if (!m) continue;
    const title = m[1].trim();
    const id = slugger.slug(title, true);
    items.push({ id, title });
  }
  return items;
}
