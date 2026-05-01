import { SITE_ALLOW_SEARCH_INDEXING, SITE_URL } from "@/lib/site";

export type CrumbItem = { name: string; path: string };

function normalizePath(path: string) {
  if (!path.startsWith("/")) return `/${path}`;
  return path;
}

/** BreadcrumbList（`SITE_ALLOW_SEARCH_INDEXING === false` のときは出力しない） */
export function BreadcrumbJsonLd({ items }: { items: readonly CrumbItem[] }) {
  if (!SITE_ALLOW_SEARCH_INDEXING) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${normalizePath(item.path)}`,
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
