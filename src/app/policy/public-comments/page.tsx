import type { Metadata } from "next";

import { PolicyKindPageShell } from "../PolicyKindPageShell";

export const metadata: Metadata = {
  title: "パブリックコメント",
  description: "パブリックコメントに対する文言・資料の一覧です（政策提言リソース）。",
  alternates: { canonical: "/policy/public-comments" },
  openGraph: {
    title: "パブリックコメント | 政策提言",
    url: "/policy/public-comments",
    description: "パブリックコメント関連の一覧です。",
  },
};

export default function PolicyPublicCommentsPage() {
  return <PolicyKindPageShell kind="public-comments" />;
}
