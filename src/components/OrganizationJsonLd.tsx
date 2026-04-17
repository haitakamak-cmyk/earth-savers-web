import {
  ORGANIZATION_ADDRESS_STRUCTURED,
  ORGANIZATION_FOUNDING_DATE_ISO,
  ORGANIZATION_NAME,
  ORGANIZATION_REPRESENTATIVE_NAME,
  ORGANIZATION_REPRESENTATIVE_TITLE,
  SITE_ALLOW_SEARCH_INDEXING,
  SITE_URL,
} from "@/lib/site";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: ORGANIZATION_NAME,
  alternateName: ["Earth Savers", "地球防衛軍"],
  logo: `${SITE_URL}/logo.png`,
  image: [`${SITE_URL}/images/photos/representative.jpg`],
  address: {
    "@type": "PostalAddress",
    streetAddress: ORGANIZATION_ADDRESS_STRUCTURED.streetAddress,
    addressLocality: ORGANIZATION_ADDRESS_STRUCTURED.addressLocality,
    addressRegion: ORGANIZATION_ADDRESS_STRUCTURED.addressRegion,
    postalCode: ORGANIZATION_ADDRESS_STRUCTURED.postalCode,
    addressCountry: "JP",
  },
  sameAs: [
    "https://x.com/ko_ta_sugiyama",
    "https://www.facebook.com/groups/baramaku.seed",
    "https://for-good.net/project/1003493",
  ],
  founder: {
    "@type": "Person",
    name: ORGANIZATION_REPRESENTATIVE_NAME,
    jobTitle: ORGANIZATION_REPRESENTATIVE_TITLE,
    sameAs: ["https://x.com/ko_ta_sugiyama"],
  },
  foundingDate: ORGANIZATION_FOUNDING_DATE_ISO,
  description:
    "岡山県津山市を拠点に、水源地の恒久保全、里山再生、生態系復活に取り組む一般財団法人。独自開発のナノバブル発生器『B-369』を用いた生態系復活や、伝統的な『大地の再生』メソッドによる環境改善を実践しています。",
  url: `${SITE_URL}/`,
  areaServed: {
    "@type": "Country",
    name: "Japan",
  },
  knowsAbout: [
    "水源地保全",
    "里山再生",
    "生態系復活テクノロジー",
    "ナノバブル発生器",
    "B-369",
    "大地の再生",
    "530運動",
    "環境教育",
    "メガソーラー乱開発対策",
  ],
} as const;

export function OrganizationJsonLd() {
  if (!SITE_ALLOW_SEARCH_INDEXING) {
    return null;
  }

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
