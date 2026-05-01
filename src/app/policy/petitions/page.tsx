import type { Metadata } from "next";

import { PolicyKindPageShell } from "../PolicyKindPageShell";

export const metadata: Metadata = {
  title: "著名人との共同署名",
  description: "共同署名・キャンペーンに関する掲載の一覧です（政策提言リソース）。",
  alternates: { canonical: "/policy/petitions" },
  openGraph: {
    title: "著名人との共同署名 | 政策提言",
    url: "/policy/petitions",
    description: "共同署名施策の一覧です。",
  },
};

export default function PolicyPetitionsPage() {
  return <PolicyKindPageShell kind="petitions" />;
}
