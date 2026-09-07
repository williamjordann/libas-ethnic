import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

const TITLE = "Your Shopping Bag — AIRA";
const DESCRIPTION = "Review the pieces in your AIRA shopping bag and check out with cash on delivery or secure card payment.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/cart" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 250;

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12">
      <h1 className="font-display text-4xl text-primary">Your Bag</h1>

      {lines.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-muted-foreground">Your bag is empty.</p>
          <Link
            to="/collections/new-in"
            className="mt-6 inline-block bg-primary px-8 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase"
          >
            Shop new in
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <ul className="divide-y divide-border border-y border-border">
            {lines.map((l) => (
              <li key={`${l.slug}-${l.size}`} className="grid grid-cols-[80px_minmax(0,1fr)_auto] gap-4 py-5">
                <img src={l.image} alt={l.name} width={800} height={1000} loading="lazy" className="h-28 w-20 object-cover" />
                <div className="min-w-0">
                  <h2 className="text-sm">
                    <Link to="/product/$slug" params={{ slug: l.slug }}>
                      {l.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">Size {l.size}</p>
                  <p className="mt-1 text-sm">{formatPrice(l.price)}</p>
                  <div className="mt-3 inline-flex items-center border border-border">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQty(l.slug, l.size, l.qty - 1)} className="px-3 py-2">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{l.qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQty(l.slug, l.size, l.qty + 1)} className="px-3 py-2">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${l.name}`}
                  onClick={() => remove(l.slug, l.size)}
                  className="self-start text-muted-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <aside className="h-fit bg-secondary/60 p-6">
            <h2 className="text-xs tracking-[0.2em] uppercase">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt>Total</dt>
                <dd>{formatPrice(subtotal + shipping)}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => {
                toast.success("Order placed — our team will confirm on WhatsApp shortly.");
                clear();
              }}
              className="mt-6 w-full bg-primary px-8 py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase"
            >
              Checkout
            </button>
            <p className="mt-3 text-xs text-muted-foreground">
              Cash on delivery available nationwide. Free delivery above Rs. 5,000.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
