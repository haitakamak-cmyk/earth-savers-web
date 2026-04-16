import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "メンバー紹介 | 財団法人 地球防衛群",
  description:
    "財団法人 地球防衛群の理事会・監事・評議員、およびアンバサダーランクをご紹介します。",
};

/** 理事会・監事（役職・氏名のみ） */
const boardRows: { role: string; name: string }[] = [
  { role: "代表理事", name: "杉山 孔太" },
  { role: "理事・事務局長", name: "小野 誠" },
  { role: "理事", name: "西尾 直哉" },
  { role: "理事", name: "藤原 治" },
  { role: "理事", name: "遠藤 さよ" },
  { role: "理事", name: "東川 恵里子" },
  { role: "監事", name: "今昔 美未実" },
];

const councilRows: { role: string; name: string }[] = [
  { role: "評議員", name: "杉山 公紀" },
  { role: "評議員", name: "杉山 麻依子" },
  { role: "評議員", name: "瀬戸山 裕一" },
];

/** アンバサダー：七世代の大使 → … → 水の守人の順（名前はランクごとに追記） */
const ambassadorRanks: { rank: string; reading: string; names: string[] }[] = [
  { rank: "七世代の大使", reading: "ななせだいのたいし", names: [] },
  { rank: "山の守護者", reading: "やまのしゅごしゃ", names: [] },
  { rank: "森の番人", reading: "もりのばんにん", names: [] },
  { rank: "水の守人", reading: "みずのもりびと", names: [] },
];

function RosterTable({ rows }: { rows: { role: string; name: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
      <table className="w-full min-w-[280px] text-left text-sm sm:text-base">
        <thead>
          <tr className="border-b border-border bg-ivory-warm">
            <th
              scope="col"
              className="whitespace-nowrap px-4 py-3 font-semibold text-text-primary sm:px-6"
            >
              役職
            </th>
            <th
              scope="col"
              className="px-4 py-3 font-semibold text-text-primary sm:px-6"
            >
              氏名
            </th>
          </tr>
        </thead>
        <tbody className="text-foreground">
          {rows.map((r, i) => (
            <tr key={`${r.role}-${r.name}-${i}`} className="border-b border-border last:border-0">
              <td className="whitespace-nowrap px-4 py-3 font-medium sm:px-6">
                {r.role}
              </td>
              <td className="px-4 py-3 font-semibold sm:px-6">
                {r.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MembersPage() {
  return (
    <>
      <section className="relative h-64 overflow-hidden sm:h-80">
        <Image
          src="/images/photos/members-hero-group.png"
          alt="里山活動に参加するメンバーの集合"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_32%] sm:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-white drop-shadow-lg sm:text-4xl">
              メンバー紹介
            </h1>
            <p className="mt-2 text-sm text-white/80 sm:text-base">Members</p>
          </div>
        </div>
      </section>

      <section id="board" className="bg-ivory py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            理事会・監事
          </h2>
          <p className="mt-3 text-center text-sm text-text-secondary">
            代表理事、理事・事務局長、理事、監事
          </p>
          <div className="mt-10">
            <RosterTable rows={boardRows} />
          </div>
        </div>
      </section>

      <section id="council" className="border-y border-border bg-ivory-warm py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            評議員会
          </h2>
          <p className="mt-3 text-center text-sm text-text-secondary">評議員</p>
          <div className="mt-10">
            <RosterTable rows={councilRows} />
          </div>
        </div>
      </section>

      <section id="ambassadors" className="bg-ivory py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            アンバサダー
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-text-secondary">
            財団の活動にご賛同いただいたメンバーの方々です。
          </p>

          <div className="mt-10 flex flex-col gap-6">
            {ambassadorRanks.map((tier) => (
              <div
                key={tier.rank}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
                  <h3 className="text-lg font-bold text-wakakusa-dark">
                    {tier.rank}
                  </h3>
                  <span className="text-sm text-text-secondary">（{tier.reading}）</span>
                </div>
                {tier.names.length > 0 ? (
                  <ul className="mt-4 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:flex-wrap sm:gap-x-6">
                    {tier.names.map((n) => (
                      <li
                        key={n}
                        className="font-medium text-text-primary"
                      >
                        {n}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 border-t border-border pt-4 text-sm text-text-secondary">
                    （掲載予定）
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
