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

// 日本語フォントは Google Fonts 側で100以上のサブセットに分割されている。
// next/font の既定（preload: true）だと全サブセットに <link rel="preload"> が出るため、
// 実測で 359本・247ファイル・4.1MB を初期表示で先読みし、ファーストビューを止めていた。
// preload を切ると unicode-range により「実際に使う文字のサブセット」だけが落ちる。
// display: "swap" で、フォント到着前も本文はフォールバックで即座に読める。
const zenMaru = Zen_Maru_Gothic({
  variable: "--font-zen-maru",
  subsets: ["latin"],
  // 300 は `font-light` も `font-weight: 300` も未使用のため読み込まない
  weight: ["400", "500", "700"],
  preload: false,
  display: "swap",
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  preload: false,
  display: "swap",
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
    // 下の先読みスクリプトが html 要素に style="--article-scale" を付けるため、
    // サーバーの HTML と食い違う。文字サイズの復元は意図した差分なので警告を抑える
    // （ダークモード等でも使われる定石。抑止はこの要素の属性のみに効く）
    <html
      lang="ja"
      className={`${zenMaru.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* GA4 は afterInteractive で読み込むため、接続確立を前倒しして待ち時間を削る
            （PageSpeed Insights の "Preconnect to required origins" 317ms 相当） */}
        {SITE_ALLOW_SEARCH_INDEXING ? (
          <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
        ) : null}
        {/* 過去のService Workerが残っている場合に自動解除する */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js').catch(function(){})}`,
          }}
        />
        {/* 記事本文の文字サイズ設定を描画前に反映する（読み込み後に切り替わるのを防ぐ）。
            html 要素は React の hydration 対象なので、付与した style は不一致として
            検出される。html 側に suppressHydrationWarning を付けて許容している */}
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
