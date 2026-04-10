import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "財団について | 財団法人 地球防衛群",
  description:
    "財団法人 地球防衛群の設立趣旨、マニフェスト、クレド（行動信条）、運営体制をご紹介します。",
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
      "活動の姿勢や判断の根拠を分かりやすく示し、ステークホルダーとの対話を大切にします。",
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
    title: "不退転",
    description: "どんな困難にも屈せず、環境を守る使命を全うします。",
  },
  {
    icon: "06",
    title: "次世代への責任",
    description: "七世代先の子どもたちに恥じない選択をし続けます。",
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
      "財団の運営を支え、行政手続きのサポートを行う。組織運営のプロフェッショナル。環境コンサルタントとしても全国を飛び回り現実と向き合っている。",
  },
];

export default function AboutPage() {
  return (
    <>
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
              財団について
            </h1>
            <p className="mt-2 text-white/80 text-sm sm:text-base">About Us</p>
          </div>
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
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                日本の美しい水源地が、外国資本に買収されていく。山が削られ、メガソーラーパネルに覆われていく。里山は荒れ果て、野生動物が人里に降りてくる。
              </p>
              <p>
                この現実を目の当たりにして、もう黙っていることはできないと思いました。
              </p>
              <p>
                森が深呼吸すると、私たちの水が美味しくなる。大地の水脈がつながれば、生き物が戻ってくる。この当たり前の循環を取り戻すために、私たちは立ち上がります。
              </p>
              <p>
                七世代先の子どもたちが、安心してきれいな水を飲み、豊かな森で遊べる未来。その未来を、今ここから一緒につくりましょう。
              </p>
              <p className="font-semibold text-text-primary">
                「不退転」の覚悟で、水と森の未来を守ります。
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
                次の世代に引き継ぐことを目的として、財団法人「地球防衛群」を設立します。
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

      {/* 情報公開セクションは公開準備が整うまで非表示 */}
    </>
  );
}
