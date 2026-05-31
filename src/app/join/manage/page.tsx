import type { Metadata } from "next";

import { ManagePortalForm } from "./ManagePortalForm";

export const metadata: Metadata = {
  title: "寄付内容の確認・変更",
  description:
    "毎月の寄付内容、支払い方法、停止手続きを確認・変更できます。",
};

export default function ManageSubscriptionPage() {
  return (
    <>
      <section className="bg-ivory py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary">
            寄付内容の確認・変更
          </h1>
          <p className="mt-3 text-text-secondary">
            登録時のメールアドレスを入力すると、安全な管理ページへ移動します。
          </p>
        </div>
      </section>
      <section className="bg-ivory-warm py-10 sm:py-14">
        <ManagePortalForm />
      </section>
    </>
  );
}
