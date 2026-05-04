import Link from "next/link";

import { BreadcrumbJsonLd, type CrumbItem } from "@/components/BreadcrumbJsonLd";

export type ResourceBreadcrumbTone = "wakakusa" | "aqua";

const linkClassMap: Record<ResourceBreadcrumbTone, string> = {
  wakakusa:
    "text-wakakusa-dark underline-offset-2 hover:underline focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-wakakusa/35",
  aqua:
    "text-aqua-dark underline-offset-2 hover:underline focus:outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-aqua/35",
};

/**
 * 資料室三本柱ページ用：構造化データ（BreadcrumbJsonLd）と、画面上のパンくず（末尾は現在地・リンクなし）をセットで出力する。
 */
export function ResourceBreadcrumbs({
  items,
  tone = "wakakusa",
  layout = "inline",
  className = "",
}: {
  items: readonly CrumbItem[];
  tone?: ResourceBreadcrumbTone;
  /** inline: 見出し直前など。ribbon: 下層ドキュメント用の区切りバー（max-w-3xl） */
  layout?: "inline" | "ribbon";
  /** nav に付与する追加クラス（例: mb-4） */
  className?: string;
}) {
  const lastIdx = Math.max(0, items.length - 1);

  const list = (
    <ol className="flex flex-wrap items-center gap-x-0 gap-y-1 leading-relaxed">
      {items.map((item, i) => (
        <li key={`${item.path}:${i}`} className="inline-flex max-w-full items-center">
          {i > 0 ? (
            <span aria-hidden className="mx-1 shrink-0 text-text-muted">
              /
            </span>
          ) : null}
          {i < lastIdx ? (
            <Link href={item.path} className={linkClassMap[tone]}>
              {item.name}
            </Link>
          ) : (
            <span
              className="min-w-0 font-medium text-text-secondary [overflow-wrap:anywhere]"
              aria-current="page"
            >
              {item.name}
            </span>
          )}
        </li>
      ))}
    </ol>
  );

  const navClass =
    layout === "ribbon"
      ? `mx-auto max-w-3xl border-b border-border bg-ivory-warm/35 px-4 py-3 text-xs text-text-muted sm:px-6 ${className}`
      : `text-xs font-medium ${className}`;

  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="パンくず" className={navClass}>
        {list}
      </nav>
    </>
  );
}
