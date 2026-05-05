import Link from "next/link";

type Props = {
  /** 親の一覧またはハブ（例 `/toolkit`・`/toolkit/ordinance`） */
  href: string;
  /** リンク文言（矢印込みでも可） */
  label: string;
  /** `<nav>` のアクセシブル名（省略時は短い汎用ラベル） */
  navAriaLabel?: string;
};

/** 長文の末尾で行き止まりにならんよう、親ページへの導線を足す */
export function ToolkitFooterBackNav({ href, label, navAriaLabel }: Props) {
  return (
    <nav
      className="mt-10 flex flex-wrap gap-3 border-t border-border pt-8"
      aria-label={navAriaLabel ?? "親ページへのナビゲーション"}
    >
      <Link
        href={href}
        className="inline-flex items-center rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-aqua-dark shadow-sm transition-colors hover:border-wakakusa/35 hover:bg-wakakusa-light/30"
      >
        {label}
      </Link>
    </nav>
  );
}
