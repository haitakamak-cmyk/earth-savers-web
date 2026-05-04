import { readFile } from "fs/promises";
import path from "path";

import type { ToolkitSection } from "@/lib/toolkit-manifest";

/** `public/toolkit/<subdir>/<filename>` を UTF-8 で読む（失敗時はプレースホルダMarkdown） */
export async function readToolkitPublicMarkdown(
  subdir: ToolkitSection["subdir"],
  filename: string,
): Promise<string> {
  const full = path.join(process.cwd(), "public", "toolkit", subdir, filename);
  try {
    return await readFile(full, "utf-8");
  } catch {
    return `> Markdown を読み込めませんでした。\`public/toolkit/${subdir}/${filename}\` を確認してください。\n`;
  }
}
