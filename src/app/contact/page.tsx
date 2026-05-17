import type { Metadata } from "next";
import Link from "next/link";

import { ORGANIZATION_NAME_HEADER_LINE } from "@/lib/site";

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
                  ご相談は左のフォームからお送りいただけます。お問い合わせ種別で「
                  <strong className="text-text-primary">環境相談</strong>
                  」を選択してください。
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
