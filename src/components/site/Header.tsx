import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";

const NAV = [
  { label: "New In", to: "/collections/new-in" },
  { label: "Pret", to: "/collections/pret" },
  { label: "Unstitched", to: "/collections/unstitched" },
  { label: "Occasion", to: "/collections/occasion" },
  { label: "Collections", to: "/collections" },
  { label: "Sale", to: "/collections/sale", sale: true },
];

export function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q: query } });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-[0.65rem] tracking-[0.12em] uppercase sm:justify-between">
          <span className="hidden sm:inline">Free delivery on orders above Rs. 5,000</span>
          <span>Nationwide cash on delivery</span>
          <span className="hidden md:inline">Easy exchange</span>
          <span className="hidden lg:inline">Secure online payments</span>
          <span className="hidden sm:inline">Pakistan&rsquo;s favourite women&rsquo;s wear</span>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 lg:grid-cols-3">
          <div className="flex min-w-0 items-center gap-2">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                aria-label="Open menu"
                className="shrink-0 p-1 text-foreground lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-background p-6">
                <SheetTitle className="font-display text-xl tracking-[0.3em]">AIRA</SheetTitle>
                <nav className="mt-8 flex flex-col gap-4">
                  {NAV.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className={`text-sm tracking-[0.18em] uppercase ${item.sale ? "text-sale" : "text-foreground"}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm tracking-[0.18em] uppercase"
                  >
                    Our Story
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm tracking-[0.18em] uppercase"
                  >
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <form onSubmit={submitSearch} className="hidden min-w-0 items-center gap-2 lg:flex">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                aria-label="Search products"
                placeholder="Search for dresses, colours, occasions..."
                className="w-64 border-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </form>
          </div>

          <Link to="/" className="justify-self-center text-center">
            <span className="font-display text-3xl tracking-[0.28em] text-primary">AIRA</span>
            <span className="block text-[0.55rem] tracking-[0.35em] text-muted-foreground uppercase">
              Wear your story
            </span>
          </Link>

          <div className="flex items-center justify-end gap-4 text-xs tracking-[0.14em] uppercase">
            <Link to="/search" aria-label="Search" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden lg:inline">Account</span>
            </Link>
            <Link to="/wishlist" className="hidden items-center gap-2 sm:flex">
              <Heart className="h-4 w-4" />
              <span className="hidden lg:inline">Wishlist</span>
            </Link>
            <Link to="/cart" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden lg:inline">Bag ({count})</span>
              <span className="lg:hidden">{count}</span>
            </Link>
          </div>
        </div>

        <nav
          aria-label="Primary"
          className="hidden justify-center gap-10 pb-3 text-xs tracking-[0.2em] uppercase lg:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={item.sale ? "text-sale" : "text-foreground"}
              activeProps={{ className: "underline underline-offset-8" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
