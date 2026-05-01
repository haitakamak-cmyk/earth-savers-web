import type { RelatedNavItem } from "@/lib/related-resources";

export function RelatedLinks({ items }: { items: RelatedNavItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10 rounded-xl border border-border bg-white/80 px-5 py-6 shadow-sm">
      <h2 className="font-serif text-lg font-semibold text-text-primary">関連リンク</h2>
      <ul className="mt-3 space-y-2.5 text-sm text-text-secondary">
        {items.map((item) => (
          <li key={item.href} className="rounded-lg border border-border/70 bg-ivory/50 px-3 py-2">
            <a href={item.href} className="text-aqua-dark underline underline-offset-2 hover:text-aqua">
              {item.label}
            </a>
            {item.description ? (
              <p className="mt-1 text-xs leading-relaxed text-text-muted">{item.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
