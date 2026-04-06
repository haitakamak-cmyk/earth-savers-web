import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "銀行振込（都度寄付） | 支援・参加する | 財団法人 地球防衛群",
  description:
    "都度寄付の振込先口座とアンバサダーランクの目安をご案内します。月額サポーターは公式アプリからお申し込みいただけます。",
};

const APP_DONATE_URL = "https://app.earth-savers.org/donate";

const monthlyFeatures = [
  "活動報告メールマガジン",
  "年次活動報告書の送付",
  "サポーター限定イベントへのご招待",
  "公式アプリでの活動報告閲覧",
];

/** 年額目安（銀行・都度寄付のアンバサダー）— 掲載順は少額から */
const ambassadorAmountRows: { amountLabel: string; rank: string }[] = [
  { amountLabel: "年間10万円〜", rank: "水の守人" },
  { amountLabel: "年間30万円〜", rank: "森の番人" },
  { amountLabel: "年間50万円〜", rank: "山の守護者" },
  { amountLabel: "年間100万円〜", rank: "七世代の大使" },
];

/** 振込先口座（ハードコード）— アプリ側と同期 */
const BANK_DETAILS_STATIC = `楽天銀行　第三営業支店（253）
普通 7215359
イーエス（カ`;

type PageProps = {
  searchParams: Promise<{ view?: string }>;
};

export default async function BankDonationPage({ searchParams }: PageProps) {
  const { view } = await searchParams;
  const isMonthly = view === "monthly";
  // 環境変数があれば優先、なければ定数を使用
  const bankDetails =
    process.env.BANK_TRANSFER_DETAILS?.trim() || BANK_DETAILS_STATIC;

  return (
    <>
      <section className="border-b border-border bg-ivory-warm py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-center text-sm text-text-muted">
            <Link href="/join#donation" className="text-wakakusa underline hover:text-wakakusa-dark">
              支援・参加する
            </Link>
            {" / "}
            <span className="text-text-secondary">銀行振込・都度寄付</span>
          </p>
          <h1 className="mt-4 text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            寄付の方法
          </h1>
          <p className="mt-2 text-center text-sm text-text-secondary">
            月額サポートと、銀行振込・郵便振替の都度寄付からお選びください。
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* タブ（サーバー：searchParams のみ） */}
          <div className="flex gap-1 rounded-2xl bg-ivory-warm p-1.5 shadow-inner">
            <Link
              href="/join/bank-donation?view=monthly"
              className={`flex-1 rounded-xl py-3 text-center text-sm font-semibold transition-colors sm:text-base ${
                isMonthly
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              月額サポート
            </Link>
            <Link
              href="/join/bank-donation"
              className={`flex-1 rounded-xl py-3 text-center text-sm font-semibold transition-colors sm:text-base ${
                !isMonthly
                  ? "bg-white text-text-primary shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              銀行振込（都度）
            </Link>
          </div>

          {isMonthly ? (
            <div className="mt-10 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
                マンスリーサポーター
              </h2>
              <p className="mt-1 text-lg font-semibold text-wakakusa sm:text-xl">
                月額 1,000円〜
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                毎月の継続支援で、活動を安定的に支えてくださる方のプランです。お申し込みは公式アプリから行えます。
              </p>
              <ul className="mt-6 space-y-2.5">
                {monthlyFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-wakakusa"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={APP_DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wakakusa py-3.5 font-semibold text-white shadow-sm transition-colors hover:bg-wakakusa-dark"
              >
                公式アプリでサポーターになる
                <svg
                  className="h-4 w-4 shrink-0 opacity-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          ) : (
            <div className="mt-10 space-y-10">
              <div>
                <h2 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
                  振込先口座
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  下記の口座へお振込みください。
                </p>
                <div className="mt-5 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
                  {bankDetails ? (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-text-primary sm:text-base">
                      {bankDetails}
                    </p>
                  ) : (
                    <p className="text-sm leading-relaxed text-text-secondary">
                      現在、こちらのページに口座情報を表示できません。お手数ですが{" "}
                      <Link
                        href="/contact?intent=bank-donation"
                        className="font-semibold text-wakakusa underline hover:text-wakakusa-dark"
                      >
                        お問い合わせフォーム
                      </Link>
                      よりお申し込みいただくか、事務局までご連絡ください。
                    </p>
                  )}
                </div>
                <p className="mt-4 text-sm text-text-muted">
                  メールでの案内をご希望の方は{" "}
                  <Link
                    href="/contact?intent=bank-donation"
                    className="text-wakakusa underline hover:text-wakakusa-dark"
                  >
                    お問い合わせフォーム
                  </Link>
                  からお申し込みください。
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
                  アンバサダー（年額・銀行振込）
                </h2>
                <p className="mt-3 rounded-xl border border-wakakusa/25 bg-wakakusa-light/40 px-4 py-3 text-sm leading-relaxed text-text-secondary">
                  寄付金額は自由ですが、
                  <strong className="text-text-primary">
                    年間10万円以上
                  </strong>
                  のご寄付をいただいた方には、アンバサダーとして
                  <Link
                    href="/members"
                    className="mx-0.5 font-semibold text-wakakusa underline hover:text-wakakusa-dark"
                  >
                    財団ウェブサイトのメンバーページ
                  </Link>
                  に掲載させていただいております。
                </p>
                <div className="mt-5 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
                  <table className="w-full min-w-[280px] text-left text-sm sm:text-base">
                    <thead>
                      <tr className="border-b border-border bg-ivory-warm">
                        <th
                          scope="col"
                          className="whitespace-nowrap px-4 py-3 font-semibold text-text-primary sm:px-6"
                        >
                          年額目安
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 font-semibold text-text-primary sm:px-6"
                        >
                          ランク
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ambassadorAmountRows.map((row) => (
                        <tr
                          key={row.rank}
                          className="border-b border-border last:border-0"
                        >
                          <td className="whitespace-nowrap px-4 py-3 font-medium text-text-primary sm:px-6">
                            {row.amountLabel}
                          </td>
                          <td className="px-4 py-3 font-semibold text-text-primary sm:px-6">
                            {row.rank}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-text-muted">
                  ※ ランクは年間のご寄付額の目安です。正式な区分は事務局にて確認のうえ反映いたします。
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
