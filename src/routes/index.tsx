import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useCart } from "@/lib/cart";
import {
  categories,
  formatPrice,
  occasions,
  priceBands,
  products,
  type Product,
} from "@/lib/products";
import hero from "@/assets/hero-bloom.jpg";
import festive from "@/assets/festive-edit.jpg";
import brandStory from "@/assets/brand-story.jpg";
import promo from "@/assets/p-rania.jpg";
import lookMain from "@/assets/p-hania.jpg";

const TITLE = "AIRA — Pakistani Women's Pret, Unstitched & Formals Online";
const DESCRIPTION =
  "Shop AIRA's Summer '26 collection: embroidered lawn pret, unstitched suits, co-ords and chiffon formals. Nationwide delivery in Pakistan, cash on delivery and easy exchange.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: hero, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AIRA",
          potentialAction: {
            "@type": "SearchAction",
            target: "/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: Home,
});

const FILTERS = ["All", "Pret", "2 Piece", "3 Piece", "Formals"] as const;

function Home() {
  return (
    <>
      <Hero />
      <JustLanded />
      <ShopByCategory />
      <FestiveBanner />
      <ShopByOccasion />
      <MostLovedAndPrice />
      <LookAndStory />
      <SocialProof />
    </>
  );
}

function Hero() {
  return (
    <section className="relative">
      <img
        src={hero}
        alt="Model in a lilac embroidered lawn suit from the AIRA Summer '26 collection, seated in a rose garden"
        width={1920}
        height={900}
        fetchPriority="high"
        className="h-[62vh] min-h-[420px] w-full object-cover object-right lg:h-[70vh]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6">
          <div className="max-w-xl">
            <p className="eyebrow text-primary">Summer &rsquo;26</p>
            <h1 className="mt-3 font-display text-5xl leading-tight text-primary lg:text-6xl">
              A Season in Bloom
            </h1>
            <p className="mt-4 max-w-md text-sm text-foreground/80 lg:text-base">
              Lightweight silhouettes, effortless colour and intricate detail for every moment.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Link
                to="/collections/new-in"
                className="inline-flex items-center gap-3 bg-primary px-7 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase"
              >
                Shop the collection <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/collections/pret" className="link-underline text-primary">
                Discover Pret
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JustLanded() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const match = (p: Product) => {
    if (filter === "All") return true;
    if (filter === "Pret") return p.category === "pret";
    if (filter === "Formals") return p.category === "formals";
    return p.pieces === filter;
  };

  const list = products.filter(match).slice(0, 4);

  return (
    <section aria-labelledby="just-landed" className="mx-auto max-w-[1400px] px-4 py-14">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
        <div>
          <SectionHeading
            title="Just Landed"
            subtitle="The latest pieces, designed for right now."
            viewAllTo="/collections/new-in"
          >
            <div className="col-span-2 flex flex-wrap gap-5 text-[0.7rem] tracking-[0.16em] uppercase sm:col-auto">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={
                    filter === f
                      ? "border-b border-primary pb-1 text-primary"
                      : "pb-1 text-muted-foreground"
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </SectionHeading>
          <h2 id="just-landed" className="sr-only">
            Just landed at AIRA
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>

        <Link to="/collections/new-in" className="relative block overflow-hidden">
          <img
            src={promo}
            alt="Model wearing a mauve embroidered AIRA three piece suit"
            width={800}
            height={1000}
            loading="lazy"
            className="h-full min-h-72 w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-background/85 to-transparent p-8">
            <p className="font-display text-3xl leading-tight text-primary">
              Timeless
              <br />
              Styles
              <br />
              Modern You
            </p>
            <span className="link-underline mt-5 text-primary">
              Shop New In <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

function ShopByCategory() {
  const list = categories.filter((c) => ["pret", "co-ords", "formals", "unstitched"].includes(c.slug));
  return (
    <section aria-labelledby="shop-category" className="bg-secondary/50">
      <div className="mx-auto max-w-[1400px] px-4 py-14">
        <h2 id="shop-category" className="section-title">
          Shop by Category
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((c) => (
            <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="relative block overflow-hidden">
              <img
                src={c.image}
                alt={`${c.title} collection by AIRA`}
                width={900}
                height={700}
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 to-transparent p-6">
                <h3 className="font-display text-2xl tracking-wide text-espresso-foreground">
                  {c.title}
                </h3>
                <p className="mt-1 text-xs text-espresso-foreground/80">{c.tagline}</p>
                <span className="link-underline mt-4 text-espresso-foreground">
                  Shop Now <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FestiveBanner() {
  return (
    <section aria-labelledby="festive" className="relative bg-espresso">
      <img
        src={festive}
        alt="Model in a maroon embroidered gown surrounded by candlelight — the AIRA Festive Edit"
        width={1920}
        height={640}
        loading="lazy"
        className="h-[340px] w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-6 px-6">
          <div className="max-w-md">
            <h2 id="festive" className="font-display text-4xl text-espresso-foreground">
              The Festive Edit
            </h2>
            <p className="mt-2 text-sm text-espresso-foreground/80">
              Designed for evenings worth remembering.
            </p>
            <Link
              to="/collections/occasion"
              className="mt-6 inline-flex items-center gap-3 bg-primary px-7 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase"
            >
              Explore Festive <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="hidden text-right text-[0.7rem] leading-7 tracking-[0.3em] text-espresso-foreground/80 uppercase lg:block">
            Tradition
            <br />
            Meets
            <br />
            Tomorrow
          </p>
        </div>
      </div>
    </section>
  );
}

function ShopByOccasion() {
  return (
    <section aria-labelledby="shop-occasion" className="mx-auto max-w-[1400px] px-4 py-14">
      <h2 id="shop-occasion" className="section-title">
        Shop by Occasion
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {occasions.map((o) => (
          <Link key={o.slug} to="/collections/occasion" className="relative block overflow-hidden">
            <img
              src={o.image}
              alt={`${o.title} outfits by AIRA`}
              width={900}
              height={700}
              loading="lazy"
              className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-espresso/70 to-transparent p-5">
              <h3 className="font-display text-2xl text-espresso-foreground">{o.title}</h3>
              <p className="mt-1 text-xs text-espresso-foreground/80">{o.tagline}</p>
              <span className="link-underline mt-3 text-espresso-foreground">
                Shop Now <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function MostLovedAndPrice() {
  const loved = products.filter((p) => p.isLoved).slice(0, 4);
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-14 lg:grid-cols-2">
      <div>
        <SectionHeading
          title="Most Loved"
          subtitle="Styles our customers can't get enough of."
          viewAllTo="/collections"
        />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {loved.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="section-title">Shop by Price</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Something beautiful for every budget.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {priceBands.map((b) => (
            <Link
              key={b.slug}
              to="/collections/$slug"
              params={{ slug: "pret" }}
              search={{ price: b.slug }}
              className="flex h-44 flex-col justify-between bg-sand p-5"
            >
              <span className="font-display text-2xl whitespace-pre-line text-sand-foreground">
                {b.label}
              </span>
              <span className="link-underline text-sand-foreground">
                Shop Now <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function LookAndStory() {
  const { add } = useCart();
  const bundle = products.slice(0, 3);
  const bundleTotal = bundle.reduce((n, p) => n + p.price, 0);

  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative grid gap-6 bg-secondary/60 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-center lg:p-10">
        <img
          src={lookMain}
          alt="Model wearing a lilac AIRA lawn suit styled with matching pieces"
          width={800}
          height={1000}
          loading="lazy"
          className="h-72 w-full object-cover"
        />
        <div>
          <h2 className="font-display text-3xl">Complete the Look</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {bundle.map((p) => (
              <div key={p.slug} className="bg-background p-2 text-center">
                <img
                  src={p.image}
                  alt={p.name}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="h-24 w-full object-cover"
                />
                <p className="mt-2 text-[0.65rem] leading-tight">{p.name}</p>
                <p className="text-[0.65rem] text-muted-foreground">{formatPrice(p.price)}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              bundle.forEach((p) =>
                add({ slug: p.slug, name: p.name, price: p.price, image: p.image, size: "M" }),
              );
              toast.success(`3 pieces added to your bag — ${formatPrice(bundleTotal)}`);
            }}
            className="mt-5 inline-flex items-center gap-3 bg-primary px-7 py-3 text-xs tracking-[0.2em] text-primary-foreground uppercase"
          >
            Add all to bag <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 bg-background p-6 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] sm:items-center lg:p-10">
        <div>
          <h2 className="section-title">Designed for Her</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Born in Pakistan, AIRA celebrates contemporary femininity through thoughtful
            silhouettes, considered fabrics and clothing for the rhythm of modern life. Every piece
            is cut, embroidered and finished by artisans in Karachi.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-3 bg-primary px-7 py-3 text-xs tracking-[0.2em] text-primary-foreground uppercase"
          >
            Our Story <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="relative">
          <img
            src={brandStory}
            alt="AIRA founder story — woman in a pastel embroidered kameez"
            width={1000}
            height={1100}
            loading="lazy"
            className="h-72 w-full object-cover"
          />
          <p className="mt-3 text-right font-display text-lg leading-tight text-primary">
            More Women
            <br />
            Brighter Tomorrows
          </p>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  {
    name: "Ayesha K.",
    text: "Absolutely in love with the quality and fit. Will shop again!",
    image: products[0].image,
  },
  {
    name: "Sara M.",
    text: "Beautiful fabric and stitching. Exactly as shown on the website.",
    image: products[4].image,
  },
  {
    name: "Mahnoor S.",
    text: "Fast delivery and amazing customer service — thank you AIRA.",
    image: products[3].image,
  },
];

function SocialProof() {
  return (
    <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-14 lg:grid-cols-2">
      <div>
        <SectionHeading title="What Our Customers Say" viewAllTo="/contact" />
        <div className="mt-3 flex items-center gap-2">
          <span className="flex" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </span>
          <p className="text-sm text-muted-foreground">4.8 based on 1,240 verified customers</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="flex gap-3 bg-secondary/60 p-3">
              <img
                src={r.image}
                alt={`Customer ${r.name} wearing AIRA`}
                width={800}
                height={1000}
                loading="lazy"
                className="h-24 w-16 shrink-0 object-cover"
              />
              <div className="min-w-0">
                <span className="flex" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-2.5 w-2.5 fill-gold text-gold" />
                  ))}
                </span>
                <blockquote className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-[0.7rem]">&mdash; {r.name}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div>
        <SectionHeading title="Seen on You" subtitle="Real women. Real stories. Tag us to be featured." />
        <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">#AIRAWomen</p>
        <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-7">
          {products.slice(0, 7).map((p) => (
            <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }}>
              <img
                src={p.image}
                alt={`AIRA customer wearing ${p.name}`}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
