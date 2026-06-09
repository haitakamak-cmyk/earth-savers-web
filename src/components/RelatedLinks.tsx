import type { RelatedNavItem } from "@/lib/related-resources";

export function RelatedLinks({ items }: { items: RelatedNavItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="related-links-heading">
      <div className="flex items-baseline gap-3">
        <span aria-hidden className="h-px w-8 shrink-0 bg-wakakusa/70" />
        <h2
          id="related-links-heading"
          className="font-serif text-lg font-semibold tracking-tight text-text-primary"
        >
          次に読む
        </h2>
      </div>
      <p className="mt-1 pl-11 text-xs text-text-muted">この記事と地続きの話題</p>

      <ul className="mt-5 divide-y divide-border/60">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="group -mx-2 flex items-start gap-3 rounded-md px-2 py-3 outline-none transition-colors hover:bg-wakakusa-light/40 focus-visible:bg-wakakusa-light/50 focus-visible:ring-2 focus-visible:ring-wakakusa/50"
            >
              <span
                aria-hidden
                className="mt-1.5 h-4 w-px shrink-0 bg-border transition-[background-color,height] group-hover:bg-wakakusa motion-safe:group-hover:h-5"
              />
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-medium text-text-primary">
                  {item.label}
                  <span
                    aria-hidden
                    className="text-aqua-dark transition-transform motion-safe:group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
                {item.description ? (
                  <span className="mt-0.5 block text-xs leading-relaxed text-text-muted">
                    {item.description}
                  </span>
                ) : null}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
