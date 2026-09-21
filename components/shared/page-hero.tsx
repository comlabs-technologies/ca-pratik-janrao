import type { ReactNode } from "react";
import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  dark?: boolean;
  compact?: boolean;
};

export function PageHero({ eyebrow, title, description, breadcrumbs, dark = false, compact = true }: PageHeroProps) {
  return (
    <section className={`page-hero ${dark ? "page-hero-dark" : ""} ${compact ? "page-hero-compact" : ""}`}>
      <div className="page-hero-inner">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} light={dark} /> : null}
        {eyebrow ? <p className={`eyebrow ${dark ? "light" : ""}`}>{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className="page-hero-copy">{description}</p> : null}
      </div>
    </section>
  );
}
