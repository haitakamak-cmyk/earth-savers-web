import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { ToolkitPageBody } from "@/components/ToolkitPageBody";
import { getToolkitSectionByHref } from "@/lib/toolkit-manifest";
import { ORGANIZATION_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `導入・訴訟事例 | ${ORGANIZATION_NAME}`,
  description:
    "全国の自治体における条例導入事例、裁判で条例の適法性が認められた判例、条例がなかったために開発を防げなかった事例をまとめています。",
  alternates: { canonical: "/toolkit/cases" },
  openGraph: {
    title: "導入・訴訟事例 | ひな形・資料",
    description: "条例導入事例と判例の整理です。",
    url: "/toolkit/cases",
  },
};

export default function ToolkitCasesHubPage() {
  const section = getToolkitSectionByHref("/toolkit/cases");

  return (
    <div className="bg-ivory">
      <BreadcrumbJsonLd
        items={[
          { name: "HOME", path: "/" },
          { name: "資料室", path: "/toolkit" },
          { name: "ひな形・資料", path: "/toolkit" },
          { name: "導入・訴訟事例", path: "/toolkit/cases" },
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
