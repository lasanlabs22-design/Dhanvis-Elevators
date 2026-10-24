"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";
import { SevenSegment } from "@/components/brand/SevenSegment";
import { scrollToId } from "@/components/motion/SmoothScroll";
import { floors } from "@/lib/site";
import { useActiveFloor } from "./useActiveFloor";

/** Fixed hall-panel style indicator: shows the current "floor" and lets you ride between sections. */
export function FloorIndicator() {
  const active = useActiveFloor();
  const { scrollY } = useScroll();
  const [dir, setDir] = useState<"up" | "down" | null>(null);
  const idle = useRef<ReturnType<typeof setTimeout>>(undefined);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? y;
    if (Math.abs(y - prev) < 1) return;
    setDir(y > prev ? "down" : "up");
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setDir(null), 220);
  });

  const index = floors.findIndex((f) => f.id === active);
  const current = floors[index] ?? floors[0];
  const step = (delta: number) => {
    const next = floors[Math.min(floors.length - 1, Math.max(0, index + delta))];
    scrollToId(next.id);
  };

  return (
    <>
      {/* Desktop: vertical hall panel */}
      <aside
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
        aria-label="Floor navigation"
      >
        <div className="flex w-[58px] flex-col items-center rounded-[22px] border border-white/10 bg-ink/80 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => step(1)}
            className="grid size-9 place-items-center rounded-full text-steel-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Next floor"
          >
            <ChevronUp className={`size-4 ${dir === "down" ? "text-signal" : ""}`} strokeWidth={3} />
          </button>
          <div className="my-1 flex h-14 w-full flex-col items-center justify-center rounded-xl bg-black">
            <SevenSegment value={current.floor} digits={current.floor.length} className="h-7" />
          </div>
          <button
            type="button"
            onClick={() => step(-1)}
            className="grid size-9 place-items-center rounded-full text-steel-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Previous floor"
          >
            <ChevronDown className={`size-4 ${dir === "up" ? "text-signal" : ""}`} strokeWidth={3} />
          </button>

          <ul className="mt-1 flex flex-col-reverse gap-1 border-t border-white/10 pt-2">
            {floors.map((f) => {
              const on = f.id === active;
              return (
                <li key={f.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => scrollToId(f.id)}
                    className={`grid size-7 place-items-center rounded-full font-mono text-[0.62rem] font-semibold transition ${
                      on
                        ? "bg-brand-light/20 text-brand-light shadow-[0_0_14px_rgba(255,255,255,0.35)] ring-1 ring-brand-light/70"
                        : "text-steel-500 hover:text-white"
                    }`}
                    aria-label={`Go to ${f.label}`}
                    aria-current={on ? "true" : undefined}
                  >
                    {f.floor}
                  </button>
                  <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-xs text-white opacity-0 shadow-lg ring-1 ring-white/10 transition group-hover:translate-x-0 group-hover:opacity-100">
                    {f.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Tablet: compact floor pill (hidden on phones, where it covers the text) */}
      <div className="pointer-events-none fixed bottom-5 left-4 z-40 hidden md:block xl:hidden">
        <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-ink/85 py-1.5 pl-1.5 pr-4 shadow-xl backdrop-blur-xl">
          <span className="grid h-8 min-w-8 place-items-center rounded-full bg-black px-1.5">
            <SevenSegment value={current.floor} digits={current.floor.length} className="h-4" />
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={current.id}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-200"
            >
              {current.label}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
