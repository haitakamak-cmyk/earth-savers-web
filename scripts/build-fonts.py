#!/usr/bin/env python3
"""日本語 Web フォント（Zen Maru Gothic / Noto Serif JP）のサブセットを生成する。

生成物: public/fonts/v1/*.woff2 と src/app/fonts.css
実行は「フォント本体を差し替えるとき」だけでよい。記事を追加しても再生成は不要
（収録範囲を JIS 第1・第2水準という文字コード範囲で固定しているため）。

    python3 -m venv .venv && .venv/bin/pip install fonttools brotli
    .venv/bin/python scripts/build-fonts.py

分割の考え方:
  g0  ヘッダー・ヒーロー・フッターの文字（どのページでも最初に見える）。ここだけ preload する
  g1  かな・約物・英数（全ページで必ず要る）
  g2  高頻度漢字 上位500
  g3  次の500
  g4  その次（現行コンテンツに出現する残り）
  g5-g7 低頻度（JIS第1・第2水準の残り）。**連続したコード範囲**で宣言するため
        CSS が小さくなる。g2-g4 と重なる文字は、後に宣言する g2-g4 が優先される
  g8  記号・囲み文字など

g2-g4 の「頻度」は 2026-09 時点のサイト本文から一度だけ決めたもの。以後は固定でよい。
新しい記事が g5-g7 の文字を使えば、そのグループが読み込まれるだけで欠字にはならない。
"""

from __future__ import annotations

import collections
import glob
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORK = ROOT / ".fontwork"
OUT = ROOT / "public" / "fonts" / "v1"
CSS = ROOT / "src" / "app" / "fonts.css"

SOURCES = {
    "zen-400": ("ofl/zenmarugothic/ZenMaruGothic-Medium.ttf", None),
    "zen-700": ("ofl/zenmarugothic/ZenMaruGothic-Bold.ttf", None),
    "serif-400": ("ofl/notoserifjp/NotoSerifJP%5Bwght%5D.ttf", 400),
    "serif-700": ("ofl/notoserifjp/NotoSerifJP%5Bwght%5D.ttf", 700),
}
FACES = [
    ("zen-400", "Zen Maru Gothic", "100 500"),
    ("zen-700", "Zen Maru Gothic", "501 900"),
    ("serif-400", "Noto Serif JP", "100 500"),
    ("serif-700", "Noto Serif JP", "501 900"),
]
# 宣言順。広いコード範囲を先に、具体的なグループを後に置く（後勝ちで優先させる）
ORDER = ["g5", "g6", "g7", "g8", "g1", "g2", "g3", "g4", "g0"]

G1 = [(0x20, 0x7E), (0xA0, 0xFF), (0x2010, 0x201F), (0x2026, 0x2026), (0x2030, 0x2030),
      (0x203B, 0x203B), (0x3000, 0x303F), (0x3040, 0x309F), (0x30A0, 0x30FF),
      (0x31F0, 0x31FF), (0xFF00, 0xFFEF), (0x4E00, 0x4E00)]
