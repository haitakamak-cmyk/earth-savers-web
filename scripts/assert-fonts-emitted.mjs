/**
 * ビルド後の CSS に @font-face が出ているかを確かめる。
 *
 * 2026-09-02、`globals.css` の `@import "./fonts.css"` がローカルでは通るのに
 * Vercel のビルドでだけ黙って落ち、本番のフォントが全部消えた。ビルドは成功し、
 * 画面も「システムフォントで普通に読める」ため、気づくのが遅れた。
 * 同じ壊れ方をしたときに、静かに本番へ出さず、ビルドを落とすためのガード。
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const MIN_FACES = 30; // 自己ホストの日本語フォントは 34 面ある
const root = ".next/static";

function cssFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...cssFiles(p));
    else if (name.endsWith(".css")) out.push(p);
  }
  return out;
}

let files = [];
try {
  files = cssFiles(root);
} catch {
  console.error(`[fonts] ${root} が見つかりません。ビルド出力を確認してください。`);
  process.exit(1);
}

const faces = files.reduce(
  (n, f) => n + (readFileSync(f, "utf8").match(/@font-face/g)?.length ?? 0),
  0,
);

if (faces < MIN_FACES) {
  console.error(
    `[fonts] ビルド後の CSS に @font-face が ${faces} 個しかありません（${MIN_FACES} 個以上を期待）。\n` +
      `        src/app/fonts.css が CSS バンドルへ取り込まれていない可能性があります。\n` +
      `        layout.tsx の import "./fonts.css" を確認してください。`,
  );
  process.exit(1);
}

console.log(`[fonts] @font-face ${faces} 個を確認（CSS ${files.length} ファイル）`);
