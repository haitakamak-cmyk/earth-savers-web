import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import {
  ORGANIZATION_NAME,
  SITE_ALLOW_SEARCH_INDEXING,
  SITE_URL,
} from "@/lib/site";

const PAGE_PATH = "/activities/ecosystem-restoration";
const PAGE_TITLE = "生態系復活プロジェクトの実績";
const PAGE_DESCRIPTION =
  "水質浄化装置 BENTEN B-369 を用いた全国19箇所の設置実績、岡山県新庄村での生物多様性調査、大阪湾・太田川源流での水質記録など、生態系復活プロジェクトの現場記録を公開しています。";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ${ORGANIZATION_NAME}`,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: ORGANIZATION_NAME,
    locale: "ja_JP",
    type: "article",
  },
  robots: SITE_ALLOW_SEARCH_INDEXING
    ? undefined
    : { index: false, follow: false },
};

const installations = [
  { prefecture: "岡山県", site: "新庄村 旭川源流 野土路川" },
  { prefecture: "大阪府", site: "泉大津市 大阪湾" },
  { prefecture: "奈良県", site: "吉野町 津風呂ダム" },
  { prefecture: "岡山県", site: "鏡野町 羽出" },
  { prefecture: "岡山県", site: "津山市 衆楽園池" },
  { prefecture: "広島県", site: "湯来町 太田川源流 大谷川" },
  { prefecture: "岡山県", site: "美作市 美作浄水場" },
  { prefecture: "岡山県", site: "美作市 余野浄水場" },
  { prefecture: "大阪府", site: "岸和田城堀" },
  { prefecture: "兵庫県", site: "市川町 市川源流 岡部川" },
  { prefecture: "高知県", site: "須崎市 浦ノ内湾" },
  { prefecture: "大分県", site: "三隈川（筑後川源流）" },
  { prefecture: "滋賀県", site: "近江八幡市 琵琶湖" },
  { prefecture: "岡山県", site: "玉野市 胸上魚港" },
  { prefecture: "長野県", site: "岡谷市 諏訪湖" },
  { prefecture: "兵庫県", site: "南あわじ市 阿那賀（鳴門）" },
  { prefecture: "静岡県", site: "富士宮市 芝川源流" },
  { prefecture: "長野県", site: "安曇野市 信濃川源流 万水川" },
  { prefecture: "高知県", site: "香宗川水系 清水川排水機場" },
] as const;

const videos = [
  {
    title: "大阪湾岸の記録映像 1",
    description: "設置から約1年半後（2023年）に撮影した大阪湾岸の水中記録です。",
    src: "/videos/ecosystem-brief/osaka-bay-01.mp4",
    poster: "/images/ecosystem-brief/osaka-bay-01-poster.webp",
  },
  {
    title: "大阪湾岸の記録映像 2",
    description: "設置から約1年半後（2023年）に撮影した大阪湾岸の水中記録です。",
    src: "/videos/ecosystem-brief/osaka-bay-02.mp4",
    poster: "/images/ecosystem-brief/osaka-bay-02-poster.webp",
  },
  {
    title: "大阪湾岸の記録映像 3",
    description: "設置から約1年半後（2023年）に撮影した大阪湾岸の水中記録です。",
    src: "/videos/ecosystem-brief/osaka-bay-03.mp4",
    poster: "/images/ecosystem-brief/osaka-bay-03-poster.webp",
  },
  {
    title: "大阪湾岸の記録映像 4",
    description: "設置から約1年半後（2023年）に撮影した大阪湾岸の水中記録です。",
    src: "/videos/ecosystem-brief/osaka-bay-04.mp4",
    poster: "/images/ecosystem-brief/osaka-bay-04-poster.webp",
  },
  {
    title: "大阪湾岸の記録映像 5",
    description: "設置から約1年半後（2023年）に撮影した大阪湾岸の水中記録です。",
    src: "/videos/ecosystem-brief/osaka-bay-05.mp4",
    poster: "/images/ecosystem-brief/osaka-bay-05-poster.webp",
  },
  {
    title: "琵琶湖の記録映像 1",
    description: "設置から約3ヶ月後に撮影した琵琶湖の水中記録です。",
    src: "/videos/ecosystem-brief/lake-biwa-01.mp4",
    poster: "/images/ecosystem-brief/lake-biwa-01-poster.webp",
  },
  {
    title: "琵琶湖の記録映像 2",
    description: "設置から約3ヶ月後に撮影した琵琶湖の水中記録です。",
    src: "/videos/ecosystem-brief/lake-biwa-02.mp4",
    poster: "/images/ecosystem-brief/lake-biwa-02-poster.webp",
  },
] as const;

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-3 text-sm font-bold tracking-[0.16em] text-aqua-dark">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Photo({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-ivory-warm shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={1050}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

export default function EcosystemRestorationPublicPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-text-primary text-ivory">
        <Image
          src="/images/ecosystem-brief/hero.webp"
          alt="空と水面が広がる風景"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(20,38,27,0.95),rgba(20,58,58,0.72),rgba(20,38,27,0.38))]" />
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
          <p className="mb-5 text-sm font-bold tracking-[0.16em] text-wakakusa-light">
            EARTH SAVERS PROJECT
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.22] sm:text-5xl lg:text-6xl">
            水から、生態系を蘇らせる。
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-ivory-warm sm:text-lg">
            地球防衛群の生態系復活プロジェクトは、水環境を守り、生態系の再生を目指す取り組みです。全国の現場での設置実績と観測記録を公開しています。
          </p>
        </div>
      </section>

      <article className="overflow-hidden bg-ivory">
        <section className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
          <SectionHeading eyebrow="ABOUT" title="生態系復活プロジェクトとは">
            <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary sm:text-lg">
              水は、川を流れる過程で微生物の働きにより浄化され、海へと循環します。本プロジェクトでは、その水循環と微生物の働きに着目し、水中の環境を整えることで、生きものが暮らせる水辺を目指しています。
            </p>
          </SectionHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="border-t-2 border-aqua bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-aqua-dark">水循環</p>
              <p className="mt-3 leading-7 text-text-secondary">
                海から蒸発した水は、雲・山・雨・川を経て、再び海へ戻ります。
              </p>
            </div>
            <div className="border-t-2 border-wakakusa bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-wakakusa-dark">微生物</p>
              <p className="mt-3 leading-7 text-text-secondary">
                有機物を分解し、栄養の循環を支える生態系の基盤です。
              </p>
            </div>
            <div className="border-t-2 border-accent-gold bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-text-primary">溶存酸素（DO）</p>
              <p className="mt-3 leading-7 text-text-secondary">
                水に溶け込んだ酸素の量を示す、水環境を見るための指標の一つです。
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-18 sm:px-8 sm:pb-24 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <SectionHeading eyebrow="BENTEN B-369" title="水質浄化装置 BENTEN B-369">
              <p className="mt-6 text-base leading-8 text-text-secondary">
                BENTEN B-369は、滝の原理を応用してナノバブルを水中に供給する水質浄化装置です。水中に酸素を効率よく供給することで、微生物が有機物を分解できる環境づくりを目指しています。
              </p>
            </SectionHeading>
            <Photo src="/images/ecosystem-brief/benten-b369.webp" alt="水質浄化装置 BENTEN B-369の本体" />
          </div>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-wakakusa/35 bg-wakakusa/35 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-wakakusa-light/70 p-6">
              <dt className="text-sm font-bold text-text-secondary">月間処理能力</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold text-wakakusa-dark">約30,000t</dd>
              <p className="mt-1 text-xs text-text-muted">B-369 1台あたり</p>
            </div>
            <div className="bg-wakakusa-light/70 p-6">
              <dt className="text-sm font-bold text-text-secondary">バブル量</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold text-wakakusa-dark">19億個/cc</dd>
            </div>
            <div className="bg-wakakusa-light/70 p-6">
              <dt className="text-sm font-bold text-text-secondary">吐出量</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold text-wakakusa-dark">40L/min</dd>
            </div>
            <div className="bg-wakakusa-light/70 p-6">
              <dt className="text-sm font-bold text-text-secondary">電源</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold text-wakakusa-dark">100V</dd>
            </div>
            <div className="bg-wakakusa-light/70 p-6">
              <dt className="text-sm font-bold text-text-secondary">必要スペース</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold text-wakakusa-dark">3m × 3m</dd>
            </div>
            <div className="bg-wakakusa-light/70 p-6">
              <dt className="text-sm font-bold text-text-secondary">使用環境</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold text-wakakusa-dark">5〜40°C</dd>
            </div>
          </dl>
        </section>

        <section className="bg-text-primary text-ivory-warm">
          <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
            <SectionHeading eyebrow="DEPLOYMENTS" title="全国19箇所の設置実績">
              <p className="mt-6 max-w-3xl text-base leading-8 text-ivory-warm/85">
                河川・湖沼・海域・ダムなど、全国19箇所にBENTEN B-369を設置しています（2026年時点・全拠点稼働中）。
              </p>
            </SectionHeading>
            <div className="mt-10 flex items-baseline gap-4 border-b border-ivory-warm/25 pb-8">
              <p className="font-serif text-6xl font-semibold text-wakakusa-light">19</p>
              <p className="text-base font-bold tracking-[0.12em] text-ivory-warm">設置拠点</p>
            </div>
            <figure className="mx-auto mt-10 max-w-xl">
              <Image
                src="/images/ecosystem-brief/deployment-map.webp"
                alt="全国19箇所の設置実績を示す日本地図。設置都道府県が青色で示されている"
                width={900}
                height={900}
                sizes="(max-width: 640px) 100vw, 576px"
                className="h-auto w-full"
              />
              <figcaption className="mt-4 text-center text-sm leading-6 text-ivory-warm/80">
                全国展開マップ。設置都道府県を青色で示しています。
              </figcaption>
            </figure>
            <ol className="mt-8 grid overflow-hidden rounded-2xl border border-text-secondary/50 sm:grid-cols-2">
              {installations.map((installation, index) => (
                <li
                  key={`${installation.prefecture}-${installation.site}`}
                  className="flex gap-4 border-b border-text-secondary/50 p-5 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0"
                >
                  <span className="font-serif text-2xl font-semibold text-wakakusa-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-base leading-7 text-ivory-warm">
                    <span className="mr-2 font-bold text-ivory">{installation.prefecture}</span>
                    {installation.site}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
          <SectionHeading eyebrow="CASE 01" title="岡山県新庄村：生きものの多様性を調べる">
            <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary">
              設置河川の野土路川では、底生動物の種数を継続して調査しています。下流地点で確認された種数は、令和2年度の30種から令和5年度には66種に増加しました。定期調査（年3回）は、公益財団法人岡山県環境保全事業団が実施しています。
            </p>
          </SectionHeading>
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div className="rounded-2xl bg-aqua-light p-7">
              <p className="text-sm font-bold text-aqua-dark">確認種数</p>
              <p className="mt-2 font-serif text-6xl font-semibold tracking-tight text-text-primary">30 → 66</p>
              <p className="mt-2 text-sm leading-6 text-text-secondary">野土路川下流、令和2年度から令和5年度</p>
              <p className="mt-5 border-t border-aqua/30 pt-5 text-sm leading-6 text-text-secondary">
                調査地点により、最大2.2倍の種数増加が確認されています。
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Photo src="/images/ecosystem-brief/survey-fish.webp" alt="調査時に観察された川魚" />
              <Photo src="/images/ecosystem-brief/survey-frog.webp" alt="調査時に観察された緑色のカエル" />
            </div>
          </div>
        </section>

        <section className="bg-ivory-warm">
          <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
            <SectionHeading eyebrow="CASE 02" title="水質の変化を、現地で確認する">
              <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary">
                大阪府泉大津市の大阪湾岸では、2021年11月24日に約0.9mだった透視度が、2023年3月9日には4m以上となりました。広島県湯来町の太田川源流でも、設置から約1年7ヶ月後の変化を写真で記録しています。
              </p>
            </SectionHeading>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <figure>
                <div className="grid grid-cols-2 gap-3">
                  <Photo src="/images/ecosystem-brief/osaka-before.webp" alt="大阪湾岸で透視度を測定する2021年11月の記録写真" />
                  <Photo src="/images/ecosystem-brief/osaka-after.webp" alt="大阪湾岸で透視度を測定する2023年3月の記録写真" />
                </div>
                <figcaption className="mt-4 text-sm leading-6 text-text-secondary">
                  <span className="font-bold text-text-primary">大阪府泉大津市・大阪湾岸</span>
                  <br />
                  透視度 約0.9m（2021年11月24日）から4m以上（2023年3月9日）
                </figcaption>
              </figure>
              <figure>
                <div className="grid grid-cols-2 gap-3">
                  <Photo src="/images/ecosystem-brief/otagawa-before.webp" alt="広島県湯来町の太田川源流における2022年8月の記録写真" />
                  <Photo src="/images/ecosystem-brief/otagawa-after.webp" alt="広島県湯来町の太田川源流における2024年3月の記録写真" />
                </div>
                <figcaption className="mt-4 text-sm leading-6 text-text-secondary">
                  <span className="font-bold text-text-primary">広島県湯来町・太田川源流</span>
                  <br />
                  2022年8月から約1年7ヶ月後の2024年3月までの記録
                </figcaption>
              </figure>
            </div>

            <p className="mt-10 max-w-3xl text-sm leading-7 text-text-muted">
              ※ 本ページに掲載している種数・透視度などの数値は、各地点での観測記録です。水辺の環境は気象・流入水・季節など複数の要因の影響を受けるため、変化のすべてが装置の効果によるものであることを保証するものではありません。当財団は、継続的な観測と第三者機関による調査を通じて、記録を積み重ねていきます。
            </p>
          </div>
        </section>

        <section className="bg-aqua-light/45">
          <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
            <SectionHeading eyebrow="FIELD VIDEOS" title="現地の記録映像">
              <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary">
                現地で撮影した水中の記録映像です。再生ボタンを押すと動画の読み込みを開始します。
              </p>
            </SectionHeading>
            <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {videos.map((video) => (
                <figure key={video.src} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={video.poster}
                    className="aspect-video w-full bg-text-primary object-cover"
                    aria-label={video.title}
                  >
                    <source src={video.src} type="video/mp4" />
                    お使いのブラウザは動画の再生に対応していません。
                  </video>
                  <figcaption className="p-5">
                    <h3 className="font-serif text-xl font-semibold text-text-primary">{video.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{video.description}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24 lg:px-10">
          <SectionHeading eyebrow="MEDIA & EVENTS" title="社会的評価と発信">
            <p className="mt-6 max-w-3xl text-base leading-8 text-text-secondary">
              本プロジェクトの取り組みは、メディアやイベントでも紹介されています。
            </p>
          </SectionHeading>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="border-t-2 border-aqua bg-white p-7 shadow-sm">
              <Image
                src="/images/media/newspaper-sanyo-shimbun.jpg"
                alt="山陽新聞「水の日」特集に掲載された、旭川水系の資源保護に関する記事"
                width={3602}
                height={1874}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="mb-6 h-auto w-full rounded-lg"
              />
              <p className="text-sm font-bold tracking-[0.12em] text-aqua-dark">MEDIA</p>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-text-primary">山陽新聞「水の日」特集掲載</h3>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                山陽新聞の「水の日」特集において、本プロジェクトの取り組みと水質浄化の記録が紹介されました。
              </p>
            </article>
            <article className="border-t-2 border-wakakusa bg-white p-7 shadow-sm">
              <Image
                src="/images/media/expo-stage-2.jpg"
                alt="大阪・関西万博の関連イベントで水質改善プロジェクトを紹介する登壇の様子"
                width={1272}
                height={702}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="mb-6 h-auto w-full rounded-lg"
              />
              <p className="text-sm font-bold tracking-[0.12em] text-wakakusa-dark">EVENT</p>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-text-primary">大阪・関西万博の関連イベントで登壇</h3>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                日本の環境技術に関する取り組みとして、大阪・関西万博の関連イベントに登壇しました。
              </p>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-18 sm:px-8 sm:pb-24 lg:px-10">
          <div className="rounded-3xl bg-aqua-light px-7 py-10 sm:px-12 sm:py-14">
            <SectionHeading eyebrow="CONTACT" title="現場の水辺を、一緒に見に来ませんか">
              <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary">
                設置のご相談・視察のご希望・取材のお申し込みは、地球防衛群の窓口へお寄せください。地域の水辺に関するご相談は環境相談もご利用いただけます。
              </p>
            </SectionHeading>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-wakakusa px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-wakakusa-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wakakusa-dark focus-visible:ring-offset-2"
              >
                お問い合わせはこちら
              </Link>
              <Link
                href="/consultation"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-wakakusa/40 bg-white px-6 py-3 text-sm font-bold text-wakakusa-dark transition-colors hover:bg-ivory"
              >
                環境相談について
              </Link>
              <Link
                href="/activities"
                className="inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-aqua-dark underline underline-offset-2"
              >
                ← 活動内容一覧へ戻る
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
