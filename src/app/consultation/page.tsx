import Link from "next/link";
import type { Metadata } from "next";

import { ORGANIZATION_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "環境相談窓口",
  description:
    "メガソーラーや風力発電など再エネ開発から地域・自然を守りたい方へ。" +
    `事例集・活動ツールキットで自走したうえで、状況整理が必要なときに${ORGANIZATION_NAME}の環境相談窓口がご相談を受け付けます。`,
};

const concerns = [
  "山の上にメガソーラーが計画され、水源が心配",
  "風力発電の騒音・低周波で地域が分断されそう",
  "行政に相談したが、次にどの手続を取ればよいかわからない",
  "住民運動を起こしたいが、何から始めればいいかわからない",
  "条例で開発を止められるか法的に確認したい",
];

type Step = {
  step: string;
  title: string;
  body: string;
  link?: { label: string; href: string };
};

const steps: Step[] = [
  {
    step: "01",
    title: "事例を読んで学ぶ",
    body: "まずは全国の事例を読み、あなたの地域と似た状況がないか確認してください。条例運用・行政手続き・住民の動きなど、具体的な対応が記録されています。",
    link: {
      label: "事例集を読む →",
      href: "/learn/topics/solar-wind-opposition-cases",
    },
  },
  {
    step: "02",
    title: "近隣の仲間と情報を共有する",
    body: "まずは近隣の住民同士で集まり、事例集の内容や自分たちの地域の状況を共有してみてください。何が起きているのか・どの段階なのかを一緒に整理するだけでも、次の一手が見えてきます。",
  },
  {
    step: "03",
    title: "事例をもとに対応を検討する",
    body: "事例集の計画段階別対応表や、活動ツールキットを参考に、今の段階で打てる手を検討してください。",
    link: { label: "活動ツールキット →", href: "/toolkit" },
  },
  {
    step: "04",
    title: "それでもわからないことがあれば相談する",
    body: "自分たちで検討した上で、方法が見つからない・法的な判断が必要な場合は、環境相談窓口にお問い合わせください。内容を確認のうえ、状況に応じた対応をご案内します。",
    link: {
      label: "相談フォームへ →",
      href: "/contact?category=environment-consultation",
    },
  },
];

export default function ConsultationPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-wakakusa-dark py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-3 text-sm font-semibold tracking-widest text-wakakusa-light/80 uppercase">
            環境相談窓口
          </p>
          <h1 className="font-serif text-3xl font-bold text-white drop-shadow-sm sm:text-4xl">
            環境相談窓口
          </h1>
          <p className="mt-2 text-sm font-medium tracking-wide text-white/75">
            Environmental consultation desk
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            再エネ開発から地域と自然を守りたい方へ。
            <br className="hidden sm:block" />
            まずは事例やツールをもとに、地域の仲間と一緒に動いてみてください。
            <br className="hidden sm:block" />
            それでも道筋が見えないときに、環境相談窓口へご連絡ください。
          </p>
        </div>
      </section>

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
                <span className="text-sm leading-relaxed text-text-secondary sm:text-base">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
                <div className="min-w-0">
                  <h3 className="font-semibold text-text-primary">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">{s.body}</p>
                  {s.link ? (
                    <Link
                      href={s.link.href}
                      className="mt-2 inline-block text-sm font-semibold text-wakakusa hover:text-wakakusa-dark"
                    >
                      {s.link.label}
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-2">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-4">
          {/* 公益的ポジショニング */}
          <div className="rounded-xl border border-wakakusa/20 bg-wakakusa-light/20 p-4 text-sm leading-relaxed text-text-secondary">
            <p className="font-semibold text-text-primary">
              当財団の基本姿勢
            </p>
            <p className="mt-2">
              {ORGANIZATION_NAME}は、公開情報・判例・行政公表資料に基づき、市民の知る権利と公益的情報アクセスを支える立場から、誠実な事実情報の提供に努めております。同時に、健全な再生可能エネルギー産業の発展と地域の自然環境保全の両立を支援する公益的活動として、対話による合意形成を最も重要な価値と位置付けています。
            </p>
          </div>

          {/* 訂正受付・対話姿勢 */}
          <div className="rounded-xl border border-border bg-white p-4 text-sm leading-relaxed text-text-secondary">
            <p className="font-semibold text-text-primary">
              記述内容に関するご指摘について
            </p>
            <p className="mt-2">
              当財団は、対話を通じた事実関係の確認と適切な訂正を最優先します。当サイトの記述内容に事実誤認・解釈の不適切な点等がある場合は、
              <Link
                href="/contact"
                className="font-semibold text-wakakusa underline underline-offset-2 hover:text-wakakusa-dark"
              >
                お問い合わせフォーム
              </Link>
              よりご指摘ください。ご指摘いただいた事項については、当財団内で精査のうえ、根拠資料に基づき必要な対応を検討し、速やかに訂正いたします。
            </p>
          </div>

          {/* 既存免責事項 */}
          <div className="rounded-xl border border-border bg-white p-4 text-xs leading-relaxed text-text-muted">
            <p>
              ※ 本相談窓口は、地域における環境・防災・住民合意形成に関する一般的な情報整理を支援するものであり、弁護士法に基づく法律相談、代理交渉、訴訟代理その他の法的業務を行うものではありません。
            </p>
            <p className="mt-1">
              ※ 具体的な法的判断、行政不服申立て、訴訟、仮処分、刑事告発等が必要となる場合は、弁護士その他の専門家への相談をお願いする場合があります。
            </p>
            <p className="mt-1">
              ※ ご相談内容に第三者の氏名、住所、連絡先、未公開資料、営業秘密その他の機微情報が含まれる場合は、必要最小限の範囲でご提供ください。
            </p>
            <p className="mt-1">
              ※ 相談内容は、個人または特定の事業者・地域が識別されない形に加工したうえで、{ORGANIZATION_NAME}の活動改善、相談傾向の分析、政策提言、啓発資料の作成に利用することがあります。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-xl font-bold text-text-primary sm:text-2xl">
            自分たちで調べて、動いて、それでも困ったら
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            事例を読み、仲間と相談し、できることを試した上で、それでも方法が見つからないときはご連絡ください。
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
            お問い合わせ種別で「環境相談」を選択してください。
          </p>
        </div>
      </section>
    </>
  );
}
