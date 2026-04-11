import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import {
  ORGANIZATION_ADDRESS_LINE,
  ORGANIZATION_FOUNDED_LABEL,
  ORGANIZATION_NAME,
  ORGANIZATION_POSTAL_CODE,
  ORGANIZATION_REPRESENTATIVE_NAME,
  ORGANIZATION_REPRESENTATIVE_TITLE,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "理念・運営体制",
  description:
    "一般財団法人 地球防衛群の法人概要、設立趣旨、マニフェスト、クレド（行動信条）、運営体制をご紹介します。日本の水源地と山林を次世代へ引き継ぐ、私たちの揺るぎない決意をまとめています。",
};

const credoItems = [
  {
    icon: "01",
    title: "公益性第一",
    description: "すべての活動は、地域と地球の公益のために行います。",
  },
  {
    icon: "02",
    title: "透明性",
    description:
      "活動の姿勢や判断の根拠を分かりやすく示し、支援者・地域の方・関係機関との対話を大切にします。",
  },
  {
    icon: "03",
    title: "連帯",
    description: "地域住民、自治体、専門家と手を取り合い、共に前へ進みます。",
  },
  {
    icon: "04",
    title: "継承",
    description: "先人の知恵と自然の恵みを、次の世代へ引き継ぎます。",
  },
  {
    icon: "05",
    title: "揺るぎない決意",
    description: "どんな困難にも向き合い、環境を守る使命を誠実に全うします。",
  },
  {
    icon: "06",
    title: "次世代への責任",
    description: "七世代先の子どもたちに恥じない選択をし続けます。",
  },
];

const faqItems = [
  {
    q: "一般財団法人 地球防衛群とはどのような団体ですか？",
    a: "日本の水源保全、里山再生、水質改善、生態系再生、環境教育に取り組む団体です。自然環境の保全と、次世代へ豊かな大地を引き継ぐことを目的としています。",
  },
  {
    q: "どのような法人格ですか？",
    a: "現在は一般財団法人として活動しており、将来的に公益認定（公益財団法人）を目指しています。透明性の高い運営と、公益に資する活動を継続してまいります。",
  },
  {
    q: "ナノバブル発生器 『B-369』とは何ですか？",
    a: "独自開発のナノバブル発生器『B-369』を活用した、水環境改善システムです。池や河川の低酸素状態を解消し、本来の生態系が戻りやすい環境を整えます。",
  },
  {
    q: "どの地域で活動していますか？",
    a: "本拠地である岡山県をはじめ、西日本を中心に、水源地や里山、河川で活動・導入実績があります。お困りの地域があれば全国どこでもご相談を受け付けています。",
  },
  {
    q: "寄付金は何に使われますか？",
    a: "水源地や山林の取得・管理費用、B-369の導入・メンテナンス、法律等専門家への相談、地域の清掃活動（530運動）、環境教育プログラムの運営などに充てられます。",
  },
  {
    q: "寄付控除の対象ですか？",
    a: "現在は一般財団法人のため、税制上の寄付金控除の対象外となります。控除の対象となるように公益化を目指しています。",
  },
  {
    q: "ボランティアは誰でも参加できますか？",
    a: "はい。ゴミ拾いや池そうじ、植栽活動などは、お子様から大人までどなたでもご参加いただけます。活動スケジュールはニュース欄やSNSをご確認ください。",
  },
  {
    q: "メガソーラー問題にはどう関わっていますか？",
    a: "山林の乱開発や不適切な造成によるリスクを調査し、住民や自治体への情報提供、専門家の紹介、必要に応じた法的アドバイスなど、今後「駆け込み寺」としての支援が行えるように準備を進めています。",
  },
  {
    q: "水源地保全とは具体的に何をする活動ですか？",
    a: "外資などによる買収リスクのある土地を財団が取得して守るほか、放置された山林の草刈りや間伐、水脈の整備を行い、豊かな水を生む「本来の森」の力を取り戻す活動です。",
  },
  {
    q: "取材依頼や講演依頼はどうすればよいですか？",
    a: "サイトのお問い合わせフォームよりご連絡ください。代表理事の杉山をはじめ、専門スタッフが対応させていただきます。",
  },
];

