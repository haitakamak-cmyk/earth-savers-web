import Image from "next/image";
import Link from "next/link";

import { appSnsLinks } from "@/lib/app-sns-links";
import { RESOURCE_NAV_LINKS } from "@/lib/resource-nav";

const footerLinks = [
  {
    title: "財団について",
    links: [
      { label: "法人概要", href: "/about#overview" },
      { label: "設立趣旨", href: "/about#manifesto" },
      { label: "クレド", href: "/about#credo" },
      { label: "運営体制", href: "/about#members" },
      { label: "メンバー紹介", href: "/members" },
      { label: "アンバサダー", href: "/members#ambassadors" },
      { label: "情報公開", href: "/about/disclosure" },
      { label: "メディア・実績", href: "/media" },
    ],
  },
  {
    title: "活動内容",
    links: [
      { label: "水源地の保全", href: "/activities#conservation" },
      { label: "生態系復活", href: "/activities#ecosystem" },
      { label: "里山再生", href: "/activities#satoyama" },
      { label: "ばら撒くっ種", href: "/activities#baramaku" },
      { label: "環境教育", href: "/activities#education" },
    ],
  },
  {
    title: "資料室",
    links: RESOURCE_NAV_LINKS.map((l) => ({ label: l.label, href: l.href })),
  },
  {
    title: "支援・参加",
    links: [
      { label: "寄付する", href: "/join#donation" },
      { label: "サポーター登録", href: "/join#supporter" },
      { label: "ボランティア", href: "/join#volunteer" },
      { label: "買って応援", href: "/shop" },
    ],
  },
];

function SnsIcon({ id }: { id: string }) {
  const common = "h-4 w-4";
  switch (id) {
    case "sns-instagram":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "sns-tiktok":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      );
    case "sns-youtube":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "sns-facebook":
      return (
        <svg
          className={common}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  return (
    <footer className="bg-text-primary text-ivory-warm">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-5">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo/yoko_w.png"
              alt="Earth Savers - 地球防衛群"
              width={160}
              height={42}
              className="mb-4 h-10 w-auto"
            />
            <p className="text-sm leading-relaxed text-text-muted">
              日本の命の源である「水」と「森」を守り、<br />
              七世代先の子どもたちへ、美しい環境を引き継ぐ。<br />
              私たちは「現場」で汗を流し、大地の循環を再生し続けます。
            </p>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-sm font-bold text-wakakusa-light">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-ivory-warm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SNS Icons */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {appSnsLinks
            .filter((l) => !l.disabled)
            .map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-text-secondary/20 text-text-muted transition-colors hover:bg-wakakusa hover:text-white"
                aria-label={link.label}
              >
                <SnsIcon id={link.id} />
              </a>
            ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-text-secondary/30 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-start">
            <p className="text-center text-xs text-text-muted sm:text-left">
              &copy; {new Date().getFullYear()} 財団法人 地球防衛群（Earth
              Savers） All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-text-muted sm:justify-end">
              <Link
                href="/consultation"
                className="transition-colors hover:text-ivory-warm"
              >
                環境相談
              </Link>
              <Link href="/news" className="transition-colors hover:text-ivory-warm">
                お知らせ
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-ivory-warm"
              >
                お問い合わせ
              </Link>
              <Link
                href="/privacy"
                className="transition-colors hover:text-ivory-warm"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-ivory-warm"
              >
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
