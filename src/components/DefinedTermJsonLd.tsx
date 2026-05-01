import { ORGANIZATION_NAME, SITE_ALLOW_SEARCH_INDEXING, SITE_URL } from "@/lib/site";

export type DefinedTermLdProps = {
  name: string;
  slug: string;
  alternateName?: readonly string[];
  description: string;
};

export function DefinedTermJsonLd(props: DefinedTermLdProps) {
  if (!SITE_ALLOW_SEARCH_INDEXING) return null;

  const glossaryUrl = `${SITE_URL}/learn/glossary`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: props.name,
    alternateName: props.alternateName?.length ? [...props.alternateName] : undefined,
    description: props.description,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: `「${ORGANIZATION_NAME}」サイト用語集`,
      url: glossaryUrl,
    },
    url: `${SITE_URL}/learn/glossary/${props.slug}`,
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
