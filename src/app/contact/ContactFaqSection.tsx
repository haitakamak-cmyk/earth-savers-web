import Link from "next/link";
import type { ReactNode } from "react";

import { SITE_URL } from "@/lib/site";

type FaqItem = {
  question: string;
  /** JSON-LD・AI 向け（プレーンテキスト） */
  answerForSchema: string;
  /** 画面表示 */
  body: ReactNode;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question:
      "大規模開発計画と地域の環境への影響が心配です。相談できますか？",
    answerForSchema:
      "はい。環境相談窓口のページで流れを確認し、事例やツールキットで自走したうえで、お問い合わせフォームの種別から「環境相談」を選んで送信できます。内容を確認のうえご連絡します。",
    body: (
      <>
        はい。
        <Link
          href="/consultation"
          className="mx-1 font-semibold text-aqua underline underline-offset-2"
        >
          環境相談窓口
        </Link>
        のページで流れをご確認のうえ、まずは事例やツールキットで検討してみてください。それでも道筋が見えないときは、お問い合わせフォームの種別から「
        <strong>環境相談</strong>
        」を選んでご送信ください。ご連絡は内容を確認のうえ順次いたします。
      </>
    ),
  },
  {
    question: "地球防衛群はどのような団体ですか？",
    answerForSchema:
      "財団法人として、日本の水源地保全、里山再生、生態系の回復、環境教育などを通じて「水と森を次世代に引き継ぐ」ことを目的に活動しています。設立の初期段階にあり、活動実績を積み公益財団法人の認定を目指しています。",
    body: (
      <>
        <strong>財団法人</strong>
        として、日本の水源地保全、里山再生、生態系の回復、環境教育などを通じて「水と森を次世代に引き継ぐ」ことを目的に活動しています。設立したばかりの段階であり、活動を重ね、
        <strong>公益財団法人の認定を目指して</strong>
        います。
      </>
    ),
  },
  {
    question: "寄付や支援の方法を教えてください。",
    answerForSchema:
      "寄付・毎月の継続寄付・ボランティアのご案内は公式サイト内の支援・参加ページにまとめています。オンラインからお申し込みいただけます。",
    body: (
      <>
        寄付・毎月の継続寄付・ボランティアのご案内は「
        <Link
          href="/join"
          className="font-semibold text-wakakusa-dark underline"
        >
          支援・参加する
        </Link>
        」ページにまとめています。オンラインからお申し込みいただけます。
      </>
    ),
  },
  {
    question: "ボランティアや現地活動に参加できますか？",
    answerForSchema:
      "はい。植林、里山整備、530（ゴミゼロ）運動など、様々な活動で参加者を募集しています。詳細は公式サイトの活動内容ページおよび支援ページをご覧ください。",
    body: (
      <>
        はい。植林、里山整備、530（ゴミゼロ）運動など、様々な活動で参加者を募集しています。詳細は
        <Link
          href="/activities"
          className="mx-1 font-semibold text-wakakusa-dark underline"
        >
          活動内容
        </Link>
        および
        <Link
          href="/join"
          className="mx-1 font-semibold text-wakakusa-dark underline"
        >
          支援・参加する
        </Link>
        をご覧ください。
      </>
    ),
  },
  {
    question: "取材や講演の依頼は可能ですか？",
    answerForSchema:
      "可能です。お問い合わせフォームの種別から「取材・メディアについて」を選び、内容をお送りください。担当者より折り返しご連絡いたします。",
    body: (
      <>
        可能です。お問い合わせフォームの種別から「取材・メディアについて」を選び、内容をお送りください。担当者より折り返しご連絡いたします。
      </>
    ),
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${SITE_URL}/contact`,
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answerForSchema,
    },
  })),
} as const;

export function ContactFaqSection() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="border-t border-border bg-ivory-warm py-16 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2
            id="faq-heading"
            className="text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl"
          >
            よくある質問
          </h2>
          <p className="mt-3 text-center text-sm text-text-secondary">
            お問い合わせ前にご参照ください
          </p>
          <dl className="mt-10 space-y-6">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
              >
                <dt className="font-bold text-text-primary">{item.question}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
