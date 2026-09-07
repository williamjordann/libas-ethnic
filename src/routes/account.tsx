import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

const TITLE = "Account — Sign In or Create an Account | AIRA";
const DESCRIPTION = "Sign in to your AIRA account to track orders, save your wishlist and check out faster.";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/account" },
    ],
    links: [{ rel: "canonical", href: "/account" }],
  }),
  component: AccountPage,
});

function AccountPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-center font-display text-4xl text-primary">
        {mode === "signin" ? "Sign In" : "Create Account"}
      </h1>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        {mode === "signin"
          ? "Track orders, save favourites and check out faster."
          : "Join AIRA for early access to new collections."}
      </p>

      <form
        className="mt-10 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast("Accounts aren't switched on yet — ask us to enable sign-in.");
        }}
      >
        {mode === "signup" && (
          <Field id="name" label="Full name" type="text" autoComplete="name" />
        )}
        <Field id="email" label="Email address" type="email" autoComplete="email" />
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
        />
        <button
          type="submit"
          className="w-full bg-primary px-8 py-4 text-xs tracking-[0.2em] text-primary-foreground uppercase"
        >
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-6 w-full text-center text-xs tracking-[0.16em] text-muted-foreground uppercase underline"
      >
        {mode === "signin" ? "New to AIRA? Create an account" : "Already have an account? Sign in"}
      </button>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs tracking-[0.16em] uppercase">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
