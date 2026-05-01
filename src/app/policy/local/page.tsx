import type { Metadata } from "next";

import { PolicyKindPageShell } from "../PolicyKindPageShell";

export const metadata: Metadata = {
  title: "地方自治体との連携モデル／条例",
  description:
    "地方自治体との連携モデル・条例に関する提言一覧です（政策提言リソース）。",
  alternates: { canonical: "/policy/local" },
  openGraph: {
    title: "地方自治体との連携モデル／条例 | 政策提言",
    url: "/policy/local",
    description: "地方自治体向け一覧です。",
  },
};

export default function PolicyLocalPage() {
  return <PolicyKindPageShell kind="local" />;
}
