"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/LogoMark";
import { SevenSegment } from "@/components/brand/SevenSegment";
import { markIntroDone } from "@/components/motion/intro";
import { getLenis } from "@/components/motion/SmoothScroll";

const SEQUENCE = ["5", "4", "3", "2", "1", "G"];
const doorEase = [0.76, 0, 0.24, 1] as const;

function lock(on: boolean) {
  const html = document.documentElement;
  html.dataset.locked = on ? "true" : "false";
  html.style.overflow = on ? "hidden" : "";
  if (on) getLenis()?.stop();
  else getLenis()?.start();
}

export function Preloader() {
  const [phase, setPhase] = useState<"arriving" | "ding" | "open" | "done">("arriving");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("dhanvis-intro") === "1";
      sessionStorage.setItem("dhanvis-intro", "1");
    } catch {}

    if (reduced) {
      markIntroDone();
      setPhase("done");
      return;
    }

    lock(true);
    const timers: ReturnType<typeof setTimeout>[] = [];
    const open = () => {
      setPhase("open");
      markIntroDone();
      timers.push(setTimeout(() => setPhase("done"), 1300));
    };

    if (seen) {
      setStep(SEQUENCE.length - 1);
      timers.push(setTimeout(open, 250));
    } else {
      SEQUENCE.forEach((_, i) => timers.push(setTimeout(() => setStep(i), 180 + i * 210)));
      const arrived = 180 + SEQUENCE.length * 210;
      timers.push(setTimeout(() => setPhase("ding"), arrived));
      timers.push(setTimeout(open, arrived + 450));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === "done") lock(false);
  }, [phase]);

  const opening = phase === "open";

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          {/* Left door */}
          <motion.div
            className="brushed-steel absolute inset-y-0 left-0 w-1/2 overflow-hidden shadow-[inset_-40px_0_80px_rgba(0,0,0,0.35)]"
            animate={{ x: opening ? "-100%" : "0%" }}
            transition={{ duration: 1.2, ease: doorEase }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
              <LogoMark variant="light" className="h-28 w-auto sm:h-36" />
            </div>
            <div className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-b from-gold/0 via-gold-light to-gold/0" />
          </motion.div>

          {/* Right door */}
          <motion.div
            className="brushed-steel absolute inset-y-0 right-0 w-1/2 overflow-hidden shadow-[inset_40px_0_80px_rgba(0,0,0,0.35)]"
            animate={{ x: opening ? "100%" : "0%" }}
            transition={{ duration: 1.2, ease: doorEase }}
          >
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <LogoMark variant="light" className="h-28 w-auto sm:h-36" />
            </div>
            <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-gold/0 via-gold-light to-gold/0" />
          </motion.div>

          {/* Floor indicator above the doors */}
          <motion.div
            className="absolute inset-x-0 top-[12%] flex flex-col items-center gap-4"
            animate={{ opacity: opening ? 0 : 1, y: opening ? -20 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-black/80 px-5 py-3 shadow-2xl transition-shadow duration-300 ${
                phase === "ding" ? "shadow-[0_0_40px_rgba(255,43,43,0.45)]" : ""
              }`}
            >
              <ChevronDown
                className={`size-6 text-signal transition-opacity ${phase === "arriving" ? "opacity-100" : "opacity-20"}`}
                strokeWidth={3}
              />
              <SevenSegment value={SEQUENCE[step]} className="h-12" />
            </div>
          </motion.div>

          <motion.p
            className="absolute inset-x-0 bottom-[12%] text-center font-mono text-[0.7rem] uppercase tracking-[0.5em] text-steel-300"
            animate={{ opacity: opening ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {phase === "arriving" ? "Arriving at lobby" : "Doors opening"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
