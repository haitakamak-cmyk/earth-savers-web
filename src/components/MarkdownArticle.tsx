"use client";

import GithubSlugger from "github-slugger";
import type { Element, Nodes, RootContent } from "hast";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ArticleFontSizeControl } from "./ArticleFontSizeControl";

function normalizeClassName(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.filter(Boolean).join(" ");
  return undefined;
}

/** GFM 脚注の定義（`user-content-fn-1` や衝突回避の `user-content-fn-uk-ecstea` 等。`fnref` とは異なるので fn- で始まる） */
function isFootnoteDefinitionListId(id: unknown): boolean {
  return typeof id === "string" && /^user-content-fn-/.test(id);
}

/** GFM 脚注の本文側参照（↩ で戻るときのスクロール先） */
function isFootnoteRefAnchorId(id: unknown): boolean {
  return typeof id === "string" && /^user-content-fnref-/.test(id);
}

const HEADING_TAG_NAMES = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

function hastToPlainText(node: Nodes | RootContent): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(hastToPlainText).join("");
  return "";
}

/**
 * 見出しの id を hast（HTML 変換後の木）の段階で確定させる rehype プラグイン。
 *
 * github-slugger は「同じ文字列が2回目なら -1 を付ける」可変カウンタを持つ。これを
 * React の render 中に呼ぶと、StrictMode が見出しコンポーネントを2回呼び出す開発時に
 * 2回目が `要旨-1` となり、SSR 側の `要旨` と食い違って hydration mismatch になる。
 * 変換段階なら slugger は1パースにつき1つで完結し、render を純粋に保てる。
 */
function rehypeHeadingSlugIds() {
  return (tree: Nodes) => {
    const slugger = new GithubSlugger();
    const visit = (node: Nodes | RootContent) => {
      if (node.type === "element" && HEADING_TAG_NAMES.has(node.tagName)) {
        const element = node as Element;
        // 脚注ラベル（id="footnote-label"）など、既に id を持つ見出しは触らない
        if (element.properties.id == null) {
          const text = hastToPlainText(element).trim();
          if (text) element.properties.id = slugger.slug(text, true);
        }
      }
      if ("children" in node) node.children.forEach(visit);
    };
    visit(tree);
  };
}

