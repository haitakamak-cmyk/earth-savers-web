import type { MetadataRoute } from "next";

import { getAllArticleSlugs } from "@/lib/articles";
import { getAllGlossarySlugs } from "@/lib/glossary";
import { getAllPolicySlugs } from "@/lib/policies";
import { SITE_ALLOW_SEARCH_INDEXING, SITE_URL } from "@/lib/site";

const CORE_PATHS = [
  "/",
  "/about",
  "/members",
  "/activities",
  "/join",
  "/join/bank-donation",
  "/shop",
  "/media",
  "/contact",
  "/privacy",
  "/terms",
  "/app-intro",
] as const;

const RESOURCE_STATIC = [
  "/toolkit",
  "/toolkit/ordinance",
  "/toolkit/law-guide",
  "/toolkit/checklist",
  "/toolkit/case-studies",
  "/policy",
  "/policy/national",
  "/policy/local",
  "/policy/legislative",
  "/policy/public-comments",
  "/policy/statements",
  "/policy/petitions",
  "/learn",
  "/learn/glossary",
  "/learn/laws",
  "/learn/threats",
  "/learn/articles",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_ALLOW_SEARCH_INDEXING) return [];

  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  for (const path of CORE_PATHS) {
    urls.push({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.split("/").length === 2 ? 0.85 : 0.7,
    });
  }

  for (const path of RESOURCE_STATIC) {
    urls.push({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: path.split("/").length <= 2 ? 0.75 : 0.6,
    });
  }

  for (const slug of getAllGlossarySlugs()) {
    urls.push({
      url: `${SITE_URL}/learn/glossary/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    });
  }

  for (const slug of getAllArticleSlugs()) {
    urls.push({
      url: `${SITE_URL}/learn/articles/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    });
  }

  for (const slug of getAllPolicySlugs()) {
    urls.push({
      url: `${SITE_URL}/policy/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.58,
    });
  }

  return urls;
}
