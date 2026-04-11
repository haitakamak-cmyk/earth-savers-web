import {
  ORGANIZATION_NAME,
  SITE_ORGANIZATION_DESCRIPTION_SHORT,
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
    streetAddress: "田町13",
    addressLocality: "津山市",
    addressRegion: "岡山県",
    postalCode: "708-0052",
    addressCountry: "JP",
  },
  sameAs: [
    "https://x.com/ko_ta_sugiyama",
    "https://www.facebook.com/groups/baramaku.seed",
    "https://for-good.net/project/1003493",
  ],
  founder: {
    "@type": "Person",
    name: "杉山 孔太",
    jobTitle: "代表理事",
    sameAs: ["https://x.com/ko_ta_sugiyama"],
  },
  foundingDate: "2024",
  description:
    "岡山県津山市を拠点に、水源地の恒久保全、里山再生、生態系復活に取り組む財団法人。独自技術『BENTEN』を用いた水質浄化や、伝統的な『大地の再生』メソッドによる環境改善を実践しています。",
  url: `${SITE_URL}/`,
  areaServed: {
    "@type": "Country",
    name: "Japan",
  },
  knowsAbout: [
    "水源地保全",
    "里山再生",
    "水質浄化テクノロジー",
    "BENTEN",
    "大地の再生",
    "530運動",
    "環境教育",
    "メガソーラー乱開発対策",
  ],
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
