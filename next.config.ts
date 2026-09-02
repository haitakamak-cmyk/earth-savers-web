import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF を第一候補にする。対応ブラウザには WebP より 2〜3 割小さい画像が届き、
    // 非対応ブラウザには従来どおり WebP が返る（見た目は変わらない）。
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/brief/ecosystem-restoration-k7m4q9x2p6v8",
        destination: "/activities/ecosystem-restoration",
        permanent: true,
      },
      {
        // 公式アプリ企画は廃案。旧ブックマーク向けにトップへ誘導する。
        source: "/app-intro",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // 自己ホストのフォントはファイル名にハッシュが付かないため、
        // パスに版（v1）を持たせたうえで長期キャッシュを明示する。
        // 差し替えるときは v2 ディレクトリを作り、CSS の参照先を変える。
        source: "/fonts/v1/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              // Sentryの地域別ingestとGA4に必要な送信先のみを許可する。
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.tile.openstreetmap.org https://*.google-analytics.com https://www.googletagmanager.com; connect-src 'self' https://*.tile.openstreetmap.org https://*.ingest.sentry.io https://*.ingest.us.sentry.io https://*.ingest.de.sentry.io https://*.ingest.eu.sentry.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com; font-src 'self' data:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
