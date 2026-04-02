import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "メンバー紹介 | 財団法人 地球防衛群",
  description:
    "財団法人 地球防衛群の理事会・事務局・評議員会、およびクラウドファンディング・アンバサダーをご紹介します。",
};

type MemberCardData = {
  role: string;
  name: string;
  description: string;
  image: string | null;
};

const boardMembers: MemberCardData[] = [
  {
    role: "代表理事",
    name: "杉山 孔太",
    description:
      "財団設立発起人。水源保全と里山再生をライフワークとする。",
    image: "/images/photos/representative.jpg",
  },
  {
    role: "理事",
    name: "（就任予定）",
    description: "",
    image: null,
  },
  {
    role: "監事",
    name: "（就任予定）",
    description: "",
    image: null,
  },
];

const office: MemberCardData[] = [
  {
    role: "事務局長",
    name: "小野 誠",
    description: "各活動や関係各所との連絡・調整、事務局業務を担当。",
    image: "/images/photos/ono-makoto.png",
  },
];

const councilMembers = [
  { role: "評議員", name: "（就任予定）", description: "" },
];

const ambassadors: { name: string }[] = [];

function MemberCard({
  name,
  role,
  description,
  image,
}: {
  name: string;
  role: string;
  description: string;
  image: string | null;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm sm:p-8">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={120}
          height={120}
          className="mx-auto h-[120px] w-[120px] rounded-full object-cover object-top shadow-md"
        />
      ) : (
        <div className="mx-auto flex h-[120px] w-[120px] items-center justify-center rounded-full bg-wakakusa-light">
          <svg
            className="h-12 w-12 text-wakakusa"
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
      <h3 className="mt-4 text-lg font-bold text-text-primary">{name}</h3>
      <p className="text-sm font-medium text-wakakusa">{role}</p>
      {description ? (
        <p className="mt-3 text-left text-sm leading-relaxed text-text-secondary">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function MembersPage() {
  return (
    <>
      <section className="relative h-64 overflow-hidden sm:h-80">
        <Image
          src="/images/photos/members-hero-group.png"
          alt="里山活動に参加するメンバー（後列の男性陣を中心に）"
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            理事会
          </h2>
          <p className="mt-3 text-center text-text-muted">
            代表理事・理事・監事
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {boardMembers.map((m) => (
              <MemberCard key={`${m.role}-${m.name}`} {...m} />
            ))}
          </div>
        </div>
      </section>

      <section id="office" className="border-y border-border bg-ivory-warm py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            事務局
          </h2>
          <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-8">
            {office.map((m) => (
              <MemberCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </section>

      <section id="council" className="bg-ivory py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            評議員会
          </h2>
          <p className="mt-3 text-center text-text-muted">評議員</p>
          <ul className="mt-10 divide-y divide-border rounded-2xl border border-border bg-white shadow-sm">
            {councilMembers.map((c) => (
              <li
                key={c.name}
                className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 sm:px-6"
              >
                <span className="font-bold text-text-primary">{c.name}</span>
                <span className="text-sm text-wakakusa">{c.role}</span>
                {c.description ? (
                  <p className="w-full text-sm text-text-secondary">
                    {c.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="ambassadors" className="bg-ivory-warm py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            アンバサダー
          </h2>
          <p className="mt-3 text-center text-text-muted">
            クラウドファンディングでアンバサダーとしてご支援いただいた方
          </p>

          {ambassadors.length === 0 ? (
            <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-text-secondary">
              クラウドファンディングでアンバサダーとして支援いただいた方のお名前を掲載予定です。
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {ambassadors.map((a) => (
                <span
                  key={a.name}
                  className="rounded-full border border-wakakusa/30 bg-wakakusa-light px-4 py-2.5 text-center text-sm font-medium text-wakakusa-dark"
                >
                  {a.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
