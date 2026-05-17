import Link from "next/link";
import type { Metadata } from "next";

import { ORGANIZATION_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "駆け込み寺（環境相談窓口）",
  description:
    "メガソーラーや風力発電など再エネ開発から地域・自然を守りたい方へ。" +
    `${ORGANIZATION_NAME}が弁護士と連携し、条例づくり・開発阻止の相談に応じます。`,
};

const concerns = [
  "山の上にメガソーラーが計画され、水源が心配",
  "風力発電の騒音・低周波で地域が分断されそう",
  "行政に陳情したが取り合ってもらえない",
  "住民運動を起こしたいが、何から始めればいいかわからない",
  "条例で開発を止められるか法的に確認したい",
];

const steps = [
  {
    step: "01",
    title: "フォームから相談内容を送る",
    body: "お名前・地域・開発計画の概要を記入してください。個人情報は厳重に管理します。",
  },
  {
    step: "02",
    title: "担当者から連絡",
    body: "内容を確認のうえ、数日以内にメールでご連絡します。案件によっては連携弁護士を交えた相談に進みます。",
  },
  {
    step: "03",
    title: "一緒に方針を考える",
    body: "条例制定・パブコメ・住民説明会・法的手段など、地域の状況に合った選択肢を整理します。",
  },
];

export default function ConsultationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-wakakusa-dark py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-3 text-sm font-semibold tracking-widest text-wakakusa-light/80 uppercase">
            環境相談窓口
          </p>
          <h1 className="font-serif text-3xl font-bold text-white drop-shadow-sm sm:text-4xl">
            駆け込み寺
          </h1>
          <p className="mt-2 text-sm font-medium tracking-wide text-white/75">
            Environmental consultation desk
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            再エネ開発から地域と自然を守りたい方へ。<br className="hidden sm:block" />
            弁護士と連携し、あなたの地域に合った方法を一緒に考えます。
          </p>
        </div>
      </section>

      {/* こんな悩みありませんか */}
      <section className="bg-ivory py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
            こんなお悩みありませんか？
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {concerns.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-wakakusa/20 text-wakakusa"
                  aria-hidden
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-5.121-5.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="text-sm leading-relaxed text-text-secondary sm:text-base">
                  {c}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 実績・事例へのリンク */}
      <section className="border-y border-wakakusa/15 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-wakakusa">
                実績・事例
              </p>
              <h2 className="mt-1 font-serif text-lg font-bold text-text-primary sm:text-xl">
                再生可能エネルギー開発計画と地域対応の事例整理
              </h2>
              <p className="mt-1 text-sm font-medium text-text-muted">
                主要事案にみる制度運用と地域調整の実際
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                大規模太陽光・風力発電の開発計画をめぐり、各地で論点となった条例運用、行政付随許可、協議体制、訴訟・告発の経緯を公開資料に基づいて整理しています。
                あなたの地域の状況と照らし合わせてみてください。
              </p>
            </div>
            <Link
              href="/learn/topics/solar-wind-opposition-cases"
              className="shrink-0 rounded-full border border-wakakusa/40 bg-white px-5 py-2.5 text-sm font-semibold text-wakakusa-dark transition-colors hover:bg-wakakusa-light sm:px-6"
            >
              事例を読む →
            </Link>
          </div>
        </div>
      </section>

      {/* 相談の流れ */}
      <section className="bg-ivory py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
            相談の流れ
          </h2>
          <div className="mt-8 flex flex-col gap-6">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-5">
                <span className="font-mono text-2xl font-bold text-wakakusa/30 leading-none">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-semibold text-text-primary">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 注意書き */}
      <section className="bg-ivory pb-2">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-border bg-white p-4 text-xs leading-relaxed text-text-muted">
            <p>
              ※ 本相談窓口は法律相談ではありません。弁護士との個別相談が必要と判断した場合は、連携弁護士をご紹介します。
            </p>
            <p className="mt-1">
              ※ 相談内容は、{ORGANIZATION_NAME}の活動改善のために匿名・統計的に利用することがあります。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
            まずは相談してみてください
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            一人で悩まずに、現状を教えてください。<br className="hidden sm:block" />
            どんな小さな疑問でも構いません。
          </p>
          <Link
            href="/contact?category=environment-consultation"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-wakakusa px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-wakakusa-dark"
          >
            相談フォームへ
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="mt-4 text-xs text-text-muted">
            お問い合わせ種別で「環境相談（駆け込み寺）」を選択してください。
          </p>
        </div>
      </section>
    </>
  );
}
