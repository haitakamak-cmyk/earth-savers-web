import type { Metadata } from "next";
import { Zen_Maru_Gothic, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

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
  verification:
    SITE_ALLOW_SEARCH_INDEXING && googleSiteVerification
      ? { google: googleSiteVerification }
      : undefined,
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
      <head>
        {/* 過去のService Workerが残っている場合に自動解除する */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(function(){})}`,
          }}
        />
        {/* 記事本文の文字サイズ設定を描画前に反映する（読み込み後に切り替わるのを防ぐ）。
            React の管理外である html 要素の style を触るため、hydration には影響しない */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=localStorage.getItem('article-font-scale');if(s)document.documentElement.style.setProperty('--article-scale',s)}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        {SITE_ALLOW_SEARCH_INDEXING ? (
          <GoogleAnalytics
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        ) : null}
        <OrganizationJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
