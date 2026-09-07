import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { getCategory, productsIn, type Product } from "@/lib/products";

type Search = { price?: string; sort?: string };

const PRICE_BANDS: Record<string, (p: Product) => boolean> = {
  "under-3000": (p) => p.price < 3000,
  "under-5000": (p) => p.price < 5000,
  "under-8000": (p) => p.price < 8000,
  "luxury-edit": (p) => p.price >= 8000,
};

export const Route = createFileRoute("/collections/$slug")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    price: typeof search.price === "string" ? search.price : undefined,
    sort: typeof search.sort === "string" ? search.sort : undefined,
  }),
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return { title: category.title, tagline: category.tagline, description: category.description };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Collection not found — AIRA" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — Women's ${loaderData.title} Online in Pakistan | AIRA`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/collections/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/collections/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Collections", item: "/collections" },
              {
                "@type": "ListItem",
                position: 3,
                name: loaderData.title,
                item: `/collections/${params.slug}`,
              },
            ],
          }),
        },
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const { price } = Route.useSearch();
  const data = Route.useLoaderData();
  const [sort, setSort] = useState("featured");
  const [band, setBand] = useState(price ?? "all");

  let list = productsIn(slug);
  if (band !== "all" && PRICE_BANDS[band]) list = list.filter(PRICE_BANDS[band]);
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
        <Link to="/">Home</Link> / <Link to="/collections">Collections</Link> /{" "}
        <span className="text-foreground">{data.title}</span>
      </nav>

      <header className="mt-6">
        <h1 className="font-display text-4xl text-primary">{data.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{data.tagline}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {data.description}
        </p>
      </header>

      <div className="mt-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-y border-border py-3 sm:flex sm:justify-between">
        <div className="flex min-w-0 flex-wrap gap-4 text-[0.7rem] tracking-[0.16em] uppercase">
          {["all", "under-3000", "under-5000", "under-8000", "luxury-edit"].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBand(b)}
              className={band === b ? "border-b border-primary pb-1 text-primary" : "pb-1 text-muted-foreground"}
            >
              {b === "all" ? "All prices" : b.replace("-", " ").replace("under ", "Under Rs. ")}
            </button>
          ))}
        </div>
        <label className="shrink-0 text-xs text-muted-foreground">
          <span className="sr-only">Sort products</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-border bg-background px-3 py-2 text-xs uppercase"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>

      {list.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted-foreground">
          No pieces match this filter yet. Try another price range.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
