/**
 * 各リソースページ先頭に置く要旨ブロック（目安100〜200字）。
 */
export function ResourceLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-8 border-l-4 border-wakakusa bg-wakakusa-light/60 px-4 py-3 text-sm leading-relaxed text-text-secondary sm:text-[15px]">
      {children}
    </p>
  );
}