# g0: ヘッダー・ヒーロー・フッターなど「どのページでも最初に見える文字」。
# 実測（2026-09-03、本番 DOM から抽出）。ここだけ preload するため小さく保つ。
# サイトの共通部分と表紙の文言が変わったときだけ見直せばよく、記事追加では不要。
#
# **運用ルール（2026-09-03 マスター指示。肥大化させないこと）**
#   入れてよい : 共通UI（ヘッダー・ナビ・フッター）と、トップのファーストビューで
#                 必ず表示される文字だけ
#   入れない   : 記事本文の文字、ページ固有の見出し、たまたま使われた固有名詞
#   理由       : g0 は全ページで preload される。1文字増やすと全訪問者の
#                 クリティカルパスが重くなる。ここが太ると preload の利点が消える
#   目安       : 1面あたり 100KB 未満（現状 zen 40KB / serif 80KB）を上限とする
G0_TEXT = (
    ".026AESadeghilrstv©、。「」あいおきくぐけしすせたちっつてでとどなにのはばひぶへまもらりるわをアィイクサシダッテデドバプボポマメラリレン・ー七世人今介付代体保先全公内再利制加動参合命問営団国地報場境大子学守宝実室容寄山引形復循応情態提援撒支政教料日旨月未本来森概残毎水汗法活流源現球環生用相知私種立策系約紹継続績美群育衛要規言設談財買資趣運里開防（）"
    " !\"#$%&'()*+,-./0123456789:;<=>?@"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`"
    "abcdefghijklmnopqrstuvwxyz{|}~"
)

G8 = [(0x2100, 0x214F), (0x2160, 0x217F), (0x2190, 0x21FF), (0x2200, 0x22FF),
      (0x2460, 0x24FF), (0x2500, 0x257F), (0x25A0, 0x25FF), (0x2600, 0x26FF), (0x3200, 0x33FF)]


def jis_level(ku_lo: int, ku_hi: int) -> set[str]:
    """JIS X 0208 の区単位で文字集合を作る（第1水準=16〜47区、第2水準=48〜84区）。"""
    out: set[str] = set()
    for ku in range(ku_lo, ku_hi + 1):
        for ten in range(1, 95):
            try:
                ch = bytes([0xA0 + ku, 0xA0 + ten]).decode("euc_jp")
            except UnicodeDecodeError:
                continue
            if len(ch) == 1:
                out.add(ch)
    return out


def site_kanji_frequency() -> list[str]:
    text = []
    for pat in ("src/content/**/*.md", "src/lib/**/*.ts", "src/app/**/*.tsx",
                "src/components/**/*.tsx", "public/toolkit/**/*.md"):
        for f in glob.glob(str(ROOT / pat), recursive=True):
            try:
                text.append(Path(f).read_text(encoding="utf-8"))
            except OSError:
                pass
    joined = "".join(text)
    freq = collections.Counter(c for c in joined if "一" <= c <= "鿿")
    return [c for c, _ in freq.most_common()]


def expand(ranges: list[tuple[int, int]]) -> str:
    return "".join(chr(c) for a, b in ranges for c in range(a, b + 1))


def fmt(ranges: list[tuple[int, int]]) -> str:
    return ",".join(f"U+{a:04X}" if a == b else f"U+{a:04X}-{b:04X}" for a, b in ranges)


def collapse(chars: set[str]) -> list[tuple[int, int]]:
    cps = sorted(ord(c) for c in chars)
    out, i = [], 0
    while i < len(cps):
        j = i
        while j + 1 < len(cps) and cps[j + 1] == cps[j] + 1:
            j += 1
        out.append((cps[i], cps[j]))
        i = j + 1
    return out


def main() -> int:
    WORK.mkdir(exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)

    l1, l2 = jis_level(16, 47), jis_level(48, 84)
    used = [c for c in site_kanji_frequency() if c in l1 | l2]
    g2, g3, g4 = set(used[:500]), set(used[500:1000]), set(used[1000:])
    tail = sorted((l1 | l2) - g2 - g3 - g4, key=ord)
    b1, b2 = ord(tail[len(tail) // 3]), ord(tail[2 * len(tail) // 3])
    spans = [(0x3400, b1 - 1), (b1, b2 - 1), (b2, 0x9FFF)]

    chars = {"g0": "".join(sorted(set(G0_TEXT))), "g1": expand(G1), "g8": expand(G8),
             "g2": "".join(sorted(g2)), "g3": "".join(sorted(g3)), "g4": "".join(sorted(g4))}
    ranges = {"g0": fmt(collapse(set(G0_TEXT))), "g1": fmt(G1), "g8": fmt(G8),
              "g2": fmt(collapse(g2)), "g3": fmt(collapse(g3)), "g4": fmt(collapse(g4))}
    for i, key in enumerate(("g5", "g6", "g7")):
        lo, hi = spans[i]
        chars[key] = "".join(c for c in tail if lo <= ord(c) <= hi)
        ranges[key] = f"U+{lo:04X}-{hi:04X}"

    # フォント本体を取得（Google Fonts のリポジトリから）
    for key, (path, _) in SOURCES.items():
        dst = WORK / f"{key}.src.ttf"
        if dst.exists():
            continue
        url = f"https://raw.githubusercontent.com/google/fonts/main/{path}"
        subprocess.run(["curl", "-sL", "-o", str(dst), url], check=True)

    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer

    for key, (_, weight) in SOURCES.items():
        src = WORK / f"{key}.src.ttf"
        master = WORK / f"{key}.master.ttf"
        if weight is None:
            master.write_bytes(src.read_bytes())
        else:  # 可変フォントは静的インスタンスへ変換してから切り出す
            instancer.instantiateVariableFont(TTFont(src), {"wght": weight}).save(master)
        for group, text in chars.items():
            txt = WORK / f"{group}.txt"
            txt.write_text(text, encoding="utf-8")
            subprocess.run([sys.executable, "-m", "fontTools.subset", str(master),
                            f"--text-file={txt}", "--flavor=woff2", "--layout-features=*",
                            "--no-hinting", "--desubroutinize",
                            f"--output-file={OUT / f'{key}.{group}.woff2'}"], check=True)

    lines = [
        "/* ===== 自己ホストの日本語フォント（Zen Maru Gothic / Noto Serif JP）=====",
        " * このファイルは scripts/build-fonts.py の生成物。直接編集しない。",
        " * JIS第1・第2水準を収録し、unicode-range で9グループに分割している。",
        " * 記事を追加してもフォントの作り直しは不要。",
        " * ライセンス: SIL Open Font License 1.1（public/fonts/v1/OFL-*.txt）",
        " *",
        " * 宣言順に意味がある。g5-g7（低頻度・広いコード範囲）を先に置き、",
        " * g1-g4/g8 を次に、最後に g0（ファーストビューの文字）を置く。重なる文字は後勝ちで、",
        " * 最初に見える文字は必ず g0（preload 済みの小さいファイル）から描画される。",
        " */",
    ]
    for key, family, weight in FACES:
        for group in ORDER:
            lines.append(
                f"@font-face{{font-family:'{family}';font-style:normal;font-weight:{weight};"
                f"font-display:swap;src:url('/fonts/v1/{key}.{group}.woff2') format('woff2');"
                f"unicode-range:{ranges[group]}}}"
            )
    lines += [
        "",
        "/* フォールバック（フォント到着前の字形ずれ＝CLS を抑えるための指標合わせ）。",
        " * 値は next/font が生成していたものを引き継いでいる。 */",
        "@font-face{font-family:'Zen Maru Gothic Fallback';src:local('Arial');"
        "ascent-override:117%;descent-override:29.05%;line-gap-override:0%;size-adjust:99.15%}",
        "@font-face{font-family:'Noto Serif JP Fallback';src:local('Times New Roman');"
        "ascent-override:95.04%;descent-override:23.62%;line-gap-override:0%;size-adjust:121.11%}",
    ]
    CSS.write_text("\n".join(lines) + "\n", encoding="utf-8")

    total = sum(p.stat().st_size for p in OUT.glob("*.woff2"))
    print(f"生成: {len(list(OUT.glob('*.woff2')))} ファイル / {total / 1048576:.2f} MB")
    print(f"CSS: {CSS} ({CSS.stat().st_size / 1024:.0f} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
