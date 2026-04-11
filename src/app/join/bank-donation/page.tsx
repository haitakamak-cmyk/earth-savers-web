import type { Metadata } from "next";
import Link from "next/link";
import { BankDonationForm } from "./BankDonationForm";

export const metadata: Metadata = {
  title: "銀行振込で寄付する | 財団法人 地球防衛群",
  description:
    "銀行振込・郵便振替での都度寄付のお申し込みフォームです。送信後、振込先口座をメールでご案内いたします。",
};

export default function BankDonationPage() {
  return (
    <>
      <section className="border-b border-border bg-wakakusa-light py-10 sm:py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="text-center text-sm text-text-muted">
            <Link
              href="/join#donation"
              className="text-wakakusa underline hover:text-wakakusa-dark"
            >
              支援・参加する
            </Link>
            {" / "}
            <span className="text-text-secondary">銀行振込で寄付する</span>
          </p>
          <h1 className="mt-4 text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            銀行振込で寄付する
          </h1>
          <p className="mt-2 text-center text-sm leading-relaxed text-text-secondary">
            下記フォームからお申し込みいただくと、振込先口座をメールでご案内いたします。
          </p>
        </div>
      </section>

      <section className="bg-ivory py-10 sm:py-14">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <BankDonationForm />
          </div>

          <p className="mt-6 text-center text-xs leading-relaxed text-text-muted">
            ※ 振込名義は、できるだけご登録のお名前と同一でお願いいたします。
            <br />
            ※ 寄付金受領証明書が必要な場合は、お振込後に事務局までご連絡ください。
            <br />
            ※ ご不明な点は{" "}
            <Link
              href="/contact"
              className="text-wakakusa underline hover:text-wakakusa-dark"
            >
              お問い合わせ
            </Link>
            からどうぞ。
          </p>
        </div>
      </section>
    </>
  );
}
