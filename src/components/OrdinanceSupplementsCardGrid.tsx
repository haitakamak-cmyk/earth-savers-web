import Link from "next/link";

import {
  ORDINANCE_SUPPLEMENT_LIST_ORDER,
  ORDINANCE_SUPPLEMENTS,
} from "@/lib/ordinance-supplements-data";

/** 補助資料4件のカードグリッド（条例ひな型ページ・補助資料ハブで共通） */
export function OrdinanceSupplementsCardGrid() {
  const supplementEntries = ORDINANCE_SUPPLEMENT_LIST_ORDER.map((slug) =>
    ORDINANCE_SUPPLEMENTS.find((e) => e.slug === slug),
  ).filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {supplementEntries.map((entry) => (
        <li key={entry.slug}>
          <Link
            href={`/toolkit/ordinance/${entry.slug}`}
            className="flex h-full flex-col rounded-xl border border-border bg-white p-5 shadow-sm transition-colors hover:border-wakakusa/35 hover:bg-ivory"
          >
            <span className="font-serif text-lg font-semibold text-text-primary">
              {entry.title}
            </span>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
              {entry.shortDescription}
            </p>
            <span className="mt-4 text-sm font-semibold text-aqua-dark underline-offset-4">
              読む →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
