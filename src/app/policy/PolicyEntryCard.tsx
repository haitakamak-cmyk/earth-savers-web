import Link from "next/link";

import type { PolicyEntry } from "@/lib/policies";

/** 政策提言の一覧カード（ハブ `/policy` とカテゴリ一覧で共用） */
export function PolicyEntryCard({ policy }: { policy: PolicyEntry }) {
  return (
    <Link
      href={`/policy/${policy.slug}`}
      className="flex h-full flex-col rounded-xl border border-border bg-white px-4 py-4 shadow-sm transition-colors hover:border-aqua/35 hover:bg-aqua-light/25"
    >
      <span className="font-serif text-lg font-semibold text-text-primary">
        {policy.title}
      </span>
      {policy.subtitle ? (
        <span className="mt-1 text-sm text-text-muted">{policy.subtitle}</span>
      ) : null}
      <span className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">
        {policy.summary}
      </span>
      <span className="mt-4 text-sm font-semibold text-aqua-dark underline-offset-4">
        提言を読む →
      </span>
    </Link>
  );
}
