"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "error";

export function ManagePortalForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();

    if (!email) {
      setErrorMessage("メールアドレスは必須です。");
      setStatus("error");
      return;
    }

    setErrorMessage(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };

      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      setErrorMessage(
        data.error ?? "管理ページを開けませんでした。しばらくしてから再度お試しください。",
      );
      setStatus("error");
    } catch {
      setErrorMessage("通信エラーが発生しました。再度お試しください。");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-lg space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <label htmlFor="email" className="block text-sm font-medium text-text-primary">
          登録時のメールアドレス
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-lg border border-border px-3 py-2.5"
          placeholder="example@email.com"
        />
        <p className="mt-3 text-xs leading-relaxed text-text-muted">
          毎月の寄付額、支払い方法、停止手続きなどを確認・変更できます。
          登録済みのメールアドレス宛に、確認リンクが届きます。
        </p>
      </div>

      {errorMessage ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-wakakusa px-6 py-3.5 font-semibold text-white hover:bg-wakakusa-dark disabled:opacity-60"
      >
        {status === "submitting" ? "管理ページへ移動中…" : "寄付内容を確認・変更する"}
      </button>

      <p className="text-center text-sm text-text-muted">
        新規のお申し込みは
        <Link href="/join/subscribe" className="text-wakakusa underline">
          こちら
        </Link>
      </p>
    </form>
  );
}
