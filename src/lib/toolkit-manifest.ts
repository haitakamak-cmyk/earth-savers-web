/** ツールキット一覧（関連リンク生成・ツールハブでのカード一覧） */
export const TOOLKIT_LINKS = [
  { label: "条例ひな型", href: "/toolkit/ordinance" },
  { label: "法律ガイド", href: "/toolkit/law-guide" },
  { label: "実務チェックリスト", href: "/toolkit/checklist" },
  { label: "導入・訴訟事例", href: "/toolkit/case-studies" },
] as const;

export const TOOLKIT_SUBDIRS: Record<
  "/toolkit/ordinance" | "/toolkit/law-guide" | "/toolkit/checklist" | "/toolkit/case-studies",
  string
> = {
  "/toolkit/ordinance": "ordinance",
  "/toolkit/law-guide": "law-guide",
  "/toolkit/checklist": "checklist",
  "/toolkit/case-studies": "case-studies",
};
