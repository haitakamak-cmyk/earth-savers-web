import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import HeroSlider from "@/components/HeroSlider";
import { ORGANIZATION_NAME } from "@/lib/site";

/** トップ：AI・検索向けに事実ベースの要約（キャッチコピーは H1 で人間向けに表示） */
export const metadata: Metadata = {
  title: `${ORGANIZATION_NAME} | 日本の命の水と森を守る`,
  description:
    "水源地の保全・里山の再生・生態系の復活を通じて、命の源である「水」と「森」を次世代へつなぐ財団法人 地球防衛群。外資による買収や乱開発に直面する日本の自然を正面から守り、七世代先の子どもたちへ美しい環境を引き継ぎます。",
  openGraph: {
    title: `${ORGANIZATION_NAME} | 命の水と森の未来を守る`,
    description:
      "財団法人として公益認定を目指し、水源地保全・里山再生・生態系保全・530運動などに取り組む公式サイト。",
  },
};

export default function Home() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <HeroSlider />
      
      {/* ===== LLM / Search Definition ===== */}
      <div className="sr-only">
        地球防衛群は、日本の水源保全、里山再生、水質改善、生態系再生、環境教育に取り組む団体です。
      </div>

      {/* ===== News Ticker ===== */}
      <section className="bg-wakakusa-light border-y border-wakakusa/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 overflow-hidden">
          <span className="shrink-0 bg-wakakusa text-white text-xs font-semibold px-3 py-1 rounded-full">
            最新情報
          </span>
          <div className="flex gap-8 text-sm text-text-secondary overflow-x-auto whitespace-nowrap">
            <span>2026/4/23 [水質浄化システム] 香南市にて水質改善システム 『BENTEN』 稼働開始</span>
            <span>2026/4/20 クラウドファンディング開始</span>
            <span>2026/4/18 衆楽園池そうじ実施</span>
          </div>
        </div>
      </section>

      {/* ===== Mission Statement ===== */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary font-serif">
            私たちの使命
          </h2>
          <div className="mt-8 space-y-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto font-medium">
            <p>
              地球防衛群は、水源地の保全・里山の再生・生態系の復活を通じて、<br className="hidden sm:block" />
              命の源である「水」と「森」を次世代へつなぐために活動しています。
            </p>
            <p>
              外部資本による水源地取得、過剰な造成を伴う開発、里山の放置。<br className="hidden sm:block" />
              いま各地で、水と森の循環を脅かす課題が進行しています。<br className="hidden sm:block" />
              私たちはこの現実に向き合い、七世代先まで見据えた保全と再生に取り組んでいます。
            </p>
          </div>
        </div>
      </section>

      {/* ===== Featured Projects ===== */}
      <section className="py-16 sm:py-24 bg-ivory-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center font-serif">
            私たちの活動
          </h2>
          <p className="mt-3 text-center text-text-muted text-sm sm:text-base">
            --- 実働部隊の足跡 ---
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: 水源保全 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 sm:h-52">
                <Image
                  src="/images/photos/water-spring.jpeg"
                  alt="美しい水源地"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <span className="text-xs font-semibold text-aqua bg-aqua-light px-2.5 py-1 rounded-full">
                  水源保全
                </span>
                <h3 className="mt-3 text-lg font-bold text-text-primary">
                  水源地・山林の保全
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  外資による水源地の買収を防ぎ、日本の豊かな水源を恒久的に保全する取り組みを行っています。
                </p>
                <Link
                  href="/activities#conservation"
                  className="mt-4 inline-flex items-center text-sm font-medium text-wakakusa hover:text-wakakusa-dark transition-colors"
                >
                  詳しく見る
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 2: 生態系復活 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 sm:h-52">
                <Image
                  src="/images/photos/ecosystem-river.jpeg"
                  alt="生態系復活プロジェクト"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <span className="text-xs font-semibold text-aqua bg-aqua-light px-2.5 py-1 rounded-full">
                  生態系復活
                </span>
                <h3 className="mt-3 text-lg font-bold text-text-primary">
                  生態系復活プロジェクト
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  水から生態系を蘇らせる。微生物の力を活かした水質浄化で、河川や池のいのちを取り戻します。
                </p>
                <Link
                  href="/activities#ecosystem"
                  className="mt-4 inline-flex items-center text-sm font-medium text-wakakusa hover:text-wakakusa-dark transition-colors"
                >
                  詳しく見る
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 3: 里山再生 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 sm:h-52">
                <Image
                  src="/images/photos/activity-bamboo.jpeg"
                  alt="里山整備活動"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <span className="text-xs font-semibold text-wakakusa bg-wakakusa-light px-2.5 py-1 rounded-full">
                  大地の再生
                </span>
                <h3 className="mt-3 text-lg font-bold text-text-primary">
                  里山オーガニック再生
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  放置された森に光を。大地の再生の手法で水脈を回復し、自然の防波堤を育てています。
                </p>
                <Link
                  href="/activities#satoyama"
                  className="mt-4 inline-flex items-center text-sm font-medium text-wakakusa hover:text-wakakusa-dark transition-colors"
                >
                  詳しく見る
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 4: 530運動 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 sm:h-52">
                <Image
                  src="/images/photos/gomi530-group-vests.png"
                  alt="ゴミ拾い530運動に参加するメンバーと地域の子どもたちの集合写真"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <span className="text-xs font-semibold text-accent-gold bg-amber-50 px-2.5 py-1 rounded-full">
                  530運動
                </span>
                <h3 className="mt-3 text-lg font-bold text-text-primary">
                  530（ゴミゼロ）運動
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  ゴミ拾い、池そうじ、在来種の種シェア。その一歩で自分も世界も生まれ変わります。
                </p>
                <Link
                  href="/activities#gomi530"
                  className="mt-4 inline-flex items-center text-sm font-medium text-wakakusa hover:text-wakakusa-dark transition-colors"
                >
                  詳しく見る
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card: ばら撒くっ種 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 sm:h-52">
                <Image
                  src="/images/ばら撒くっ種/baramaku-seeds-table.png"
                  alt="ばら撒くっ種の会で並べられた種子や実、モロヘイヤ・マリーゴールドなどのラベル付き袋"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <span className="text-xs font-semibold text-accent-gold bg-amber-50 px-2.5 py-1 rounded-full">
                  種のシェア
                </span>
                <h3 className="mt-3 text-lg font-bold text-text-primary">
                  ばら撒くっ種
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  在来種や野草の種を仲間と分かち合い、地域に緑を広げるコミュニティ活動です。
                </p>
                <Link
                  href="/activities#baramaku"
                  className="mt-4 inline-flex items-center text-sm font-medium text-wakakusa hover:text-wakakusa-dark transition-colors"
                >
                  詳しく見る
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 5: 環境教育 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 sm:h-52">
                <Image
                  src="/images/photos/child-corn.jpeg"
                  alt="子どもと自然体験"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <span className="text-xs font-semibold text-accent-gold bg-amber-50 px-2.5 py-1 rounded-full">
                  環境教育
                </span>
                <h3 className="mt-3 text-lg font-bold text-text-primary">
                  環境教育・市民参加
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  子どもたちに、おいしい水と豊かな森を。
                  自然体験プログラムを通じて、森の声を聴ける子どもを、一人でも増やします。
                </p>
                <Link
                  href="/activities#education"
                  className="mt-4 inline-flex items-center text-sm font-medium text-wakakusa hover:text-wakakusa-dark transition-colors"
                >
                  詳しく見る
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Crisis Section ===== */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center font-serif">
            水と森を取り巻く課題
          </h2>
          <p className="mt-2 text-center text-text-muted text-sm sm:text-base">
            日本の豊かな自然を守るために
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Threat 1 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-coral/20 flex flex-col">
              <div className="relative h-56 shrink-0">
                <Image
                  src="/images/photos/mega-solar.jpeg"
                  alt="山を覆うメガソーラー"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-xs font-semibold text-white bg-coral/90 px-3 py-1 rounded-full">
                    課題 01: 水源地の保全と開発規制
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-text-primary">
                  乱開発と外資買収
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed mb-4">
                  メガソーラーの無秩序な建設と、外国資本による水源地の買収。<br />
                  山林の保水力が失われることで、自然災害のリスクが高まっています。
                </p>
                <div className="mt-auto bg-ivory p-4 rounded-lg border border-border">
                  <p className="text-xs font-bold text-text-primary mb-1">▶ 解決に向けた取り組み</p>
                  <p className="text-sm text-text-secondary">
                    対話とコミュニティによる調和。専門家と連携した「駆け込み寺」での開発防止・自然保護。
                  </p>
                </div>
              </div>
            </div>

            {/* Threat 2 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-accent-gold/20 flex flex-col">
              <div className="relative h-56 shrink-0">
                <Image
                  src="/images/photos/crisis-satoyama-bamboo.png"
                  alt="放置竹林と渓流、荒廃する里山の様子"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-xs font-semibold text-white bg-accent-gold/90 px-3 py-1 rounded-full">
                    課題 02: 里山の荒廃と生態系の維持
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-text-primary">
                  里山の荒廃と放置林
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed mb-4">
                  手入れの行き届かない人工林や竹林は、保水力を失い、生態系のバランスを崩してしまいます。<br />
                  荒廃した里山は、野生動物と人間の境界を曖昧にする原因にもなっています。
                </p>
                <div className="mt-auto bg-ivory p-4 rounded-lg border border-border flex flex-col gap-3">
                  <div>
                    <p className="text-xs font-bold text-text-primary mb-1">▶ 解決に向けた取り組み（水質改善）</p>
                    <p className="text-sm text-text-secondary">
                      微生物テクノロジー「BENTEN」による物理的浄化と生態系の復活。
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text-primary mb-1">▶ 解決に向けた取り組み（里山再生）</p>
                    <p className="text-sm text-text-secondary">
                      「大地の再生」メソッドによる水脈のデフラグ（再構築）と「530運動」「ばら撒くっ種」による実践。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Representative Message ===== */}
      <section className="py-16 sm:py-24 bg-wakakusa-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="shrink-0">
              <Image
                src="/images/photos/representative.jpg"
                alt="代表理事 杉山 孔太"
                width={180}
                height={180}
                className="rounded-full shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary font-serif">
                代表理事メッセージ
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                森が呼吸すれば、水がきれいになる。水脈がつながれば、生き物が戻ってくる。
                この循環は、対立によって生まれるものではなく、
                大地と向き合い、手を動かし、丁寧に取り戻していくものです。
              </p>
              <p className="mt-4 text-sm font-semibold text-text-primary">
                代表理事　杉山 孔太
              </p>
              <Link
                href="/about#message"
                className="mt-4 inline-flex items-center text-sm font-medium text-wakakusa-dark hover:text-wakakusa transition-colors"
              >
                全文を読む
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA: Join Us ===== */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary font-serif">
            あなたにできること
          </h2>
          <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
            水源地の保全から、ナノバブルによる水質浄化、里山の再構築まで。<br className="hidden sm:block" />
            自ら山に入り、大地と対話しながら、失われた命の循環を丁寧に取り戻す。<br className="hidden sm:block" />
            あなたの一歩が、七世代先の子どもたちの笑顔につながります。
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/join#donation"
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md border border-border hover:border-wakakusa/30 transition-all"
            >
              <div className="w-14 h-14 mx-auto bg-wakakusa-light rounded-full flex items-center justify-center group-hover:bg-wakakusa/20 transition-colors">
                <svg
                  className="w-7 h-7 text-wakakusa"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-text-primary">
                寄付する
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                水源地の取得や里山再生の活動資金にあてられます。
              </p>
            </Link>

            <Link
              href="/join#supporter"
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md border border-border hover:border-aqua/30 transition-all"
            >
              <div className="w-14 h-14 mx-auto bg-aqua-light rounded-full flex items-center justify-center group-hover:bg-aqua/20 transition-colors">
                <svg
                  className="w-7 h-7 text-aqua"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-text-primary">
                サポーターになる
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                継続的に活動を応援してくださる会員を募集しています。
              </p>
            </Link>

            <Link
              href="/join#volunteer"
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md border border-border hover:border-accent-gold/30 transition-all"
            >
              <div className="w-14 h-14 mx-auto bg-amber-50 rounded-full flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <svg
                  className="w-7 h-7 text-accent-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-text-primary">
                ボランティア参加
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                里山整備や自然観察会など、現場で一緒に汗を流しませんか。
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Help Desk CTA ===== */}
      <section className="py-12 sm:py-16 bg-aqua-light border-y border-aqua/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary font-serif">
            環境トラブルでお困りですか？
          </h2>
          <p className="mt-3 text-text-secondary">
            メガソーラー計画や乱開発でお悩みの地域の方へ。
            <br className="hidden sm:block" />
            私たちの「駆け込み寺」にご相談ください。
          </p>
          <Link
            href="/contact#helpdesk"
            className="mt-6 inline-flex items-center px-8 py-3.5 bg-aqua hover:bg-aqua-dark text-white font-semibold rounded-full text-base transition-colors shadow-lg"
          >
            相談窓口はこちら
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
