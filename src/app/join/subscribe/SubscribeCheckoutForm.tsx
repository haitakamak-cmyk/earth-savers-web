"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import {
  SUBSCRIPTION_PLANS,
  formatYen,
  type PlanCode,
} from "@/lib/stripe/plans";

type Status = "idle" | "submitting" | "error";

export function SubscribeCheckoutForm() {
  const [selected, setSelected] = useState<PlanCode>("tane");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const name = String(fd.get("name") ?? "").trim();

    if (!email) {
      setErrorMessage("メールアドレスは必須です。");
      setStatus("error");
      return;
    }

    setErrorMessage(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_code: selected,
          email,
          ...(name ? { name } : {}),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };

      if (!res.ok || !data.url) {
        setErrorMessage(
          data.error ?? "決済ページへ進めませんでした。しばらくしてから再度お試しください。",
        );
        setStatus("error");
        return;
      }

      window.location.href = data.url;
    } catch {
      setErrorMessage("通信エラーが発生しました。再度お試しください。");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const active = selected === plan.code;
          return (
            <label
              key={plan.code}
              className={`cursor-pointer rounded-2xl border-2 p-5 transition-colors ${
                active
                  ? "border-wakakusa bg-wakakusa-light/30"
                  : "border-border bg-white hover:border-wakakusa/40"
              }`}
            >
              <input
                type="radio"
                name="plan"
                value={plan.code}
                checked={active}
                onChange={() => setSelected(plan.code)}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden>
                  {plan.icon}
                </span>
                <div>
                  <p className="font-bold text-text-primary">{plan.name}</p>
                  <p className="mt-1 text-lg font-semibold text-wakakusa">
                    {formatYen(plan.amountMonthly)} / 月
                  </p>
                  <p className="mt-2 text-sm text-text-secondary">
                    {plan.description}
                  </p>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-text-primary">お申し込み情報</h2>
        <p className="mt-2 text-sm text-text-secondary">
          会員登録（アカウント作成）は不要です。Stripe の安全な決済ページへ進みます。
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-text-primary">
              メールアドレス <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-text-primary"
              placeholder="example@email.com"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-text-primary">
              お名前（任意）
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-text-primary"
              placeholder="山田 太郎"
            />
          </div>
        </div>
      </div>

      {errorMessage ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-wakakusa px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-wakakusa-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Stripe へ移動中…" : "Stripe でサブスクを申し込む"}
      </button>

      <p className="text-center text-xs text-text-muted">
        サブスクの変更・解約は
        <Link href="/join/manage" className="text-wakakusa underline">
          サブスク管理ページ
        </Link>
        から（Stripe Customer Portal）。
      </p>
    </form>
  );
}
