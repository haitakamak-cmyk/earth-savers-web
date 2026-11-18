import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ORGANIZATION_NAME } from "@/lib/site";

/**
 * LINE オープンチャット「地球防衛群 OC」の案内ページ。
 *
 * Instagram のプロフィールリンクに line.me の URL を登録できないため、
 * 財団ドメインの案内ページを経由させる。招待リンクを作り直したときは
 * OPENCHAT_URL と public/images/line/openchat-qr.png を差し替える。
 */
const OPENCHAT_URL = "https://line.me/ti/g2/tIdOJdvIgxfwr-eLWBfc_okT1x1oorJVP9JdFA";

export const metadata: Metadata = {
  title: "LINEオープンチャット",
  description: `${ORGANIZATION_NAME}のLINEオープンチャット「地球防衛群 OC」の参加案内。ボランティア募集、イベントのお知らせ、商品のご案内をお届けします。`,
  alternates: { canonical: "/line" },
};

export default function LineOpenChatPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-wakakusa-light py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-serif text-2xl font-bold text-text-primary sm:text-4xl">
            LINEオープンチャット
          </h1>
          <p className="mt-3 text-text-secondary">地球防衛群 OC</p>
        </div>
      </section>

      <section className="bg-ivory py-12 sm:py-20">
        {/* 対応ブラウザでは日本語を文節単位で折り返す（非対応では通常の折り返し） */}
        <div className="mx-auto max-w-2xl space-y-8 px-4 [word-break:auto-phrase] sm:px-6">
          {/* 参加 */}
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm sm:p-10">
            <div className="space-y-2 text-base leading-relaxed text-balance text-text-secondary">
              <p>ボランティアの募集やイベントのお知らせ、商品のご案内をお届けします。</p>
              <p>オープンチャットでは、ニックネームを設定して参加できます。</p>
            </div>

            <a
              href={OPENCHAT_URL}
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-wakakusa-dark px-10 py-3 text-lg font-bold text-white shadow-sm transition-colors hover:bg-wakakusa-deep"
            >
              LINEで参加する
            </a>

            <div className="mt-10 border-t border-border pt-8">
              <p className="text-sm text-text-muted">
                パソコンでご覧の方は、スマートフォンのLINEで読み取ってください。
              </p>
              <Image
                src="/images/line/openchat-qr.png"
                alt="LINEオープンチャット「地球防衛群 OC」の参加用QRコード"
                width={900}
                height={900}
                className="mx-auto mt-4 h-auto w-48 sm:w-56"
              />
            </div>
          </div>

          {/* 使い方 */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-text-primary">参加される方へ</h2>
            <ul className="mt-4 space-y-4 text-sm leading-relaxed text-text-secondary">
              <li>
                <span className="font-semibold text-text-primary">
                  メインのトークは、事務局からのお知らせ専用です。
                </span>
                <br />
                お知らせが流れてしまうのを防ぐため、投稿はお控えください。
              </li>
              <li>
                <span className="font-semibold text-text-primary">
                  ご感想・自己紹介・おしゃべりは「書き込み用」のトークへ。
                </span>
                <br />
                トーク画面右上の［≡］→［トーク一覧］から参加できます。
              </li>
              <li>
                <span className="font-semibold text-text-primary">
                  ご質問はお問い合わせフォームから。
                </span>
                <br />
                オープンチャットではご質問を受け付けておりません。
                <Link
                  href="/contact"
                  className="mx-1 font-semibold whitespace-nowrap text-wakakusa-dark underline underline-offset-2 hover:text-wakakusa-deep"
                >
                  お問い合わせ
                </Link>
                からお送りください。事務局から個別にお返事いたします。
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
