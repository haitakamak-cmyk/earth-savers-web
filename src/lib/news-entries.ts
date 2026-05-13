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
    id: "founding-crowdfunding-2025",
    date: "2025-10-01", // 設立日が確定したら差し替え
    category: "重要",
    title: "一般財団法人「地球防衛群」設立およびクラウドファンディング開始のお知らせ",
    href: "https://for-good.net/project/1003493",
    external: true,
    lead: "日本の「命の水と森」を七世代先の子どもたちへ残すことを目的として、一般財団法人「地球防衛群」を設立いたしました。設立に伴い、初期活動資金および水源地・山林防衛のためのクラウドファンディングを「For Good」にて開始しています。",
  },
];

/** 日付の降順でソートしたエントリを返す */
export function getSortedNewsEntries(): NewsEntry[] {
  return [...newsEntries].sort((a, b) => b.date.localeCompare(a.date));
}
