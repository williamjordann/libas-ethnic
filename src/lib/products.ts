/**
 * Static catalogue for the AIRA storefront.
 * Swap this module for a database/API layer without touching the UI.
 */
import pZara from "@/assets/p-zara.jpg";
import pAlina from "@/assets/p-alina.jpg";
import pMeher from "@/assets/p-meher.jpg";
import pAyla from "@/assets/p-ayla.jpg";
import pHania from "@/assets/p-hania.jpg";
import pRania from "@/assets/p-rania.jpg";
import pSana from "@/assets/p-sana.jpg";
import pEmaan from "@/assets/p-emaan.jpg";
import catPret from "@/assets/cat-pret.jpg";
import catCoords from "@/assets/cat-coords.jpg";
import catFormals from "@/assets/cat-formals.jpg";
import catUnstitched from "@/assets/cat-unstitched.jpg";

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  image: string;
  category: "pret" | "co-ords" | "formals" | "unstitched";
  occasion: "everyday" | "work" | "festive" | "wedding-guest";
  pieces: "2 Piece" | "3 Piece" | "Co-ord" | "Formal";
  tag?: "NEW" | "BESTSELLER" | "SALE";
  colors: string[];
  fabric: string;
  description: string;
  isNew?: boolean;
  isLoved?: boolean;
};

export const products: Product[] = [
  {
    slug: "zara-embroidered-lawn-3-piece",
    name: "Zara Embroidered Lawn 3 Piece",
    price: 5490,
    image: pZara,
    category: "pret",
    occasion: "everyday",
    pieces: "3 Piece",
    tag: "NEW",
    colors: ["Dusty Rose", "Black", "Blush"],
    fabric: "Embroidered lawn shirt, cambric trouser, chiffon dupatta",
    description:
      "A softly structured lawn three piece with hand-guided thread embroidery across the front panel. Cut for everyday ease in Karachi summers, finished with a lightweight chiffon dupatta.",
    isNew: true,
  },
  {
    slug: "alina-printed-2-piece",
    name: "Alina Printed 2 Piece",
    price: 3990,
    image: pAlina,
    category: "pret",
    occasion: "everyday",
    pieces: "2 Piece",
    tag: "NEW",
    colors: ["Ivory", "Teal", "Sand"],
    fabric: "Printed lawn shirt and trouser",
    description:
      "An ivory printed two piece scattered with fine botanical motifs. Breathable lawn, relaxed straight cut, and a trouser that moves from morning errands to evening tea.",
    isNew: true,
  },
  {
    slug: "meher-embroidered-chiffon-3-piece",
    name: "Meher Embroidered Chiffon 3 Piece",
    price: 8990,
    image: pMeher,
    category: "formals",
    occasion: "festive",
    pieces: "3 Piece",
    tag: "BESTSELLER",
    colors: ["Olive", "Maroon", "Gold", "Rose"],
    fabric: "Embroidered chiffon shirt, raw silk trouser, embroidered dupatta",
    description:
      "Olive chiffon layered with sequin and zari work along the hem and neckline. A quietly grand choice for mehndi evenings and family dinners.",
    isLoved: true,
  },
  {
    slug: "ayla-co-ord-set",
    name: "Ayla Co-ord Set",
    price: 4990,
    image: pAyla,
    category: "co-ords",
    occasion: "work",
    pieces: "Co-ord",
    tag: "NEW",
    colors: ["Black", "Sand", "Stone"],
    fabric: "Textured viscose blend",
    description:
      "A clean black co-ord: an easy shirt with a wide-leg trouser in a fluid viscose blend. Wear it head to toe, or split the pieces across the week.",
    isNew: true,
  },
  {
    slug: "hania-printed-lawn-2-piece",
    name: "Hania Printed Lawn 2 Piece",
    price: 3490,
    image: pHania,
    category: "pret",
    occasion: "everyday",
    pieces: "2 Piece",
    colors: ["Lilac", "Mint"],
    fabric: "Printed lawn shirt and trouser",
    description:
      "Lilac lawn printed with a soft paisley trail, paired with a matching straight trouser. Light, forgiving and endlessly repeatable.",
    isLoved: true,
  },
  {
    slug: "rania-embroidered-3-piece",
    name: "Rania Embroidered 3 Piece",
    price: 6990,
    compareAt: 8990,
    image: pRania,
    category: "formals",
    occasion: "wedding-guest",
    pieces: "3 Piece",
    tag: "SALE",
    colors: ["Mauve", "Ivory"],
    fabric: "Embroidered cotton silk with organza dupatta",
    description:
      "Mauve cotton silk with gold embroidery framing the neckline and hem, finished with a bordered dupatta. Made for weddings where you would rather glow than shout.",
    isLoved: true,
  },
  {
    slug: "sana-co-ord-set",
    name: "Sana Co-ord Set",
    price: 4490,
    image: pSana,
    category: "co-ords",
    occasion: "work",
    pieces: "Co-ord",
    colors: ["Black", "Olive"],
    fabric: "Washed linen blend",
    description:
      "A washed linen co-ord in true black. Softens with every wear, holds its shape through a full working day.",
    isLoved: true,
  },
  {
    slug: "emaan-formal-chiffon",
    name: "Emaan Formal Chiffon",
    price: 9990,
    image: pEmaan,
    category: "formals",
    occasion: "wedding-guest",
    pieces: "Formal",
    tag: "BESTSELLER",
    colors: ["Maroon", "Black"],
    fabric: "Embroidered chiffon gown with inner slip",
    description:
      "A deep maroon chiffon gown with a hand-embellished bodice and a heavily worked hem. Full skirt, quiet drama.",
    isLoved: true,
  },
  {
    slug: "noor-unstitched-printed-suit",
    name: "Noor Unstitched Printed Suit",
    price: 2890,
    image: catUnstitched,
    category: "unstitched",
    occasion: "everyday",
    pieces: "3 Piece",
    tag: "NEW",
    colors: ["Emerald", "Coral"],
    fabric: "Unstitched printed lawn — shirt, trouser and dupatta",
    description:
      "Three unstitched pieces of digitally printed lawn in a dense garden print. Tailor it exactly the way you like to wear it.",
    isNew: true,
  },
  {
    slug: "amal-everyday-pret-suit",
    name: "Amal Everyday Pret Suit",
    price: 3290,
    image: catPret,
    category: "pret",
    occasion: "everyday",
    pieces: "2 Piece",
    colors: ["Ivory", "Sand"],
    fabric: "Slub cotton shirt and trouser",
    description:
      "An undyed slub cotton suit with fine tonal detailing at the placket. The plainest, most useful thing in a wardrobe.",
  },
  {
    slug: "inaya-maroon-co-ord",
    name: "Inaya Maroon Co-ord",
    price: 5290,
    image: catCoords,
    category: "co-ords",
    occasion: "work",
    pieces: "Co-ord",
    colors: ["Maroon"],
    fabric: "Satin-finish crepe",
    description:
      "A maroon satin-crepe shirt and trouser set with a soft collar and pressed front. The polished end of the work edit.",
  },
  {
    slug: "layla-black-formal-gown",
    name: "Layla Black Formal Gown",
    price: 11990,
    compareAt: 13990,
    image: catFormals,
    category: "formals",
    occasion: "festive",
    pieces: "Formal",
    tag: "SALE",
    colors: ["Black", "Gold"],
    fabric: "Embroidered net over silk with dupatta",
    description:
      "Black net worked with antique gold embroidery over a silk lining, finished with a matching dupatta. For the evening you dress up for.",
  },
];

