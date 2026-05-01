import type { Metadata } from "next";

import { PolicyKindPageShell } from "../PolicyKindPageShell";

export const metadata: Metadata = {
  title: "法律・税制・制度への提言パッケージ",
  description: "立法・税制・制度設計への提言パッケージ一覧です（政策提言リソース）。",
  alternates: { canonical: "/policy/legislative" },
  openGraph: {
    title: "法律・税制・制度への提言パッケージ | 政策提言",
    url: "/policy/legislative",
    description: "法律・税制・制度への提案一覧です。",
  },
};

export default function PolicyLegislativePage() {
  return <PolicyKindPageShell kind="legislative" />;
}
