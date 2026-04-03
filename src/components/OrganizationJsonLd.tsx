import { ORGANIZATION_NAME, SITE_URL } from "@/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: ORGANIZATION_NAME,
  alternateName: "Earth Savers",
  founder: {
    "@type": "Person",
    name: "杉山 孔太",
  },
  description:
    "日本の水源地と山林を外資買収やメガソーラー等の乱開発から守り、水と森を次世代へ引き継ぐ公益財団法人です。水源地保全・里山再生・生態系復活・環境教育などに取り組みます。",
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
