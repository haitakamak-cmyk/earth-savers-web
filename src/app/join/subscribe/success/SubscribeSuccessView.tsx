import Link from "next/link";

import { findPlan, formatYen } from "@/lib/stripe/plans";

import type { VerifiedSubscribeCheckout } from "@/lib/stripe/checkout-session";

export function GenericSubscribeSuccess() {
  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <SuccessHero icon="🌱" />
        <h1 className="mt-6 font-serif text-3xl font-bold text-text-primary">
          ご支援ありがとうございます
        </h1>
        <p className="mt-4 leading-relaxed text-text-secondary">
          毎月の継続寄付のお申し込みを受け付けました。
          ご登録のメールアドレスに確認メールが届きます。
        </p>
        <p className="mt-3 text-sm text-text-muted">
          寄付内容の確認・変更・停止は、専用ページから行えます。
        </p>
        <SubscribeSuccessActions />
      </div>
    </section>
  );
}

export function DetailedSubscribeSuccess({
  checkout,
}: {
  checkout: VerifiedSubscribeCheckout;
}) {
  const plan = findPlan(checkout.planCode);

  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <SuccessHero icon={checkout.planIcon} />
        <h1 className="mt-6 font-serif text-3xl font-bold text-text-primary">
          ご支援ありがとうございます
        </h1>
        <p className="mt-4 leading-relaxed text-text-secondary">
          毎月の継続寄付のお申し込みが完了しました。
        </p>

        <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-wakakusa/25 bg-white p-6 text-left shadow-sm">
          <p className="text-xs font-medium tracking-wide text-text-muted">
            今回のご支援プラン
          </p>
          <div className="mt-4 flex items-start gap-4">
            <span className="text-3xl leading-none" aria-hidden>
              {checkout.planIcon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-text-primary">{checkout.planName}</p>
              <p className="mt-1 text-xl font-semibold text-wakakusa">
                {formatYen(checkout.amountMonthly)}
                <span className="text-base font-medium text-text-secondary"> / 月</span>
              </p>
              {plan?.description ? (
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {plan.description}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-text-muted">
          寄付内容の確認・変更・停止は、専用ページから行えます。
        </p>
        <SubscribeSuccessActions />
      </div>
    </section>
  );
}

function SuccessHero({ icon }: { icon: string }) {
  return (
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-wakakusa-light">
      <span className="text-3xl" aria-hidden>
        {icon}
      </span>
    </div>
  );
}

function SubscribeSuccessActions() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Link
        href="/join/manage"
        className="inline-flex items-center justify-center rounded-full bg-wakakusa px-6 py-3 font-semibold text-white hover:bg-wakakusa-dark"
      >
        寄付内容を確認・変更する
      </Link>
      <Link
        href="/join"
        className="inline-flex items-center justify-center rounded-full border border-wakakusa/40 px-6 py-3 font-semibold text-wakakusa-dark hover:bg-wakakusa-light/40"
      >
        支援・参加に戻る
      </Link>
    </div>
  );
}
