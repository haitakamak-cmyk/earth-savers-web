import type { Metadata } from "next";

const APP_URL = "https://app.earth-savers.org";

export const metadata: Metadata = {
  title: "公式アプリ紹介",
  description:
    "地球防衛群の公式アプリ。ランキング・部活動・活動投稿・寄付機能を搭載。メンバーが環境活動をともに記録・応援するプラットフォームです。",
};

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

const features = [
  {
    title: "活動ランキング",
    description:
      "活動マイルを積み上げて仲間と競おう。上位メンバーはトップランカーとして表彰されます。",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: "部活動に参加",
    description:
      "里山整備・530・ばら撒くっ種など、気になる部に入ってみんなで活動しよう。",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "活動を記録",
    description:
      "現場写真・コメントを投稿して活動ログを残そう。仲間のいいね！で励まし合えます。",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "マンスリーサポーター",
    description:
      "月額1,000円〜の継続寄付。アプリから簡単に登録・変更・停止できます。",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
];

export default function AppIntroPage() {
  return (
    <>
      {/* タイトル → その直下にアプリへの CTA（タイトルより上にリンクを置かない） */}
      <section className="bg-wakakusa-light pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            公式アプリ
          </h1>
          <p className="mt-3 text-text-secondary">earth savers app</p>
        </div>
        <div className="mt-10 bg-wakakusa py-12 text-center sm:mt-12 sm:py-14">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <p className="font-semibold text-white">今すぐアプリを使ってみる</p>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-wakakusa shadow-sm transition-opacity hover:opacity-90"
            >
              アプリを開く
              <ExternalLinkIcon className="h-4 w-4 shrink-0" />
            </a>
            <p className="mt-4 text-sm text-white/60">
              ※ 現在はブラウザアプリです。App Store / Google Play は準備中。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-12 text-center sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-bold text-text-primary">
            「地球防衛群のメンバーが集まる場所」
          </h2>
          <p className="mt-4 leading-relaxed text-text-secondary">
            活動投稿・ランキング・部活動・マンスリーサポーター登録をひとつのアプリで。
            <br />
            仲間と一緒に、水と森を守る活動を続けよう。
          </p>
        </div>
      </section>

      <section className="bg-ivory-warm py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary">
            できること
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wakakusa-light text-wakakusa">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-text-primary">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
