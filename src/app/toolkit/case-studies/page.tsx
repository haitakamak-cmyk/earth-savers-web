import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ToolkitPageBody } from "@/components/ToolkitPageBody";
import { getToolkitSectionByHref } from "@/lib/toolkit-manifest";

export const metadata: Metadata = {
  title: "導入・訴訟事例",
  description:
    "全国の自治体における条例導入事例、裁判で条例の適法性が認められた判例、条例がなかったために開発を防げなかった事例をまとめています。",
  alternates: { canonical: "/toolkit/case-studies" },
  openGraph: {
    title: "導入・訴訟事例 | ひな形・資料",
    description:
      "条例導入自治体事例、条例適法性の判例、条例未整備で防げなかった事例を整理します。",
    url: "/toolkit/case-studies",
  },
};

export default function ToolkitCaseStudiesPage() {
  const section = getToolkitSectionByHref("/toolkit/case-studies");

  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "ひな形・資料", path: "/toolkit" },
          { name: "導入・訴訟事例", path: "/toolkit/case-studies" },
        ]}
      />
      <div className="border-b border-wakakusa/20 bg-ivory-warm/40 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            導入・訴訟事例
          </h1>
          <ToolkitPageBody section={section} />
        </div>
      </div>
    </div>
  );
}
