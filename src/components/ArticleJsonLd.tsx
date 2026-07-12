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
