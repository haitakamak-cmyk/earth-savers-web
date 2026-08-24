/**
 * 「学ぶ」配下で整備中のページ。
 *
 * 中身が薄く、サイト内のどこからもリンクしていない（＝閲覧者は辿り着けない）状態で
 * sitemap にだけ載せると、検索エンジンに薄いページを申告することになる。
 * ハブの非表示・sitemap 除外・noindex の3つが食い違わないよう、ここを唯一の正とする。
 *
 * 公開するときはこの配列から外すだけでよい（3つとも同時に戻る）。
 * なお `/learn/articles` は記事0件のときだけ同じ扱いになるため、
 * このリストではなく `ARTICLES.length` で判定している。
 */
export const LEARN_PAGES_IN_PREPARATION: readonly string[] = [
  "/learn/laws",
  "/learn/threats",
];

export function isLearnPageInPreparation(path: string): boolean {
  return LEARN_PAGES_IN_PREPARATION.includes(path);
}

/** 整備中ページの metadata に付ける robots 設定 */
export const PREPARATION_ROBOTS = { index: false, follow: true } as const;
