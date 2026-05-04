import type { Metadata } from "next";
import Link from "next/link";

import { ResourceBreadcrumbs } from "@/components/ResourceBreadcrumbs";
import { ResourceLead } from "@/components/ResourceLead";

export const metadata: Metadata = {
  title: "関係法案の整理",
  description:
    "河川法・森林法・都市計画など、水源地や里山の議論に関わりやすい法令をアンカー付きで整理します（個別ケースでの法的評価は専門家へ）。",
  alternates: { canonical: "/learn/laws" },
  openGraph: {
    title: "関係法案の整理 | 学ぶ",
    url: "/learn/laws",
    description: "関係法令の読みどころの整理です。",
  },
};

const sections = [
  {
    id: "waters",
    title: "水域・治水・環境との接点",
    body: "流域管理、河川の管理者、許認可との関係など、開発・保全の議論で参照されやすい観点をまとめる予定です。",
  },
  {
    id: "forest",
    title: "森林・原野・土砂",
    body: "林地開発や保安林、斜面保全など、開発可否の論点になりやすい整理を順次載せます（実務は法令・告示の最新版に照合してください）。",
  },
  {
    id: "planning",
    title: "都市計画・用途地域・エネルギー施策",
    body: "開発の位置づけ、再生可能エネルギーの設備と環境評価の接点について、チェックリスト（ひな形・資料）とリンクします。",
  },
] as const;

export default function LawsPage() {
  return (
    <div className="bg-ivory">
      <div className="border-b border-wakakusa/25 bg-wakakusa-light/30 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ResourceBreadcrumbs
            className="mb-4 text-text-muted"
            items={[
              { name: "HOME", path: "/" },
              { name: "学ぶ", path: "/learn" },
              { name: "関係法案の整理", path: "/learn/laws" },
            ]}
          />
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            関係法案の整理
          </h1>
          <ResourceLead>
            条文の趣旨ではなく、「どのテーマ議論でどの法令が脚光を浴びやすいか」を地図のように並べます。詳細チェックリストは{" "}
            <Link href="/toolkit/operations" className="text-aqua-dark underline underline-offset-2">
              ひな形・資料
            </Link>
            と相互リンクさせます。
          </ResourceLead>
          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2 className="font-serif text-xl font-semibold text-text-primary">{s.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{s.body}</p>
              </section>
            ))}
          </div>
          <p className="mt-10 text-sm text-text-muted">
            用語側からの関連アンカーは <code>#waters</code> /{" "}
            <code>#forest</code> / <code>#planning</code> と対応させます。
          </p>
        </div>
      </div>
    </div>
  );
}
