"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Words rise out of a mask, like a lift car arriving at its floor. */
export function SplitHeading({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  highlight = [],
  highlightClass = "text-brand-gradient",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  highlight?: string[];
  highlightClass?: string;
}) {
  const lines = text.split("\n");
  const strip = (w: string) => w.replace(/[.,!?]/g, "");
  const marked = new Set(highlight.map(strip));
  let index = 0;
  return (
    <Tag className={className} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(" ").map((word, wi) => {
            const i = index++;
            const clean = strip(word);
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                <motion.span
                  className={`inline-block ${marked.has(clean) ? highlightClass : ""}`}
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1, delay: delay + i * 0.055, ease }}
                >
                  {word}
                </motion.span>
                {wi < line.split(" ").length - 1 && " "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
