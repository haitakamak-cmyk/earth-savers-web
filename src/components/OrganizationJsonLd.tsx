import {
  ORGANIZATION_NAME,
  SITE_ORGANIZATION_DESCRIPTION_SHORT,
  SITE_URL,
} from "@/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: ORGANIZATION_NAME,
  alternateName: "Earth Savers",
  founder: {
    "@type": "Person",
    name: "杉山 孔太",
  },
  description: `${SITE_ORGANIZATION_DESCRIPTION_SHORT}日本の水源地と山林を外資買収やメガソーラー等の乱開発から守り、水と森を次世代へ引き継ぎます。`,
  url: `${SITE_URL}/`,
} as const;

export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationJsonLd),
      }}
    />
  );
}
