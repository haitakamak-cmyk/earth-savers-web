import type { MetadataRoute } from "next";

import { SITE_ALLOW_SEARCH_INDEXING, SITE_URL } from "@/lib/site";

/**
 * robots.txt
 *
 * LLMO方針（`ai-work/core/skills/llmo_publication.md`）:
 * - 検索インデックス公開時は一般クローラーに加え、AIクローラー
 *   （GPTBot / ClaudeBot / PerplexityBot / Google-Extended / CCBot 等）も
 *   **意図的に許可**する（AI回答への引用・露出を優先。学習拒否とは両立しない）。
 * - `SITE_ALLOW_SEARCH_INDEXING === false` の間は全エージェントに `/` を拒否する。
 *   公開前に llms.txt / JSON-LD を先行公開しない設計と整合させる。
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE_ALLOW_SEARCH_INDEXING) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: ["/"],
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // 以下は挙動上 `*` の Allow に含まれるが、LLMO方針として明示許可を残す
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