/** id は rehypeHeadingSlugIds が hast 上で確定済み。render 側は受け取るだけにして純粋に保つ */
function buildMarkdownComponents(): Components {
  return {
    hr: () => <hr className="my-8 border-border" />,
    h1: ({ children, id }) => {
      return (
        <h2
          id={id}
          className="scroll-mt-28 border-b border-wakakusa/35 pb-3 pt-2 font-serif text-[1.8em] leading-[1.33] font-bold text-text-primary first:mt-0"
        >
          {children}
        </h2>
      );
    },
    // 脚注ラベル「注・出典」は footnoteLabelProperties で class を渡してくる。
    // 既定値と混ぜると mt-10 と mt-12 のように打ち消し合う指定が並ぶため、
    // 渡された場合はそちらを採用する（本文の見出しには class が付かない）
    h2: ({ children, id, className }) => {
      return (
        <h3
          id={id}
          className={
            normalizeClassName(className) ??
            "mt-10 scroll-mt-28 font-serif text-[1.5em] leading-[1.4] font-semibold text-text-primary"
          }
        >
          {children}
        </h3>
      );
    },
    h3: ({ children, id }) => {
      return (
        <h4 id={id} className="mt-6 scroll-mt-28 font-semibold text-text-primary">
          {children}
        </h4>
      );
    },
    // text-wrap:pretty は欧文の孤立語対策。日本語では行長を詰めて右端が空くうえ、
    // エンジンごとに挙動が異なるため使わない（iOS Safari で右端が大きく空く事象）
    p: ({ children }) => (
      <p className="mb-4 text-[1em] leading-[1.85] text-text-secondary">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 list-inside list-disc space-y-1 pl-2 text-[1em]">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 list-inside list-decimal space-y-1 pl-2 text-[1em]">{children}</ol>
    ),
    li: ({ children, id }) => (
      <li
        id={id}
        className={
          isFootnoteDefinitionListId(id)
            ? "scroll-mt-28 marker:text-text-muted"
            : "marker:text-text-muted"
        }
      >
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-aqua bg-aqua-light/45 px-4 py-3 text-[0.93em] leading-relaxed text-text-secondary [&_p]:mb-2 [&_p:last-child]:mb-0">
        {children}
      </blockquote>
    ),
    a: ({
      href,
      children,
      className,
      id,
      // react-markdown（ExtraProps）は mdast を `node` に渡す。DOM に出さない
      node: _omitMarkdownNode,
      ...rest
    }) => {
      void _omitMarkdownNode;
      const raw = typeof href === "string" ? href : "";
      const external = /^https?:\/\//i.test(raw);
      const proseDefault =
        "break-words font-medium text-aqua-dark underline underline-offset-2 hover:text-aqua-deep";
      const merged =
        normalizeClassName(className) === undefined ? proseDefault : `${proseDefault} ${normalizeClassName(className)}`;
      const footnoteScroll = isFootnoteRefAnchorId(id) ? " scroll-mt-28" : "";
      return (
        <a
          {...rest}
          id={id}
          href={raw || undefined}
          className={`${merged}${footnoteScroll}`}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
          {external ? (
            <span className="sr-only">（外部サイトを別タブで開く）</span>
          ) : null}
        </a>
      );
    },
    // 表の最低幅・1列目の固定・行の縞は globals.css の .markdown-article 側で指定する
    // （メディアクエリと列数別の指定が要るため、arbitrary variant では読めなくなる）
    // スクロールの案内は4列以上のときだけ CSS で表示する
    table: ({ children }) => (
      <div className="table-block my-6">
        <p className="table-scroll-hint mb-1 text-right text-xs text-text-muted print:hidden">
          横にスクロールできます →
        </p>
        <div className="overflow-x-auto rounded-lg border border-border bg-white shadow-sm">
          <table className="w-full min-w-[min(42rem,100%)] border-collapse text-left text-[1.05em] leading-[1.43]">
            {children}
          </table>
        </div>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-wakakusa-light">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="border-border border px-3 py-2 font-semibold text-text-primary">{children}</th>
    ),
    td: ({ children }) => (
      <td className="border-border border px-3 py-2 align-top text-text-secondary">{children}</td>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    code: ({ className, children }) => {
      const text = String(children ?? "");
      // language-xxx がある、または改行を含むならブロック（言語なしフェンス対策）
      const isBlock = Boolean(className) || text.includes("\n");
      if (isBlock) {
        return <code className={className}>{children}</code>;
      }
      return (
        <code className="rounded bg-ivory-warm px-1 py-px font-mono text-[0.9em] text-text-primary">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-text-primary p-4 font-mono text-[0.87em] leading-relaxed text-ivory-warm whitespace-pre-wrap [&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit [&_code]:text-[inherit]">
        {children}
      </pre>
    ),
  };
}

const markdownComponents = buildMarkdownComponents();

/** 同じ脚注を本文で複数回使ったとき、↩ が複数並ぶ（それぞれ別の参照へ戻る）。上付きの²は「2か所目」の意味 */
function footnoteBackContentJa(
  _referenceIndex: number,
  rereferenceIndex: number,
): { type: "text"; value: string }[] {
  if (rereferenceIndex <= 1) return [{ type: "text", value: "↩" }];
  return [
    { type: "text", value: "↩" },
    { type: "text", value: `（${String(rereferenceIndex)}か所目）` },
  ];
}

function footnoteBackLabelJa(referenceIndex: number, rereferenceIndex: number): string {
  const ordinal = referenceIndex + 1;
  return `本文で「注${ordinal}」を使っている${rereferenceIndex}か所目の位置へ戻る`;
}

type MarkdownArticleProps = {
  markdown: string;
  className?: string;
  /** 読みやすい行長（解説記事など） */
  narrowProse?: boolean;
  /** 文字サイズ切替を出さない（短い断片を差し込む用途など） */
  hideFontSizeControl?: boolean;
};

/** サイト内での長文化 Markdown 表示（表・見出しを含む）。見出しには GitHub 互換の id（日本語維持）を付与 */
export function MarkdownArticle({
  markdown,
  className = "",
  narrowProse = false,
  hideFontSizeControl = false,
}: MarkdownArticleProps) {
  return (
    <article
      className={`markdown-article text-text-secondary ${narrowProse ? "max-w-[720px]" : ""} ${className}`}
    >
      {hideFontSizeControl ? null : <ArticleFontSizeControl />}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHeadingSlugIds]}
        remarkRehypeOptions={{
          footnoteLabel: "注・出典",
          footnoteLabelTagName: "h2",
          footnoteLabelProperties: {
            className: [
              "mt-12 scroll-mt-28 border-t border-border pt-8 font-serif text-[1.5em] leading-[1.4] font-semibold text-text-primary",
            ],
          },
          footnoteBackContent: footnoteBackContentJa,
          footnoteBackLabel: footnoteBackLabelJa,
        }}
        components={markdownComponents}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
