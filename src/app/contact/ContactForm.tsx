"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const DEFAULT_ERROR =
  "送信に失敗しました。しばらくおいてから再度お試しください。";

export type ContactFormProps = {
  /** 例: intent=bank-donation から渡す */
  initialCategory?: string;
  initialMessage?: string;
  /** 送信時に API へ渡し、口座案内メールのテンプレを切り替える */
  submitIntent?: "bank-donation";
};

export function ContactForm({
  initialCategory,
  initialMessage,
  submitIntent,
}: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const category = String(data.get("category") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const intent = String(data.get("intent") ?? "").trim();

    if (!name || !email || !message) {
      setErrorMessage(
        "お名前・メールアドレス・お問い合わせ内容を入力してください。",
      );
      setStatus("error");
      return;
    }

    setErrorMessage(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          category,
          message,
          ...(intent ? { intent } : {}),
        }),
      });

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setErrorMessage(
          typeof payload.error === "string" && payload.error.trim()
            ? payload.error
            : DEFAULT_ERROR,
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage(
        "通信に失敗しました。ネットワークを確認して再度お試しください。",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-wakakusa/30 bg-wakakusa-light/50 px-4 py-8 text-center"
        role="status"
      >
        <p className="font-semibold text-text-primary">
          {submitIntent === "bank-donation"
            ? "お申込みを受け付けました。"
            : "お問い合わせを受け付けました。担当者よりご連絡いたします。"}
        </p>
        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          {submitIntent === "bank-donation"
            ? "ご入力のメールアドレスに、振込先口座を記載した案内メールをお送りしています。届かない場合は迷惑メールフォルダもご確認ください。"
            : "ご入力のメールアドレスに、受付確認の自動返信をお送りしています。届かない場合は迷惑メールフォルダもご確認ください。"}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrorMessage(null);
          }}
          className="mt-6 text-sm font-semibold text-wakakusa-dark underline"
        >
          続けて送信する
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {submitIntent === "bank-donation" ? (
        <input type="hidden" name="intent" value="bank-donation" />
      ) : null}
      {status === "error" && errorMessage ? (
        <p
          className="rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-text-primary"
        >
          お名前 <span className="text-coral">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          className="w-full rounded-lg border border-border bg-ivory px-4 py-2.5 text-sm focus:border-wakakusa focus:outline-none focus:ring-2 focus:ring-wakakusa/30"
          placeholder="山田 花子"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-text-primary"
        >
          メールアドレス <span className="text-coral">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-border bg-ivory px-4 py-2.5 text-sm focus:border-wakakusa focus:outline-none focus:ring-2 focus:ring-wakakusa/30"
          placeholder="example@email.com"
        />
      </div>
      <div>
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-medium text-text-primary"
        >
          お問い合わせ種別
        </label>
        <select
          id="category"
          name="category"
          defaultValue={initialCategory ?? ""}
          className="w-full rounded-lg border border-border bg-ivory px-4 py-2.5 text-sm focus:border-wakakusa focus:outline-none focus:ring-2 focus:ring-wakakusa/30"
        >
          <option value="">選択してください</option>
          <option value="activity">活動について</option>
          <option value="donation">寄付・支援について</option>
          <option value="volunteer">ボランティアについて</option>
          <option value="media">取材・メディアについて</option>
          <option value="other">その他</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1 block text-sm font-medium text-text-primary"
        >
          お問い合わせ内容 <span className="text-coral">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={initialMessage ?? ""}
          className="w-full resize-none rounded-lg border border-border bg-ivory px-4 py-2.5 text-sm focus:border-wakakusa focus:outline-none focus:ring-2 focus:ring-wakakusa/30"
          placeholder="お問い合わせ内容をご記入ください"
        />
      </div>
      <p className="text-xs leading-relaxed text-text-muted">
        送信により、
        <Link
          href="/privacy"
          className="font-medium text-wakakusa-dark underline underline-offset-2 hover:text-wakakusa"
        >
          プライバシーポリシー
        </Link>
        に記載のとおり個人情報を取り扱うことに同意したものとみなします。
      </p>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-wakakusa py-3 font-semibold text-white shadow-sm transition-colors hover:bg-wakakusa-dark disabled:opacity-60"
      >
        {status === "submitting" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
