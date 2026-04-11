import { APP_EXTERNAL_LINKS_READY } from "./site";

/** ヘッダー・フッター共通：アプリ紹介（内部）＋ SNS（外部） */
export type AppSnsNavLink = {
  id: string;
  label: string;
  href: string;
  external: boolean;
  /**
   * false のときはリンクにせず「準備中」表示のみ。
   * サイト先行公開でアプリ（app.earth-savers.org）未リリースの間は true にしない。
   */
  disabled?: boolean;
};

export const appSnsLinks: AppSnsNavLink[] = [
  {
    id: "app-intro",
    label: APP_EXTERNAL_LINKS_READY ? "公式アプリ紹介" : "公式アプリ紹介（準備中）",
    href: "/app-intro",
    external: false,
    disabled: !APP_EXTERNAL_LINKS_READY,
  },
  {
    id: "sns-instagram",
    label: "Instagram",
    href: "https://www.instagram.com/earth_savers.inc/",
    external: true,
  },
  {
    id: "sns-tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@earth_savers.inc",
    external: true,
  },
  {
    id: "sns-youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@earthsaverschannel9703",
    external: true,
  },
  {
    id: "sns-facebook",
    label: "Facebook",
    href: "https://www.facebook.com/esinc5",
    external: true,
  },
];
