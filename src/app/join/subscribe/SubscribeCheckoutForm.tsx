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

    if (!name) {
      setErrorMessage("お名前または法人・団体名は必須です。");
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
          name,
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
    <>
      {status === "submitting" ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ivory/85 px-4 backdrop-blur-[2px]"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="max-w-sm rounded-2xl border border-border bg-white px-6 py-8 text-center shadow-sm">
            <div
              className="mx-auto h-8 w-8 rounded-full border-2 border-wakakusa/25 border-t-wakakusa motion-reduce:animate-none motion-safe:animate-spin"
              aria-hidden
            />
            <p className="mt-4 font-medium text-text-primary">
              安全な決済ページを準備しています
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              しばらくお待ちください。安全な決済ページへ移動します。
            </p>
          </div>
        </div>
      ) : null}

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
                  disabled={status === "submitting"}
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
            会員登録（アカウント作成）は不要です。寄付内容の確認・変更は、
            ご登録メールアドレス宛に届く確認リンクから行えます。
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
                disabled={status === "submitting"}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-text-primary disabled:opacity-60"
                placeholder="example@email.com"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-text-primary">
                お名前または法人・団体名 <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={80}
                autoComplete="name"
                disabled={status === "submitting"}
                className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-text-primary disabled:opacity-60"
                placeholder="山田 太郎 / 株式会社〇〇"
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
          {status === "submitting" ? "決済ページへ移動中…" : "毎月の寄付を申し込む"}
        </button>

        <p className="text-center text-xs text-text-muted">
          毎月寄付の確認・変更・停止は
          <Link href="/join/manage" className="text-wakakusa underline">
            寄付内容の確認・変更ページ
          </Link>
          から行えます。
        </p>
      </form>
    </>
  );
}
