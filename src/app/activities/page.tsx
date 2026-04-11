import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "活動内容",
  description:
    "水源地の保全、生態系復活プロジェクト、大地の再生、530運動、ばら撒くっ種、環境教育など、地球防衛群の活動をご紹介します。",
};

/** `public` 直下のサブディレクトリ（例: images/ばら撒くっ種）に置いた画像を URL 一覧にする */
function listPublicImageUrls(subdirUnderPublic: string): string[] {
  const abs = path.join(process.cwd(), "public", subdirUnderPublic);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter(
      (name) =>
        !name.startsWith(".") &&
        /\.(jpe?g|png|webp|gif)$/i.test(name)
    )
    .sort((a, b) => a.localeCompare(b, "ja"))
    .map((name) => {
      const prefix = subdirUnderPublic.split(path.sep).join("/");
      return `/${prefix}/${name}`;
    });
}

type Activity = {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** 指定時、`public` 内の画像を列挙して表示（空なら `image` を使用） */
  imageDir?: string;
  links?: { href: string; label: string }[];
};

const activities: Activity[] = [
  {
    id: "conservation",
    tag: "水源保全",
    tagColor: "text-aqua bg-aqua-light",
    title: "水源地・山林の取得と恒久保全",
    description:
      "外国資本による水源地の買収や、メガソーラーの乱開発から日本の豊かな水源を守ります。取得した山林は恒久的に保全し、地下水脈のネットワークを維持・回復。七世代先の子どもたちに、きれいな水を届けるための土台をつくります。",
    image: "/images/photos/water-spring.jpeg",
    imageAlt: "美しい水源地の湧き水",
  },
  {
    id: "ecosystem",
    tag: "生態系復活",
    tagColor: "text-aqua bg-aqua-light",
    title: "生態系復活プロジェクト ～水から生態系を蘇らせる～",
    description:
      "私たちはナノバブルや微生物の力を活かした独自の水質浄化技術を用い、河川や池の溶存酸素を改善。深刻な低酸素化に苦しむ海・川・湖沼の生態系を、水の中から直接蘇らせるプロジェクトを推進しています。",
    image: "/images/photos/ecosystem-river.jpeg",
    imageAlt: "生態系復活プロジェクトの水質浄化装置",
  },
  {
    id: "satoyama",
    tag: "大地の再生",
    tagColor: "text-wakakusa bg-wakakusa-light",
    title: "里山オーガニック再生 ～大地の再生の手法で～",
    description:
      "現代のコンクリートやアスファルトは大地の水脈を分断し、空気と水の循環を止めてしまいます。「大地の再生」の考え方に基づき、風の草刈りや点穴掘りで空気と水の通り道を回復。放置された人工林・竹林に光を入れ、耕作放棄地を里山として再生します。人と動物が共生できる「やさしい境界線」をつくります。",
    image: "/images/photos/activity-bamboo.jpeg",
    imageAlt: "里山再生活動の様子",
  },
  {
    id: "gomi530",
    tag: "530運動",
    tagColor: "text-accent-gold bg-amber-50",
    title: "530（ゴミゼロ）運動 ～その一歩で自分も世界も生まれ変わる～",
    description:
      "地域のゴミ拾いや衆楽園の池そうじ、在来種の種のシェアなど、誰でも気軽に参加できるボランティア活動を行っています。雨の日も風の日も、みんなで楽しくゴミを拾い、お花を植え、街をきれいにする。小さな一歩が、大きな変化を生み出します。",
    image: "/images/photos/gomi530-group-vests.png",
    imageAlt:
      "ゴミ拾い530運動に参加する地球防衛群のメンバーと地域の子どもたちの集合写真。伝統的な瓦の壁を背景に、笑顔でトングや活動チラシを持っています。",
  },
  {
    id: "baramaku",
    tag: "種のシェア",
    tagColor: "text-accent-gold bg-amber-50",
    title: "ばら撒くっ種",
    description:
      "在来種や野草の種を仲間と分かち合い、地域に緑を広げるコミュニティ活動です。Facebook のグループで情報発信や交流を行っています。活動の様子や参加方法の詳細は、グループページをご覧ください。",
    image: "/images/ばら撒くっ種/baramaku-seeds-table.png",
    imageAlt:
      "ばら撒くっ種の会で並べられた種子や実、モロヘイヤ・マリーゴールドなどのラベル付き袋",
    imageDir: "images/ばら撒くっ種",
    links: [
      {
        href: "https://www.facebook.com/groups/baramaku.seed",
        label: "Facebookグループを開く",
      },
    ],
  },
  {
    id: "prevention",
    tag: "環境防衛",
    tagColor: "text-coral bg-red-50",
    title: "環境破壊型開発の防止・調査",
    description:
      "メガソーラーの無秩序な建設や、山林の違法伐採、PFAS汚染など、環境破壊の現場を調査・記録し、法的手段を含めた防止策を講じます。「駆け込み寺」として、困っている住民や自治体の相談窓口となり、問題解決をサポートします。",
    image: "/images/photos/mega-solar.jpeg",
    imageAlt: "山を覆うメガソーラーの現状",
  },
  {
    id: "education",
    tag: "環境教育",
    tagColor: "text-wakakusa bg-wakakusa-light",
    title: "環境教育・市民参加の促進",
    description:
      "講演会や自然体験プログラムを通じて、水と森の大切さを次の世代にバトンタッチします。子どもたちが五感で自然のペースを感じ、深呼吸できる場を提供。自分たちが生きる土壌を自分たちの手で守る、そんな能動的な人材の輪を広げていきます。",
    image: "/images/photos/child-corn.jpeg",
    imageAlt: "子どもと自然の中での体験活動",
  },
];

