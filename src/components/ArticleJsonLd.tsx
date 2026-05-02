import { ORGANIZATION_NAME, SITE_ALLOW_SEARCH_INDEXING, SITE_URL } from "@/lib/site";

export type ArticleJsonLdProps = {
  headline: string;
  pathname: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  articleSection: string;
  /** 発行者ロゴ（OG・構造化データ用・省略可） */
  publisherLogo?: string;
};

export function ArticleJsonLd(props: ArticleJsonLdProps) {
  if (!SITE_ALLOW_SEARCH_INDEXING) return null;

  const pathname = props.pathname.startsWith("/")
    ? props.pathname
    : `/${props.pathname}`;
  const url = `${SITE_URL}${pathname}`;

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
      ...(props.publisherLogo
        ? {
            logo: {
              "@type": "ImageObject",
              url: props.publisherLogo.startsWith("http")
                ? props.publisherLogo
                : `${SITE_URL}${props.publisherLogo.startsWith("/") ? "" : "/"}${props.publisherLogo}`,
            },
          }
        : {}),
    },
    articleSection: props.articleSection,
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
