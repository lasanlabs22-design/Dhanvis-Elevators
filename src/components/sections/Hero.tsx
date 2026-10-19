"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Clock3, Phone, ShieldCheck, Wrench, ChevronUp } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { SevenSegment } from "@/components/brand/SevenSegment";
import { useIntroDone } from "@/components/motion/intro";
import { scrollToId } from "@/components/motion/SmoothScroll";
import { imageAlt, images } from "@/lib/images";
import { site } from "@/lib/site";
import { Marquee } from "./Marquee";

const ease = [0.16, 1, 0.3, 1] as const;
const RAILS = [4, 18, 46, 62, 84, 97];

function LiveFloor() {
  const seq = ["G", "1", "2", "3", "4", "5", "4", "3", "2", "1"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % seq.length), 1400);
    return () => clearInterval(t);
  }, [seq.length]);
  const goingUp = i < 5;
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-14 items-center gap-2 rounded-xl bg-black px-3">
        <ChevronUp
          className={`size-5 text-signal transition-transform duration-500 ${goingUp ? "" : "rotate-180"}`}
          strokeWidth={3}
        />
        <SevenSegment value={seq[i]} className="h-8" />
      </div>
      <div>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-steel-400">Now serving</p>
        <p className="text-sm font-semibold text-white">Floor {seq[i]}</p>
      </div>
    </div>
  );
}

export function Hero() {
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay, ease },
  });

  const words = [
    { t: "Engineered", line: 0 },
    { t: "to", line: 0 },
    { t: "lift.", line: 0 },
    { t: "Designed", line: 1 },
    { t: "to", line: 1 },
    { t: "impress.", line: 1 },
  ];

  return (
    <section
      id="lobby"
      ref={ref}
      className="grain relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-950 text-white"
    >
      {/* Atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 size-[720px] rounded-full bg-brand/30 blur-[140px]" />
        <div className="absolute -bottom-60 -left-40 size-[520px] rounded-full bg-navy-700/50 blur-[120px]" />
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        {RAILS.map((left, i) => (
          <div key={left} className="absolute inset-y-0 w-px bg-white/[0.05]" style={{ left: `${left}%` }}>
            <span
              className="absolute left-[-0.5px] top-0 h-32 w-[2px] animate-rail rounded-full bg-gradient-to-b from-transparent via-brand-light/50 to-transparent"
              style={{ animationDelay: `${i * 1.3}s`, animationDuration: `${6 + (i % 3) * 2}s` }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-1 items-center pb-14 pt-28 lg:pb-[4vh] lg:pt-[clamp(5.5rem,13vh,8rem)]">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <motion.div style={{ y: textY, opacity: fade }} className="lg:col-span-8 xl:col-span-7">
            <motion.div {...show(0.1)}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-xs font-medium text-steel-200 backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-signal" />
                  <span className="relative size-2 rounded-full bg-signal" />
                </span>
                Lift installation &amp; service · Tirupati
              </span>
            </motion.div>

            <h1
              className="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:mt-[3.2vh] lg:text-[clamp(3rem,min(4.15vw,8.6vh),4.3rem)]"
              aria-label="Engineered to lift. Designed to impress."
            >
              {[0, 1].map((line) => (
                <span key={line} className="block" aria-hidden>
                  {words
                    .map((w, i) => ({ ...w, i }))
                    .filter((w) => w.line === line)
                    .map((w, wi) => (
                      <Fragment key={w.i}>
                        <span className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                          <motion.span
                            className={`inline-block ${line === 1 ? "text-steel" : ""}`}
                            initial={{ y: "115%" }}
                            animate={ready ? { y: "0%" } : undefined}
                            transition={{ duration: 1.1, delay: 0.2 + w.i * 0.07, ease }}
                          >
                            {w.t}
                          </motion.span>
                        </span>
                        {/* On phones, break after the first word so no word is orphaned */}
                        {wi === 0 && <br className="sm:hidden" />}
                      </Fragment>
                    ))}
                </span>
              ))}
            </h1>

            <motion.p
              {...show(0.6)}
              className="mt-7 max-w-xl text-base leading-relaxed text-steel-300 sm:text-lg lg:mt-[3vh] lg:text-[clamp(1rem,2vh,1.125rem)]"
            >
              From compact home lifts to high-traffic passenger elevators, {site.shortName} designs, installs and
              maintains every type of lift, with the finish of a luxury interior and the discipline of an
              engineering firm.
            </motion.p>

            <motion.div {...show(0.75)} className="mt-9 flex flex-wrap gap-3 lg:mt-[4vh]">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
                className="group inline-flex items-center gap-3 rounded-full bg-brand py-2 pl-6 pr-2 font-semibold text-white shadow-[0_10px_40px_rgba(13,82,214,0.55)] transition hover:bg-brand-light"
              >
                Book a free site survey
                <span className="grid size-9 place-items-center rounded-full bg-white text-brand transition-transform group-hover:translate-x-1">
                  <ArrowRight className="size-4" />
                </span>
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
              >
                <Phone className="size-4" />
                {site.phone}
              </a>
            </motion.div>

            <motion.ul
              {...show(0.9)}
              className="mt-12 grid max-w-xl grid-cols-1 gap-4 border-t border-white/10 pt-8 text-sm text-steel-300 sm:grid-cols-3 lg:mt-[5vh] lg:pt-[3.4vh]"
            >
              {[
                { icon: Clock3, label: "24/7 breakdown support" },
                { icon: ShieldCheck, label: "Safety-first engineering" },
                { icon: Wrench, label: "AMC for every make" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <Icon className="size-4 shrink-0 text-brand-light" />
                  {label}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-4 lg:max-w-none xl:col-span-5">
            <motion.div
              initial={{ clipPath: "inset(0 50% 0 50% round 32px)" }}
              animate={ready ? { clipPath: "inset(0 0% 0 0% round 32px)" } : undefined}
              transition={{ duration: 1.4, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-[32px] ring-1 ring-white/10 lg:aspect-auto lg:h-[min(66vh,640px)]"
            >
              <motion.div style={{ y: imgY }} className="absolute inset-[-8%_0]">
                <Image
                  src={images["hero-cabin"]}
                  alt={imageAlt["hero-cabin"]}
                  fill
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/10" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold-light">Cabin design</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">Premium, warm-lit cabins</p>
                </div>
                <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white backdrop-blur">
                  Custom finishes
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={ready ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 1, delay: 1.1, ease }}
              className="absolute -left-4 top-10 rounded-2xl border border-white/10 bg-navy-950/70 p-3 shadow-2xl backdrop-blur-xl sm:-left-12"
            >
              <LiveFloor />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={ready ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 1, delay: 1.3, ease }}
              className="absolute -right-3 bottom-24 flex w-56 items-center gap-3 rounded-2xl border border-white/10 bg-navy-950/70 p-2.5 shadow-2xl backdrop-blur-xl sm:-right-6"
            >
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                <Image src={images["panel-brass"]} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight text-white">Designer fixtures</p>
                <p className="mt-0.5 text-xs text-steel-400">Brass, gold &amp; black glass</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
