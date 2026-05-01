import type { Metadata } from "next";

import { PolicyKindPageShell } from "../PolicyKindPageShell";

export const metadata: Metadata = {
  title: "理念・評価に基づく声明",
  description:
    "理念・活動評価に根ざした声明文の一覧です（政策提言リソース）。",
  alternates: { canonical: "/policy/statements" },
  openGraph: {
    title: "理念・評価に基づく声明 | 政策提言",
    url: "/policy/statements",
    description: "声明の一覧です。",
  },
};

export default function PolicyStatementsPage() {
  return <PolicyKindPageShell kind="statements" />;
}
