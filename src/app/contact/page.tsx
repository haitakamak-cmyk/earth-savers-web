import type { Metadata } from "next";

import { ContactFaqSection } from "./ContactFaqSection";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "公益財団法人地球防衛群への一般お問い合わせ、寄付・取材のご相談はフォームから。メガソーラー・乱開発の相談窓口（駆け込み寺）は準備中。よくある質問（FAQ）もご覧ください。",
};

const BANK_DONATION_MESSAGE = `都度寄付（銀行振込・郵便振替）の振込先案内を希望します。

氏名（フリガナ）：
希望寄付額（目安）：`;

type ContactPageProps = {
  searchParams: Promise<{ intent?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { intent } = await searchParams;
  const isBankDonation = intent === "bank-donation";
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
                initialCategory={isBankDonation ? "donation" : undefined}
                initialMessage={isBankDonation ? BANK_DONATION_MESSAGE : undefined}
                submitIntent={isBankDonation ? "bank-donation" : undefined}
              />
            </div>

            {/* Help Desk — 準備中 */}
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
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-text-primary">
                      駆け込み寺（環境トラブル相談）
                    </h2>
                    <span className="rounded-full bg-aqua/10 px-2 py-0.5 text-xs font-semibold text-aqua">
                      準備中
                    </span>
                  </div>
                  <p className="text-xs font-medium text-aqua">
                    メガソーラー・乱開発でお困りの方へ
                  </p>
                </div>
              </div>

              <div className="space-y-4 py-10 text-center">
                <p className="text-4xl" aria-hidden>
                  🛡️
                </p>
                <p className="font-semibold text-text-primary">
                  現在、体制を整えています
                </p>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-text-secondary">
                  専門家との連携体制が整い次第、
                  環境トラブルの相談窓口を開設いたします。
                  <br className="hidden sm:block" />
                  今しばらくお待ちください。
                </p>
                <p className="text-sm text-text-secondary">
                  緊急の場合はお問い合わせフォームよりご連絡ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFaqSection />
    </>
  );
}
