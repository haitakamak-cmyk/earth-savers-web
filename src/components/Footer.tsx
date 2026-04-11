import Image from "next/image";
import Link from "next/link";

import { appSnsLinks } from "@/lib/app-sns-links";

const footerLinks = [
  {
    title: "財団について",
    links: [
      { label: "設立趣旨", href: "/about#manifesto" },
      { label: "クレド", href: "/about#credo" },
      { label: "組織体制", href: "/about#members" },
      { label: "メンバー紹介", href: "/members" },
      { label: "メディア・実績", href: "/media" },
    ],
  },
  {
    title: "活動内容",
    links: [
      { label: "水源地の保全", href: "/activities#conservation" },
      { label: "水質浄化", href: "/activities#water" },
      { label: "里山再生", href: "/activities#satoyama" },
      { label: "ばら撒くっ種", href: "/activities#baramaku" },
      { label: "環境教育", href: "/activities#education" },
    ],
  },
  {
    title: "支援・参加",
    links: [
      { label: "寄付する", href: "/join#donation" },
      { label: "サポーター登録", href: "/join#supporter" },
      { label: "ボランティア", href: "/join#volunteer" },
      ...appSnsLinks.map((l) => ({
        id: l.id,
        label: l.label,
        href: l.href,
        external: l.external,
        disabled: l.disabled,
      })),
      { label: "買って応援", href: "/shop" },
      { label: "メディア・実績", href: "/media" },
      { label: "お問い合わせ", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-text-primary text-ivory-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Logo & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo/yoko_w.png"
              alt="Earth Savers - 地球防衛群"
              width={160}
              height={42}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-text-muted leading-relaxed">
              七世代先の子どもたちへ、
              <br />
              水と森を残すために。
            </p>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-bold mb-4 text-wakakusa-light">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li
                    key={"id" in link && link.id ? link.id : `${link.label}-${link.href}`}
                  >
                    {"disabled" in link && link.disabled ? (
                      <span className="text-sm text-text-muted/70">{link.label}</span>
                    ) : "external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text-muted transition-colors hover:text-ivory-warm"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted transition-colors hover:text-ivory-warm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-text-secondary/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()} 財団法人 地球防衛群（Earth
              Savers） All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-text-muted">
              <Link
                href="/privacy"
                className="hover:text-ivory-warm transition-colors"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="hover:text-ivory-warm transition-colors"
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
