import { ARTICLES } from "./articles";
import type { ArticleEntry } from "./articles";
import type { GlossaryEntry } from "./glossary";
import { getGlossaryBySlug } from "./glossary";
import type { PolicyEntry, PolicyKind } from "./policies";
import { POLICY_KIND_LABEL, policiesByKind } from "./policies";
import { TOOLKIT_LINKS } from "./toolkit-manifest";

export type RelatedNavItem = { href: string; label: string; description?: string };

const TOOLKIT_BY_PATH = Object.fromEntries(TOOLKIT_LINKS.map((l) => [l.href, l.label]));

/** 一覧に出している代表スラッグ（最初の1件だけリンク）／将来は個別一覧へ */
export function policyHubItemsForKinds(
  kinds: readonly PolicyKind[],
): RelatedNavItem[] {
  const out: RelatedNavItem[] = [];
  for (const k of kinds) {
    const list = policiesByKind(k);
    if (list[0]) {
      out.push({ href: `/policy/${list[0].slug}`, label: POLICY_KIND_LABEL[k] });
    } else {
      out.push({ href: `/policy/${k}`, label: POLICY_KIND_LABEL[k] });
    }
  }
  return out;
}

export function linksFromToolkitPaths(paths: readonly string[]): RelatedNavItem[] {
  return paths.map((p) => ({
    href: p.startsWith("/") ? p : `/toolkit/${p}`,
    label: TOOLKIT_BY_PATH[p.startsWith("/") ? p : `/toolkit/${p}`] ?? p,
  }));
}

export function linksFromLawAnchors(anchors: readonly string[]): RelatedNavItem[] {
  return anchors.map((a) => {
    const suffix = a.startsWith("#") ? a : `#${a}`;
    return {
      href: `/learn/laws${suffix}`,
      label: `${suffix.replace("#", "")}（関連条文・整理）`,
    };
  });
}

export function linksFromGlossarySlugs(slugs: readonly string[]): RelatedNavItem[] {
  return slugs
    .map<RelatedNavItem | null>((slug) => {
      const entry = getGlossaryBySlug(slug);
      if (!entry) return null;
      return {
        href: `/learn/glossary/${slug}`,
        label: entry.term,
        description: entry.shortDescription,
      };
    })
    .filter((x): x is RelatedNavItem => x !== null);
}

export function linksFromArticleSlugs(slugs: readonly string[]): RelatedNavItem[] {
  return slugs
    .map((slug) => {
      const a = ARTICLES.find((item) => item.slug === slug);
      if (!a) return null;
      return { href: `/learn/articles/${slug}`, label: a.title };
    })
    .filter((x): x is RelatedNavItem => x !== null);
}

function dedupeByHref(items: RelatedNavItem[]): RelatedNavItem[] {
  const seen = new Set<string>();
  const out: RelatedNavItem[] = [];
  for (const i of items) {
    if (seen.has(i.href)) continue;
    seen.add(i.href);
    out.push(i);
  }
  return out;
}

export function buildGlossaryRelated(entry: GlossaryEntry): RelatedNavItem[] {
  return dedupeByHref([
    ...linksFromGlossarySlugs(entry.relatedGlossarySlugs ?? []),
    ...linksFromToolkitPaths(entry.relatedToolkitPaths ?? []),
    ...linksFromLawAnchors(entry.relatedLawAnchors ?? []),
    ...policyHubItemsForKinds(entry.relatedPolicyKinds ?? []),
    ...linksFromArticleSlugs(entry.relatedArticleSlugs ?? []),
  ]);
}

export function buildPolicyRelated(p: PolicyEntry): RelatedNavItem[] {
  return dedupeByHref([
    ...linksFromToolkitPaths(p.relatedToolkitPaths ?? []),
    ...linksFromGlossarySlugs(p.relatedGlossarySlugs ?? []),
    ...linksFromLawAnchors(p.relatedLawAnchors ?? []),
  ]);
}

export function buildArticleRelated(a: ArticleEntry): RelatedNavItem[] {
  return dedupeByHref([
    ...linksFromToolkitPaths(a.relatedToolkitPaths ?? []),
    ...linksFromGlossarySlugs(a.relatedGlossarySlugs ?? []),
    ...policyHubItemsForKinds(a.relatedPolicyKinds ?? []),
  ]);
}
