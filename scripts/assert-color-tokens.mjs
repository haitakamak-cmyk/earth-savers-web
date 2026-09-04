/**
 * ビルド後の CSS に、globals.css で定義した色トークンがそのまま出ているかを確かめる。
 *
 * 2026-09-04、コントラスト修正（PR #103）をマージしたところ、本番の HTML には新しい
 * クラス（bg-wakakusa-deep など）が出ているのに、CSS だけが変更前の値のままだった。
 * ブラウザの computed style で --wakakusa-dark が #4a8f4a（旧値）を返し、
 * --wakakusa-deep は未定義だった。ビルドは成功し、画面も「緑のボタンが普通に出る」ため
 * 見た目では気づけない。
 *
 * このガードは globals.css の :root から色トークンを読み、同じ値がビルド後の CSS に
 * あるかを突き合わせる。古い CSS が使い回されたときにビルドを落とす。
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SOURCE = "src/app/globals.css";
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

// globals.css の :root { ... } から `--name: #hex;` を拾う
const source = readFileSync(SOURCE, "utf8");
const rootBlock = source.slice(source.indexOf(":root"), source.indexOf("@theme"));
const tokens = [...rootBlock.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,8})\s*;/g)].map(
  ([, name, value]) => ({ name, value: value.toLowerCase() }),
);

if (tokens.length === 0) {
  console.error(`[colors] ${SOURCE} の :root から色トークンを読み取れませんでした。`);
  process.exit(1);
}

let files = [];
try {
  files = cssFiles(root);
} catch {
  console.error(`[colors] ${root} が見つかりません。ビルド出力を確認してください。`);
  process.exit(1);
}

const bundle = files.map((f) => readFileSync(f, "utf8")).join("\n").toLowerCase();
const missing = tokens.filter(({ name, value }) => !bundle.includes(`--${name}:${value}`));

if (missing.length > 0) {
  console.error(
    `[colors] ビルド後の CSS に、定義したはずの色トークンが ${missing.length} 個ありません。\n` +
      missing.map(({ name, value }) => `           --${name}: ${value}`).join("\n") +
      `\n\n        古いビルド成果物が使い回された可能性があります。\n` +
      `        Vercel ならビルドキャッシュを使わずに再デプロイしてください\n` +
      `        （Deployments → 対象 → Redeploy →「Use existing Build Cache」のチェックを外す）。`,
  );
  process.exit(1);
}

console.log(`[colors] 色トークン ${tokens.length} 個を確認（CSS ${files.length} ファイル）`);
