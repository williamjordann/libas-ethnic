import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";

const SWATCH: Record<string, string> = {
  "Dusty Rose": "oklch(0.72 0.06 20)",
  Black: "oklch(0.25 0 0)",
  Blush: "oklch(0.88 0.05 25)",
  Ivory: "oklch(0.94 0.02 85)",
  Teal: "oklch(0.5 0.07 210)",
  Sand: "oklch(0.85 0.04 80)",
  Olive: "oklch(0.55 0.06 120)",
  Maroon: "oklch(0.35 0.1 15)",
  Gold: "oklch(0.75 0.09 80)",
  Rose: "oklch(0.65 0.13 15)",
  Stone: "oklch(0.75 0.02 80)",
  Lilac: "oklch(0.78 0.07 300)",
  Mint: "oklch(0.85 0.05 160)",
  Mauve: "oklch(0.62 0.05 320)",
  Emerald: "oklch(0.5 0.1 155)",
  Coral: "oklch(0.7 0.13 35)",
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden bg-secondary">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.image}
            alt={`${product.name} — ${product.fabric}`}
            width={800}
            height={1000}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {product.tag && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 text-[0.6rem] tracking-[0.18em] uppercase ${
              product.tag === "SALE"
                ? "bg-sale text-primary-foreground"
                : product.tag === "BESTSELLER"
                  ? "bg-espresso text-espresso-foreground"
                  : "bg-background text-foreground"
            }`}
          >
            {product.tag}
          </span>
        )}
        <button
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
          className="absolute top-3 right-3 rounded-full bg-background/80 p-1.5 text-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="pt-3">
        <h3 className="font-sans text-sm text-foreground">
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatPrice(product.price)}
          {product.compareAt && (
            <span className="ml-2 text-xs line-through opacity-70">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </p>
        <div className="mt-2 flex gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c}
              title={c}
              className="h-3 w-3 rounded-full border border-border"
              style={{ backgroundColor: SWATCH[c] ?? "oklch(0.8 0.02 80)" }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
