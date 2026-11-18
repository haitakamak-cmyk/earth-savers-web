import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ORGANIZATION_NAME } from "@/lib/site";

/**
 * LINE オープンチャット「地球防衛群 OC」の案内ページ。
 *
 * Instagram のプロフィールリンクに line.me の URL を登録できないため、
 * 財団ドメインの案内ページを経由させる。招待リンクを作り直したときは
 * 下の URL と public/images/line/openchat-qr.png（お知らせ用）を差し替える。
 */
const OPENCHAT_URL = "https://line.me/ti/g2/tIdOJdvIgxfwr-eLWBfc_okT1x1oorJVP9JdFA";
const OPENCHAT_WRITING_ROOM_URL = "https://line.me/ti/g2/PEuACg2tPOW6kaZFy1Yl_MGE8KTNZ1lj8bZsLw";

export const metadata: Metadata = {
  title: "LINEオープンチャット",
  description: `${ORGANIZATION_NAME}のLINEオープンチャット「地球防衛群 OC」の参加案内。読むだけの「お知らせ用」と、自由に書き込める「書き込み用」のトークがあります。`,
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
          <div className="space-y-2 text-center text-base leading-relaxed text-balance text-text-secondary">
            <p>ボランティアの募集やイベントのお知らせ、商品のご案内をお届けします。</p>
            <p>トークは2つに分かれています。どちらもニックネームを設定して参加できます。</p>
          </div>

          {/* お知らせ用 */}
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm sm:p-10">
            <p className="text-sm font-semibold text-wakakusa-dark">読むだけでOK</p>
            <h2 className="mt-1 text-xl font-bold text-text-primary">お知らせ用</h2>
            <p className="mt-4 text-sm leading-relaxed text-balance text-text-secondary">
              事務局からのお知らせが届きます。お知らせが流れてしまうのを防ぐため、投稿はお控えください。
            </p>

            <a
              href={OPENCHAT_URL}
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-wakakusa-dark px-6 py-3 text-base font-bold whitespace-nowrap text-white shadow-sm transition-colors hover:bg-wakakusa-deep sm:px-10 sm:text-lg"
            >
              お知らせ用に参加する
            </a>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm text-text-muted">
                パソコンでご覧の方は、スマートフォンのLINEで読み取ってください。
              </p>
              <Image
                src="/images/line/openchat-qr.png"
                alt="LINEオープンチャット「地球防衛群 OC」お知らせ用の参加用QRコード"
                width={900}
                height={900}
                className="mx-auto mt-4 h-auto w-48 sm:w-56"
              />
            </div>
          </div>

          {/* 書き込み用 */}
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm sm:p-10">
            <p className="text-sm font-semibold text-wakakusa-dark">自由に書き込めます</p>
            <h2 className="mt-1 text-xl font-bold text-text-primary">書き込み用</h2>
            <p className="mt-4 text-sm leading-relaxed text-balance text-text-secondary">
              ご感想や自己紹介、活動の思い出など、ご自由にお書きください。
            </p>

            <a
              href={OPENCHAT_WRITING_ROOM_URL}
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-wakakusa-dark bg-white px-6 py-3 text-base font-bold whitespace-nowrap text-wakakusa-dark transition-colors hover:border-wakakusa-deep hover:text-wakakusa-deep sm:px-10 sm:text-lg"
            >
              書き込み用に参加する
            </a>

            <p className="mt-6 text-sm leading-relaxed text-balance text-text-muted">
              お知らせ用に参加済みの方は、トーク画面右上の［≡］→［トーク一覧］からも参加できます。
            </p>
          </div>

          {/* ご質問 */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-text-primary">ご質問について</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              オープンチャットではご質問を受け付けておりません。
              <Link
                href="/contact"
                className="mx-1 font-semibold whitespace-nowrap text-wakakusa-dark underline underline-offset-2 hover:text-wakakusa-deep"
              >
                お問い合わせ
              </Link>
              からお送りください。事務局から個別にお返事いたします。
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
