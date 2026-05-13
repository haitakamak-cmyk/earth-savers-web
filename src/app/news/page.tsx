import Link from "next/link";
import type { Metadata } from "next";

import { getSortedNewsEntries, type NewsCategory } from "@/lib/news-entries";
import { ORGANIZATION_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "お知らせ",
  description:
    `${ORGANIZATION_NAME}からのお知らせ、活動報告、イベント情報などをお届けします。`,
};

const categoryColors: Record<NewsCategory, string> = {
  重要: "bg-red-100 text-red-700",
  活動報告: "bg-wakakusa-light text-wakakusa-dark",
  イベント: "bg-aqua-light text-aqua",
  メディア掲載: "bg-amber-100 text-amber-700",
};

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${y}.${m}.${d}`;
}

export default function NewsPage() {
  const entries = getSortedNewsEntries();

  return (
    <>
      {/* Hero */}
      <section className="bg-wakakusa py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-white drop-shadow-sm sm:text-4xl">
            お知らせ
          </h1>
          <p className="mt-2 text-sm text-white/75 sm:text-base">News</p>
        </div>
      </section>

      {/* List */}
      <section className="bg-ivory py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {entries.length === 0 ? (
            <p className="text-center text-text-muted">現在お知らせはありません。</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {entries.map((entry) => {
                const colorClass = categoryColors[entry.category];
                const content = (
                  <div className="rounded-2xl border border-border bg-white p-5 shadow-sm transition-colors hover:border-wakakusa/30 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-text-muted">
                        {formatDate(entry.date)}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}
                      >
                        {entry.category}
                      </span>
                    </div>
                    <p className="mt-2 font-semibold text-text-primary leading-snug">
                      {entry.title}
                      {entry.external && (
                        <svg
                          className="ml-1.5 inline h-3.5 w-3.5 text-text-muted"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-label="外部リンク"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                    </p>
                    {entry.lead && (
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3">
                        {entry.lead}
                      </p>
                    )}
                  </div>
                );

                return (
                  <li key={entry.id}>
                    {entry.href ? (
                      entry.external ? (
                        <a
                          href={entry.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {content}
                        </a>
                      ) : (
                        <Link href={entry.href} className="block">
                          {content}
                        </Link>
                      )
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
