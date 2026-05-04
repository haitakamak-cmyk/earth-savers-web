import Link from "next/link";

import type { ToolkitSection } from "@/lib/toolkit-manifest";

import { ResourceLead } from "./ResourceLead";

type ToolkitPageBodyProps = {
  section: ToolkitSection;
};

/**
 * `public/toolkit/<subdir>` に置くMarkdown配布資料の固定リンク一覧。
 * ファイル名を固定しておくことで、準備中プレースホルダを後日差し替えてもページ側の導線は変えない。
 */
export function ToolkitPageBody({ section }: ToolkitPageBodyProps) {
  const files = section.files.filter((file) => file.status === "published");

  return (
    <>
      <ResourceLead>{section.description}</ResourceLead>
      <ul className="mt-8 space-y-3">
        {files.map((file) => {
          const href =
            file.viewSlug != null
              ? `${section.href}/${file.viewSlug}`
              : `/toolkit/${section.subdir}/${encodeURIComponent(file.filename)}`;
          return (
            <li key={file.filename}>
              <Link
                href={href}
                className="block rounded-xl border border-border bg-white p-4 shadow-sm transition-colors hover:border-wakakusa/40 hover:bg-wakakusa-light/30"
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-lg font-semibold text-text-primary">
                    {file.title}
                  </span>
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-text-secondary">
                  {file.description}
                </span>
                <span className="mt-3 block text-xs text-text-muted">
                  Markdown：{file.filename}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
