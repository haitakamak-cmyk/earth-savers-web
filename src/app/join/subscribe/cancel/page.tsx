import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サブスク登録を中断しました",
  description: "マンスリーサポーターのお申し込みは完了していません。",
};

export default function SubscribeCancelPage() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <h1 className="font-serif text-3xl font-bold text-text-primary">
          お申し込みは完了していません
        </h1>
        <p className="mt-4 leading-relaxed text-text-secondary">
          Stripe 決済ページから戻りました。再度お申し込みいただく場合は、プラン選択ページからお進みください。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/join/subscribe"
            className="inline-flex items-center justify-center rounded-full bg-wakakusa px-6 py-3 font-semibold text-white hover:bg-wakakusa-dark"
          >
            プラン選択に戻る
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

