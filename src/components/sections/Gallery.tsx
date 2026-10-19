"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { InstagramIcon } from "@/components/brand/BrandIcons";
import { DoorReveal } from "@/components/motion/DoorReveal";
import { Reveal } from "@/components/motion/Reveal";
import { getLenis } from "@/components/motion/SmoothScroll";
import { SectionHeading, SectionIntro } from "@/components/ui/SectionHeading";
import { imageAlt, images } from "@/lib/images";
import { gallery, site } from "@/lib/site";

// Bento placement: fills a 3 × 2 grid on desktop
const LAYOUT: Record<string, string> = {
  "gold-entrance": "lg:col-start-1 lg:row-start-1 lg:row-span-2",
  "shaft-exterior": "lg:col-start-2 lg:row-start-1 lg:row-span-2",
  "lotus-ceiling": "lg:col-start-3 lg:row-start-1",
  "car-panel": "lg:col-start-3 lg:row-start-2",
};

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (open === null) {
      getLenis()?.start();
      return;
    }
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = open !== null ? gallery[open] : null;

  return (
    <section id="craft" className="section-screen bg-paper">
      <div className="container-x flex flex-col lg:flex-1">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
          <SectionHeading
            floor="craft"
            title={"Details that\nmake the ride."}
            highlight={["make", "the", "ride"]}
          />
          <Reveal delay={0.15} className="lg:max-w-md">
            <SectionIntro className="mb-5">
              Real Dhanvis installations: gold-finish doors, laser-cut ceilings, black-glass fixtures and clad
              shafts.
            </SectionIntro>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-navy-900/15 bg-white py-2 pl-2 pr-5 text-sm font-semibold text-navy-950 shadow-sm transition hover:border-navy-900/30"
            >
              <span className="grid size-9 place-items-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white">
                <InstagramIcon className="size-4" />
              </span>
              More on Instagram
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[300px] gap-3 sm:grid-cols-2 lg:mt-[4vh] lg:min-h-[380px] lg:flex-1 lg:grid-cols-3 lg:grid-rows-2 lg:auto-rows-auto">
          {gallery.map((g, i) => (
            <DoorReveal
              key={g.key}
              delay={i * 0.08}
              doorClass="bg-navy-950"
              className={`group rounded-[24px] ${LAYOUT[g.key]}`}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="absolute inset-0 cursor-zoom-in text-left"
                aria-label={`Open photo: ${g.title}`}
              >
                <Image
                  src={images[g.key]}
                  alt={imageAlt[g.key]}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute right-4 top-4 grid size-10 scale-75 place-items-center rounded-full bg-white/90 text-navy-950 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <Expand className="size-4" />
                </span>
                <span className="absolute inset-x-5 bottom-5 text-white">
                  <span className="block font-display text-lg font-semibold">{g.title}</span>
                  <span className="mt-1 block max-h-0 overflow-hidden text-sm text-steel-200 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                    {g.caption}
                  </span>
                </span>
              </button>
            </DoorReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            onClick={() => setOpen(null)}
          >
            <div className="flex items-center justify-between p-5 text-white">
              <p className="font-mono text-xs text-steel-400">
                {String(open + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                className="grid size-12 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Close"
                onClick={() => setOpen(null)}
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  className="absolute inset-4 sm:inset-x-24"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={images[current.key]} alt={imageAlt[current.key]} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Next photo"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
            <div className="p-6 text-center text-white" onClick={(e) => e.stopPropagation()}>
              <p className="font-display text-xl font-semibold">{current.title}</p>
              <p className="mt-1 text-sm text-steel-400">{current.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
