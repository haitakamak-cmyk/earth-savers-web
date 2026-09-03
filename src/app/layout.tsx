import type { Metadata } from "next";
import { preload } from "react-dom";
import "./fonts.css";
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

/**
 * ファーストビューの文字だけを収めた小さなサブセット（g0）を先読みする。
 * フォントが遅れて届くとテキストが組み直され、ヒーローのボタンが動いていた
 * （PSI 実測 CLS 0.049 の原因）。ここだけ先に届けば組み直しが起きない。
 *
 * 以前フォントの全サブセット 359本を先読みして初期表示を壊したことがあるので、
 * **最初に見える3面ぶんだけ**に限定している（合計 約160KB）。
 * react-dom の preload を使うのは、JSX で <link> を書くと重複して出力されるため。
 */
function preloadCriticalFonts() {
  for (const href of [
    "/fonts/v1/zen-400.g0.woff2",
    "/fonts/v1/zen-700.g0.woff2",
    "/fonts/v1/serif-700.g0.woff2",
  ]) {
    preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preloadCriticalFonts();

  return (
    // 下の先読みスクリプトが html 要素に style="--article-scale" を付けるため、
    // サーバーの HTML と食い違う。文字サイズの復元は意図した差分なので警告を抑える
    // （ダークモード等でも使われる定石。抑止はこの要素の属性のみに効く）
    <html
      lang="ja"
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
