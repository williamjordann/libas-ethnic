import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { searchProducts } from "@/lib/products";

const TITLE = "Search — AIRA";
const DESCRIPTION = "Search AIRA for lawn suits, co-ords, unstitched fabric and embroidered formals by name, colour or occasion.";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/search" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [term, setTerm] = useState(q);
  const results = searchProducts(q);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12">
      <h1 className="font-display text-4xl text-primary">Search</h1>

      <form
        className="mt-6 flex max-w-xl border border-border"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/search", search: { q: term } });
        }}
      >
        <label htmlFor="site-search" className="sr-only">
          Search products
        </label>
        <input
          id="site-search"
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for dresses, colours, occasions..."
          className="min-w-0 flex-1 bg-background px-4 py-3 text-sm outline-none"
        />
        <button type="submit" aria-label="Search" className="bg-primary px-5 text-primary-foreground">
          <SearchIcon className="h-4 w-4" />
        </button>
      </form>

      {q && (
        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
        </p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {q && results.length === 0 && (
        <p className="py-16 text-sm text-muted-foreground">
          Nothing matched that search. Try &ldquo;lawn&rdquo;, &ldquo;chiffon&rdquo; or &ldquo;co-ord&rdquo;.
        </p>
      )}
    </div>
  );
}
