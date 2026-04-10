import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

const BOOK_STORE_URL = "https://back-nature-store.com/products/book1";

export const metadata: Metadata = {
  title: "メディア・実績",
  description:
    "環境教育の一環としての出版物のご紹介と、新聞・メディア掲載の実績です。財団法人 地球防衛群（Earth Savers）。",
};

/** `public/images/media/` に同名ファイルを置くと表示されます（jpg / png / webp など）。 */
const NEWSPAPER_ITEMS = [
  {
    title: "山陽新聞（岡山）",
    body: "水の日特集に、水質浄化機器の設置や岡山県新庄村との取り組みなどが掲載されました。",
    imageFile: "newspaper-sanyo-shimbun.jpg",
    imageAlt:
      "山陽新聞の紙面。水の日特集で水質浄化や新庄村との取り組みが紹介されている様子。",
  },
  {
    title: "津山朝日新聞",
    body: "活動内容が紙面で紹介されました。クリップや掲載日の確認はお問い合わせください。",
    imageFile: "newspaper-tsuyama-asahi.jpg",
    imageAlt: "津山朝日新聞の紙面で地球防衛群の活動が紹介されている様子。",
  },
  {
    title: "諏訪（長野県岡谷市周辺）の新聞",
    body: "諏訪湖周辺の取り組みなどを扱った紙面です。紙面名・掲載日の詳細はお問い合わせください。",
    imageFile: "newspaper-suwa.jpg",
    imageAlt: "諏訪・岡谷周辺の取り組みが掲載された新聞の紙面。",
  },
] as const;

const EXPO_HIGHLIGHT = {
  title: "大阪・関西万博での登壇",
  body: "万博会場での登壇の様子です。地元新聞などでも紹介されました（プロジェクト実績資料に記載）。",
  imageFile: "expo-stage.jpg",
  imageAlt: "大阪・関西万博の会場で登壇している様子。",
} as const;

const MEDIA_DIR = path.join(process.cwd(), "public", "images", "media");

/** 指定名、または同じベース名の jpg / jpeg / png / webp を探す */
function resolveMediaFile(file: string): string | null {
  const direct = path.join(MEDIA_DIR, file);
  if (fs.existsSync(direct)) return file;
  const stem = file.replace(/\.[^/.]+$/, "");
  for (const ext of [".jpg", ".jpeg", ".png", ".webp"] as const) {
    const name = `${stem}${ext}`;
    if (fs.existsSync(path.join(MEDIA_DIR, name))) return name;
  }
  return null;
}

function mediaImagePath(file: string) {
  const resolved = resolveMediaFile(file);
  return `/images/media/${resolved ?? file}`;
}

function mediaImageExists(file: string): boolean {
  return resolveMediaFile(file) !== null;
}

function MediaPhoto({
  file,
  alt,
  priority,
  layout = "card",
}: {
  file: string;
  alt: string;
  priority?: boolean;
  /** 新聞カードは 4:3、万博など横長は wide */
  layout?: "card" | "wide";
}) {
  const ok = mediaImageExists(file);
  const src = mediaImagePath(file);
  const frame =
    layout === "wide"
      ? "aspect-video w-full min-h-[200px] sm:min-h-[280px]"
      : "aspect-[4/3] w-full";

  if (!ok) {
    return (
      <div
        className={`flex ${frame} flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-ivory px-4 text-center`}
      >
        <span className="text-sm font-medium text-text-secondary">
          {layout === "wide" ? "登壇の写真は準備中です" : "写真は準備中です"}
        </span>
        <span className="text-xs leading-relaxed text-text-muted">
          {layout === "wide"
            ? "会場での登壇写真をご用意いただければ、こちらに掲載いたします。"
            : "紙面写真を事務局でお持ちの場合は、Web 用データのご提供をお願いする場合がございます。"}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${frame} overflow-hidden rounded-xl bg-ivory`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={
          layout === "wide"
            ? "object-cover object-center"
            : "object-cover object-top"
        }
        sizes={
          layout === "wide"
            ? "(max-width: 768px) 100vw, 48rem"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
        }
        priority={priority}
      />
    </div>
  );
}

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
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary">
            新聞・メディア掲載の実績
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
            水質浄化・生態系復活プロジェクトなどの活動が、新聞で取り上げられた事例です（社内実績資料より整理）。
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NEWSPAPER_ITEMS.map((item, i) => (
              <li
                key={item.title}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
              >
                <div className="p-4 pb-0">
                  <MediaPhoto
                    file={item.imageFile}
                    alt={item.imageAlt}
                    priority={i === 0}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 pt-4">
                  <h3 className="font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <h2 className="text-center font-serif text-2xl font-bold text-text-primary">
              大阪・関西万博
            </h2>
            <p className="mt-2 text-center text-sm text-text-secondary">
              登壇の様子
            </p>
            <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
              <div className="p-4 sm:p-6 sm:pb-4">
                <MediaPhoto
                  file={EXPO_HIGHLIGHT.imageFile}
                  alt={EXPO_HIGHLIGHT.imageAlt}
                  layout="wide"
                />
              </div>
              <div className="border-t border-border px-5 pb-6 pt-2 sm:px-8 sm:pb-8">
                <h3 className="font-semibold text-text-primary">{EXPO_HIGHLIGHT.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {EXPO_HIGHLIGHT.body}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-text-muted">
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
