import path from "path";

export const ORDINANCE_MARKDOWN_FILENAME = "条例テンプレ_v0_暫定版.md";

/** 公開用 Markdown（ビルド・読み込み時の実体ファイル） */
export const ORDINANCE_MARKDOWN_PATH = path.join(
  process.cwd(),
  "public",
  "toolkit",
  "ordinance",
  ORDINANCE_MARKDOWN_FILENAME,
);
