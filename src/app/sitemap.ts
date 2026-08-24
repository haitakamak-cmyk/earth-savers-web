import type { MetadataRoute } from "next";

import { ARTICLES, getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";
import { GLOSSARY, getAllGlossarySlugs } from "@/lib/glossary";
import { isLearnPageInPreparation } from "@/lib/learn-preparation";
import {
  getAllPolicySlugs,
  getPolicyBySlug,
  policyKindsWithPublicEntries,
} from "@/lib/policies";
import { newsEntries } from "@/lib/news-entries";
import { TOPICS, buildFieldReportEntries } from "@/lib/topic-entries";
import {
  ORDINANCE_SUPPLEMENTS,
} from "@/lib/ordinance-supplements-data";
import {
  getAllToolkitMarkdownViewerPaths,
  getToolkitSitemapHubPaths,
} from "@/lib/toolkit-manifest";
import { SITE_ALLOW_SEARCH_INDEXING, SITE_URL } from "@/lib/site";

import { POLICY_KIND_PATH } from "./policy/policy-kind-path";

const CORE_PATHS = [
  "/",
  "/about",
  "/about/disclosure",
  "/members",
  "/activities",
  "/activities/ecosystem-restoration",
  "/join",
  "/join/bank-donation",
  "/join/subscribe",
  "/news",
  "/consultation",
  "/shop",
  "/media",
  "/contact",
  "/privacy",
  "/terms",
] as const;

const RESOURCE_STATIC = [
  "/policy",
  "/learn",
  "/learn/glossary",
  "/learn/laws",
  "/learn/threats",
  "/learn/articles",
  "/learn/topics",
  "/learn/field-reports",
  "/learn/map",
] as const;

function parseDateOrFallback(value: string | undefined, fallback: Date): Date {
  if (!value) return fallback;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

// 公開内容を実際に更新した日。デプロイ時刻を使うと毎回更新扱いになるため固定する。
const STATIC_CONTENT_LAST_MODIFIED = new Date("2026-07-23");

// 更新対象のページだけ実質更新日を明示し、デプロイ日時をlastmodに使わない。
const CONTENT_LAST_MODIFIED_BY_PATH: Readonly<Record<string, Date>> = {
  "/learn/map": new Date("2026-07-25"),
  "/policy": new Date("2026-08-22"),
  "/policy/legislative": new Date("2026-08-22"),
  "/toolkit/ordinance": new Date("2026-07-25"),
  "/toolkit/disclosure-request": new Date("2026-08-09"),
};

/** 与えられた日付文字列のうち最も新しいものを返す（どれも無効なら base） */
function latestDate(values: readonly (string | undefined)[], base: Date): Date {
  let out = base;
  for (const v of values) {
    if (!v) continue;
    const d = new Date(v);
    if (!Number.isNaN(d.getTime()) && d > out) out = d;
  }
  return out;
}

/**
 * 子コンテンツから実質更新日を導出できるハブ。
 * 手書きの表（CONTENT_LAST_MODIFIED_BY_PATH）は更新漏れが起きるため、
 * 導出できるものは導出し、手書きの値とは新しいほうを採る。
 * `/media` はページ内に日付を持たないため導出対象外（手書きのまま）。
 */
function derivedHubLastModified(path: string): Date | undefined {
  switch (path) {
    case "/news":
      return latestDate(
        newsEntries.map((e) => e.date),
        STATIC_CONTENT_LAST_MODIFIED,
      );
    case "/learn/topics":
      return latestDate(
        TOPICS.map((e) => e.updatedAt),
        STATIC_CONTENT_LAST_MODIFIED,
      );
    case "/learn/field-reports":
      return latestDate(
        buildFieldReportEntries().map((e) => e.updatedAt),
        STATIC_CONTENT_LAST_MODIFIED,
      );
    case "/learn/glossary":
      return latestDate(
        GLOSSARY.map((e) => e.updatedAt),
        STATIC_CONTENT_LAST_MODIFIED,
      );
    case "/learn/articles":
      return latestDate(
        ARTICLES.map((e) => e.datePublished),
        STATIC_CONTENT_LAST_MODIFIED,
      );
    case "/policy":
      return latestDate(
        getAllPolicySlugs().map((slug) => {
          const p = getPolicyBySlug(slug);
          return p?.dateModified ?? p?.datePublished;
        }),
        STATIC_CONTENT_LAST_MODIFIED,
      );
    default:
      return undefined;
  }
}

function contentLastModified(path: string): Date {
  const manual = CONTENT_LAST_MODIFIED_BY_PATH[path] ?? STATIC_CONTENT_LAST_MODIFIED;
  const derived = derivedHubLastModified(path);
  return derived && derived > manual ? derived : manual;
}

/** 末尾スラッシュを canonical（`https://earth-savers.org`）と揃える */
function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_ALLOW_SEARCH_INDEXING) return [];

  const urls: MetadataRoute.Sitemap = [];

  for (const path of CORE_PATHS) {
    urls.push({
      url: absoluteUrl(path),
      lastModified: contentLastModified(path),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.85 : 0.7,
    });
  }

  // 中身のないページ・整備中のページは出さない（ページ側も noindex）
  const resourceStatic = RESOURCE_STATIC.filter(
    (path) =>
      !isLearnPageInPreparation(path) &&
      (path !== "/learn/articles" || ARTICLES.length > 0),
  );

  for (const path of resourceStatic) {
    urls.push({
      url: absoluteUrl(path),
      lastModified: contentLastModified(path),
      changeFrequency: "monthly",
      priority: path.split("/").length <= 2 ? 0.75 : 0.6,
    });
  }

  for (const kind of policyKindsWithPublicEntries()) {
    const path = `/policy/${POLICY_KIND_PATH[kind]}`;
    urls.push({
      url: absoluteUrl(path),
      lastModified: contentLastModified(path),
      changeFrequency: "monthly",
      priority: path.split("/").length <= 2 ? 0.75 : 0.6,
    });
  }

  for (const path of getToolkitSitemapHubPaths()) {
    urls.push({
      url: absoluteUrl(path),
      lastModified: contentLastModified(path),
      changeFrequency: "monthly",
      priority: path.split("/").length <= 2 ? 0.75 : 0.6,
    });
  }

  for (const slug of getAllGlossarySlugs()) {
    const entry = GLOSSARY.find((e) => e.slug === slug);
    urls.push({
      url: `${SITE_URL}/learn/glossary/${slug}`,
      lastModified: parseDateOrFallback(
        entry?.updatedAt,
        STATIC_CONTENT_LAST_MODIFIED,
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of getAllArticleSlugs()) {
    const article = getArticleBySlug(slug);
    urls.push({
      url: `${SITE_URL}/learn/articles/${slug}`,
      lastModified: parseDateOrFallback(
        article?.datePublished,
        STATIC_CONTENT_LAST_MODIFIED,
      ),
      changeFrequency: "monthly",
      priority: 0.55,
    });
  }

  for (const entry of TOPICS) {
    urls.push({
      url: `${SITE_URL}/learn/topics/${entry.slug}`,
      lastModified: parseDateOrFallback(
        entry.updatedAt,
        STATIC_CONTENT_LAST_MODIFIED,
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of getAllPolicySlugs()) {
    const policy = getPolicyBySlug(slug);
    urls.push({
      url: `${SITE_URL}/policy/${slug}`,
      lastModified: parseDateOrFallback(
        policy?.dateModified ?? policy?.datePublished,
        STATIC_CONTENT_LAST_MODIFIED,
      ),
      changeFrequency: "monthly",
      priority: 0.58,
    });
  }

  for (const entry of ORDINANCE_SUPPLEMENTS) {
    urls.push({
      url: `${SITE_URL}/toolkit/ordinance/${entry.slug}`,
      lastModified: parseDateOrFallback(
        entry.updatedAt,
        STATIC_CONTENT_LAST_MODIFIED,
      ),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const path of getAllToolkitMarkdownViewerPaths()) {
    urls.push({
      url: absoluteUrl(path),
      lastModified: STATIC_CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.58,
    });
  }

  return urls;
}
