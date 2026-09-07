import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeading({
  title,
  subtitle,
  viewAllTo,
  children,
}: {
  title: string;
  subtitle?: string;
  viewAllTo?: string;
  children?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
      {viewAllTo && (
        <Link to={viewAllTo} className="link-underline shrink-0 text-muted-foreground">
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
