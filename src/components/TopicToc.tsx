"use client";

import { useCallback, useEffect, useState } from "react";

import type { TopicTocItem } from "@/lib/topics";

type TopicTocProps = {
  items: readonly TopicTocItem[];
};

/**
 * 解説記事：H2 相当見出しへのナビ。PC は sticky、モバイルは折りたたみ。
 */
export function TopicToc({ items }: TopicTocProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(() => items[0]?.id ?? null);

  const onScroll = useCallback(() => {
    if (items.length === 0) return;
    const mid = window.scrollY + window.innerHeight * 0.25;
    let current: string | null = items[0]?.id ?? null;
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= mid) current = id;
      }
    }
    setActiveId(current);
  }, [items]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  if (items.length === 0) return null;

  const list = (
    <ol className="space-y-1.5 text-sm">
      {items.map((item) => {
        const active = activeId === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${encodeURIComponent(item.id)}`}
              className={
                active
                  ? "font-medium text-wakakusa-dark underline decoration-wakakusa"
                  : "text-aqua-dark underline-offset-2 hover:underline"
              }
            >
              {item.title}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      <nav
        className="mb-6 rounded-xl border border-border bg-ivory-warm/50 p-4 lg:hidden"
        aria-label="目次"
      >
        <button
          type="button"
          className="flex w-full items-center justify-between text-left font-serif text-base font-semibold text-text-primary"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          目次
          <span className="text-text-muted" aria-hidden>
            {open ? "▼" : "▶"}
          </span>
        </button>
        {open ? <div className="mt-3 border-t border-border pt-3">{list}</div> : null}
      </nav>
      <nav
        className="sticky top-28 hidden max-h-[calc(100vh-8rem)] w-56 shrink-0 overflow-y-auto border-l border-wakakusa/30 pl-4 text-sm lg:block"
        aria-label="目次"
      >
        <p className="mb-2 font-serif text-sm font-semibold text-text-primary">目次</p>
        {list}
      </nav>
    </>
  );
}
