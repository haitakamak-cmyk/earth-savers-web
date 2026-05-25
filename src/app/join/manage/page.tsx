import type { Metadata } from "next";

import { ManagePortalForm } from "./ManagePortalForm";

export const metadata: Metadata = {
  title: "サブスク管理",
  description:
    "Stripe Customer Portal でマンスリーサポーターの変更・解約を行います。",
};

export default function ManageSubscriptionPage() {
  return (
    <>
      <section className="bg-ivory py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary">
            サブスク管理
          </h1>
          <p className="mt-3 text-text-secondary">
            登録時のメールアドレスを入力すると、Stripe の安全な管理ページへ移動します。
          </p>
        </div>
      </section>
      <section className="bg-ivory-warm py-10 sm:py-14">
        <ManagePortalForm />
      </section>
    </>
  );
}
