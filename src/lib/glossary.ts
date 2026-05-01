import type { PolicyKind } from "./policies";

export type GlossarySlug = string;

export type DefinedTermRelated = {
  relatedToolkitPaths?: readonly string[];
  /** 用語または `/learn/laws` 内のアンカー */
  relatedLawAnchors?: readonly string[];
  relatedPolicyKinds?: readonly PolicyKind[];
  relatedArticleSlugs?: readonly string[];
};

export type GlossaryEntry = {
  slug: GlossarySlug;
  term: string;
  /** 一覧・本文冒頭・JSON-LD 用の短い説明（プレーンテキスト） */
  shortDescription: string;
  /** 詳細段落（サイト内表示用・改行 `\n\n` で段落） */
  body: string;
  alternateNames?: readonly string[];
} & DefinedTermRelated;

/**
 * 用語一覧。公開前は空でも可（`generateStaticParams` が空リストになる）。
 */
export const GLOSSARY_ENTRIES: readonly GlossaryEntry[] = [];

export function getGlossaryBySlug(slug: string): GlossaryEntry | undefined {
  return GLOSSARY_ENTRIES.find((e) => e.slug === slug);
}

export function getAllGlossarySlugs(): string[] {
  return GLOSSARY_ENTRIES.map((e) => e.slug);
}
