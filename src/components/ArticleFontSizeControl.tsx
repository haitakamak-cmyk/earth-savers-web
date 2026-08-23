"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "article-font-scale";
const CSS_VAR = "--article-scale";

/** 本文の拡大率。既定は「中」＝1。値は layout.tsx の先読みスクリプトと共有する */
const STEPS = [
  { label: "小", scale: "0.9" },
  { label: "中", scale: "1" },
  { label: "大", scale: "1.15" },
  { label: "特大", scale: "1.35" },
] as const;

/**
 * 現在値は html 要素の CSS 変数そのものを見る。
 * localStorage の値は layout.tsx の先読みスクリプトが描画前に当てているため、
 * ここで localStorage を読み直して state に入れ直す必要はない。
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): string {
  const v = document.documentElement.style.getPropertyValue(CSS_VAR).trim();
  return v || "1";
}

function getServerSnapshot(): string {
  return "1";
}

function setScale(scale: string) {
  document.documentElement.style.setProperty(CSS_VAR, scale);
  try {
    localStorage.setItem(STORAGE_KEY, scale);
  } catch {
    // 保存できなくても表示は切り替わる（プライベートブラウズ等）
  }
  listeners.forEach((fn) => fn());
}

/**
 * 記事本文の文字サイズ切替。
 * 拡大率は html 要素の CSS 変数 `--article-scale` に入れ、`.markdown-article` の
 * font-size がそれを掛ける（本文・見出し・表・引用がまとめて拡大縮小する）。
 * 選択は localStorage に残り、次回以降は描画前に反映される。
 */
export function ArticleFontSizeControl() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="mb-6 flex items-center justify-end gap-2 print:hidden">
      <span className="text-xs text-text-muted">文字サイズ</span>
      <div
        role="group"
        aria-label="本文の文字サイズ"
        className="inline-flex overflow-hidden rounded-lg border border-border bg-white"
      >
        {STEPS.map((step, i) => {
          const active = step.scale === current;
          return (
            <button
              key={step.scale}
              type="button"
              aria-pressed={active}
              onClick={() => setScale(step.scale)}
              className={`min-w-11 px-3 py-1.5 text-sm transition-colors ${
                i > 0 ? "border-l border-border" : ""
              } ${
                active
                  ? "bg-wakakusa-light font-semibold text-text-primary"
                  : "text-text-secondary hover:bg-ivory-warm"
              }`}
            >
              {step.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
