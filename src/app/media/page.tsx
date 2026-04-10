import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const BOOK_STORE_URL = "https://back-nature-store.com/products/book1";

export const metadata: Metadata = {
  title: "メディア・実績",
  description:
    "環境教育の一環としての出版物のご紹介と、新聞・メディア掲載の実績です。財団法人 地球防衛群（Earth Savers）。",
};

/** 生態系復活プロジェクト実績 PDF（テキスト抽出）に基づく掲載例。詳細は事務局へ。 */
const mediaHighlights = [
  {
    title: "山陽新聞（岡山）",
    body: "水の日特集に、水質浄化機器の設置や岡山県新庄村との取り組みなどが掲載されました。",
  },
  {
    title: "大阪・関西万博での登壇",
    body: "登壇の様子が地元新聞で紹介されました（プロジェクト実績資料に記載）。",
  },
  {
    title: "その他の新聞掲載",
    body: "実績資料には、諏訪湖（長野県岡谷市）周辺の取り組みなどを扱った「新聞掲載」スライドが含まれています。紙面名・掲載日の詳細はお問い合わせください。",
  },
];

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

export default function MediaPage() {
  return (
    <>
      <section className="bg-wakakusa-light py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            メディア・実績
          </h1>
          <p className="mt-3 text-text-secondary">Media &amp; milestones</p>
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary">
            環境教育の本
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
            環境教育の一環として、親子でも読みやすい本の出版にも取り組んでいます。身近な生活と地球のことをつなぐ入門書です。
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="relative aspect-[1200/630] w-full bg-ivory-warm sm:aspect-[16/10]">
              <Image
                src="/images/media/book-minna-dekiru-chikyu-osoji.png"
                alt="みんなでできる地球のおそうじ 〜わたしから始める環境革命〜 の紹介ビジュアル。著・小野誠（環境コンサルタント）"
                fill
                className="object-contain object-center p-4 sm:p-6"
                sizes="(max-width: 768px) 100vw, 42rem"
                priority
              />
            </div>
            <div className="border-t border-border p-6 sm:p-8">
              <p className="text-lg font-bold text-text-primary">
                『みんなでできる地球のおそうじ 〜わたしから始める環境革命〜』
              </p>
              <p className="mt-1 text-sm text-text-muted">著：小野 誠（環境コンサルタント）</p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                環境問題をわかりやすく解説し、子どもたちの未来のために「いまできること」に目を向けられる一冊です。親子で読み進めやすい構成になっています。
              </p>
              <a
                href={BOOK_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-wakakusa px-8 py-3.5 font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                Back Nature Store で見る
                <ExternalLinkIcon className="h-4 w-4 shrink-0" />
              </a>
              <p className="mt-3 text-xs text-text-muted">
                外部サイト（back-nature-store.com）へ移動します
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory-warm py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary">
            新聞・メディア掲載の実績
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
            水質浄化・生態系復活プロジェクトなどの活動が、新聞で取り上げられた事例の一部です（社内実績資料より整理）。
          </p>
          <ul className="mt-10 space-y-6">
            {mediaHighlights.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <h3 className="font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-xs text-text-muted">
            クリップのコピーや掲載日の確認は{" "}
            <Link href="/contact" className="text-wakakusa underline hover:text-wakakusa-dark">
              お問い合わせ
            </Link>
            からどうぞ。
          </p>
        </div>
      </section>
    </>
  );
}
