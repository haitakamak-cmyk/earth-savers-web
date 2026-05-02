type ContentDisclaimerProps = {
  /** 制度改正への注意ブロックを追加（法令・用語など） */
  requiresLegalCaveat?: boolean;
  /** 条例補助資料：法務レビューを促す追記 */
  ordinanceDraftFinalizeNote?: boolean;
};

/**
 * 用語集・解説記事・条例補助資料で共通の利用注意。
 * 指示書準拠の固定文言。
 */
export function ContentDisclaimer(props: ContentDisclaimerProps) {
  return (
    <aside
      className="rounded-xl border border-border bg-white px-4 py-4 text-sm leading-relaxed text-text-secondary shadow-sm"
      aria-label="利用上の注意"
    >
      <p className="font-semibold text-text-primary">利用上の注意</p>
      <p className="mt-2">
        本資料は当法人が作成した一般的な解説資料であり、法的助言、税務助言、投資助言又は行政判断を代替するものではありません。具体的な事案については、必ず弁護士、税理士、関係省庁の窓口その他の専門家にご相談ください。
      </p>
      <p className="mt-2">
        本資料は、税制特例・補助制度・認定制度等の適用可否を保証するものではありません。
      </p>
      {props.requiresLegalCaveat ? (
        <div className="mt-4 rounded-lg border border-wakakusa/25 bg-wakakusa-light/25 px-3 py-2 text-text-secondary">
          <p className="font-semibold text-text-primary">制度・法令の改正に関する注意</p>
          <p className="mt-1">
            本記載は2026年5月時点の情報です。制度・法令は改正される場合があるため、最新の情報は環境省・関係省庁の公式資料を確認してください。
          </p>
        </div>
      ) : null}
      {props.ordinanceDraftFinalizeNote ? (
        <p className="mt-4 border-t border-border pt-4 text-text-secondary">
          本資料は条例制定の参考であり、各自治体の法務担当・顧問弁護士のレビューを経たうえで最終化してください。
        </p>
      ) : null}
    </aside>
  );
}
