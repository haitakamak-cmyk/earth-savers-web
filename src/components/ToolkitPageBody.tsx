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
  return (
    <>
      <ResourceLead>{section.description}</ResourceLead>
      <ul className="mt-8 space-y-3">
        {section.files.map((file) => {
          const href = `/toolkit/${section.subdir}/${encodeURIComponent(file.filename)}`;
          const preparing = file.status === "preparing";
          return (
            <li key={file.filename}>
              <a
                href={href}
                className="block rounded-xl border border-border bg-white p-4 shadow-sm transition-colors hover:border-wakakusa/40 hover:bg-wakakusa-light/30"
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-lg font-semibold text-text-primary">
                    {file.title}
                  </span>
                  {preparing ? (
                    <span className="rounded-full border border-aqua/30 bg-aqua-light/40 px-2 py-0.5 text-xs font-semibold text-aqua-dark">
                      準備中
                    </span>
                  ) : null}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-text-secondary">
                  {file.description}
                </span>
                <span className="mt-3 block text-xs text-text-muted">
                  Markdown：{file.filename}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
