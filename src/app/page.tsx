import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import HeroSlider from "@/components/HeroSlider";
import { ORGANIZATION_NAME } from "@/lib/site";

/** トップ：AI・検索向けに事実ベースの要約（キャッチコピーは H1 で人間向けに表示） */
export const metadata: Metadata = {
  title: `${ORGANIZATION_NAME} | 水と森の未来を守る`,
  description:
    "財団法人として設立したばかりであり、活動実績を積み公益財団法人の認定を目指しています。外資による水源買収やメガソーラー乱開発から日本の水と森を守るNGOです。水源地保全、里山再生、生態系復活、530運動、環境教育を行います。",
  openGraph: {
    title: `${ORGANIZATION_NAME} | 水と森の未来を守る`,
    description:
      "財団法人として公益認定を目指し、水源地保全・里山再生・生態系保全・530運動などに取り組む公式サイト。",
  },
};

export default function Home() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <HeroSlider />

      {/* ===== News Ticker ===== */}
      <section className="bg-wakakusa-light border-y border-wakakusa/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4 overflow-hidden">
          <span className="shrink-0 bg-wakakusa text-white text-xs font-semibold px-3 py-1 rounded-full">
            最新情報
          </span>
          <div className="flex gap-8 text-sm text-text-secondary overflow-x-auto whitespace-nowrap">
            <span>2026/4/23 香南市BENTEN稼働！</span>
            <span>2026/4/20 クラウドファンファンディング開始</span>
            <span>2026/4/18 衆楽園池そうじ実施</span>
          </div>
        </div>
      </section>

      {/* ===== Mission Statement ===== */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary font-serif">
            地球の未来を、共に守る。
          </h2>
          <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            私たちの自然環境を守り、持続可能な未来へ。
            日本の水源地や里山が、乱開発や外資の買収によって危機にさらされています。
            地球防衛群は、この問題に正面から向き合い、
            水と森を次世代に引き継ぐための活動を行っています。
          </p>
        </div>
      </section>

      {/* ===== Featured Projects ===== */}
      <section className="py-16 sm:py-24 bg-ivory-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center font-serif">
            私たちの活動
          </h2>
          <p className="mt-3 text-center text-text-muted">
            Featured Projects
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
                  里山オーガニック
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
                  自然体験プログラムを通じて、未来を担う人材を育てます。
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
            私たちが直面している危機
          </h2>
          <p className="mt-3 text-center text-text-muted">
            日本の水と森に迫る、2つの脅威
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Threat 1 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-coral/20">
              <div className="relative h-56">
                <Image
                  src="/images/photos/mega-solar.jpeg"
                  alt="山を覆うメガソーラー"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-xs font-semibold text-white bg-coral/90 px-3 py-1 rounded-full">
                    外からの脅威
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-text-primary">
                  乱開発と外資買収
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  メガソーラーの無秩序な建設や、外国資本による水源地の買収が、
                  日本の貴重な自然環境を脅かしています。
                  山の保水力が失われ、洪水や土砂崩れのリスクが高まっています。
                </p>
              </div>
            </div>

            {/* Threat 2 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-accent-gold/20">
              <div className="relative h-56">
                <Image
                  src="/images/photos/crisis-satoyama-bamboo.png"
                  alt="放置竹林と渓流、荒廃する里山の様子"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-xs font-semibold text-white bg-accent-gold/90 px-3 py-1 rounded-full">
                    内なる崩壊
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-bold text-text-primary">
                  里山の荒廃と放置林・放置竹林
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  耕作放棄地が野生動物の餌場となり、人里への出没が激増。
                  放置された人工林は「緑の砂漠」と化し、
                  水源涵養機能を失いつつあります。
                </p>
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
                森が深呼吸すると、私たちの水が美味しくなる。
                この当たり前の循環が、今まさに壊されようとしています。
                私たちは「不退転」の覚悟で、この問題に取り組みます。
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
          <p className="mt-4 text-text-secondary max-w-xl mx-auto leading-relaxed">
            一人ひとりの小さなアクションが、未来を大きく変えます。
            あなたの力を、水と森の未来に。
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
