import { ORGANIZATION_NAME, SITE_ALLOW_SEARCH_INDEXING, SITE_URL } from "@/lib/site";

export type ArticleJsonLdProps = {
  headline: string;
  pathname: string;
  description: string;
  datePublished?: string;
  articleSection: string;
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
    author: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
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
