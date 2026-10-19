"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { getLenis } from "@/components/motion/SmoothScroll";
import { SectionHeading, SectionIntro } from "@/components/ui/SectionHeading";
import { imageAlt, images } from "@/lib/images";
import { reel, site } from "@/lib/site";

const SLIDE_MS = 5500;
const pans = [
  { from: { scale: 1.18, x: "-3%", y: "2%" }, to: { scale: 1.04, x: "2%", y: "-1%" } },
  { from: { scale: 1.05, x: "2%", y: "-2%" }, to: { scale: 1.2, x: "-2%", y: "2%" } },
  { from: { scale: 1.2, x: "0%", y: "4%" }, to: { scale: 1.06, x: "0%", y: "-3%" } },
];

export function Showreel() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [film, setFilm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const hasFilm = Boolean(site.showreel.videoSrc || site.showreel.youtubeId);
  const running = playing && inView && !film;

  const go = (d: number) => setIdx((i) => (i + d + reel.length) % reel.length);

  useEffect(() => {
    if (film) getLenis()?.stop();
    else getLenis()?.start();
    if (!film) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFilm(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [film]);

  const slide = reel[idx];
  const pan = pans[idx % pans.length];

  return (
    <section id="showreel" className="section-screen overflow-hidden bg-ink text-white">
      <div className="container-x flex flex-col lg:flex-1">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
          <SectionHeading
            floor="showreel"
            tone="dark"
            title={"A lift for\nevery building."}
            highlight={["every", "building"]}
          />
          <Reveal delay={0.15} className="lg:max-w-md">
            <SectionIntro tone="dark">
              Lobbies, towers, homes and showrooms. Every building moves differently, and every lift we build is
              designed around it.
            </SectionIntro>
            {hasFilm && (
              <button
                type="button"
                onClick={() => setFilm(true)}
                className="group mt-5 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 font-semibold text-navy-950 transition hover:bg-brand-pale"
              >
                <span className="grid size-10 place-items-center rounded-full bg-brand text-white">
                  <Play className="size-4 fill-current" />
                </span>
                Watch the full film
              </button>
            )}
          </Reveal>
        </div>

        <Reveal className="mt-12 lg:mt-[4vh] lg:flex lg:min-h-[340px] lg:flex-1 lg:flex-col">
          <div
            ref={ref}
            className="group relative aspect-[4/5] overflow-hidden rounded-[28px] bg-navy-950 ring-1 ring-white/10 sm:aspect-[16/9] lg:aspect-auto lg:flex-1"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={slide.key}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={pan.from}
                  animate={pan.to}
                  transition={{ duration: SLIDE_MS / 1000 + 1.2, ease: "linear" }}
                >
                  <Image
                    src={images[slide.key]}
                    alt={imageAlt[slide.key]}
                    fill
                    sizes="(min-width: 1320px) 1220px, 100vw"
                    className="object-cover"
                    placeholder="blur"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Cinematic grade */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/50" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.65)]" />

            {/* Chapter progress */}
            <div className="absolute inset-x-5 top-5 flex gap-1.5 sm:inset-x-8 sm:top-7">
              {reel.map((g, i) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => setIdx(i)}
                  className="h-6 flex-1 py-2.5"
                  aria-label={`Show ${g.title}`}
                >
                  <span className="block h-[3px] overflow-hidden rounded-full bg-white/25">
                    {i < idx && <span className="block h-full w-full bg-white" />}
                    {i === idx && (
                      <span
                        key={`${idx}-${slide.key}`}
                        className="block h-full w-full origin-left bg-white"
                        style={{
                          animation: `progress ${SLIDE_MS}ms linear forwards`,
                          animationPlayState: running ? "running" : "paused",
                        }}
                        onAnimationEnd={() => go(1)}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <div className="absolute right-5 top-14 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/80 sm:right-8 sm:top-16">
              <span className={`size-2 rounded-full ${running ? "animate-pulse bg-signal" : "bg-white/40"}`} />
              {running ? "Playing" : "Paused"}
            </div>

            {/* Caption */}
            <div className="absolute inset-x-5 bottom-5 flex flex-col gap-6 sm:inset-x-8 sm:bottom-8 sm:flex-row sm:items-end sm:justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-xl"
                >
                  <p className="font-mono text-xs text-gold-light">
                    Chapter {String(idx + 1).padStart(2, "0")} / {String(reel.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-4xl">{slide.title}</h3>
                  <p className="mt-2 text-sm text-steel-300 sm:text-base">{slide.caption}</p>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/30 backdrop-blur transition hover:bg-white hover:text-navy-950"
                  aria-label="Previous chapter"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="grid size-14 place-items-center rounded-full bg-white text-navy-950 transition hover:scale-105"
                  aria-label={playing ? "Pause reel" : "Play reel"}
                >
                  {playing ? <Pause className="size-5 fill-current" /> : <Play className="size-5 translate-x-0.5 fill-current" />}
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="grid size-11 place-items-center rounded-full border border-white/20 bg-black/30 backdrop-blur transition hover:bg-white hover:text-navy-950"
                  aria-label="Next chapter"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Chapter thumbnails */}
        <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-1 lg:hidden">
          {reel.map((g, i) => (
            <button
              key={g.key}
              type="button"
              onClick={() => setIdx(i)}
              className={`group flex min-w-[220px] flex-1 items-center gap-3 rounded-2xl border p-2 pr-4 text-left transition ${
                i === idx ? "border-white/30 bg-white/[0.07]" : "border-white/8 hover:border-white/20"
              }`}
            >
              <span className="relative size-12 shrink-0 overflow-hidden rounded-xl">
                <Image src={images[g.key]} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span>
                <span className="block font-mono text-[0.6rem] text-steel-500">{String(i + 1).padStart(2, "0")}</span>
                <span className={`block text-sm font-medium ${i === idx ? "text-white" : "text-steel-300"}`}>{g.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Full film modal */}
      <AnimatePresence>
        {film && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-ink/95 p-4 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFilm(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Dhanvis Elevators showreel"
          >
            <button
              type="button"
              onClick={() => setFilm(false)}
              className="absolute right-5 top-5 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="Close video"
            >
              <X className="size-5" />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-video w-full max-w-6xl overflow-hidden rounded-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {site.showreel.youtubeId ? (
                <iframe
                  className="size-full"
                  src={`https://www.youtube-nocookie.com/embed/${site.showreel.youtubeId}?autoplay=1&rel=0`}
                  title="Dhanvis Elevators showreel"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video className="size-full" src={site.showreel.videoSrc} controls autoPlay playsInline />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
