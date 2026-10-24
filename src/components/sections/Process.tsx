"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { process } from "@/lib/site";

const LAST = process.length - 1;

/** Desktop: a horizontal shaft. The car rides across and lights each stage as it arrives. */
function HorizontalTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const p = useMotionValue(0);
  const [reached, setReached] = useState(-1);
  // Stops sit at the centre of each of the six columns: 1/12, 3/12 … 11/12
  const carLeft = useTransform(p, (v) => `${(100 / 12) * (1 + v * 2 * LAST)}%`);
  const fill = useTransform(p, (v) => v);

  useMotionValueEvent(p, "change", (v) => setReached(Math.floor(v * LAST + 0.02)));

  useEffect(() => {
    if (!inView) return;
    setReached(0);
    const controls = animate(p, 1, { duration: 4.2, delay: 0.5, ease: [0.45, 0, 0.25, 1] });
    return () => controls.stop();
  }, [inView, p]);

  return (
    <div ref={ref} className="relative mt-[7vh] hidden lg:block">
      <div aria-hidden className="absolute left-[8.333%] right-[8.333%] top-[22px] h-[2px] bg-white/10">
        <motion.div style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-gradient-to-r from-steel-500 to-brand-light" />
      </div>
      <motion.div
        aria-hidden
        style={{ left: carLeft }}
        className="absolute top-[23px] z-10 grid h-11 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 border-brand-light bg-navy-950 shadow-[0_0_30px_rgba(255,255,255,0.35)]"
      >
        <span className="h-5 w-[2px] bg-brand-light" />
      </motion.div>

      <ol className="grid grid-cols-6">
        {process.map((step, i) => {
          const on = i <= reached;
          return (
            <li key={step.title} className="flex flex-col items-center px-3 text-center">
              <span
                className={`relative z-0 grid size-[46px] place-items-center rounded-full border-2 font-mono text-xs font-semibold transition-all duration-500 ${
                  on
                    ? "border-brand-light bg-white/15 text-white shadow-[0_0_24px_rgba(255,255,255,0.3)]"
                    : "border-white/15 bg-navy-900 text-steel-500"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={`mt-[3.5vh] font-display text-lg font-bold tracking-tight transition-colors duration-500 xl:text-xl ${
                  on ? "text-white" : "text-steel-400"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed transition-colors duration-500 ${
                  on ? "text-steel-300" : "text-steel-500"
                }`}
              >
                {step.desc}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Phones & tablets: vertical shaft driven by scroll. */
function VerticalTrack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const carTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mx-auto mt-16 max-w-3xl lg:hidden">
      <div aria-hidden className="absolute bottom-0 left-5 top-0 w-[2px] bg-white/10">
        <motion.div style={{ scaleY: progress }} className="absolute inset-0 origin-top bg-gradient-to-b from-brand-light to-steel-500" />
        <motion.div
          style={{ top: carTop }}
          className="absolute left-1/2 grid h-9 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 border-brand-light bg-navy-950 shadow-[0_0_30px_rgba(255,255,255,0.35)]"
        >
          <span className="h-4 w-[2px] bg-brand-light" />
        </motion.div>
      </div>
      <ol className="space-y-12">
        {process.map((step, i) => (
          <li key={step.title} className="relative">
            <span
              aria-hidden
              className="absolute left-5 top-2 size-3 -translate-x-1/2 rounded-full border-2 border-brand-light bg-navy-900"
            />
            <Reveal className="pl-14" y={40}>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand-light">
                Stage {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-steel-300">{step.desc}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className="section-screen grain overflow-hidden bg-navy-900 text-white">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container-x relative">
        <SectionHeading
          floor="process"
          tone="dark"
          align="center"
          title={"From first visit\nto first ride."}
          highlight={["ride"]}
          intro="A clear, six-stage process, so you always know what's happening, what's next and when your lift will be ready."
        />
        <HorizontalTrack />
        <VerticalTrack />
      </div>
    </section>
  );
}
