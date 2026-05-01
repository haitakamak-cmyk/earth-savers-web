import type { Metadata } from "next";

import { PolicyKindPageShell } from "../PolicyKindPageShell";

export const metadata: Metadata = {
  title: "中央政府・議員向けメッセージ",
  description: "中央政府・議員に向けたメッセージ・提言一覧です（政策提言リソース）。",
  alternates: { canonical: "/policy/national" },
  openGraph: {
    title: "中央政府・議員向けメッセージ | 政策提言",
    url: "/policy/national",
    description: "中央政府・議員向けメッセージ一覧です。",
  },
};

export default function PolicyNationalPage() {
  return <PolicyKindPageShell kind="national" />;
}