export default function ActivitiesPage() {
  return (
    <>
      {/* Hero — 横幅いっぱい。集合写真は顔が中央付近に来るよう object-position 調整 */}
      <section className="relative h-64 w-full overflow-hidden sm:h-80 md:h-[22rem]">
        <Image
          src="/images/photos/activities-hero-community.png"
          alt="種や特産のシェア会の様子。参加メンバーの集合写真"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_44%] sm:object-[center_42%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-black/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif drop-shadow-lg">
              活動内容
            </h1>
            <p className="mt-2 text-white/80 text-sm sm:text-base">
              What We Do
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 sm:py-16 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-text-secondary leading-relaxed text-base sm:text-lg">
            水源地の死守から、ナノバブルによる水質浄化、里山の再構築まで。<br className="hidden sm:block" />
            私たちは現場での「実践」を積み重ねることで、日本の自然環境を守り、未来へつないでいます。
          </p>
        </div>
      </section>

      {/* Activity Sections */}
      {activities.map((activity, index) => {
        const dirImages = activity.imageDir
          ? listPublicImageUrls(activity.imageDir)
          : [];
        const mainSrc = dirImages[0] ?? activity.image;
        const gallerySrcs = dirImages.slice(1);

        return (
          <section
            key={activity.id}
            id={activity.id}
            className={`py-16 sm:py-20 ${
              index % 2 === 0 ? "bg-ivory" : "bg-ivory-warm"
            }`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src={mainSrc}
                      alt={activity.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="w-full md:w-1/2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${activity.tagColor}`}
                  >
                    {activity.tag}
                  </span>
                  <h2 className="mt-4 text-xl sm:text-2xl font-bold text-text-primary font-serif leading-relaxed">
                    {activity.title}
                  </h2>
                  <p className="mt-4 text-text-secondary leading-relaxed">
                    {activity.description}
                  </p>
                  {activity.links && activity.links.length > 0 ? (
                    <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
                      {activity.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-wakakusa px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-wakakusa-dark"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              {gallerySrcs.length > 0 ? (
                <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
                  {gallerySrcs.map((src, gi) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm"
                    >
                      <Image
                        src={src}
                        alt={`${activity.title}（${gi + 2}枚目）`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-wakakusa-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary font-serif">
            一緒に活動しませんか？
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            ボランティアの参加も、寄付による応援も、
            あなたの想いが活動を支えます。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/join#volunteer"
              className="px-8 py-3.5 bg-wakakusa hover:bg-wakakusa-dark text-white font-semibold rounded-full transition-colors shadow-sm"
            >
              ボランティアに参加する
            </a>
            <a
              href="/join"
              className="px-8 py-3.5 bg-white hover:bg-gray-50 text-wakakusa-dark font-semibold rounded-full transition-colors border border-wakakusa/30"
            >
              支援する
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
