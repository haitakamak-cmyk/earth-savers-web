/** お知らせ記事データ */
export type NewsCategory = "重要" | "活動報告" | "イベント" | "メディア掲載";

export type NewsEntry = {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  category: NewsCategory;
  title: string;
  /** 外部URL or 内部パス。未指定の場合はタイトルのみ表示 */
  href?: string;
  /** 一覧に表示するリード文（省略可） */
  lead?: string;
  /** href が外部リンクの場合 true */
  external?: boolean;
};

export const newsEntries: NewsEntry[] = [
  {
    id: "crowdfunding-next-goal-2026-05",
    date: "2026-05-31",
    category: "活動報告",
    title: "クラウドファンディング ネクストゴール達成！",
    href: "https://for-good.net/project/1003493",
    external: true,
  },
  {
    id: "corporate-registration-2026-05",
    date: "2026-05-15",
    category: "重要",
    title: "一般財団法人 地球防衛群 法人登記完了！",
    href: "/about",
  },
];

/** 日付の降順でソートしたエントリを返す */
export function getSortedNewsEntries(): NewsEntry[] {
  return [...newsEntries].sort((a, b) => b.date.localeCompare(a.date));
}

/** 表示用 YYYY.M.D（先頭ゼロなし） */
export function formatNewsDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${y}.${Number(m)}.${Number(d)}`;
}
