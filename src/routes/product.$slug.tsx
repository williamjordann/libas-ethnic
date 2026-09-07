import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, MessageCircle, RefreshCw, Truck } from "lucide-react";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct, products, WHATSAPP_NUMBER } from "@/lib/products";

const SIZES = ["XS", "S", "M", "L", "XL"];

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — AIRA" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    const title = `${p.name} — ${formatPrice(p.price)} | AIRA`;
    const description = `${p.description} Shop ${p.name} online in Pakistan with cash on delivery and easy exchange.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/product/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/product/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            material: p.fabric,
            brand: { "@type": "Brand", name: "AIRA" },
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "PKR",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "1240",
            },
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState("M");

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
        <Link to="/">Home</Link> /{" "}
        <Link to="/collections/$slug" params={{ slug: product.category }}>
          {product.category}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <img
          src={product.image}
          alt={`${product.name} — ${product.fabric}`}
          width={800}
          height={1000}
          className="w-full bg-secondary object-cover"
        />

        <div>
          <h1 className="font-display text-4xl text-primary">{product.name}</h1>
          <p className="mt-3 text-lg">
            {formatPrice(product.price)}
            {product.compareAt && (
              <span className="ml-3 text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Fabric:</dt>
              <dd>{product.fabric}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Pieces:</dt>
              <dd>{product.pieces}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Colours:</dt>
              <dd>{product.colors.join(", ")}</dd>
            </div>
          </dl>

          <fieldset className="mt-8">
            <legend className="text-xs tracking-[0.2em] uppercase">Select size</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`h-11 w-12 border text-sm ${
                    size === s ? "border-primary bg-primary text-primary-foreground" : "border-border"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <Link to="/size-guide" className="mt-3 inline-block text-xs text-muted-foreground underline">
              Size guide
            </Link>
          </fieldset>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                add({
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  size,
                });
                toast.success(`${product.name} (${size}) added to your bag`);
              }}
              className="flex-1 bg-primary px-8 py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase"
            >
              Add to bag
            </button>
            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={() => toast("Saved to your wishlist")}
              className="border border-border px-5 py-4"
            >
              <Heart className="h-4 w-4" />
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi AIRA, I'd like to order ${product.name}`)}`}
              className="flex items-center gap-2 border border-border px-5 py-4 text-xs tracking-[0.2em] uppercase"
            >
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>
          </div>

          <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-primary" /> Free nationwide delivery on orders above Rs. 5,000
            </li>
            <li className="flex items-center gap-3">
              <RefreshCw className="h-4 w-4 text-primary" /> Easy 7 day exchange across Pakistan
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
