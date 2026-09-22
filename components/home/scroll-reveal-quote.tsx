"use client";

import { useEffect, useMemo, useRef } from "react";

const QUOTE =
  "“Every issue explained clearly. Every question answered with patience. Professional, helpful and consistently dependable.”";

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function scrollProgress(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewport = window.innerHeight;
  const start = viewport * 0.92;
  const end = viewport * 0.28;
  return Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
}

function opacityForChar(index: number, total: number, progress: number) {
  const band = 0.22;
  const start = (index / total) * (1 - band);
  const t = (progress - start) / band;
  const eased = easeOutCubic(Math.min(1, Math.max(0, t)));
  return 0.2 + 0.8 * eased;
}

export function ScrollRevealQuote() {
  const trackRef = useRef<HTMLSpanElement>(null);
  const chars = useMemo(() => Array.from(QUOTE), []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const charNodes = track.querySelectorAll<HTMLElement>("[data-quote-char]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      charNodes.forEach((node) => {
        node.style.opacity = "1";
      });
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const progress = scrollProgress(track);
      charNodes.forEach((node, index) => {
        node.style.opacity = String(opacityForChar(index, charNodes.length, progress));
      });
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [chars.length]);

  return (
    <blockquote className="review-quote-scroll">
      <span ref={trackRef} className="review-quote-track" aria-hidden="true">
        {chars.map((char, index) => (
          <span
            key={`${char}-${index}`}
            data-quote-char
            className={char === " " ? "quote-char quote-char-space" : "quote-char"}
            style={{ opacity: 0.2 }}
          >
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </span>
      <span className="visually-hidden">{QUOTE}</span>
    </blockquote>
  );
}
