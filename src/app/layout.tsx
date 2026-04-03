import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/OrganizationJsonLd";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ORGANIZATION_NAME, SITE_URL } from "@/lib/site";

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
  description:
    "公益財団法人地球防衛群は、外資の水源買収やメガソーラー乱開発から日本の水と森を守る活動を行う非営利団体です。水源地保全・里山再生・生態系復活・環境教育に取り組みます。",
  openGraph: {
    title: `${ORGANIZATION_NAME} | 水と森の未来を守る`,
    description:
      "外資の水源買収・メガソーラー乱開発対策、里山再生と生態系保全を行う公益財団法人。",
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
