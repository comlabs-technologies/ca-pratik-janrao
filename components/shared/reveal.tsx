"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STAGGER_GRIDS: { grid: string; item: string; step?: number; cap?: number }[] = [
  { grid: ".approach-grid", item: ":scope > article" },
  { grid: ".value-grid", item: ":scope > .value-card, :scope > article" },
  { grid: ".service-grid", item: ":scope > .service-card, :scope > article" },
  { grid: ".blog-grid", item: ":scope > .blog-card, :scope > article" },
  { grid: ".resource-grid", item: ":scope > .resource-card, :scope > a.resource-card, :scope > article" },
  { grid: ".team-grid", item: ":scope > .person-card, :scope > .person-card-link, :scope > article" },
  { grid: ".accordion-list", item: ":scope > .accordion-item" },
  { grid: ".faq-list", item: ":scope > .faq-item" },
  { grid: ".footer-grid", item: ":scope > div", step: 70, cap: 560 },
];

function setDelay(element: Element, delayMs: number) {
  (element as HTMLElement).style.setProperty("--reveal-delay", `${delayMs}ms`);
}

function prepareScrollReveals() {
  STAGGER_GRIDS.forEach(({ grid, item, step = 88, cap = 704 }) => {
    document.querySelectorAll(grid).forEach((container) => {
      container.classList.remove("reveal");
      container.classList.add("reveal-group");

      container.querySelectorAll(item).forEach((child, index) => {
        child.classList.add("reveal", "reveal-rise");
        setDelay(child, Math.min(index * step, cap));
      });
    });
  });

  document.querySelectorAll(".page-hero-inner").forEach((inner) => {
    inner.querySelectorAll(".breadcrumbs, .eyebrow, h1, .page-hero-copy").forEach((part, index) => {
      part.classList.add("reveal", "reveal-hero");
      setDelay(part, index * 95);
    });
  });

  document.querySelectorAll(".reveal:not(.reveal-rise):not(.reveal-hero)").forEach((element) => {
    if (!element.classList.contains("reveal-soft")) {
      element.classList.add("reveal-soft");
    }
  });
}

function initScrollReveals() {
  prepareScrollReveals();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}

export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => initScrollReveals(), [pathname]);

  return null;
}
