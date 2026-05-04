"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "財団について", href: "/about" },
  { label: "メンバー", href: "/members" },
  { label: "活動内容", href: "/activities" },
  { label: "支援・参加する", href: "/join" },
  { label: "お問い合わせ", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo/yoko_c1.png"
              alt="Earth Savers - 地球防衛群"
              width={180}
              height={48}
              priority
              className="h-10 sm:h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-wakakusa-light hover:text-wakakusa-dark lg:px-3 lg:text-sm"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/join"
              className="ml-2 px-5 py-2.5 text-sm font-semibold text-white bg-wakakusa hover:bg-wakakusa-dark rounded-full transition-colors shadow-sm"
            >
              支援する
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-wakakusa-dark rounded-lg"
            aria-label="メニューを開く"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
        <div className="md:hidden border-t border-border bg-ivory">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-text-secondary hover:text-wakakusa-dark hover:bg-wakakusa-light rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setIsOpen(false)}
              className="block mx-4 mt-3 py-3 text-center font-semibold text-white bg-wakakusa hover:bg-wakakusa-dark rounded-full transition-colors"
            >
              支援する
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
