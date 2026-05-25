import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サブスク登録完了",
  description: "マンスリーサポーターへのお申し込みありがとうございます。",
};

export default function SubscribeSuccessPage() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-wakakusa-light">
          <span className="text-3xl" aria-hidden>
            🌱
          </span>
        </div>
        <h1 className="mt-6 font-serif text-3xl font-bold text-text-primary">
          ご支援ありがとうございます
        </h1>
        <p className="mt-4 leading-relaxed text-text-secondary">
          マンスリーサポーターへのお申し込みを受け付けました。
          ご登録のメールアドレスに Stripe から確認が届きます。
        </p>
        <p className="mt-3 text-sm text-text-muted">
          プラン変更・解約はサブスク管理ページから行えます。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/join/manage"
            className="inline-flex items-center justify-center rounded-full bg-wakakusa px-6 py-3 font-semibold text-white hover:bg-wakakusa-dark"
          >
            サブスク管理
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
