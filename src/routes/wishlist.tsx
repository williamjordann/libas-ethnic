import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Wishlist — AIRA";
const DESCRIPTION = "Save your favourite AIRA pieces to your wishlist and come back to them any time.";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/wishlist" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/wishlist" }],
  }),
  component: () => (
    <div className="mx-auto max-w-[900px] px-4 py-20 text-center">
      <h1 className="font-display text-4xl text-primary">Your Wishlist</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Nothing saved yet. Tap the heart on any piece to keep it here.
      </p>
      <Link
        to="/collections"
        className="mt-8 inline-block bg-primary px-8 py-3.5 text-xs tracking-[0.2em] text-primary-foreground uppercase"
      >
        Browse collections
      </Link>
    </div>
  ),
});
