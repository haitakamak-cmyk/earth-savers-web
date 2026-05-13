import Link from "next/link";
import type { Metadata } from "next";

import { ORGANIZATION_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "情報公開",
  description:
    `${ORGANIZATION_NAME}の定款、事業計画書、収支予算書、役員名簿などの公開資料をまとめています。`,
};

type DocItem = {
  label: string;
  href?: string;
  note?: string;
};

type DocSection = {
  title: string;
  items: DocItem[];
};

const docSections: DocSection[] = [
  {
    title: "定款",
    items: [
      {
        label: "定款（PDF）",
        href: "/documents/teikan.pdf",
      },
    ],
  },
  {
    title: "事業計画・報告",
    items: [
      {
        label: "設立初年度 事業計画書（PDF）",
        href: "/documents/jigyokeikaku-2025.pdf",
      },
      {
        label: "設立初年度 収支予算書（PDF）",
        href: "/documents/yosansho-2025.pdf",
      },
      {
        label: "第1期 事業報告書",
        note: "第1期（成立日〜2026年7月31日）の事業報告書は、2026年秋頃に公開予定です。",
      },
    ],
  },
  {
    title: "財務情報",
    items: [
      {
        label: "第1期 決算報告書",
        note: "第1期（成立日〜2026年7月31日）の決算報告書は、2026年秋頃に公開予定です。",
      },
    ],
  },
  {
    title: "役員・評議員名簿",
    items: [
      {
        label: "役員・評議員一覧（メンバーページ）",
        href: "/members",
      },
    ],
  },
];

function DownloadIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-wakakusa"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-wakakusa"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}

export default function DisclosurePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-wakakusa py-10 sm:py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-white drop-shadow-sm sm:text-4xl">
            情報公開
          </h1>
          <p className="mt-2 text-sm text-white/75 sm:text-base">Disclosure</p>
        </div>
      </section>

      {/* Lead */}
      <section className="bg-ivory py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-center text-sm leading-relaxed text-text-secondary sm:text-base">
            {ORGANIZATION_NAME}では、事業活動および財務状況の透明性を確保し、<br className="hidden sm:block" />
            皆様からの信頼に応えるため、関連する資料を公開しています。
          </p>
        </div>
      </section>

      {/* Document List */}
      <section className="bg-ivory pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-col gap-8">
            {docSections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-4 border-b border-border pb-2 font-serif text-lg font-bold text-text-primary">
                  {section.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        item.href.startsWith("/documents") ? (
                          /* PDF ダウンロードリンク */
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 text-sm font-medium text-text-secondary shadow-sm transition-colors hover:border-wakakusa/40 hover:text-wakakusa-dark"
                          >
                            <DownloadIcon />
                            {item.label}
                          </a>
                        ) : (
                          /* 内部ページリンク */
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 text-sm font-medium text-text-secondary shadow-sm transition-colors hover:border-wakakusa/40 hover:text-wakakusa-dark"
                          >
                            <LinkIcon />
                            {item.label}
                          </Link>
                        )
                      ) : (
                        /* 準備中ノート */
                        <div className="rounded-xl border border-border bg-white px-4 py-3.5 shadow-sm">
                          <p className="text-sm font-medium text-text-muted">{item.label}</p>
                          {item.note && (
                            <p className="mt-1 text-xs leading-relaxed text-text-muted">
                              ※ {item.note}
                            </p>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-text-muted">
            掲載資料に関するお問い合わせは{" "}
            <Link href="/contact" className="text-wakakusa underline">
              お問い合わせフォーム
            </Link>{" "}
            よりご連絡ください。
          </p>
        </div>
      </section>
    </>
  );
}
