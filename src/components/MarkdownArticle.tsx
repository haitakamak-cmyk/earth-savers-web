"use client";

import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents: Components = {
  hr: () => <hr className="my-8 border-border" />,
  h1: ({ children }) => (
    <h2 className="scroll-mt-28 border-b border-wakakusa/35 pb-3 pt-2 font-serif text-2xl font-bold text-text-primary first:mt-0">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h3 className="mt-10 scroll-mt-28 font-serif text-xl font-semibold text-text-primary">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="mt-6 scroll-mt-28 font-semibold text-text-primary">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-[15px] leading-relaxed">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-inside list-disc space-y-1 pl-2 text-[15px]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-inside list-decimal space-y-1 pl-2 text-[15px]">{children}</ol>
  ),
  li: ({ children }) => <li className="marker:text-text-muted">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-aqua bg-aqua-light/45 px-4 py-3 text-[14px] leading-relaxed text-text-secondary [&_p]:mb-2 [&_p:last-child]:mb-0">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => {
    const raw = typeof href === "string" ? href : "";
    const external = /^https?:\/\//i.test(raw);
    return (
      <a
        href={raw || undefined}
        className="break-words text-aqua-dark underline underline-offset-2 hover:text-aqua"
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
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
        <code className="rounded bg-ivory-warm px-1 py-px text-[0.9em] text-text-primary">{children}</code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg border border-border bg-text-primary p-4 text-[13px] leading-relaxed text-ivory-warm whitespace-pre-wrap">
      {children}
    </pre>
  ),
};

type MarkdownArticleProps = {
  markdown: string;
  /** 見出し階調整のみ（複数ページに同コンポーネントを載せない想定では未使用） */
  className?: string;
};

/** サイト内での長文化 Markdown 表示（表・見出しを含む） */
export function MarkdownArticle({ markdown, className = "" }: MarkdownArticleProps) {
  return (
    <article className={`text-text-secondary ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
