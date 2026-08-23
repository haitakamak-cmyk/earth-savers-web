import type { MarkdownCitation } from "@/lib/markdown-citations";
import { ORGANIZATION_NAME, SITE_ALLOW_SEARCH_INDEXING, SITE_URL } from "@/lib/site";

/** 画面にも存在する発行者ロゴ（OrganizationJsonLd と揃える） */
const DEFAULT_PUBLISHER_LOGO_PATH = "/images/logo/yoko_c1.png";

export type ArticleJsonLdProps = {
  headline: string;
  pathname: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  articleSection: string;
  /** 発行者ロゴ（OG・構造化データ用・省略時はサイト横ロゴ） */
  publisherLogo?: string;
  /** 記事の脚注・参考文献に載っている一次資料（`extractMarkdownCitations` の結果） */
  citations?: readonly MarkdownCitation[];
  /** 記事が扱う主題。用語集の見出し語を想定 */
  about?: readonly string[];
};

export function ArticleJsonLd(props: ArticleJsonLdProps) {
  if (!SITE_ALLOW_SEARCH_INDEXING) return null;

  const pathname = props.pathname.startsWith("/")
    ? props.pathname
    : `/${props.pathname}`;
  const url = `${SITE_URL}${pathname}`;
  const logoPath = props.publisherLogo ?? DEFAULT_PUBLISHER_LOGO_PATH;
  const logoUrl = logoPath.startsWith("http")
    ? logoPath
    : `${SITE_URL}${logoPath.startsWith("/") ? "" : "/"}${logoPath}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: props.headline,
    description: props.description,
    url,
    ...(props.datePublished
      ? { datePublished: props.datePublished }
      : {}),
    ...(props.dateModified ? { dateModified: props.dateModified } : {}),
    author: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    articleSection: props.articleSection,
    inLanguage: "ja",
    isPartOf: {
      "@type": "WebSite",
      name: ORGANIZATION_NAME,
      url: `${SITE_URL}/`,
    },
    ...(props.about?.length
      ? {
          about: props.about.map((name) => ({
            "@type": "Thing",
            name,
          })),
        }
      : {}),
    ...(props.citations?.length
      ? {
          citation: props.citations.map((citation) => ({
            "@type": "CreativeWork",
            name: citation.name,
            url: citation.url,
          })),
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
