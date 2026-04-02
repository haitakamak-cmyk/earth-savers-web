import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "支援・参加する | 財団法人 地球防衛群",
  description:
    "寄付・サポーター登録・ボランティア参加など、あなたにできることがあります。地球防衛群の活動を支えてください。",
};

const APP_DONATE_URL = "https://app.earth-savers.org/donate";
const APP_CLUBS_URL = "https://app.earth-savers.org/clubs";

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}

function AppClubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}

const supportPlans = [
  {
    name: "マンスリーサポーター",
    amount: "月額 1,000円〜",
    description: "毎月の継続支援で、活動を安定的に支えてくださる方",
    features: [
      "活動報告メールマガジン",
      "年次活動報告書の送付",
      "サポーター限定イベントへのご招待",
      "公式アプリでの活動報告閲覧",
    ],
    highlight: true,
  },
  {
    name: "都度寄付",
    amount: "1,000円〜",
    description: "ご都合の良いタイミングで、お好きな金額をご支援",
    features: [
      "活動報告メールマガジン",
      "寄付金受領証明書の発行",
      "使途のご報告",
    ],
    highlight: false,
  },
];

const volunteerActivities = [
  {
    title: "里山整備ボランティア",
    description: "竹林整備や間伐作業など、里山を再生する活動",
    schedule: "月1〜2回（土日）",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "530（ゴミゼロ）活動",
    description: "地域のゴミ拾い、池そうじ、お花植えなどの美化活動",
    schedule: "毎月開催",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "生態系復活プロジェクト",
    description: "水質調査や浄化装置の設置・管理など",
    schedule: "不定期",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "事務局サポート",
    description: "SNS運営、イベント企画、資料作成など",
    schedule: "リモート可",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function JoinPage() {
  return (
    <>
      {/* Hero — 横長ワイド写真で横幅いっぱい（object-cover） */}
      <section className="relative h-64 w-full overflow-hidden sm:h-80 md:h-[22rem]">
        <Image
          src="/images/photos/join-hero-stage-wide.png"
          alt="イベント会場の集合写真。ステージ前のメンバーと客席の参加者"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif drop-shadow-lg">
              支援・参加する
            </h1>
            <p className="mt-2 text-white/80 text-sm sm:text-base">
              Join Us / Action
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 sm:py-16 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary font-serif">
            あなたの力が、未来を変える
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            一人ひとりの小さなアクションが、大きな変化を生み出します。
            寄付で支える、現場で汗を流す、日々の暮らしの中で意識する。
            あなたに合った形で、水と森の未来づくりに参加してください。
          </p>
        </div>
      </section>

      {/* Donation / Supporter - Unified */}
      <section id="donation" className="py-16 sm:py-24 bg-ivory-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center font-serif">
            寄付・サポーター登録
          </h2>
          <p className="mt-3 text-center text-text-muted">
            あなたのご支援が、活動を支えます
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-2 transition-colors ${
                  plan.highlight
                    ? "border-wakakusa"
                    : "border-border hover:border-wakakusa/30"
                }`}
              >
                {plan.highlight && (
                  <span className="inline-block bg-wakakusa text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    おすすめ
                  </span>
                )}
                <h3 className="text-xl font-bold text-text-primary">
                  {plan.name}
                </h3>
                <p className="mt-1 text-2xl font-bold text-wakakusa">
                  {plan.amount}
                </p>
                <p className="mt-3 text-sm text-text-secondary">
                  {plan.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                    >
                      <svg
                        className="w-4 h-4 text-wakakusa shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={APP_DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 font-bold transition-colors ${
                    plan.highlight
                      ? "bg-wakakusa text-white shadow-sm hover:bg-wakakusa-dark"
                      : "bg-wakakusa-light text-wakakusa-dark hover:bg-wakakusa/20"
                  }`}
                >
                  {plan.highlight ? "サポーターになる" : "寄付する"}
                  <ExternalLinkIcon className="h-4 w-4 shrink-0 opacity-90" />
                </a>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-text-muted">
            ※ 寄付・サポーター登録は公式アプリ上で安全にお手続きいただけます。
            <br />
            ※ 寄付金は、水源地の取得・保全、里山再生、生態系復活プロジェクト等の活動に使用されます。
            <br />
            ※ 寄付金受領証明書を発行いたします。
          </p>
        </div>
      </section>

      {/* Crowdfunding */}
      <section className="py-12 sm:py-16 bg-accent-gold/10 border-y border-accent-gold/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-accent-gold text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            クラウドファンディング実施中
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary font-serif">
            財団法人「地球防衛群」設立プロジェクト
          </h2>
          <p className="mt-3 text-text-secondary">
            財団設立のための初期資金を募っています。
            <br className="hidden sm:block" />
            詳しくはクラウドファンディングページをご覧ください。
          </p>
          <a
            href="#"
            className="mt-6 inline-flex items-center px-8 py-3.5 bg-accent-gold hover:bg-amber-600 text-white font-bold rounded-full transition-colors shadow-sm"
          >
            クラウドファンディングを見る
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center font-serif">
            ボランティア募集
          </h2>
          <p className="mt-3 text-center text-text-muted">
            土に触れ、森を聴く。自然のペースで深呼吸する活動です。
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {volunteerActivities.map((activity) => (
              <div
                key={activity.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:border-wakakusa/30 transition-colors"
              >
                <div className="w-12 h-12 bg-wakakusa-light rounded-full flex items-center justify-center text-wakakusa">
                  {activity.icon}
                </div>
                <h3 className="mt-4 text-base font-bold text-text-primary">
                  {activity.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {activity.description}
                </p>
                <p className="mt-3 text-xs text-text-muted">
                  開催頻度: {activity.schedule}
                </p>
                <a
                  href={APP_CLUBS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wakakusa py-2.5 text-sm font-bold text-white transition-colors hover:bg-wakakusa-dark"
                >
                  <AppClubIcon className="h-5 w-5 shrink-0" />
                  アプリで参加する
                </a>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-text-muted">
              公式アプリの「部活動」から参加したい部を選び、お気軽にご参加ください。
              <br />
              ご質問は{" "}
              <Link href="/contact" className="text-wakakusa underline">
                お問い合わせ
              </Link>{" "}
              からどうぞ。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