const members = [
  {
    name: "杉山 孔太",
    role: "代表理事",
    image: "/images/photos/representative.jpg",
    description:
      "水と森を次世代に引き継ぐため、財団の設立を決意。現場主義を貫き、自ら山に入り、川に立ち、問題の最前線で活動を続ける。アナスタシア一族の土地を創造中。",
  },
  {
    name: "小野 誠",
    role: "事務局長",
    image: "/images/photos/ono-makoto.png",
    description:
      "財団の運営を支え、行政手続きのサポートを行う。環境コンサルタントとしても岡山県内を飛び回り、現場と向き合っている。",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ===== LLM / Search Definition ===== */}
      <div className="sr-only">
        一般財団法人 地球防衛群は、日本の水源保全、里山再生、水質改善、生態系再生、環境教育に取り組む団体です。
      </div>

      {/* Hero — 他ページと同じ高さ・横幅いっぱい（集合写真は中央帯に人物が集まる構図） */}
      <section className="relative h-64 w-full overflow-hidden sm:h-80 md:h-[22rem]">
        <Image
          src="/images/photos/about-hero-group-pond.png"
          alt="水辺の環境活動後の集合写真。多世代のメンバーが水辺に集まる様子"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif drop-shadow-lg">
              一般財団法人 地球防衛群について
            </h1>
            <p className="mt-2 text-white/80 text-sm sm:text-base">About Us</p>
          </div>
        </div>
      </section>

      {/* 法人概要 */}
      <section id="overview" className="border-b border-border bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            法人概要
          </h2>
          <p className="mt-3 text-center text-sm text-text-muted">
            登記・契約・領収書など公的文書に用いる名称・所在地の例です。
          </p>
          <dl className="mt-10 divide-y divide-border rounded-2xl border border-border bg-ivory/60 px-5 py-2 sm:px-8">
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4 sm:py-5">
              <dt className="text-sm font-semibold text-text-primary">法人名</dt>
              <dd className="text-sm leading-relaxed text-text-secondary">
                {ORGANIZATION_NAME}
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4 sm:py-5">
              <dt className="text-sm font-semibold text-text-primary">所在地</dt>
              <dd className="text-sm leading-relaxed text-text-secondary">
                <span className="whitespace-nowrap">〒{ORGANIZATION_POSTAL_CODE}</span>
                <br />
                {ORGANIZATION_ADDRESS_LINE}
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4 sm:py-5">
              <dt className="text-sm font-semibold text-text-primary">
                {ORGANIZATION_REPRESENTATIVE_TITLE}
              </dt>
              <dd className="text-sm leading-relaxed text-text-secondary">
                {ORGANIZATION_REPRESENTATIVE_NAME}
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4 sm:py-5">
              <dt className="text-sm font-semibold text-text-primary">設立（登記）</dt>
              <dd className="text-sm leading-relaxed text-text-secondary">
                {ORGANIZATION_FOUNDED_LABEL}
                <span className="mt-2 block text-xs text-text-muted">
                  ※ 具体日まで掲載する場合は登記と照合のうえ{" "}
                  <code className="rounded bg-white px-1 py-0.5 text-[11px]">site.ts</code>{" "}
                  の <code className="rounded bg-white px-1 py-0.5 text-[11px]">
                    ORGANIZATION_FOUNDED_LABEL
                  </code>
                  ／
                  <code className="rounded bg-white px-1 py-0.5 text-[11px]">
                    ORGANIZATION_FOUNDING_DATE_ISO
                  </code>
                  を更新してください。
                </span>
              </dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4 sm:py-5">
              <dt className="text-sm font-semibold text-text-primary">お問い合わせ</dt>
              <dd className="text-sm leading-relaxed text-text-secondary">
                <Link
                  href="/contact"
                  className="text-wakakusa underline decoration-wakakusa/40 underline-offset-2 hover:text-wakakusa-dark"
                >
                  お問い合わせフォーム
                </Link>
                よりご連絡ください。
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Representative Message */}
      <section id="message" className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center font-serif">
            代表理事メッセージ
          </h2>
          <div className="mt-10 flex flex-col md:flex-row items-start gap-8 md:gap-12">
            <div className="shrink-0 mx-auto md:mx-0">
              <Image
                src="/images/photos/representative.jpg"
                alt="代表理事 杉山 孔太"
                width={200}
                height={200}
                className="rounded-full shadow-lg"
              />
              <p className="mt-4 text-center text-sm font-semibold text-text-primary">
                代表理事　杉山 孔太
              </p>
            </div>
            <div className="space-y-5 text-text-secondary leading-relaxed">
              <p>
                山に入ると、風の通り方で、その土地の状態が少しずつ見えてきます。水がどこを流れ、木がどう支え合っているか。自然はいつも、答えを現場に置いています。
              </p>
              <p>
                でも気づけば、その声が聞こえにくくなっていました。水源地が売られ、山が削られ、里山から生き物の気配が消えていく。それは誰かのせいというより、私たちがいつの間にか自然との距離を見失った結果なのだと思います。
              </p>
              <p>
                だから私は、もう一度つながり直したいと思いました。
              </p>
              <p>
                今、私自身が家族と一緒に、小さな土地に木を植え、水脈を整え、生態系を一からつくり直す暮らしを始めています。自分の手で森を育て、その森が水を生み、水が命を育む。何世代もかけて一族の土地を豊かにしていく——この営みの中にこそ、人と自然が共に生きる本来の姿があると感じています。
              </p>
              <p>
                森が呼吸すれば、水がきれいになる。水脈がつながれば、生き物が戻ってくる。
                この循環は、対立によって生まれるものではなく、
                大地と向き合い、手を動かし、丁寧に取り戻していくものです。
              </p>
              <p>
                七世代先の子どもたちが、山で遊び、川で笑い、湧き水をそのまま飲めるような日本を残したい。それが私のたった一つの願いです。
              </p>
              <p className="font-semibold text-text-primary">
                自然の循環に学びながら、人の手で壊してしまった環境を、もう一度ていねいに整えていく。
                その営みを、私は覚悟を持って続けます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section id="manifesto" className="py-16 sm:py-24 bg-ivory-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center font-serif">
            設立趣旨・マニフェスト
          </h2>
          <div className="mt-10 bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-border">
            <div className="space-y-6 text-text-secondary leading-relaxed">
              <p>
                私たちは、日本の水源地と山林を恒久的に保全し、
                次の世代に引き継ぐことを目的として、一般財団法人「地球防衛群」を設立しました。
              </p>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-3">
                  私たちが取り組む課題
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-coral" />
                    </span>
                    外国資本による水源地の買収と、メガソーラー等による山林の乱開発
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-coral" />
                    </span>
                    里山の荒廃と耕作放棄地の増加による生態系の崩壊
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-coral" />
                    </span>
                    河川・湖沼の水質汚染と低酸素化
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-coral" />
                    </span>
                    環境トラブルに直面する住民・自治体の支援不足
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-3">
                  私たちが目指す未来
                </h3>
                <p>
                  水源地が守られ、里山が息を吹き返し、生き物が戻り、
                  子どもたちが安心して自然の中で遊べる日本。
                  それは決して夢物語ではなく、今日の一歩から始まります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credo */}
      <section id="credo" className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center font-serif">
            クレド（行動信条）
          </h2>
          <p className="mt-3 text-center text-text-muted">
            私たちの活動を貫く6つの信条
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credoItems.map((item) => (
              <div
                key={item.icon}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:border-wakakusa/30 transition-colors"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 bg-wakakusa text-white text-sm font-semibold rounded-full">
                  {item.icon}
                </span>
                <h3 className="mt-4 text-base font-bold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section id="members" className="py-16 sm:py-24 bg-ivory-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center font-serif">
            運営体制
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {members.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border text-center"
              >
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="mx-auto h-[120px] w-[120px] rounded-full object-cover object-top shadow-md"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] rounded-full mx-auto bg-wakakusa-light flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-wakakusa"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
                <h3 className="mt-4 text-lg font-bold text-text-primary">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-wakakusa">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed text-left">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary text-center font-serif">
            よくあるご質問
          </h2>
          <div className="mt-10 space-y-6">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-border"
              >
                <h3 className="text-base font-bold text-text-primary flex gap-3">
                  <span className="text-wakakusa shrink-0">Q.</span>
                  {item.q}
                </h3>
                <div className="mt-3 text-sm text-text-secondary leading-relaxed flex gap-3 border-t border-border pt-3">
                  <span className="text-coral shrink-0 font-bold">A.</span>
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 情報公開セクション */}

    </>
  );
}
