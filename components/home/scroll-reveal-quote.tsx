"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";

const QUOTE =
  "“Every issue explained clearly. Every question answered with patience. Professional, helpful and consistently dependable.”";

const SCROLL_PX_PER_CHAR = 16;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function opacityForChar(index: number, total: number, progress: number) {
  const windowSize = 0.18;
  const start = (index / total) * (1 - windowSize);
  const t = (progress - start) / windowSize;
  const eased = easeOutCubic(Math.min(1, Math.max(0, t)));
  return 0.2 + 0.8 * eased;
}

export function ReviewTestimonialScroll() {
  const stageRef = useRef<HTMLDivElement>(null);
  const chars = useMemo(() => Array.from(QUOTE), []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const charNodes = stage.querySelectorAll<HTMLElement>("[data-quote-char]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applyHeight = () => {
      if (reducedMotion) {
        stage.style.removeProperty("height");
        return;
      }
      const extraScroll = chars.length * SCROLL_PX_PER_CHAR;
      stage.style.height = `${window.innerHeight + extraScroll}px`;
    };

    if (reducedMotion) {
      charNodes.forEach((node) => {
        node.style.opacity = "1";
      });
      applyHeight();
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      if (!stage) return;

      const stageTop = stage.offsetTop;
      const scrollable = stage.offsetHeight - window.innerHeight;
      const progress =
        scrollable <= 0 ? 1 : Math.min(1, Math.max(0, (window.scrollY - stageTop) / scrollable));

      charNodes.forEach((node, index) => {
        node.style.opacity = String(opacityForChar(index, charNodes.length, progress));
      });
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    applyHeight();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      applyHeight();
      onScroll();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
      stage.style.removeProperty("height");
    };
  }, [chars.length]);

  return (
    <div ref={stageRef} className="review-scroll-stage">
      <div className="review-scroll-pin">
        <div className="review-block">
          <div className="review-portrait">
            <Image
              src="/images/testimonial-consultation-room.jpg"
              alt="A private consultation room with a round table and professional meeting setup"
              fill
              sizes="280px"
            />
          </div>
          <div className="review-copy">
            <p className="stars">★★★★★</p>
            <blockquote>
              <span className="review-quote-chars" aria-hidden="true">
                {chars.map((char, index) => (
                  <span
                    key={`${char}-${index}`}
                    data-quote-char
                    className="quote-char"
                    style={{ opacity: 0.2 }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="visually-hidden">{QUOTE}</span>
            </blockquote>
            <span>Client feedback</span>
          </div>
        </div>
      </div>
    </div>
  );
}
