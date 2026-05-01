import { toolkitSubdirHasPublicFiles } from "@/lib/toolkit-files";

import { ResourceLead } from "./ResourceLead";

type ToolkitPageBodyProps = {
  subdir: string;
  lead: React.ReactNode;
};

/**
 * `public/toolkit/<subdir>` にファイルがあれば「公開済み」トーン、なければ準備中。
 */
export function ToolkitPageBody({ subdir, lead }: ToolkitPageBodyProps) {
  const ready = toolkitSubdirHasPublicFiles(subdir);

  return (
    <>
      <ResourceLead>{lead}</ResourceLead>
      {ready ? (
        <p className="text-[15px] leading-relaxed text-text-secondary">
          このセクションでは、資料（PDF 等）を順次公開します。一覧はウェブサーバー経由で
          <code className="mx-1 rounded bg-ivory-warm px-1.5 py-0.5 text-xs">{`/toolkit/${subdir}/`}</code>
          に配置されたファイルとして提供されます。
        </p>
      ) : (
        <p className="text-[15px] leading-relaxed text-text-secondary">
          公開用の資料を準備中です。構成とトーンのみ先に確認できる状態ですので、コンテンツ整備後に再度ご確認ください。
        </p>
      )}
    </>
  );
}
