"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Two door panels part to reveal the content when it scrolls into view. */
export function DoorReveal({
  children,
  className = "",
  doorClass = "bg-navy-900",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  doorClass?: string;
  delay?: number;
}) {
  const transition = { duration: 1.25, delay, ease: [0.76, 0, 0.24, 1] as const };
  return (
    <div className={`${/\babsolute\b/.test(className) ? "" : "relative"} overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ ...transition, duration: 1.8 }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        className={`absolute inset-y-0 left-0 z-10 w-1/2 border-r border-white/10 ${doorClass}`}
        initial={{ x: "0%" }}
        whileInView={{ x: "-101%" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={transition}
      />
      <motion.div
        aria-hidden
        className={`absolute inset-y-0 right-0 z-10 w-1/2 border-l border-white/10 ${doorClass}`}
        initial={{ x: "0%" }}
        whileInView={{ x: "101%" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={transition}
      />
    </div>
  );
}
