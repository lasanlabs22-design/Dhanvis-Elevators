"use client";

import {
  ArrowUpRight,
  BatteryCharging,
  BellRing,
  ClipboardCheck,
  Gauge,
  Lightbulb,
  ScanLine,
  ShieldHalf,
  Weight,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { scrollToId } from "@/components/motion/SmoothScroll";
import { SectionHeading, SectionIntro } from "@/components/ui/SectionHeading";
import { safety } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  ard: BatteryCharging,
  overload: Weight,
  curtain: ScanLine,
  alarm: BellRing,
  governor: ShieldHalf,
  vvvf: Gauge,
  light: Lightbulb,
  certified: ClipboardCheck,
};

/** Little "power cut" story for the ARD card: lights drop, battery kicks in, car levels, doors open. */
function ArdVisual() {
  return (
    <div className="relative h-36 overflow-hidden rounded-2xl border border-white/10 bg-ink lg:h-[clamp(7rem,18vh,10rem)]" aria-hidden>
      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-white/15" />
      <span className="absolute right-2 top-[calc(50%-16px)] font-mono text-[0.55rem] text-steel-500">Landing</span>
      {/* Stuck between floors → levels at the nearest floor (bottom edge on the dashed line) → doors open */}
      <motion.div
        className="absolute left-1/2 h-[42%] w-12 -translate-x-1/2 overflow-hidden rounded border-2 border-steel-300 bg-navy-900"
        animate={{ top: ["30%", "30%", "8%", "8%", "30%"] }}
        transition={{ duration: 6, times: [0, 0.25, 0.55, 0.9, 1], repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-[2px] bg-[#f5e3b5]"
          animate={{ opacity: [1, 0.15, 0.6, 0.6, 1] }}
          transition={{ duration: 6, times: [0, 0.2, 0.3, 0.9, 1], repeat: Infinity }}
        />
        <motion.div
          className="brushed-steel absolute inset-y-[2px] left-[2px] w-[calc(50%-2px)]"
          animate={{ x: ["0%", "0%", "0%", "-90%", "0%"] }}
          transition={{ duration: 6, times: [0, 0.25, 0.6, 0.72, 1], repeat: Infinity }}
        />
        <motion.div
          className="brushed-steel absolute inset-y-[2px] right-[2px] w-[calc(50%-2px)]"
          animate={{ x: ["0%", "0%", "0%", "90%", "0%"] }}
          transition={{ duration: 6, times: [0, 0.25, 0.6, 0.72, 1], repeat: Infinity }}
        />
      </motion.div>
      <motion.p
        className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5 font-mono text-[0.55rem] uppercase leading-tight tracking-[0.15em]"
        animate={{ color: ["#9a9a9a", "#ff2b2b", "#ecd492", "#34d399", "#9a9a9a"] }}
        transition={{ duration: 6, times: [0, 0.2, 0.3, 0.72, 1], repeat: Infinity }}
      >
        <BatteryCharging className="size-3 shrink-0" /> Power cut → rescue → doors open
      </motion.p>
    </div>
  );
}

export function Safety() {
  const [first, ...rest] = safety;
  const FirstIcon = ICONS[first.key];
  return (
    <section id="safety" className="section-screen grain overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute -right-40 top-20 size-[600px] rounded-full bg-white/[0.04] blur-[150px]" />
      <div className="container-x relative flex flex-col lg:flex-1">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
          <SectionHeading
            floor="safety"
            tone="dark"
            title={"Safety isn't a feature.\nIt's the foundation."}
            highlight={["It's", "the", "foundation"]}
          />
          <Reveal delay={0.15} className="lg:max-w-md">
            <SectionIntro tone="dark">
              Every Dhanvis lift is specified with layers of protection, so the people riding it never have to
              think about them.
            </SectionIntro>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-[4vh] lg:min-h-[400px] lg:flex-1 lg:grid-cols-5 lg:grid-rows-2">
          <Reveal className="md:col-span-2 lg:col-span-1 lg:row-span-2">
            <article className="flex h-full flex-col gap-6 rounded-[22px] border border-white/10 bg-gradient-to-br from-white/[0.08] via-navy-900/60 to-transparent p-6 lg:p-[2.6vh]">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-ink">
                <FirstIcon className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold leading-tight lg:text-[clamp(1.05rem,2.5vh,1.35rem)]">
                  {first.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-300 lg:text-[clamp(0.8rem,1.65vh,0.9rem)]">
                  {first.desc}
                </p>
              </div>
              <div className="mt-auto">
                <ArdVisual />
              </div>
            </article>
          </Reveal>

          {rest.map((s, i) => {
            const Icon = ICONS[s.key];
            return (
              <Reveal key={s.key} delay={(i % 4) * 0.06}>
                <article className="group flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-1 hover:border-brand-light/40 hover:bg-white/[0.05] lg:p-[2.6vh]">
                  <Icon className="size-6 text-brand-light transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="mt-auto pt-4 font-display text-base font-semibold leading-snug lg:text-[clamp(0.92rem,2vh,1.05rem)]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel-400 lg:text-[clamp(0.76rem,1.6vh,0.875rem)]">
                    {s.desc}
                  </p>
                </article>
              </Reveal>
            );
          })}

          <Reveal delay={0.2}>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="group flex h-full w-full flex-col rounded-[22px] bg-white p-6 text-left text-ink transition hover:bg-steel-200 lg:p-[2.6vh]"
            >
              <ArrowUpRight className="size-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="mt-auto pt-4 font-display text-base font-semibold leading-snug lg:text-[clamp(0.92rem,2vh,1.05rem)]">
                Book a safety inspection
              </span>
              <span className="mt-1.5 text-sm leading-relaxed text-steel-600 lg:text-[clamp(0.76rem,1.6vh,0.875rem)]">
                For your existing lift, any make and any age.
              </span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
