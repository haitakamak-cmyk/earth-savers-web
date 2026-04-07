import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  ORGANIZATION_NAME,
  SITE_ORGANIZATION_DESCRIPTION,
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${ORGANIZATION_NAME} | 水と森の未来を守る`,
    template: `%s | ${ORGANIZATION_NAME}`,
  },
  description: SITE_ORGANIZATION_DESCRIPTION,
  openGraph: {
    title: `${ORGANIZATION_NAME} | 水と森の未来を守る`,
    description: SITE_ORGANIZATION_DESCRIPTION,
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
