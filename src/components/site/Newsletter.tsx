import { useState } from "react";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/products";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section aria-labelledby="newsletter-heading" className="bg-sand">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 lg:grid-cols-2 lg:items-center">
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <h2 id="newsletter-heading" className="text-sm tracking-[0.2em] uppercase">
              Be first to know
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              New collections, restocks and exclusive offers.
            </p>
          </div>
          <form
            className="flex w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're on the list. Welcome to AIRA.");
              setEmail("");
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Your email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="min-w-0 flex-1 border border-border bg-background px-4 py-3 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-primary px-6 py-3 text-xs tracking-[0.2em] text-primary-foreground uppercase"
            >
              Join
            </button>
          </form>
        </div>

        <div className="flex flex-wrap items-center gap-4 lg:justify-end">
          <MessageCircle className="h-6 w-6 text-primary" />
          <div className="min-w-0">
            <p className="text-sm tracking-[0.14em] uppercase">Join us on WhatsApp</p>
            <p className="text-sm text-muted-foreground">
              Get updates, offers and style inspiration.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="bg-primary px-6 py-3 text-xs tracking-[0.2em] text-primary-foreground uppercase"
          >
            Join now
          </a>
        </div>
      </div>
    </section>
  );
}
