import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "毎月の寄付のお申し込みを中断しました",
  description: "毎月の継続寄付のお申し込みは完了していません。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SubscribeCancelPage() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-white px-6 py-8 shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ivory border border-border">
            <span className="text-xl text-text-muted" aria-hidden>
              ↩
            </span>
          </div>
          <h1 className="mt-5 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            お申し込みは完了していません
          </h1>
          <p className="mt-4 leading-relaxed text-text-secondary">
            決済はまだ完了していません。ご都合のよいときに、いつでもお申し込みを再開できます。
          </p>
          <p className="mt-3 text-sm text-text-muted">
            内容をご確認のうえ、改めて寄付額をお選びください。
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/join/subscribe"
            className="inline-flex items-center justify-center rounded-full bg-wakakusa px-6 py-3 font-semibold text-white hover:bg-wakakusa-dark"
          >
            寄付額の選択に戻る
          </Link>
          <Link
            href="/join"
            className="inline-flex items-center justify-center rounded-full border border-wakakusa/40 px-6 py-3 font-semibold text-wakakusa-dark hover:bg-wakakusa-light/40"
          >
            支援・参加に戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
