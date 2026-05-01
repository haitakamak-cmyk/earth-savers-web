import { existsSync, readdirSync } from "fs";
import { join } from "path";

/**
 * `public/toolkit/<subdir>` に公開用ファイルが1つ以上あるか。
 * 資料未配置時は各ツールキットページで「準備中」を出すために使う。
 */
export function toolkitSubdirHasPublicFiles(subdir: string): boolean {
  try {
    const dir = join(process.cwd(), "public", "toolkit", subdir);
    if (!existsSync(dir)) return false;
    const names = readdirSync(dir).filter((f) => !f.startsWith("."));
    return names.length > 0;
  } catch {
    return false;
  }
}
