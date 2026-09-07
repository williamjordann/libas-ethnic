import { Link } from "@tanstack/react-router";
import {
  CreditCard,
  Facebook,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Truck,
  Wallet,
  Youtube,
  Clock,
} from "lucide-react";

const VALUES = [
  { icon: Truck, title: "Nationwide Delivery", copy: "All across Pakistan" },
  { icon: Wallet, title: "Cash on Delivery", copy: "Shop with confidence" },
  { icon: CreditCard, title: "Secure Payments", copy: "Cards, Raast & more" },
  { icon: RefreshCw, title: "Easy Exchange", copy: "Hassle free returns" },
  { icon: Headphones, title: "Customer Support", copy: "We're here to help" },
];

const SHOP = [
  { label: "New In", to: "/collections/new-in" },
  { label: "Pret", to: "/collections/pret" },
  { label: "Unstitched", to: "/collections/unstitched" },
  { label: "Occasion", to: "/collections/occasion" },
  { label: "Collections", to: "/collections" },
  { label: "Sale", to: "/collections/sale" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-5">
        {VALUES.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex min-w-0 items-center gap-3">
            <Icon className="h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-xs tracking-[0.14em] uppercase">{title}</p>
              <p className="text-xs text-muted-foreground">{copy}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <span className="font-display text-2xl tracking-[0.28em] text-primary">AIRA</span>
            <span className="block text-[0.55rem] tracking-[0.35em] text-muted-foreground uppercase">
              Wear your story
            </span>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Contemporary women&rsquo;s wear, designed in Pakistan for every version of you.
            </p>
            <div className="mt-5 flex gap-4 text-muted-foreground">
              <a href="https://instagram.com" aria-label="AIRA on Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" aria-label="AIRA on Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" aria-label="AIRA on YouTube">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterCol title="Shop">
            {SHOP.map((s) => (
              <Link key={s.to} to={s.to} className="block hover:text-foreground">
                {s.label}
              </Link>
            ))}
          </FooterCol>

          <FooterCol title="Help">
            <Link to="/contact" className="block hover:text-foreground">
              Track Order
            </Link>
            <Link to="/contact" className="block hover:text-foreground">
              FAQs
            </Link>
            <Link to="/size-guide" className="block hover:text-foreground">
              Size Guide
            </Link>
            <Link to="/shipping-returns" className="block hover:text-foreground">
              Returns &amp; Exchanges
            </Link>
            <Link to="/shipping-returns" className="block hover:text-foreground">
              Delivery &amp; Shipping
            </Link>
            <Link to="/contact" className="block hover:text-foreground">
              Contact Us
            </Link>
          </FooterCol>

          <FooterCol title="Company">
            <Link to="/about" className="block hover:text-foreground">
              Our Story
            </Link>
            <Link to="/about" className="block hover:text-foreground">
              Sustainability
            </Link>
            <Link to="/contact" className="block hover:text-foreground">
              Careers
            </Link>
            <Link to="/contact" className="block hover:text-foreground">
              Store Locator
            </Link>
          </FooterCol>

          <FooterCol title="Contact Us">
            <span className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" /> +92 300 1234567
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" /> hello@aira.pk
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" /> Mon &ndash; Sat, 10 AM &ndash; 7 PM
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> Karachi, Pakistan
            </span>
          </FooterCol>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-5 text-[0.7rem] text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AIRA. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/policies/terms">Terms &amp; Conditions</Link>
            <Link to="/policies/privacy">Privacy Policy</Link>
            <Link to="/policies/payment">Payment Information</Link>
          </div>
          <p className="tracking-[0.18em] uppercase">More than clothes &middot; A brighter you</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs tracking-[0.2em] uppercase">{title}</h3>
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
