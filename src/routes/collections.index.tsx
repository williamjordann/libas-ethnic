import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, productsIn } from "@/lib/products";

const TITLE = "All Collections — Pret, Unstitched, Co-ords & Formals | AIRA";
const DESCRIPTION =
  "Browse every AIRA collection: new arrivals, everyday pret, unstitched fabric, modern co-ords, embroidered formals and sale styles, delivered across Pakistan.";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/collections" },
    ],
    links: [{ rel: "canonical", href: "/collections" }],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-14">
      <p className="eyebrow text-muted-foreground">AIRA</p>
      <h1 className="mt-2 font-display text-4xl text-primary">Collections</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Every edit in one place — from lightweight everyday lawn to hand-embroidered formals.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/collections/$slug"
            params={{ slug: c.slug }}
            className="group block"
          >
            <img
              src={c.image}
              alt={`${c.title} collection by AIRA`}
              width={900}
              height={700}
              loading="lazy"
              className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <h2 className="mt-4 font-display text-2xl">{c.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.tagline}</p>
            <span className="link-underline mt-3 text-primary">
              {productsIn(c.slug).length} styles <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
