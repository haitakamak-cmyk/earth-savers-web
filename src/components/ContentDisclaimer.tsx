/** 用語集一覧・解説記事などで共有する「一般的資料であること」の注意 */
export function ContentDisclaimer(props: {
  /** 制度改正への注意（法令リンク記事など） */
  requiresLegalCaveat?: boolean;
}) {
  return (
    <aside
      className="rounded-xl border border-border bg-white px-4 py-4 text-sm leading-relaxed text-text-secondary shadow-sm"
      aria-label="利用上の注意"
    >
      <p className="font-semibold text-text-primary">利用上の注意</p>
      <p className="mt-2">
        本コンテンツは、当団体が整理・解説した一般的な参考資料です。学術的・行政的な解釈の相違があり得るため、正確性が必要な場面では、必ず一次資料・専門家の助言を確認してください。法的助言・投資助言・行政判断の代替にはなりません。
      </p>
      {props.requiresLegalCaveat ? (
        <p className="mt-3 text-text-secondary">
          制度・法令は改正される場合があります。条文番号・手続の要件は、最新の e-Gov
          法令検索・関係省庁の公表を確認してください。
        </p>
      ) : null}
    </aside>
  );
}
