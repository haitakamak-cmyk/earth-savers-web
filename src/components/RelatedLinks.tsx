import type { RelatedNavItem } from "@/lib/related-resources";

export function RelatedLinks({ items }: { items: RelatedNavItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10 rounded-xl border border-border bg-white/80 px-5 py-6 shadow-sm">
      <h2 className="font-serif text-lg font-semibold text-text-primary">関連リンク</h2>
      <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-text-secondary">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-aqua-dark underline underline-offset-2 hover:text-aqua"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
