"use client";

import {
  Accessibility,
  ArrowUpRight,
  BedDouble,
  Building2,
  Car,
  Cpu,
  Droplets,
  Gem,
  Home,
  Package,
  Store,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { scrollToId } from "@/components/motion/SmoothScroll";
import { SectionHeading, SectionIntro } from "@/components/ui/SectionHeading";
import { imageAlt, images } from "@/lib/images";
import { liftTypes } from "@/lib/site";

const ICONS: Record<string, LucideIcon> = {
  home: Home,
  passenger: Users,
  commercial: Store,
  capsule: Gem,
  hospital: BedDouble,
  goods: Package,
  structural: Building2,
  mrl: Cpu,
  hydraulic: Droplets,
  car: Car,
  platform: Accessibility,
  dumbwaiter: UtensilsCrossed,
};

export function LiftTypes() {
  return (
    <section id="lifts" className="section-screen grain overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-light/50 to-transparent" />
      <div aria-hidden className="absolute -left-40 top-1/3 size-[600px] rounded-full bg-brand/15 blur-[140px]" />

      <div className="container-x relative flex flex-col lg:flex-1">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <SectionHeading
            floor="lifts"
            tone="dark"
            title={"Every kind of lift.\nOne trusted name."}
            highlight={["One", "trusted", "name"]}
          />
          <Reveal delay={0.15} className="lg:max-w-md">
            <SectionIntro tone="dark">
              Whatever your building (a villa, an apartment block, a hospital or a warehouse), we&apos;ll
              recommend, install and maintain the right lift for it.
            </SectionIntro>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="group mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition hover:border-white/40 hover:bg-white/5"
            >
              Not sure which? Ask us
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[260px] gap-3 sm:grid-cols-2 md:grid-cols-3 lg:mt-[4vh] lg:min-h-[380px] lg:flex-1 lg:grid-cols-6 lg:grid-rows-2 lg:auto-rows-auto">
          {liftTypes.map((lift, i) => {
            const Icon = ICONS[lift.key];
            return (
              <Reveal key={lift.key} delay={(i % 6) * 0.05}>
                <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[20px] ring-1 ring-white/10 transition duration-500 hover:ring-brand-light/50">
                  <Image
                    src={images[lift.image]}
                    alt={imageAlt[lift.image]}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 17vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="-z-20 object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                  {/* Scrim: keeps text readable on any photo, deepens on hover */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/10 transition-opacity duration-500" />
                  <div className="absolute inset-0 -z-10 bg-brand/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-brand/25" />

                  <div className="flex items-start justify-between p-4 lg:p-[1.8vh]">
                    <span className="grid size-9 place-items-center rounded-xl border border-white/20 bg-navy-950/40 backdrop-blur-md transition-colors duration-500 group-hover:border-brand-light/60 group-hover:bg-brand/60">
                      <Icon className="size-4 text-white" />
                    </span>
                    <span className="rounded-full bg-navy-950/40 px-2 py-0.5 font-mono text-[0.65rem] text-steel-200 backdrop-blur-md">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-auto p-4 pt-0 lg:p-[1.8vh] lg:pt-0">
                    <h3 className="font-display text-lg font-bold leading-tight tracking-tight lg:text-[clamp(0.95rem,2.1vh,1.1rem)]">
                      {lift.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-snug text-steel-200 lg:line-clamp-3 lg:text-[clamp(0.74rem,1.55vh,0.82rem)]">
                      {lift.desc}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5 lg:hidden">
                      {lift.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-white/15 bg-navy-950/40 px-2.5 py-0.5 text-[0.68rem] text-steel-200 backdrop-blur-md"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
