"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "For Your Family",
  "For Generations",
  "With Certainty",
];

const TYPE_SPEED = 70;
const DELETE_SPEED = 35;
const HOLD_MS = 2000;

export default function RotatingSubheadline() {
  const [text, setText] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setText("For Generations");
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: number;

    const tick = () => {
      const phrase = PHRASES[phraseIndex];

      if (!isDeleting) {
        charIndex += 1;
        setText(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          isDeleting = true;
          timeoutId = window.setTimeout(tick, HOLD_MS);
          return;
        }
        timeoutId = window.setTimeout(tick, TYPE_SPEED);
        return;
      }

      charIndex -= 1;
      setText(phrase.slice(0, charIndex));
      if (charIndex <= 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        timeoutId = window.setTimeout(tick, TYPE_SPEED);
        return;
      }
      timeoutId = window.setTimeout(tick, DELETE_SPEED);
    };

    timeoutId = window.setTimeout(tick, TYPE_SPEED);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="text-4xl font-semibold leading-tight text-[#d4af37] sm:text-5xl lg:text-6xl">
      <span>{text}</span>
      <span
        className="ml-1 inline-block h-[1em] w-[2px] animate-pulse bg-[#d4af37]"
        aria-hidden="true"
      />
    </div>
  );
}
