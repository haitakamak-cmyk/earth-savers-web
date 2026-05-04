import GithubSlugger from "github-slugger";

import type { TopicTocItem } from "@/lib/topics";

/**
 * `## 見出し` 行のみを拾い、`MarkdownArticle` / `extractTopicToc` と同一の github-slugger で id を付与する。
 * 解説記事の目次と並びを揃えるため topics.ts の extractTopicToc と同じ正規表現・手順。
 */
export function extractMarkdownHeadingToc(markdown: string): TopicTocItem[] {
  const slugger = new GithubSlugger();
  const items: TopicTocItem[] = [];
  for (const line of markdown.split("\n")) {
    const m = /^## (.+)$/.exec(line);
    if (!m) continue;
    const title = m[1].trim();
    const id = slugger.slug(title, true);
    items.push({ id, title });
  }
  return items;
}
