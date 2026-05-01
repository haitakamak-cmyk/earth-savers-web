import type { PolicyKind } from "./policies";

export type ArticleEntry = {
  slug: string;
  title: string;
  summary: string;
  /** サイト内本文 */
  body: string;
  datePublished?: string;
  tags?: readonly string[];
  relatedToolkitPaths?: readonly string[];
  relatedGlossarySlugs?: readonly string[];
  relatedPolicyKinds?: readonly PolicyKind[];
};

export function getArticleBySlug(slug: string): ArticleEntry | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map((a) => a.slug);
}

/** 読み物一覧。公開前は空でも可 */
export const ARTICLES: readonly ArticleEntry[] = [];
