import type { Metadata } from "next";
import Link from "next/link";

import { ORGANIZATION_NAME, ORGANIZATION_NAME_HEADER_LINE } from "@/lib/site";

import { ContactFaqSection } from "./ContactFaqSection";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    `${ORGANIZATION_NAME_HEADER_LINE}への一般お問い合わせ、寄付・取材のご相談はフォームから。環境・再エネ開発に関するご相談は「環境相談」ページおよびフォームの種別「環境相談」からも受け付けています。よくある質問（FAQ）もご覧ください。`,
};

const BANK_DONATION_MESSAGE = `都度寄付（銀行振込・郵便振替）です。受領証明書の発行や、振込先を記載したメールでのご案内を希望します。

氏名（フリガナ）：
希望寄付額（目安）：`;

type ContactPageProps = {
  searchParams: Promise<{ intent?: string; category?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { intent, category } = await searchParams;
  const isBankDonation = intent === "bank-donation";
  const initialCategory =
    isBankDonation
      ? "donation"
      : category === "environment-consultation"
        ? "environment-consultation"
        : undefined;
  return (
    <>
      {/* Hero */}
      <section className="bg-wakakusa-light py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            お問い合わせ
          </h1>
          <p className="mt-3 text-text-secondary">Contact</p>
        </div>
      </section>

      {/* Two columns */}
      <section className="bg-ivory py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* General Contact */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-wakakusa-light">
                  <svg
                    className="h-5 w-5 text-wakakusa"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">
                    一般のお問い合わせ
                  </h2>
                  <p className="text-xs text-text-muted">
                    活動・寄付・取材等に関するご質問
                  </p>
                </div>
              </div>

              <ContactForm
                initialCategory={initialCategory}
                initialMessage={isBankDonation ? BANK_DONATION_MESSAGE : undefined}
                submitIntent={isBankDonation ? "bank-donation" : undefined}
              />
            </div>

            {/* Help Desk — 環境相談 */}
            <div
              id="helpdesk"
              className="rounded-2xl border-2 border-aqua/40 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aqua-light">
                  <svg
                    className="h-5 w-5 text-aqua"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">
                    環境相談（環境トラブル）
                  </h2>
                  <p className="text-xs font-medium text-aqua">
                    メガソーラー・乱開発でお困りの方へ
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-text-secondary">
                <p>
                  相談の流れ・留意事項は
                  <Link
                    href="/consultation"
                    className="mx-1 font-semibold text-aqua underline underline-offset-2 hover:text-aqua-dark"
                  >
                    環境相談窓口
                  </Link>
                  のページをご覧ください。
                </p>
                <p>
                  ご相談はお問い合わせフォームからお送りいただけます。お問い合わせ種別で「
                  <strong className="text-text-primary">環境相談</strong>
                  」を選択してください。
                </p>

                {/* よくあるご相談 */}
                <div className="mt-2 rounded-lg bg-aqua-light/30 p-4">
                  <p className="mb-2 text-xs font-semibold text-aqua">
                    よくあるご相談
                  </p>
                  <ul className="space-y-1.5 text-xs text-text-muted">
                    <li>・ 開発計画の情報を入手したが、何から手をつけるべきか</li>
                    <li>・ 条例の有無や行政への働きかけ方がわからない</li>
                    <li>・ 住民同士で勉強会を始めたが、次のステップが見えない</li>
                    <li>・ 許可が出てしまった後にできることはあるか</li>
                  </ul>
                </div>

                {/* 事例集への誘導 */}
                <p className="text-xs text-text-muted">
                  過去の事例を先にご覧いただくと、相談時の論点整理がスムーズです。
                </p>
                <Link
                  href="/learn/topics/solar-wind-opposition-cases"
                  className="inline-block text-sm font-semibold text-aqua hover:text-aqua-dark"
                >
                  事例集を読む →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 公益姿勢・訂正受付 */}
      <section className="border-t border-border bg-ivory py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-4">
          <div className="rounded-xl border border-wakakusa/20 bg-wakakusa-light/20 p-5 text-sm leading-relaxed text-text-secondary">
            <p className="font-semibold text-text-primary">
              当財団の基本姿勢
            </p>
            <p className="mt-2">
              {ORGANIZATION_NAME}は、公開情報・判例・行政公表資料に基づき、市民の知る権利と公益的情報アクセスを支える立場から、誠実な事実情報の提供に努めております。同時に、健全な再生可能エネルギー産業の発展と地域の自然環境保全の両立を支援する公益的活動として、対話による合意形成を最も重要な価値と位置付けています。
            </p>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 text-sm leading-relaxed text-text-secondary">
            <p className="font-semibold text-text-primary">
              記述内容に関するご指摘について
            </p>
            <p className="mt-2">
              当財団は、対話を通じた事実関係の確認と適切な訂正を最優先します。当サイトの記述内容に事実誤認・解釈の不適切な点等がある場合は、上記フォームよりご指摘ください。ご指摘の際は、該当箇所、問題と考える理由、根拠資料又は確認可能な情報を添えてお知らせください。ご指摘いただいた事項については、当財団内で精査のうえ、根拠資料に基づき必要な対応を検討し、速やかに訂正いたします。
            </p>
          </div>
        </div>
      </section>

      <ContactFaqSection />
    </>
  );
}
