"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { RESOURCE_NAV_LINKS } from "@/lib/resource-nav";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "財団について", href: "/about" },
  { label: "メンバー", href: "/members" },
  { label: "活動内容", href: "/activities" },
  { label: "お問い合わせ", href: "/contact" },
];

const navLinkClass =
  "rounded-lg px-2 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-wakakusa-light hover:text-wakakusa-dark lg:px-3 lg:text-sm";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const resourceWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!resourceOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = resourceWrapRef.current;
      if (el && !el.contains(e.target as Node)) setResourceOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setResourceOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [resourceOpen]);

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
            {navItems.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
            <div className="relative shrink-0" ref={resourceWrapRef}>
              <button
                type="button"
                className={`${navLinkClass} inline-flex items-center gap-0.5 whitespace-nowrap`}
                aria-expanded={resourceOpen}
                aria-haspopup="menu"
                onClick={() => setResourceOpen((v) => !v)}
              >
                資料室
                <span aria-hidden className="text-[10px] opacity-70">
                  ▼
                </span>
              </button>
              {resourceOpen ? (
                <div
                  role="menu"
                  className="absolute left-0 top-full z-50 mt-1 min-w-[12rem] rounded-lg border border-border bg-white py-1 shadow-lg"
                >
                  {RESOURCE_NAV_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm text-text-secondary transition-colors hover:bg-wakakusa-light hover:text-wakakusa-dark"
                      onClick={() => setResourceOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
            {navItems.slice(4).map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
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
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-base font-medium text-text-secondary hover:text-wakakusa-dark hover:bg-wakakusa-light rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <p className="px-4 pt-2 pb-1 text-xs font-semibold text-text-muted">資料室</p>
            {RESOURCE_NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 pl-8 text-base font-medium text-text-secondary hover:text-wakakusa-dark hover:bg-wakakusa-light rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {navItems.slice(4).map((item) => (
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
