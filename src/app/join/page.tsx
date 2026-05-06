import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { APP_EXTERNAL_LINKS_READY } from "@/lib/site";

export const metadata: Metadata = {
  title: "支援・参加する",
  description:
    "寄付やサポーター登録、ボランティア活動への参加方法、オンラインショップでの応援など、水と森の未来を守るための参画方法をご案内します。",
};

const APP_DONATE_URL = "https://app.earth-savers.org/donate";
const BANK_DONATION_INFO_HREF = "/join/bank-donation";
/** For Good クラウドファンディング（リリース直前にプロジェクト継続中・ID を再確認すること） */
const CROWDFUNDING_URL = "https://for-good.net/project/1003493";

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

const monthlyPlan = {
  name: "マンスリーサポーター（アプリ）",
  amount: "月額 1,000円〜",
  description: "毎月の継続支援で、活動を安定的に支えてくださる方",
  features: [
    "公式サイト・アプリでの活動報告閲覧",
  ],
};

const oneTimeBankFeatures = [
  "公式サイト・アプリでの活動報告閲覧",
];

function ArrowCircleIcon({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-text-primary text-white ${className ?? ""}`}
      aria-hidden
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </span>
  );
}

const volunteerActivities = [
  {
    title: "里山オーガニック再生",
    description: "竹林整備・間伐・大地の再生の視点で、水脈と通気を回復しながら里山をよみがえらせる活動",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "530（ゴミゼロ）活動",
    description: "地域のゴミ拾い、池そうじ、お花植えなどの美化活動",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "生態系復活プロジェクト",
    description: "水質調査や浄化装置の設置・管理など",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "事務局サポート",
    description: "SNS運営、イベント企画、資料作成など",
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
      {/* ===== LLM / Search Definition ===== */}
      <div className="sr-only">
        地球防衛群は、寄付、ボランティア、拡散などを通じて日本の水と森を再生する一般財団法人です。
      </div>

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
            水と森の再生に、あなたの力を貸してください
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed text-base sm:text-lg">
            寄付、参加、拡散。できる形で、現場を支えていただけます。<br className="hidden sm:block" />
            あなたに合った形で、かけがえのない水と森の循環に参加してください。
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
          <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-relaxed text-text-muted">
            ※ 現在は一般財団法人のため、個人の寄付に係る寄付金控除（税額控除）はお受けできません。あらかじめご了承ください。
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* マンスリー → アプリ */}
            <div
              id="supporter"
              className="rounded-2xl border-2 border-wakakusa bg-white p-6 shadow-sm transition-colors sm:p-8"
            >
              <span className="mb-4 inline-block rounded-full bg-wakakusa px-3 py-1 text-xs font-semibold text-white">
                おすすめ
              </span>
              <h3 className="text-xl font-bold text-text-primary">
                {monthlyPlan.name}
              </h3>
              <p className="mt-1 text-2xl font-semibold text-wakakusa">
                {monthlyPlan.amount}
              </p>
              <p className="mt-3 text-sm text-text-secondary">
                {monthlyPlan.description}
              </p>
              <ul className="mt-5 space-y-2.5">
                {monthlyPlan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-wakakusa"
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
              {APP_EXTERNAL_LINKS_READY ? (
                <a
                  href={APP_DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wakakusa py-3 font-semibold text-white shadow-sm transition-colors hover:bg-wakakusa-dark"
                >
                  サポーターになる
                  <ExternalLinkIcon className="h-4 w-4 shrink-0 opacity-90" />
                </a>
              ) : (
                <p
                  className="mt-6 rounded-full border border-border bg-ivory-warm py-3 text-center text-sm font-semibold text-text-secondary"
                  role="status"
                >
                  アプリからのお申し込みは準備中です
                </p>
              )}
            </div>

            {/* 都度寄付 → 銀行振込・郵便振替 */}
            <div className="rounded-2xl border-2 border-border bg-white p-6 shadow-sm transition-colors hover:border-wakakusa/30 sm:p-8">
              <h3 className="text-center text-xl font-bold text-text-primary">
                都度寄付
              </h3>
              <p className="mt-1 text-center text-2xl font-semibold text-wakakusa">
                自由な金額
              </p>
              <p className="mt-2 text-center text-sm text-text-secondary">
                ご都合の良いタイミングで、お好きな金額をご支援
              </p>

              <div className="mt-6 rounded-xl border border-border bg-ivory/60 px-4 py-6 text-center sm:px-6">
                <h4 className="text-lg font-bold text-text-primary">
                  銀行振込
                </h4>
                <div
                  className="mx-auto mt-3 h-0.5 w-10 rounded-full bg-wakakusa"
                  aria-hidden
                />
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  下記のページからお申し込みいただくと、振込先口座をご案内いたします。
                </p>
                <Link
                  href={BANK_DONATION_INFO_HREF}
                  className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-amber-400 px-5 py-3.5 text-base font-semibold text-text-primary shadow-sm transition-colors hover:bg-amber-500"
                >
                  銀行振込で寄付する
                  <ArrowCircleIcon />
                </Link>
              </div>

              <ul className="mt-6 space-y-2.5">
                {oneTimeBankFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-text-secondary"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-wakakusa"
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
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-text-muted">
            ※
            {APP_EXTERNAL_LINKS_READY
              ? "マンスリーサポーターは公式アプリからお申し込みいただけます。"
              : "マンスリーサポーターは、公式アプリ公開後にアプリからお申し込みいただける予定です（現在準備中）。"}
            <br />
            ※ 都度寄付は銀行振込のみです。振込先は
            <Link href={BANK_DONATION_INFO_HREF} className="text-wakakusa underline">
              銀行振込のご案内ページ
            </Link>
            をご覧ください。
            <br />
            ※
            ご支援いただいた資金は、水源地の取得・保全、里山再生、生態系復活プロジェクトなど現場の活動に、責任を持って活用いたします（振込手数料・決済に係る費用などが発生する場合があります）。
          </p>
        </div>
      </section>

      {/* Crowdfunding */}
      <section className="py-12 sm:py-16 bg-accent-gold/10 border-y border-accent-gold/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-accent-gold text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
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
            href={CROWDFUNDING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center px-8 py-3.5 bg-accent-gold hover:bg-amber-600 text-white font-semibold rounded-full transition-colors shadow-sm"
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

      {/* 買って応援バナー */}
      <section className="border-y border-aqua/20 bg-aqua-light/40 py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-2 text-sm font-semibold text-aqua">お買い物で応援</p>
          <h2 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
            地球防衛群ショップでの購入が支援につながります
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            自然に還るプロダクトを選ぶことで、地球防衛群の活動を支えることができます。
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-aqua px-7 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
          >
            買って応援する →
          </Link>
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
                <Link
                  href="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-wakakusa/40 bg-white py-2.5 text-sm font-semibold text-wakakusa-dark transition-colors hover:bg-wakakusa-light/40"
                >
                  参加・主催について問い合わせる
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-text-muted">
              参加方法・開催スケジュール・主催のご相談は、
              <Link href="/contact" className="text-wakakusa underline">
                お問い合わせフォーム
              </Link>
              からお気軽にご連絡ください。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