export type CategoryDef = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  filter: (p: Product) => boolean;
};

export const categories: CategoryDef[] = [
  {
    slug: "new-in",
    title: "New In",
    tagline: "The latest pieces, designed for right now",
    description:
      "Fresh arrivals from AIRA: new lawn, chiffon and co-ord styles added to the studio this week, with nationwide delivery across Pakistan.",
    image: pZara,
    filter: (p) => Boolean(p.isNew),
  },
  {
    slug: "pret",
    title: "Pret",
    tagline: "Everyday elegance",
    description:
      "Ready-to-wear lawn and cotton suits for daily wear — breathable fabrics, easy cuts and colours that work through a Karachi summer.",
    image: catPret,
    filter: (p) => p.category === "pret",
  },
  {
    slug: "co-ords",
    title: "Co-ords",
    tagline: "Modern & effortless",
    description:
      "Matched shirt-and-trouser sets in fluid fabrics. Wear them together for a finished look, or split them across the week.",
    image: catCoords,
    filter: (p) => p.category === "co-ords",
  },
  {
    slug: "formals",
    title: "Formals",
    tagline: "For your special moments",
    description:
      "Embroidered chiffon, net and silk formals for mehndis, weddings and dinners — hand-finished detailing with a modern silhouette.",
    image: catFormals,
    filter: (p) => p.category === "formals",
  },
  {
    slug: "unstitched",
    title: "Unstitched",
    tagline: "A canvas of possibilities",
    description:
      "Unstitched printed and embroidered fabric in two and three piece sets, ready for your own tailor and your own fit.",
    image: catUnstitched,
    filter: (p) => p.category === "unstitched",
  },
  {
    slug: "occasion",
    title: "Occasion",
    tagline: "Dressed for the moment",
    description:
      "Festive and wedding-guest pieces from AIRA — embroidered formals and statement gowns for evenings worth remembering.",
    image: catFormals,
    filter: (p) => p.occasion === "festive" || p.occasion === "wedding-guest",
  },
  {
    slug: "sale",
    title: "Sale",
    tagline: "Loved styles, reduced",
    description:
      "Reduced pieces from past AIRA collections while stock lasts. Free delivery on orders above Rs. 5,000.",
    image: pRania,
    filter: (p) => Boolean(p.compareAt),
  },
];

export const occasions = [
  { slug: "everyday", title: "Everyday", tagline: "Clean, comfortable, confident", image: catPret },
  { slug: "work", title: "Work Edit", tagline: "Polished for progress", image: catCoords },
  { slug: "festive", title: "Festive", tagline: "Celebrate in style", image: pMeher },
  { slug: "wedding-guest", title: "Wedding Guest", tagline: "For unforgettable days", image: pRania },
];

export const priceBands = [
  { slug: "under-3000", label: "Under\nRs. 3,000", max: 3000 },
  { slug: "under-5000", label: "Under\nRs. 5,000", max: 5000 },
  { slug: "under-8000", label: "Under\nRs. 8,000", max: 8000 },
  { slug: "luxury-edit", label: "Luxury\nEdit", max: Infinity, min: 8000 },
] as const;

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (slug: string) => {
  const cat = getCategory(slug);
  return cat ? products.filter(cat.filter) : [];
};
export const searchProducts = (q: string) => {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter((p) =>
    [p.name, p.category, p.pieces, p.fabric, p.description, ...p.colors]
      .join(" ")
      .toLowerCase()
      .includes(term),
  );
};

export const formatPrice = (value: number) => `Rs. ${value.toLocaleString("en-PK")}`;

export const WHATSAPP_NUMBER = "923001234567";
