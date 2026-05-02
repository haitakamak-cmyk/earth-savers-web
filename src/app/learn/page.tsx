import type { Metadata } from "next";
import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ResourceLead } from "@/components/ResourceLead";

export const metadata: Metadata = {
  title: "学ぶ（資料室）",
  description:
    "用語集、関係法案の整理、環境脅威のサマリ、読み物で、水源・里山・生態系を学べるコーナーです。政策の主張は政策提言と明確に分けます。",
  alternates: { canonical: "/learn" },
  openGraph: {
    title: "学ぶ（資料室）",
    description: "用語・法案・脅威・読み物で学べるコーナーです。",
    url: "/learn",
  },
};

const cards = [
  {
    href: "/learn/topics",
    title: "解説記事",
    body: "制度・政策の背景を長めの文章で整理します。用語集・ひな形・資料・政策提言とつながります。",
  },
  {
    href: "/learn/glossary",
    title: "用語集",
    body: "水源保全・生態系でよく出る言葉を短く定義し、相互リンクで深掘りしやすくします。",
  },
  {
    href: "/learn/laws",
    title: "関係法案の整理",
    body: "河川・森林・都市計画など、論点になりやすい法令の位置づけをアンカー付きで整理します。",
  },
  {
    href: "/learn/threats",
    title: "環境脅威のサマリ",
    body: "メガソーラー、切り捨て林、外部資本による取得など、現場で論点になりやすいリスクを要約します。",
  },
  {
    href: "/learn/articles",
    title: "読みもの",
    body: "活動レビューや論考など、読み順に迷いにくい形で並べます。",
  },
] as const;

export default function LearnHubPage() {
  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "学ぶ", path: "/learn" },
        ]}
      />
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-wider text-wakakusa-dark">
            資料室 / 学ぶ
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            学ぶ
          </h1>
          <ResourceLead>
            「知る」を支えるコンテンツを集約します。
            <Link href="/policy" className="text-aqua-dark underline underline-offset-2">
              政策提言
            </Link>
            で述べる主張と、この「学ぶ」コーナーで整理する法令・背景知識の役割分担を はっきりさせ、読者が迷わない導線にします。
          </ResourceLead>
          <ul className="grid gap-3 sm:grid-cols-2">
            {cards.map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="flex h-full flex-col rounded-xl border border-border bg-white px-4 py-4 shadow-sm transition-colors hover:border-wakakusa/35 hover:bg-wakakusa-light/30"
                >
                  <span className="font-serif text-lg font-semibold text-text-primary">
                    {card.title}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-text-secondary">{card.body}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
