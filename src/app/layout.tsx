import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  ORGANIZATION_NAME,
  SITE_ALLOW_SEARCH_INDEXING,
  SITE_ORGANIZATION_DESCRIPTION,
  SITE_ORGANIZATION_DESCRIPTION_PRELAUNCH,
  SITE_URL,
} from "@/lib/site";

const zenMaru = Zen_Maru_Gothic({
  variable: "--font-zen-maru",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const defaultTitle = SITE_ALLOW_SEARCH_INDEXING
  ? `${ORGANIZATION_NAME} | 水と森の未来を守る`
  : `地球防衛群（公式サイト・準備中）| 水と森の未来を守る`;

const siteDescription = SITE_ALLOW_SEARCH_INDEXING
  ? SITE_ORGANIZATION_DESCRIPTION
  : SITE_ORGANIZATION_DESCRIPTION_PRELAUNCH;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: SITE_ALLOW_SEARCH_INDEXING
      ? `%s | ${ORGANIZATION_NAME}`
      : `%s | 地球防衛群`,
  },
  description: siteDescription,
  robots: SITE_ALLOW_SEARCH_INDEXING
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
  openGraph: {
    title: defaultTitle,
    description: siteDescription,
    locale: "ja_JP",
    type: "website",
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zenMaru.variable} ${notoSerif.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <OrganizationJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
