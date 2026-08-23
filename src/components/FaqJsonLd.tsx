import type { MarkdownFaqEntry } from "@/lib/markdown-faq";
import { SITE_ALLOW_SEARCH_INDEXING, SITE_URL } from "@/lib/site";

export type FaqJsonLdProps = {
  /** 掲載ページのパス（`/toolkit/ordinance/qa-public` など） */
  pathname: string;
  entries: readonly MarkdownFaqEntry[];
};

/**
 * 想定問答ページの Q&A を FAQPage として出力する。
 * 画面に表示されている問答のみを対象とし、AI・検索側が問答単位で読めるようにする。
 */
export function FaqJsonLd(props: FaqJsonLdProps) {
  if (!SITE_ALLOW_SEARCH_INDEXING) return null;
  if (props.entries.length === 0) return null;

  const pathname = props.pathname.startsWith("/")
    ? props.pathname
    : `/${props.pathname}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${SITE_URL}${pathname}`,
    inLanguage: "ja",
    mainEntity: props.entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
