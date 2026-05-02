import { readFileSync } from "fs";
import path from "path";

import type { PolicyKind } from "./policies";

export type GlossarySlug = string;

export type GlossaryCategory =
  | "international-framework"
  | "finance-management"
  | "ecosystem-tech"
  | "national-law"
  | "precedent"
  | "legal-theory"
  | "foundation-original";

export type GlossarySource = {
  label: string;
  url?: string;
};

export type DefinedTermRelated = {
  relatedGlossarySlugs?: readonly string[];
  relatedToolkitPaths?: readonly string[];
  /** 用語または `/learn/laws` 内のアンカー */
  relatedLawAnchors?: readonly string[];
  relatedPolicyKinds?: readonly PolicyKind[];
  relatedArticleSlugs?: readonly string[];
};

export type GlossaryEntry = {
  slug: GlossarySlug;
  term: string;
  reading?: string;
  /** 一覧・本文冒頭・JSON-LD 用の短い説明（プレーンテキスト） */
  shortDescription: string;
  /** 詳細段落（サイト内表示用・改行 `\n\n` で段落） */
  body: string;
  earthSaversContext?: string;
  laws?: readonly string[];
  sources: readonly GlossarySource[];
  updatedAt: string;
  category?: GlossaryCategory;
  alternateNames?: readonly string[];
} & DefinedTermRelated;

const GLOSSARY_SOURCE_PATH = path.join(
  process.cwd(),
  "public",
  "learn",
  "glossary",
  "用語集_v0_完成版.md",
);

const CATEGORY_BY_SLUG: Record<string, GlossaryCategory> = {
  sdgs: "international-framework",
  "nature-positive": "international-framework",
  "30by30": "international-framework",
  "kunming-montreal-framework": "international-framework",
  "planetary-boundaries": "international-framework",
  "esg-investment": "finance-management",
  tnfd: "finance-management",
  "ghg-protocol": "finance-management",
  "impact-investment": "finance-management",
  greenwashing: "finance-management",
  "ecosystem-services": "ecosystem-tech",
  "ufb-nanobubble": "ecosystem-tech",
  "nature-technology": "ecosystem-tech",
  "circular-economy": "ecosystem-tech",
  "ecological-footprint": "ecosystem-tech",
  oecm: "national-law",
  "nature-coexistence-site": "national-law",
  "biodiversity-promotion-act": "national-law",
  "water-cycle-basic-act": "national-law",
  "fit-fip": "national-law",
  "amended-renewable-energy-act": "national-law",
  "important-land-survey-act": "national-law",
  "fujikawaguchiko-precedent": "precedent",
  "co-regulation": "legal-theory",
  "groundwater-publicness": "legal-theory",
  commons: "legal-theory",
  "satoyama-organic": "foundation-original",
};

function trimCodeTicks(value: string): string {
  return value.trim().replace(/^`|`$/g, "");
}

function parseListLine(value: string): string[] {
  return value
    .split(",")
    .map((part) => trimCodeTicks(part))
    .map((part) => part.replace(/^\s+|\s+$/g, ""))
    .filter(Boolean);
}

/**
 * Markdown 行末で「https://...」の直後に「」。.。）などが続くと、\S+ がそれらを URL に含めてしまう。
 * 末尾から URL として有効な文字だけ残す。
 */
function sanitizeExtractedUrl(raw: string): string {
  let u = raw.trim();
  /** URL の末尾に正当に来うる ASCII（パーセントエンコード含む） */
  const urlTailOk = /[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]$/;
  let guard = 0;
  while (u.length > 0 && !urlTailOk.test(u) && guard < 32) {
    u = u.slice(0, -1);
    guard += 1;
  }
  return u;
}

function parseSources(block: string): GlossarySource[] {
  const lines = block
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "));

  return lines.map((line) => {
    const body = line.replace(/^- /, "").trim();
    const urlMatch = body.match(/https?:\/\/\S+$/i);
    if (!urlMatch) return { label: body };
    const rawUrl = urlMatch[0];
    const url = sanitizeExtractedUrl(rawUrl);
    const label = body
      .slice(0, body.length - rawUrl.length)
      .trim()
      .replace(/[：:]$/, "");
    return { label: label || url, url };
  });
}

function parseSectionBody(section: string, heading: string): string {
  const esc = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`### ${esc}\\n([\\s\\S]*?)(?=\\n### |\\n---\\n|$)`, "m");
  const m = section.match(re);
  return (m?.[1] ?? "").trim();
}

function parseGlossaryMarkdown(raw: string): GlossaryEntry[] {
  const blocks = raw
    .split(/^## \d+\. /m)
    .slice(1)
    .map((chunk) => `## ${chunk}`);

  return blocks
    .map((block): GlossaryEntry | null => {
      const heading = block.match(/^## (.+)$/m)?.[1]?.trim();
      const term = heading?.replace(/\s*（.*?）\s*$/, "") ?? "";
      const slug = trimCodeTicks(block.match(/- \*\*slug\*\*: (.+)$/m)?.[1] ?? "");
      if (!term || !slug) return null;

      const reading = trimCodeTicks(block.match(/- \*\*reading\*\*: (.+)$/m)?.[1] ?? "");
      const shortDescription = trimCodeTicks(
        block.match(/- \*\*shortDefinition\*\*: (.+)$/m)?.[1] ?? "",
      );
      const relatedGlossarySlugs = parseListLine(
        block.match(/- \*\*relatedSlugs\*\*: (.+)$/m)?.[1] ?? "",
      );

      const lawsRaw = (block.match(/- \*\*laws\*\*: (.+)$/m)?.[1] ?? "").trim();
      const laws =
        !lawsRaw || lawsRaw.startsWith("なし") ? [] : lawsRaw.split("、").map((x) => x.trim()).filter(Boolean);

      const updatedAt = trimCodeTicks(
        block.match(/- \*\*updatedAt\*\*: (.+)$/m)?.[1] ?? "2026-05-01",
      );

      const body = parseSectionBody(block, "定義");
      const earthSaversContext = parseSectionBody(block, "財団との接点");
      const sources = parseSources(parseSectionBody(block, "出典"));

      return {
        slug,
        term,
        reading: reading || undefined,
        shortDescription,
        body,
        earthSaversContext: earthSaversContext || undefined,
        laws: laws.length ? laws : undefined,
        sources,
        updatedAt,
        category: CATEGORY_BY_SLUG[slug],
        relatedGlossarySlugs,
        relatedToolkitPaths: ["/toolkit/ordinance"],
      };
    })
    .filter((x): x is GlossaryEntry => x !== null);
}

/**
 * v0 の正本 Markdown（27語）から変換。
 * 差し替えは `public/learn/glossary/用語集_v0_完成版.md` を更新すればよい。
 */
export const GLOSSARY: readonly GlossaryEntry[] = parseGlossaryMarkdown(
  readFileSync(GLOSSARY_SOURCE_PATH, "utf-8"),
);

export const GLOSSARY_ENTRIES: readonly GlossaryEntry[] = GLOSSARY;

export function getGlossaryBySlug(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((e) => e.slug === slug);
}

export function getAllGlossarySlugs(): string[] {
  return GLOSSARY.map((e) => e.slug);
}
