"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { appSnsLinks } from "@/lib/app-sns-links";

const navItemsBeforeAppSns = [
  { label: "HOME", href: "/" },
  { label: "財団について", href: "/about" },
  { label: "メンバー", href: "/members" },
  { label: "活動内容", href: "/activities" },
  { label: "支援・参加する", href: "/join" },
];

const navItemsAfterAppSns = [
  { label: "買って応援", href: "/shop" },
  { label: "お問い合わせ", href: "/contact" },
];

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function navLinkClassDesktop() {
  return "rounded-lg px-2 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-wakakusa-light hover:text-wakakusa-dark lg:px-3 lg:text-sm";
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ivory/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/images/logo/yoko_c1.png"
              alt="Earth Savers - 地球防衛群"
              width={180}
              height={48}
              priority
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-0.5 md:flex lg:gap-1">
            {navItemsBeforeAppSns.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClassDesktop()}>
                {item.label}
              </Link>
            ))}

            <div className="group relative">
              <button
                type="button"
                className={`${navLinkClassDesktop()} inline-flex items-center gap-0.5`}
                aria-expanded={false}
                aria-haspopup="menu"
              >
                アプリ・SNS
                <ChevronDownIcon className="h-3.5 w-3.5 opacity-70" />
              </button>
              <ul
                role="menu"
                className="invisible absolute right-0 top-full z-50 mt-1 min-w-[13rem] translate-y-1 rounded-xl border border-border bg-white py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
              >
                {appSnsLinks.map((link) => (
                  <li key={link.href} role="none">
                    {link.external ? (
                      <a
                        role="menuitem"
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-wakakusa-light hover:text-wakakusa-dark"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        role="menuitem"
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-wakakusa-light hover:text-wakakusa-dark"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {navItemsAfterAppSns.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClassDesktop()}>
                {item.label}
              </Link>
            ))}
            <Link
              href="/join"
              className="ml-2 rounded-full bg-wakakusa px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-wakakusa-dark"
            >
              支援する
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-text-secondary hover:text-wakakusa-dark md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="border-t border-border bg-ivory md:hidden">
          <nav className="space-y-1 px-4 py-3">
            {navItemsBeforeAppSns.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-wakakusa-light hover:text-wakakusa-dark"
              >
                {item.label}
              </Link>
            ))}

            <details className="group rounded-lg">
              <summary className="cursor-pointer list-none px-4 py-3 text-base font-medium text-text-secondary marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between">
                  アプリ・SNS
                  <ChevronDownIcon className="h-4 w-4 opacity-60 transition-transform group-open:rotate-180" />
                </span>
              </summary>
              <div className="ml-2 mt-1 space-y-0.5 border-l-2 border-wakakusa/25 pl-3">
                {appSnsLinks.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-wakakusa-light hover:text-wakakusa-dark"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:bg-wakakusa-light hover:text-wakakusa-dark"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            </details>

            {navItemsAfterAppSns.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-text-secondary transition-colors hover:bg-wakakusa-light hover:text-wakakusa-dark"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setIsOpen(false)}
              className="mx-4 mt-3 block rounded-full bg-wakakusa py-3 text-center font-semibold text-white transition-colors hover:bg-wakakusa-dark"
            >
              支援する
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
