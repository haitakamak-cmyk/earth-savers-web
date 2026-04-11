"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function BankDonationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const kana = String(fd.get("kana") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const amount = String(fd.get("amount") ?? "").trim();
    const note = String(fd.get("note") ?? "").trim();

    if (!name || !email) {
      setErrorMessage("お名前とメールアドレスは必須です。");
      setStatus("error");
      return;
    }

    const message = [
      "都度寄付（銀行振込）のお申し込みです。",
      "",
      `氏名（フリガナ）：${kana || "未入力"}`,
      `希望寄付額（目安）：${amount || "未入力"}`,
      note ? `\n備考：\n${note}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setErrorMessage(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          category: "donation",
          message,
          intent: "bank-donation",
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setErrorMessage(
          data.error ?? "送信に失敗しました。しばらくおいてから再度お試しください。"
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("通信エラーが発生しました。再度お試しください。");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-wakakusa-light">
          <svg
            className="h-7 w-7 text-wakakusa"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-text-primary">
          お申し込みありがとうございます
        </h2>
        <p className="text-sm leading-relaxed text-text-secondary">
          ご入力いただいたメールアドレス宛に、
          <br />
          振込先口座をご案内するメールをお送りしました。
        </p>
        <p className="text-xs text-text-muted">
          メールが届かない場合は、迷惑メールフォルダをご確認ください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* お名前 */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bd-name" className="text-sm font-semibold text-text-primary">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          id="bd-name"
          name="name"
          type="text"
          required
          maxLength={50}
          placeholder="山田 花子"
          className="h-12 rounded-lg border border-border bg-ivory/40 px-4 text-text-primary placeholder:text-text-muted focus:border-wakakusa focus:outline-none"
        />
      </div>

      {/* フリガナ */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bd-kana" className="text-sm font-semibold text-text-primary">
          フリガナ
        </label>
        <input
          id="bd-kana"
          name="kana"
          type="text"
          maxLength={50}
          placeholder="ヤマダ ハナコ"
          className="h-12 rounded-lg border border-border bg-ivory/40 px-4 text-text-primary placeholder:text-text-muted focus:border-wakakusa focus:outline-none"
        />
      </div>

      {/* メールアドレス */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bd-email" className="text-sm font-semibold text-text-primary">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          id="bd-email"
          name="email"
          type="email"
          required
          maxLength={100}
          placeholder="example@email.com"
          className="h-12 rounded-lg border border-border bg-ivory/40 px-4 text-text-primary placeholder:text-text-muted focus:border-wakakusa focus:outline-none"
        />
      </div>

      {/* 希望寄付額 */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bd-amount" className="text-sm font-semibold text-text-primary">
          希望寄付額（目安）
        </label>
        <input
          id="bd-amount"
          name="amount"
          type="text"
          maxLength={30}
          placeholder="例: 10,000円"
          className="h-12 rounded-lg border border-border bg-ivory/40 px-4 text-text-primary placeholder:text-text-muted focus:border-wakakusa focus:outline-none"
        />
      </div>

      {/* 備考 */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="bd-note" className="text-sm font-semibold text-text-primary">
          備考 <span className="text-xs font-normal text-text-muted">（任意）</span>
        </label>
        <textarea
          id="bd-note"
          name="note"
          rows={3}
          maxLength={500}
          placeholder="その他、ご連絡事項があればどうぞ"
          className="rounded-lg border border-border bg-ivory/40 px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-wakakusa focus:outline-none"
        />
      </div>

      <p className="text-xs leading-relaxed text-text-muted">
        送信により、
        <Link
          href="/privacy"
          className="text-wakakusa underline hover:text-wakakusa-dark"
        >
          プライバシーポリシー
        </Link>
        に記載のとおり個人情報を取り扱うことに同意したものとみなします。
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 flex h-14 w-full items-center justify-center rounded-full bg-wakakusa text-base font-semibold text-white shadow-sm transition-colors hover:bg-wakakusa-dark disabled:opacity-60"
      >
        {status === "submitting" ? (
          <span className="flex items-center gap-2">
            <span className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            送信中...
          </span>
        ) : (
          "送信する"
        )}
      </button>
    </form>
  );
}
