import Link from "next/link";
import type { Metadata } from "next";

import { SubscribeCheckoutForm } from "./SubscribeCheckoutForm";

export const metadata: Metadata = {
  title: "マンスリーサポーター（Stripe）",
  description:
    "Stripe Checkout による月額サブスク寄付。会員登録不要。プラン選択後、安全な決済ページへ進みます。",
};

export default function SubscribePage() {
  return (
    <>
      <section className="bg-ivory py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/join#supporter"
            className="text-sm text-wakakusa underline"
          >
            ← 支援・参加に戻る
          </Link>
          <h1 className="mt-4 font-serif text-3xl font-bold text-text-primary">
            マンスリーサポーター（Stripe）
          </h1>
          <p className="mt-3 text-text-secondary">
            毎月の継続支援で、水と森の再生活動を支えてください。アカウント登録は不要です。
          </p>
          <p className="mt-2 text-xs text-text-muted">
            ※ 一般財団法人のため、個人の寄付金控除（税額控除）はお受けできません。
          </p>
        </div>
      </section>

      <section className="bg-ivory-warm py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SubscribeCheckoutForm />
        </div>
      </section>
    </>
  );
}
