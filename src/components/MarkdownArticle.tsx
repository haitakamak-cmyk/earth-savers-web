"use client";

import GithubSlugger from "github-slugger";
import type { Components } from "react-markdown";
import type { ReactNode } from "react";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

function toPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = (node as React.ReactElement<{ children?: ReactNode }>).props;
    return toPlainText(props.children);
  }
  return "";
}

function buildMarkdownComponents(slugger: GithubSlugger): Components {
  return {
    hr: () => <hr className="my-8 border-border" />,
    h1: ({ children, id: explicitId }) => {
      const text = toPlainText(children).trim();
      const slugId = text ? slugger.slug(text, true) : undefined;
      const id = explicitId ?? slugId;
      return (
        <h2
          id={id}
          className="scroll-mt-28 border-b border-wakakusa/35 pb-3 pt-2 font-serif text-2xl font-bold text-text-primary first:mt-0"
        >
          {children}
        </h2>
      );
    },
    h2: ({ children, id: explicitId }) => {
      const text = toPlainText(children).trim();
      const slugId = text ? slugger.slug(text, true) : undefined;
      const id = explicitId ?? slugId;
      return (
        <h3
          id={id}
          className="mt-10 scroll-mt-28 font-serif text-xl font-semibold text-text-primary"
        >
          {children}
        </h3>
      );
    },
    h3: ({ children, id: explicitId }) => {
      const text = toPlainText(children).trim();
      const slugId = text ? slugger.slug(text, true) : undefined;
      const id = explicitId ?? slugId;
      return (
        <h4 id={id} className="mt-6 scroll-mt-28 font-semibold text-text-primary">
          {children}
        </h4>
      );
    },
    p: ({ children }) => (
      <p className="mb-4 text-[15px] leading-[1.85] text-text-secondary [text-wrap:pretty]">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 list-inside list-disc space-y-1 pl-2 text-[15px]">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 list-inside list-decimal space-y-1 pl-2 text-[15px]">{children}</ol>
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
      <blockquote className="my-6 border-l-4 border-aqua bg-aqua-light/45 px-4 py-3 text-[14px] leading-relaxed text-text-secondary [&_p]:mb-2 [&_p:last-child]:mb-0">
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
        "break-words font-medium text-aqua-dark underline underline-offset-2 hover:text-aqua";
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
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-border bg-white shadow-sm">
        <table className="w-full min-w-[min(42rem,100%)] border-collapse text-left text-sm">{children}</table>
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
      const inline = !className;
      if (inline) {
        return (
          <code className="rounded bg-ivory-warm px-1 py-px font-mono text-[0.9em] text-text-primary">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-text-primary p-4 font-mono text-[13px] leading-relaxed text-ivory-warm whitespace-pre-wrap">
        {children}
      </pre>
    ),
  };
}

type MarkdownArticleProps = {
  markdown: string;
  className?: string;
  /** 読みやすい行長（解説記事など） */
  narrowProse?: boolean;
};

/** サイト内での長文化 Markdown 表示（表・見出しを含む）。見出しには GitHub 互換の id（日本語維持）を付与 */
export function MarkdownArticle({
  markdown,
  className = "",
  narrowProse = false,
}: MarkdownArticleProps) {
  const slugger = useMemo(() => new GithubSlugger(), []);
  slugger.reset();
  const markdownComponents = buildMarkdownComponents(slugger);

  return (
    <article
      className={`text-text-secondary ${narrowProse ? "max-w-[720px]" : ""} ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        remarkRehypeOptions={{
          footnoteLabel: "注・出典",
          footnoteLabelTagName: "h2",
          footnoteLabelProperties: {
            className: [
              "mt-12 scroll-mt-28 border-t border-border pt-8 font-serif text-xl font-semibold text-text-primary",
            ],
          },
        }}
        components={markdownComponents}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
